#!/usr/bin/env python3

# from `https://github.com/binux/binux-tools/blob/master/python/getPY.py`

import argparse


def get_first_pinyin(character):
    ch = character.encode("gbk")

    if len(ch) == 1: return ch.decode('gbk')

    asc = ch[0] * 256 + ch[1] - 65536

    if -20319 <= asc <= -20284:
        return "a"
    elif -20283 <= asc <= -19776:
        return "b"
    elif -19775 <= asc <= -19219:
        return "c"
    elif -19218 <= asc <= -18711:
        return "d"
    elif -18710 <= asc <= -18527:
        return "e"
    elif -18526 <= asc <= -18240:
        return "f"
    elif -18239 <= asc <= -17923:
        return "g"
    elif -17922 <= asc <= -17418:
        return "h"
    elif -17417 <= asc <= -16475:
        return "j"
    elif -16474 <= asc <= -16213:
        return "k"
    elif -16212 <= asc <= -15641:
        return "l"
    elif -15640 <= asc <= -15166:
        return "m"
    elif -15165 <= asc <= -14923:
        return "n"
    elif -14922 <= asc <= -14915:
        return "o"
    elif -14914 <= asc <= -14631:
        return "p"
    elif -14630 <= asc <= -14150:
        return "q"
    elif -14149 <= asc <= -14091:
        return "r"
    elif -14090 <= asc <= -13119:
        return "s"
    elif -13118 <= asc <= -12839:
        return "t"
    elif -12838 <= asc <= -12557:
        return "w"
    elif -12556 <= asc <= -11848:
        return "x"
    elif -11847 <= asc <= -11056:
        return "y"
    elif -11055 <= asc <= -10247:
        return "z"
    else:
        return "?"



def main():
    ARGS = argparse.ArgumentParser()
    ARGS.add_argument("character")
    args = ARGS.parse_args()

    character = args.character

    for ch in character:
        pinyin = get_first_pinyin(ch)
        print(pinyin)



if __name__ == "__main__":
    main()
