import base64
from sys import argv
import sys
import datascience.main as jessie


if __name__ == '__main__':
    try:
        image_data = sys.stdin.buffer.read()
        byte_array = bytearray(image_data)
        result = jessie.all_of_it(byte_array)
        print(result)
        exit(0)
    except Exception as e:
        print(e)