#!/usr/bin/env python3

"""
$ # use timeit module
$ python -m timeit -r 1 -n 10000 "from time_it import main" "main()"
"""

import time
import functools


def tt(number=1000):
    def timeit(fn):
        @functools.wraps(fn)
        def wrapper(*args, **kwds):
            start = time.time()
            for i in range(number):
                fn(*args, **kwds)
            end = time.time()
            print(fn.__name__, end - start)
        return wrapper
    return timeit




def main():
    @tt(10000)
    def test():
        pass

    test()




if __name__ == "__main__":
    main()
