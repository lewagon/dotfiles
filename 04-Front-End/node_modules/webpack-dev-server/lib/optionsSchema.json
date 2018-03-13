{
  "additionalProperties": false,
  "properties": {
    "hot": {
      "description": "Enables Hot Module Replacement.",
      "type": "boolean"
    },
    "hotOnly": {
      "description": "Enables Hot Module Replacement without page refresh as fallback.",
      "type": "boolean"
    },
    "lazy": {
      "description": "Disables watch mode and recompiles bundle only on a request.",
      "type": "boolean"
    },
    "bonjour": {
      "description": "Publishes the ZeroConf DNS service",
      "type": "boolean"
    },
    "host": {
      "description": "The host the server listens to.",
      "type": "string"
    },
    "allowedHosts": {
      "description": "Specifies which hosts are allowed to access the dev server.",
      "items": {
        "type": "string"
      },
      "type": "array"
    },
    "filename": {
      "description": "The filename that needs to be requested in order to trigger a recompile (only in lazy mode).",
      "anyOf": [
        {
          "instanceof": "RegExp"
        },
        {
          "type": "string"
        }
      ]
    },
    "publicPath": {
      "description": "URL path where the webpack files are served from.",
      "type": "string"
    },
    "port": {
      "description": "The port the server listens to.",
      "anyOf": [
        {
          "type": "number"
        },
        {
          "type": "string"
        }
      ]
    },
    "socket": {
      "description": "The Unix socket to listen to (instead of on a host).",
      "type": "string"
    },
    "watchOptions": {
      "description": "Options for changing the watch behavior.",
      "type": "object"
    },
    "headers": {
      "description": "Response headers that are added to each response.",
      "additionalProperties": {
        "type": "string"
      },
      "type": "object"
    },
    "clientLogLevel": {
      "description": "Controls the log messages shown in the browser.",
      "enum": [
        "none",
        "info",
        "warning",
        "error"
      ]
    },
    "overlay": {
      "description": "Shows an error overlay in browser.",
      "anyOf": [
        {
          "type": "boolean"
        },
        {
          "type": "object",
          "properties": {
            "errors": {
              "type": "boolean"
            },
            "warnings": {
              "type": "boolean"
            }
          }
        }
      ]
    },
    "key": {
      "description": "The contents of a SSL key.",
      "anyOf": [
        {
          "type": "string"
        },
        {
          "instanceof": "Buffer"
        }
      ]
    },
    "cert": {
      "description": "The contents of a SSL certificate.",
      "anyOf": [
        {
          "type": "string"
        },
        {
          "instanceof": "Buffer"
        }
      ]
    },
    "ca": {
      "description": "The contents of a SSL CA certificate.",
      "anyOf": [
        {
          "type": "string"
        },
        {
          "instanceof": "Buffer"
        }
      ]
    },
    "pfx": {
      "description": "The contents of a SSL pfx file.",
      "anyOf": [
        {
          "type": "string"
        },
        {
          "instanceof": "Buffer"
        }
      ]
    },
    "pfxPassphrase": {
      "description": "The passphrase to a (SSL) PFX file.",
      "type": "string"
    },
    "inline": {
      "description": "Enable inline mode to include client scripts in bundle (CLI-only).",
      "type": "boolean"
    },
    "disableHostCheck": {
      "description": "Disable the Host header check (Security).",
      "type": "boolean"
    },
    "public": {
      "description": "The public hostname/ip address of the server.",
      "type": "string"
    },
    "https": {
      "description": "Enable HTTPS for server.",
      "anyOf": [
        {
          "type": "object"
        },
        {
          "type": "boolean"
        }
      ]
    },
    "contentBase": {
      "description": "A directory to serve files non-webpack files from.",
      "anyOf": [
        {
          "items": {
            "type": "string"
          },
          "minItems": 1,
          "type": "array"
        },
        {
          "enum": [
            false
          ]
        },
        {
          "type": "number"
        },
        {
          "type": "string"
        }
      ]
    },
    "watchContentBase": {
      "description": "Watches the contentBase directory for changes.",
      "type": "boolean"
    },
    "open": {
      "description": "Let the CLI open your browser.",
      "type": "boolean"
    },
    "useLocalIp": {
      "description": "Let the browser open with your local IP.",
      "type": "boolean"
    },
    "openPage": {
      "description": "Let the CLI open your browser to a specific page on the site.",
      "type": "string"
    },
    "features": {
      "description": "The order of which the features will be triggered.",
      "items": {
        "type": "string"
      },
      "type": "array"
    },
    "compress": {
      "description": "Gzip compression for all requests.",
      "type": "boolean"
    },
    "proxy": {
      "description": "Proxy requests to another server.",
      "anyOf": [
        {
          "items": {
            "anyOf": [
              {
                "type": "object"
              },
              {
                "instanceof": "Function"
              }
            ]
          },
          "minItems": 1,
          "type": "array"
        },
        {
          "type": "object"
        }
      ]
    },
    "historyApiFallback": {
      "description": "404 fallback to a specified file.",
      "anyOf": [
        {
          "type": "boolean"
        },
        {
          "type": "object"
        }
      ]
    },
    "staticOptions": {
      "description": "Options for static files served with contentBase.",
      "type": "object"
    },
    "setup": {
      "description": "Exposes the Express server to add custom middleware or routes.",
      "instanceof": "Function"
    },
    "stats": {
      "description": "Decides what bundle information is displayed.",
      "anyOf": [
        {
          "type": "object"
        },
        {
          "type": "boolean"
        },
        {
          "enum": [
            "none",
            "errors-only",
            "minimal",
            "normal",
            "verbose"
          ]
        }
      ]
    },
    "reporter": {
      "description": "Customize what the console displays when compiling.",
      "instanceof": "Function"
    },
    "noInfo": {
      "description": "Hide all info messages on console.",
      "type": "boolean"
    },
    "quiet": {
      "description": "Hide all messages on console.",
      "type": "boolean"
    },
    "serverSideRender": {
      "description": "Expose stats for server side rendering (experimental).",
      "type": "boolean"
    },
    "index": {
      "description": "The filename that is considered the index file.",
      "type": "string"
    },
    "log": {
      "description": "Customize info logs for webpack-dev-middleware.",
      "instanceof": "Function"
    },
    "warn": {
      "description": "Customize warn logs for webpack-dev-middleware.",
      "instanceof": "Function"
    }
  },
  "type": "object"
}
