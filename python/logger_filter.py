#!/usr/bin/env python3

import logging

#  disable all logger
logging.basicConfig(
    level=logging.NOTSET,
    handlers=[logging.NullHandler()]
)

#  custom handler
formatter = logging.Formatter(
    '%(asctime)s %(levelname)-8s %(message)s',
    '%Y-%m-%d %H:%M:%S')
handler = logging.StreamHandler()
handler.setLevel(logging.NOTSET)
handler.setFormatter(formatter)

logger = logging.getLogger(__name__)
logger.addHandler(handler)
