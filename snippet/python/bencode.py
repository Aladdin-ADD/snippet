#!/usr/bin/env python3
# -*- coding: utf-8 -*-

def _decode_int(data):
    data = data[1:]
    integer, _, data = data.partition("e")
    return (int(integer), data)




def _decode_str(data):
    length, _, data = data.partition(":")
    length = int(length)
    return (data[:length], data[length:])




def _decode_list(data):
    data = data[1:]
    result = []

    while data:
        dt = data[0]
        if dt == "e":
            return (result, data[1:])
        elif dt == "i":
            _, data = _decode_int(data)
        elif dt == "l":
            _, data = _decode_list(data)
        elif dt == "d":
            _, data = _decode_dict(data)
        else:
            _, data = _decode_str(data)
        result.append(_)




def _decode_dict(data):
    data = data[1:]
    result = {}
    key = None

    while data:
        dt = data[0]
        if dt == "e":
            if key: raise Exception("missing value")
            return (result, data[1:])
        elif dt == "i":
            _, data = _decode_int(data)
        elif dt == "l":
            _, data = _decode_list(data)
        elif dt == "d":
            _, data = _decode_dict(data)
        else:
            _, data = _decode_str(data)
            if not key:
                key = _
                continue

        if not key: raise Exception("invalid input string")
        result[key] = _
        key = None




def decode(data):
    dt = data[0]

    if dt == "i":
        ret = _decode_int(data)
    elif dt == "l":
        ret = _decode_list(data)
    elif dt == "d":
        ret = _decode_dict(data)
    else:
        ret = _decode_str(data)

    return ret[0]




def encode(data):
    if isinstance(data, str):
        return "{}:{}".format(len(data), data)
    elif isinstance(data, int):
        return "i{}e".format(data)
    elif isinstance(data, list):
        return "l{}e".format("".join(encode(item) for item in data))
    elif isinstance(data, dict):
        result = []
        for key, val in data.items():
            result.extend( (encode(key), encode(val)) )
        return "d{}e".format("".join(result))
    else:
        raise Exception("unsupported type {}".format(type(data)))
