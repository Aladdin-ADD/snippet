#!/usr/bin/env python3.4

# $ for i in *; do mv $i ${i/_????????????????????????????????/}; done

__version__ = "0.2.0"




from PIL import Image
from pathlib import Path
from uuid import uuid4
import argparse
import logging




logging.basicConfig(
    level=logging.INFO,
    datefmt="%Y-%m-%d %H:%M:%S",
    format="[%(levelname)s %(asctime)s] %(message)s"
)
logger = logging.getLogger(__name__)




class ImageSplit:
    def __init__(self, dir_name):
        self.dir_name = Path(dir_name)
        self.count = 0


    @property
    def page_name(self):
        self.count += 1
        return "%04d_%s.jpeg" % (self.count, uuid4().hex)


    def start(self):
        for image in sorted(self.dir_name.iterdir()):
            self.split_image(image)


    def split_image(self, image_path):
        with image_path.open("rb") as f:
            image = Image.open(f)

            if image.format != "JPEG" and image.mode != "RBG":
                image = image.convert("RGB")

            width, height = image.size
            if width > height:
                logger.info("[splitting] %s", image_path)
                half = int(width / 2)
                with (self.dir_name / self.page_name).open("wb") as f:
                    right = image.crop((half, 0, width, height))
                    right.save(f)
                with (self.dir_name / self.page_name).open("wb") as f:
                    left = image.crop((0, 0, half, height))
                    left.save(f)
            else:
                logger.info("[not split] %s", image_path)
                with (self.dir_name / self.page_name).open("wb") as f:
                    image.save(f)




def main():
    ARGS = argparse.ArgumentParser()
    ARGS.add_argument("dirs", nargs="+")
    args = ARGS.parse_args()

    for d in args.dirs:
        ImageSplit(d).start()




if __name__ == "__main__":
    main()
