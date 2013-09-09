#!/usr/bin/env python3.3
# -*- coding: utf-8 -*-

import sys
from glob import glob
from os.path import join
from uuid import uuid4

from PIL import Image


class ImageSplit:
    def __init__(self, dir_name):
        self.dir_name = dir_name
        self.count = 0
        self.split()


    def split(self):
        for image in sorted(glob(self.dir_name + "/*")):
            print(">>> split '{}'...".format(image))
            self.split_image(image)


    def split_image(self, path):
        image = Image.open(path)
        filename = join(self.dir_name,
                        "{:>04}_" + uuid4().hex + "." + image.format.lower())
        width, height = image.size
        if width > height:
            half = int(width / 2)
            self.count += 1
            with open(filename.format(self.count), "wb") as f:
                right = image.crop((half, 0, width, height))
                right.save(f)
            self.count += 1
            with open(filename.format(self.count), "wb") as f:
                left = image.crop((0, 0, half, height))
                left.save(f)
        else:
            self.count += 1
            with open(filename.format(self.count), "wb") as f:
                image.save(f)


def main():
    if len(sys.argv) != 2:
        print("usage: {} <image_dir>".format(sys.argv[0]))
        exit()

    ImageSplit(sys.argv[1])




if __name__ == '__main__':
    main()
