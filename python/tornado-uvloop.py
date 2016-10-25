#!/usr/bin/env python3

from tornado.ioloop import IOLoop
import uvloop
import asyncio

asyncio.set_event_loop_policy(uvloop.EventLoopPolicy())
IOLoop.configure('tornado.platform.asyncio.AsyncIOLoop')

IOLoop.instance().start()
