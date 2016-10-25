#!/usr/bin/env python3

from tornado.ioloop import IOLoop
from tornado.options import define, options, parse_command_line
from tornado.web import Application
import os


import os.path
import inspect
def resolve(path):
    file_path = inspect.getabsfile(inspect.currentframe())
    curr_dir = os.path.dirname(file_path)
    resolved = os.path.normpath(os.path.join(curr_dir, path))
    return resolved


from tornado.web import RequestHandler
class MainHandler(RequestHandler): pass
routes = [
    (r'/(\w+)', MainHandler),
]


def main():
    define('host', default='127.0.0.1', help='run on the given host', type=str)
    define('port', default=8000, help='run on the given port', type=int)
    define('debug', default=False, help='enable debug mode', type=bool)
    parse_command_line()

    settings = {
        'debug': options.debug,
        'cookie_secret': os.urandom(32),
        'template_path': resolve('./templates'),
        'static_path': resolve('./static'),
    }

    application = Application(routes, **settings)
    application.listen(options.port, options.host, xheaders=True)

    IOLoop.instance().start()


if __name__ == '__main__':
    main()
