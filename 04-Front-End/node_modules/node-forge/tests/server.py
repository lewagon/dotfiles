#!/usr/bin/env python

"""
SSL server for Forge tests.

- The server changes to the directory of the server script.
- SSL uses "server.key" and "server.crt".
- Sever performs basic static file serving.
- Starts Flash cross domain policy file server.
- Defaults to HTTP/HTTPS port 19400.
- Defaults to Flash socket policy port 19945.

  $ ./server.py [options]

If you just need a simple HTTP server, also consider:
  $ python -m SimpleHTTPServer 19400
"""

from multiprocessing import Process
from optparse import OptionParser
import SimpleHTTPServer
import SocketServer
import os
import sys
import time

# Try to import special Forge SSL module with session cache support
# Using the built directory directly
python_version = "python" + sys.version[:3]
sys.path.insert(0, os.path.join(
    os.path.dirname(os.path.realpath(__file__)),
    "..", "dist", "forge_ssl", "lib", python_version, "site-packages"))
try:
    from forge import ssl
    have_ssl_sessions = True
    have_ssl = True
except ImportError:
    have_ssl_sessions = False
    try:
        import ssl
        have_ssl = True
    except ImportError:
        have_ssl = False

# Set address reuse for all TCPServers
SocketServer.TCPServer.allow_reuse_address = True

# The policy file
# NOTE: This format is very strict. Edit with care.
policy_file = """\
<?xml version="1.0"?>\
<!DOCTYPE cross-domain-policy\
 SYSTEM "http://www.adobe.com/xml/dtds/cross-domain-policy.dtd">\
<cross-domain-policy>\
<allow-access-from domain="*" to-ports="*"/>\
</cross-domain-policy>\0"""


class PolicyHandler(SocketServer.BaseRequestHandler):
    """
    The RequestHandler class for our server.

    Returns a policy file when requested.
    """

    def handle(self):
        # get some data
        # TODO: make this more robust (while loop, etc)
        self.data = self.request.recv(1024).rstrip('\0')
        #print "%s wrote:" % self.client_address[0]
        #print repr(self.data)
        # if policy file request, send the file.
        if self.data == "<policy-file-request/>":
            print "Policy server request from %s." % (self.client_address[0])
            self.request.send(policy_file)
        else:
            print "Policy server received junk from %s: \"%s\"" % \
                    (self.client_address[0], repr(self.data))


def create_policy_server(options):
    """Start a policy server"""
    print "Policy serving from %d." % (options.policy_port)
    policyd = SocketServer.TCPServer((options.host, options.policy_port), PolicyHandler)
    return policyd


class ThreadedTCPServer(SocketServer.ThreadingMixIn, SocketServer.TCPServer):
    pass


def create_http_server(options, script_dir):
    """Start a static file server"""
    # use UTF-8 encoding for javascript files
    m = SimpleHTTPServer.SimpleHTTPRequestHandler.extensions_map
    m['.js'] = 'application/javascript;charset=UTF-8'

    Handler = SimpleHTTPServer.SimpleHTTPRequestHandler
#    httpd = SocketServer.TCPServer((options.host, options.port), Handler)
    httpd = ThreadedTCPServer((options.host, options.port), Handler)
    if options.tls:
        if not have_ssl:
            raise Exception("SSL support from Python 2.7 or later is required.")

        # setup session args if we session support
        sess_args = {}
        if have_ssl_sessions:
            sess_args["sess_id_ctx"] = "forgetest"
        else:
            print "Forge SSL with session cache not available, using standard version."

        httpd.socket = ssl.wrap_socket(
            httpd.socket,
            keyfile="server.key",
            certfile="server.crt",
            server_side=True,
            **sess_args)

    print "Serving from \"%s\"." % (script_dir)
    print "%s://%s:%d/" % \
            (("https" if options.tls else "http"),
            httpd.server_address[0],
            options.port)
    return httpd


def serve_forever(server):
    """Serve until shutdown or keyboard interrupt."""
    try:
       server.serve_forever()
    except KeyboardInterrupt:
       return


def main():
    """Start static file and policy servers"""
    usage = "Usage: %prog [options]"
    parser = OptionParser(usage=usage)
    parser.add_option("", "--host", dest="host", metavar="HOST",
            default="localhost", help="bind to HOST")
    parser.add_option("-p", "--port", dest="port", type="int",
            help="serve on PORT", metavar="PORT", default=19400)
    parser.add_option("-P", "--policy-port", dest="policy_port", type="int",
            help="serve policy file on PORT", metavar="PORT", default=19945)
    parser.add_option("", "--tls", dest="tls", action="store_true",
            help="serve HTTPS", default=False)
    (options, args) = parser.parse_args()

    # Change to script dir so SSL and test files are in current dir.
    script_dir = os.path.dirname(os.path.realpath(__file__))
    os.chdir(script_dir)

    print "Forge Test Server. Use ctrl-c to exit."
    
    # create policy and http servers
    httpd = create_http_server(options, script_dir)
    policyd = create_policy_server(options)

    # start servers
    server_p = Process(target=serve_forever, args=(httpd,))
    policy_p = Process(target=serve_forever, args=(policyd,))
    server_p.start()
    policy_p.start()

    processes = [server_p, policy_p]

    while len(processes) > 0:
        try:
            for p in processes:
               if p.is_alive():
                  p.join(1)
               else:
                  processes.remove(p)
        except KeyboardInterrupt:
            print "\nStopping test server..."
            # processes each receive interrupt
            # so no need to shutdown
            #httpd.shutdown();
            #policyd.shutdown();


if __name__ == "__main__":
    main()

