/**
 * Flash Socket Policy Apache Module.
 *
 * This module provides a flash socket policy file on the same port that
 * serves HTTP on Apache. This can help simplify setting up a server that
 * supports cross-domain communication with flash.
 *
 * Quick note about Apache memory handling: Data is allocated from pools and
 * is not manually returned to those pools. The pools are typically considered
 * short-lived and will be cleaned up automatically by Apache.
 *
 * @author Dave Longley
 *
 * Copyright (c) 2010 Digital Bazaar, Inc. All rights reserved.
 */
#include "httpd.h"
#include "http_config.h"
#include "http_core.h"

#include "ap_compat.h"

#include <string.h>

// length of a policy file request
#define PFR_LENGTH 23

// declare main module
module AP_MODULE_DECLARE_DATA fsp_module;

// configuration for the module
typedef struct fsp_config
{
   // the cross-domain policy to serve
   char* policy;
   apr_size_t policy_length;
} fsp_config;

// filter state for keeping track of detected policy file requests
typedef struct filter_state
{
   fsp_config* cfg;
   int checked;
   int found;
} filter_state;

// for registering hooks, filters, etc.
static void fsp_register_hooks(apr_pool_t *p);
static int fsp_pre_connection(conn_rec *c, void *csd);

// filter handler declarations
static apr_status_t fsp_input_filter(
   ap_filter_t* f, apr_bucket_brigade* bb,
	ap_input_mode_t mode, apr_read_type_e block, apr_off_t nbytes);
static int fsp_output_filter(ap_filter_t* f, apr_bucket_brigade* bb);

/**
 * Registers the hooks for this module.
 *
 * @param p the pool to allocate from, if necessary.
 */
static void fsp_register_hooks(apr_pool_t* p)
{
   // registers the pre-connection hook to handle adding filters
   ap_hook_pre_connection(
      fsp_pre_connection, NULL, NULL, APR_HOOK_MIDDLE);

   // will parse a policy file request, to be added in pre_connection
   ap_register_input_filter(
      "fsp_request", fsp_input_filter,
      NULL, AP_FTYPE_CONNECTION);

   // will emit a cross-domain policy response to be added in pre_connection
   ap_register_output_filter(
      "fsp_response", fsp_output_filter,
      NULL, AP_FTYPE_CONNECTION);
}

/**
 * A hook that is called before a connection is handled. This function will
 * get the module configuration and add the flash socket policy filters if
 * a cross-domain policy has been specified in the configuration.
 *
 * @param c the connection.
 * @param csd the connection socket descriptor.
 *
 * @return OK on success.
 */
static int fsp_pre_connection(conn_rec* c, void* csd)
{
   // only install filters if a policy was specified in the module config
   fsp_config* cfg = ap_get_module_config(
      c->base_server->module_config, &fsp_module);
   if(cfg->policy != NULL)
   {
      // allocate filter state
      filter_state* state = apr_palloc(c->pool, sizeof(filter_state));
      if(state != NULL)
      {
         // initialize state
         state->cfg = cfg;
         state->checked = state->found = 0;

         // add filters
         ap_add_input_filter("fsp_request", state, NULL, c);
         ap_add_output_filter("fsp_response", state, NULL, c);
      }
   }

   return OK;
}

/**
 * Searches the input request for a flash socket policy request. This request,
 * unfortunately, does not follow the HTTP protocol and cannot be handled
 * via a special HTTP handler. Instead, it is a short xml string followed by
 * a null character:
 *
 * '<policy-file-request/>\0'
 *
 * A peek into the incoming data checks the first character of the stream to
 * see if it is '<' (as opposed to typically something else for HTTP). If it
 * is not, then this function returns and HTTP input is read normally. If it
 * is, then the remaining bytes in the policy-file-request are read and
 * checked. If a match is found, then the filter state will be updated to
 * inform the output filter to send a cross-domain policy as a response. If
 * no match is found, HTTP traffic will proceed as usual.
 *
 * @param f the input filter.
 * @param state the filter state.
 *
 * @return APR_SUCCESS on success, some other status on failure.
 */
