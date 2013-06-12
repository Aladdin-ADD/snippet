#!/usr/bin/env python3.3
# -*- coding: utf-8 -*-

"""
usage:
    from options import options, define
    define("port", default=8888, type=int)
    options.parse()
    print(options.port)
"""


from argparse import ArgumentParser


class OptionParser:
    def __init__(self):
        self._parser = ArgumentParser()
        self._args = None


    def __getattr__(self, name):
        if self._args is None:
            raise AttributeError("'parse()' must be called first.")
        try:
            return getattr(self._args, name)
        except AttributeError as e:
            raise AttributeError("'{}' is not defined.".format(name)) from e


    def define(self, name, default=None, type=None, help=None, metavar=None):
        self._parser.add_argument("--" + name, default=default, type=type,
                                  help=help, metavar=metavar)


    def parse(self):
        self._args = self._parser.parse_args()



options = OptionParser()
define = options.define



if __name__ == '__main__':
    define("host", default="localhost", type=str, metavar="str")
    define("port", default=8888, type=int, metavar="int")
    options.parse()
    print("{}:{}".format(options.host, options.port))
