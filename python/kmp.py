#!/usr/bin/env python3
# -*- coding: utf-8 -*-

def KMP(pattern, text):
    """whether pattern in text"""
    t = 0
    shifts = [0]  # next table
    for ch in pattern[1:]:
        while t > 0 and ch != pattern[t]:
            t = shifts[t - 1]
        if ch == pattern[t]:
            t += 1
            shifts.append(t)
        else:
            shifts.append(0)

    t = 0
    pattern_len = len(pattern)
    for ch in text:
        while t > 0 and ch != pattern[t]:
            t = shifts[t - 1]
        if ch == pattern[t]:
            t += 1
        if t == pattern_len:
            return True
    return False
