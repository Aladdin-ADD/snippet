#!/usr/bin/env python3.3
# -*- coding: utf-8 -*-

from urllib import request
#from types import Moduletype # py3.4
from imp import new_module as ModuleType
import sys


def load_module(url):
    u = request.urlopen(url)
    source = u.read().decode("utf-8")
    code = compile(source, url, "exec")
    module = sys.modules.setdefault(url, ModuleType(url))
    module.__file__ = url
    #module.__package__ = ""
    exec(code, module.__dict__)
    return module


if __name__ == '__main__':
    url = "https://raw.github.com/dhcmrlchtdj/toolkit/master/asynclient.py"
    pkg = load_module(url)
    print(pkg)
    print(dir(pkg))