static apr_status_t find_policy_file_request(
   ap_filter_t* f, filter_state* state)
{
   apr_status_t rval = APR_SUCCESS;

   // create a temp buffer for speculative reads
   apr_bucket_brigade* tmp = apr_brigade_create(f->c->pool, f->c->bucket_alloc);

   // FIXME: not sure how blocking mode works ... can it return fewer than
   // the number of specified bytes?

   // peek at the first PFR_LENGTH bytes
   rval = ap_get_brigade(
      f->next, tmp, AP_MODE_SPECULATIVE, APR_BLOCK_READ, PFR_LENGTH);
   if(rval == APR_SUCCESS)
   {
      // quickly check the first bucket for the beginning of a pfr
      const char* data;
      apr_size_t length;
      apr_bucket* b = APR_BRIGADE_FIRST(tmp);
      rval = apr_bucket_read(b, &data, &length, APR_BLOCK_READ);
      if(rval == APR_SUCCESS && length > 0 && data[0] == '<')
      {
         // possible policy file request, fill local buffer
         char pfr[PFR_LENGTH];
         char* ptr = pfr;
         memcpy(ptr, data, length);
         ptr += length;
         memset(ptr, '\0', PFR_LENGTH - length);
         b = APR_BUCKET_NEXT(b);
         while(rval == APR_SUCCESS && b != APR_BRIGADE_SENTINEL(tmp))
         {
            rval = apr_bucket_read(b, &data, &length, APR_BLOCK_READ);
            if(rval == APR_SUCCESS)
            {
               memcpy(ptr, data, length);
               ptr += length;
               b = APR_BUCKET_NEXT(b);
            }
         }

         if(rval == APR_SUCCESS)
         {
            // see if pfr is a policy file request: '<policy-file-request/>\0'
            if((ptr - pfr == PFR_LENGTH) && (pfr[PFR_LENGTH - 1] == '\0') &&
               (strncmp(pfr, "<policy-file-request/>", PFR_LENGTH -1) == 0))
            {
               // pfr found
               state->found = 1;
            }
         }
      }
   }

   return rval;
}

/**
 * Handles incoming data. If an attempt has not yet been made to look for
 * a policy request (it is the beginning of the connection), then one is
 * made. Otherwise this filter does nothing.
 *
 * If an attempt is made to find a policy request and one is not found, then
 * reads proceed as normal. If one is found, then the filter state is modified
 * to inform the output filter to send a policy request and the return value
 * of this filter is EOF indicating that the connection should close after
 * sending the cross-domain policy.
 *
 * @param f the input filter.
 * @param bb the brigate to fill with input from the next filters in the chain
 *           and then process (look for a policy file request).
 * @param mode the type of read requested (ie: AP_MODE_GETLINE means read until
 *           a CRLF is found, AP_MODE_GETBYTES means 'nbytes' of data, etc).
 * @param block APR_BLOCK_READ or APR_NONBLOCK_READ, indicates the type of
 *           blocking to do when trying to read.
 * @param nbytes used if the read mode is appropriate to specify the number of
 *           bytes to read (set to 0 for AP_MODE_GETLINE).
 *
 * @return the status of the input (ie: APR_SUCCESS for read success, APR_EOF
 *         for end of stream, APR_EAGAIN to read again when non-blocking).
 */
static apr_status_t fsp_input_filter(
   ap_filter_t* f, apr_bucket_brigade* bb,
	ap_input_mode_t mode, apr_read_type_e block, apr_off_t nbytes)
{
   apr_status_t rval = APR_SUCCESS;

   filter_state* state = f->ctx;
   if(state->checked == 1)
   {
      // already checked for policy file request, just read from other filters
      rval = ap_get_brigade(f->next, bb, mode, block, nbytes);
   }
   else
   {
      // try to find a policy file request
      rval = find_policy_file_request(f, state);
      state->checked = 1;

      if(rval == APR_SUCCESS)
      {
         if(state->found)
         {
            // do read of PFR_LENGTH bytes, consider end of stream
            rval = ap_get_brigade(
               f->next, bb, AP_MODE_READBYTES, APR_BLOCK_READ, PFR_LENGTH);
            rval = APR_EOF;
         }
         else
         {
            // do normal read
            rval = ap_get_brigade(f->next, bb, mode, block, nbytes);
         }
      }
   }

   return rval;
}

/**
 * Handles outgoing data. If the filter state indicates that a cross-domain
 * policy should be sent then it is added to the outgoing brigade of data. If
 * a policy request was not detected, then this filter makes no changes to
 * the outgoing data.
 *
 * @param f the output filter.
 * @param bb the outgoing brigade of data.
 *
 * @return APR_SUCCESS on success, some other status on error.
 */
