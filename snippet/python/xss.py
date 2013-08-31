#!/usr/bin/env python3.3
# -*- coding: utf-8 -*-

class escape:

    _map_basic = str.maketrans({
        "&": "&#x26;",
        "<": "&#x3C;",
        ">": "&#x3E;",
        "'": "&#x27;",
        '"': "&#x22;",
    })


    @classmethod
    def html(cls, s):
        """不会跑到标签外就没关系"""
        return s.translate(cls._map_basic)

    @classmethod
    def attr(cls, s):
        """用双引号包好就不会有问题"""
        return s.translate(cls._map_basic)

    @classmethod
    def css(cls, s):
        """不好搞，推荐在服务器维护一个映射表，不要直接发送传来的数据"""
        raise NotImplementedError()

    @classmethod
    def url_params(cls, s):
        """检查参数，把特殊字符编码为 %HH"""
        return

    @classmethod
    def url(cls, s, allowed=None):
        """检查 url，用白名单做限制"""
        return

