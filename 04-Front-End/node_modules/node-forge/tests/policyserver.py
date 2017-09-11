#!/usr/bin/env python

"""
Flash Socket Policy Server.

- Starts Flash socket policy file server.
- Defaults to port 843.
- NOTE: Most operating systems require administrative privileges to use
  ports under 1024.

  $ ./policyserver.py [options]
"""

"""
Also consider Adobe's solutions:
http://www.adobe.com/devnet/flashplayer/articles/socket_policy_files.html
"""

from multiprocessing import Process
from optparse import OptionParser
import SocketServer
import logging

# Set address reuse for all TCPServers
SocketServer.TCPServer.allow_reuse_address = True

# Static socket policy file string.
# NOTE: This format is very strict. Edit with care.
socket_policy_file = """\
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
        """Send policy string if proper request string is received."""
        # get some data
        # TODO: make this more robust (while loop, etc)
        self.data = self.request.recv(1024).rstrip('\0')
        logging.debug("%s wrote:%s" % (self.client_address[0], repr(self.data)))
        # if policy file request, send the file.
        if self.data == "<policy-file-request/>":
            logging.info("Policy server request from %s." % (self.client_address[0]))
            self.request.send(socket_policy_file)
        else:
            logging.info("Policy server received junk from %s: \"%s\"" % \
                    (self.client_address[0], repr(self.data)))


class ThreadedTCPServer(SocketServer.ThreadingMixIn, SocketServer.TCPServer):
    def serve_forever(self):
        """Handle one request at a time until shutdown or keyboard interrupt."""
        try:
           SocketServer.BaseServer.serve_forever(self)
        except KeyboardInterrupt:
           return


def main():
    """Run socket policy file servers."""
    usage = "Usage: %prog [options]"
    parser = OptionParser(usage=usage)
    parser.add_option("", "--host", dest="host", metavar="HOST",
            default="localhost", help="bind to HOST")
    parser.add_option("-p", "--port", dest="port", metavar="PORT",
            default=843, type="int", help="serve on PORT")
    parser.add_option("-d", "--debug", dest="debug", action="store_true",
            default=False, help="debugging output")
    parser.add_option("-v", "--verbose", dest="verbose", action="store_true",
            default=False, help="verbose output")
    (options, args) = parser.parse_args()

    # setup logging
    if options.debug:
        lvl = logging.DEBUG
    elif options.verbose:
        lvl = logging.INFO
    else:
        lvl = logging.WARNING
    logging.basicConfig(level=lvl, format="%(levelname)-8s %(message)s")

    # log basic info
    logging.info("Flash Socket Policy Server. Use ctrl-c to exit.")
    
    # create policy server
    logging.info("Socket policy serving on %s:%d." % (options.host, options.port))
    policyd = ThreadedTCPServer((options.host, options.port), PolicyHandler)

    # start server
    policy_p = Process(target=policyd.serve_forever)
    policy_p.start()

    while policy_p.is_alive():
        try:
            policy_p.join(1)
        except KeyboardInterrupt:
            logging.info("Stopping test server...")


if __name__ == "__main__":
    main()

