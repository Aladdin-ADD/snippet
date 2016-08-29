#!/usr/bin/env python3

import logging


def m1(logger_name):
    filterHandler = logging.StreamHandler()
    filterHandler.addFilter(logging.Filter(logger_name))

    logging.basicConfig(
        level=logging.NOTSET,
        datefmt="%Y-%m-%d %H:%M:%S",
        format="%(asctime)s - %(levelname)s - %(message)s",
        handlers=[filterHandler]
    )


def m2(logger_name):
    logging.basicConfig(
        level=logging.NOTSET,
        handlers=[logging.NullHandler()]
    )

    formatter = logging.Formatter(
        '%(asctime)s - %(levelname)s - %(name)s - %(funcName)s - %(message)s',
        '%Y-%m-%d %H:%M:%S')
    handler = logging.StreamHandler()
    handler.setLevel(logging.NOTSET)
    handler.setFormatter(formatter)

    logger = logging.getLogger(logger_name)
    logger.addHandler(handler)
    return logger

if __name__ == '__main__':
    #  m1('a')
    #  m2('b')

    logger = logging.getLogger(__name__)
    logger.warning('from logger')

    logger_a = logging.getLogger('a')
    logger_a.warning('from a')

    logger_b = logging.getLogger('b')
    logger_b.warning('from b')
