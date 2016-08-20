#!/usr/bin/env python3

"""
@route(r'/')
class Index(tornado.web.RequestHandler):
    pass

app = tornado.web.Application(route.table)
"""

from tornado.web import URLSpec


class route:
    table = []

    def __init__(self, pattern, kwargs=None, name=None):
        self.pattern = pattern
        self.kwargs = kwargs
        self.name = name

    def __call__(self, handler):
        spec = URLSpec(self.pattern, handler, self.kwargs, self.name)
        self.table.append(spec)
        return handler
