#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
PBKDF2 implementation.
see rfc2898 for details.
thanks to mitsuhiko's python-pbkdf2 and django's crypto.

NOTE:
use ``hashlib.pbkdf2_hmac`` in python 3.4.

Update to py3.4
"""

from binascii import hexlify
from hashlib import pbkdf2_hmac

def PBKDF2(password, salt, dklen, iterations=10000, hashfunc="sha512"):
    dk = pbkdf2_hmac(hashfunc, password, salt, iterations, dklen)
    return hexlify(dk)


def test():
    # from rfc6070
    def check(p, s, c, dklen, output):
        print(PBKDF2(p, s, dklen, c, "sha1") == output)

    check(b'password', b'salt', 1, 20,
          b'0c60c80f961f0e71f3a9b524af6012062fe037a6')

    check(b'password', b'salt', 2, 20,
          b'ea6c014dc72d6f8ccd1ed92ace1d41f0d8de8957')

    check(b'password', b'salt', 4096, 20,
          b'4b007901b765489abead49d926f721d065a429c1')

    check(b'passwordPASSWORDpassword',
          b'saltSALTsaltSALTsaltSALTsaltSALTsalt', 4096, 25,
          b'3d2eec4fe41c849b80c8d83662c0e44a8b291a964cf2f07038')

    check(b'pass\0word', b'sa\0lt', 4096, 16,
          b'56fa6aa75548099dcc37d7f03425e0c3')


if __name__ == '__main__':
    test()
