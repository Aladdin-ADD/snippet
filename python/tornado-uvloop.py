#!/usr/bin/env python3

from tornado.ioloop import IOLoop
from tornado.options import define, options, parse_command_line
from tornado.web import Application
import uvloop
import asyncio
import os
import os.path

import routes from routes

def resolve(path):
    curr_dir = os.path.dirname(__file__)
    resolved = os.path.normpath(os.path.join(curr_dir, path))
    return resolved


def main():
    define('host', default='127.0.0.1', help='run on the given host', type=str)
    define('port', default=8000, help='run on the given port', type=int)
    define('debug', default=False, help='enable debug mode', type=bool)
    parse_command_line()

    settings = {
        'debug': options.debug,
        'cookie_secret': os.urandom(16),
        'template_path': resolve('./templates'),
        'static_path': resolve('./static'),
    }

    application = Application(routes, **settings)
    application.listen(options.port, options.host, xheaders=True)

    asyncio.set_event_loop_policy(uvloop.EventLoopPolicy())
    IOLoop.configure('tornado.platform.asyncio.AsyncIOLoop')
    IOLoop.instance().start()


if __name__ == '__main__':
    main()