static int fsp_output_filter(ap_filter_t* f, apr_bucket_brigade* bb)
{
   apr_status_t rval = APR_SUCCESS;

   filter_state* state = f->ctx;
   if(state->found)
   {
      // found policy-file-request, add response bucket
      // bucket is immortal because the data is stored in the configuration
      // and doesn't need to be copied
      apr_bucket* head = apr_bucket_immortal_create(
         state->cfg->policy, state->cfg->policy_length, bb->bucket_alloc);
      APR_BRIGADE_INSERT_HEAD(bb, head);
   }

   if(rval == APR_SUCCESS)
   {
      // pass brigade to next filter
      rval = ap_pass_brigade(f->next, bb);
   }

   return rval;
}

/**
 * Creates the configuration for this module.
 *
 * @param p the pool to allocate from.
 * @param s the server the configuration is for.
 *
 * @return the configuration data.
 */
static void* fsp_create_config(apr_pool_t* p, server_rec* s)
{
   // allocate config
   fsp_config* cfg = apr_palloc(p, sizeof(fsp_config));

   // no default policy
   cfg->policy = NULL;
   cfg->policy_length = 0;
   return cfg;
}

/**
 * Sets the policy file to use from the configuration.
 *
 * @param parms the command directive parameters.
 * @param userdata NULL, not used.
 * @param arg the string argument to the command directive (the file with
 *           the cross-domain policy to serve as content).
 *
 * @return NULL on success, otherwise an error string to display.
 */
static const char* fsp_set_policy_file(
   cmd_parms* parms, void* userdata, const char* arg)
{
   const char* rval = NULL;

   apr_pool_t* pool = (apr_pool_t*)parms->pool;
   fsp_config* cfg = ap_get_module_config(
      parms->server->module_config, &fsp_module);

   // ensure command is in the correct context
   rval = ap_check_cmd_context(parms, NOT_IN_DIR_LOC_FILE|NOT_IN_LIMIT);
   if(rval == NULL)
   {
      // get canonical file name
      char* fname = ap_server_root_relative(pool, arg);
      if(fname == NULL)
      {
         rval = (const char*)apr_psprintf(
            pool, "%s: Invalid policy file '%s'",
            parms->cmd->name, arg);
      }
      else
      {
         // try to open the file
         apr_status_t rv;
         apr_file_t* fd;
         apr_finfo_t finfo;
         rv = apr_file_open(&fd, fname, APR_READ, APR_OS_DEFAULT, pool);
         if(rv == APR_SUCCESS)
         {
            // stat file
            rv = apr_file_info_get(&finfo, APR_FINFO_NORM, fd);
            if(rv == APR_SUCCESS)
            {
               // ensure file is not empty
               apr_size_t length = (apr_size_t)finfo.size;
               if(length <= 0)
               {
                  rval = (const char*)apr_psprintf(
                     pool, "%s: policy file '%s' is empty",
                     parms->cmd->name, fname);
               }
               // read file
               else
               {
                  char* buf = (char*)apr_palloc(pool, length + 1);
                  buf[length] = '\0';
                  rv = apr_file_read_full(fd, buf, length, NULL);
                  if(rv == APR_SUCCESS)
                  {
                     // TODO: validate file
                     // save policy string
                     cfg->policy = buf;
                     cfg->policy_length = length + 1;
                  }
               }

               // close the file
               apr_file_close(fd);
            }
         }

         // handle error case
         if(rv != APR_SUCCESS)
         {
            char errmsg[120];
            rval = (const char*)apr_psprintf(
               pool, "%s: Invalid policy file '%s' (%s)",
               parms->cmd->name, fname,
               apr_strerror(rv, errmsg, sizeof(errmsg)));
         }
      }
   }

   return rval;
}

// table of configuration directives
static const command_rec fsp_cmds[] =
{
   AP_INIT_TAKE1(
      "FSPPolicyFile", /* the directive */
      fsp_set_policy_file, /* function to call when directive is found */
      NULL, /* user data to pass to function, not used */
      RSRC_CONF, /* indicates the directive appears outside of <Location> */
      "FSPPolicyFile (string) The cross-domain policy file to use"), /* docs */
   {NULL}
};

// module setup
module AP_MODULE_DECLARE_DATA fsp_module =
{
    STANDARD20_MODULE_STUFF,    /* stuff declared in every 2.0 mod       */
    NULL,                       /* create per-directory config structure */
    NULL,                       /* merge per-directory config structures */
    fsp_create_config,          /* create per-server config structure    */
    NULL,                       /* merge per-server config structures    */
    fsp_cmds,                   /* command apr_table_t                   */
    fsp_register_hooks          /* register hooks                        */
};
