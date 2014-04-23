#!/usr/bin/env python3.4
# -*- coding: utf-8 -*-

from urllib import request
from types import ModuleType
import sys


def load_module(url):
    u = request.urlopen(url)
    source = u.read().decode("utf-8")
    code = compile(source, url, "exec")
    module = sys.modules.setdefault(url, ModuleType(url))
    #module.__name__ = ""
    #module.__package__ = ""
    exec(code, module.__dict__)
    return module


if __name__ == '__main__':
    url = "https://raw.githubusercontent.com/dhcmrlchtdj/toolkit/master/snippet/python/urlimport.py"
    pkg = load_module(url)
    print(pkg)
    print(dir(pkg))
