import base64
from sys import argv
import datascience.main as jessie

card = 'datascience/1.jpg'

if __name__ == '__main__':
    try:
        with open(card, "rb") as image_file:
            byte_array = bytearray(image_file.read())
            byte_string = base64.b64encode(byte_array).decode('utf-8')
            byte_array = bytearray(base64.b64decode(byte_string))
            json = jessie.all_of_it(byte_array)

            print(json, '\n\n')

    except Exception as e:
        print(e)