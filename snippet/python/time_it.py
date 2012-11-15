#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""how to use timeit

% python -m timeit -r 1 -n 10000 "from time_it import main" "main()"
"""


def main():
    pass

if __name__ == "__main__":
    from timeit import timeit
    print(timeit("main()", setup="from __main__ import main", number=10000))
