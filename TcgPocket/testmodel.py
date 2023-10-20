import base64
from sys import argv
import datascience.main as av

card = 'datascience/1.jpg'

if __name__ == '__main__':
    try:
        with open(card, "rb") as image_file:
            json = av.all_of_it(bytearray(image_file.read()))
            print(json)

    except Exception as e:
        print(e)
