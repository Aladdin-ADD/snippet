#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from collections import UserDict


class _State(UserDict):
    """trie's state"""
    def __init__(self):
        super().__init__({})
        self.shift = None # next state if not match
        self.accept = False # whether is a accept state
        self.match = [] # matched string




class trie:
    def __init__(self, *patterns):
        """initial trie tree"""
        self.patterns = patterns
        # create start state
        self._start = _State()
        self._start.shift = self._start
        # iter patterns
        for pattern in patterns:
            state = self._start
            # first char
            char = pattern[0]
            if char not in state:
                state[char] = _State()
                state[char].shift = self._start
            state = state[char]
            # rest char
            for char in pattern[1:]:
                if char not in state:
                    # create new state
                    state[char] = _State()
                    shift = state.shift
                    while True:
                        if char in shift:
                            state[char].shift = shift[char]
                            break
                        elif shift is self._start:
                            state[char].shift = shift
                            break
                        else:
                            shift = shift.shift
                state = state[char]
            # accept
            state.accept = True
            state.match.append(pattern)


    def find(self, string):
        """search patterns in string"""
        result = []
        state = self._start
        # search pattern in string
        for char in string:
            if char in state:
                state = state[char]
                if state.accept:
                    result.extend(state.match)
            else:
                shift = state.shift
                while True:
                    if char in shift:
                        state = shift[char]
                        break
                    elif shift is self._start:
                        state = shift
                        break
                    else:
                        shift = shift.shift
        # get all pattern
        r = {
            p
            for p in self.patterns
            for r in result
            if p in r
        }
        return r




if __name__ == '__main__':
    t = trie("his", "he", "hers", "she")
    print(t.find("his name is thomspon"))
    print(t.find("hers"))
    print(t.find("she is beauty"))
    print(t.find("he his"))
