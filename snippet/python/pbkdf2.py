#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
PBKDF2 implementation.
see rfc2898 for details.
thanks to mitsuhiko's python-pbkdf2 and django's crypto.
"""

from binascii import hexlify
from itertools import starmap
from operator import xor
from struct import Struct
from hmac import new


_INT = Struct(b'>I').pack


def PBKDF2(password, salt, iterations=10000, dklen=0, hashfunc=None):
    """FROM DJANGO: Right now 10,000 iterations is the recommended default
    which takes 100ms on a 2.2Ghz Core 2 Duo.  This is probably the bare
    minimum for security given 1000 iterations was recommended in 2001.
    """
    assert dklen > 0
    if hashfunc is None:
        from hashlib import sha512
        hashfunc = sha512

    mac = new(password, None, hashfunc)
    hlen = mac.digest_size

    if dklen > (2 ** 32 - 1) * hlen:
        raise OverflowError('derived key too long')

    def _pseudorandom(u):  # PRF
        m = mac.copy()
        m.update(u)
        return m.digest()

    T_list = []
    for i in range(1, 1 - (-dklen // hlen)):  # T{1} to T{ceil(dklen/hlen)}
        u = _pseudorandom(salt + _INT(i))
        T_i = u
        for j in range(iterations - 1):  # U{1} to U{iteration}
            u = _pseudorandom(u)
            T_i = starmap(xor, zip(T_i, u))
        T_list.append(bytes(T_i))

    DK = b''.join(T_list)[:dklen]
    return hexlify(DK)


def test():
    from hashlib import sha1

    # from rfc6070
    def check(p, s, c, dklen, output):
        print(PBKDF2(p, s, c, dklen, sha1) == output)

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
