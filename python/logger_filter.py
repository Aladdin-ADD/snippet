#!/usr/bin/env python3

import logging

#  disable all logger
logging.basicConfig(
    level=logging.NOTSET,
    handlers=[logging.NullHandler()]
)

#  custom handler
formatter = logging.Formatter(
    '%(asctime)s - %(levelname)s - %(name)s - %(funcName)s - %(message)s',
    '%Y-%m-%d %H:%M:%S')
handler = logging.StreamHandler()
handler.setLevel(logging.NOTSET)
handler.setFormatter(formatter)

logger = logging.getLogger(__name__)
logger.addHandler(handler)


if __name__ == '__main__':
    logger.debug('debug')

    logger_a = logging.getLogger('a')
    logger_a.info('info')

    logger_b = logging.getLogger('b')
    logger_b.warning('warning')
