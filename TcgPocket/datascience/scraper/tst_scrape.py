from yugioh_scraper import YugiohScraper
import requests
from PIL import Image
from io import BytesIO
# import keras_ocr as ko
import easyocr
import cv2

resp = requests.get('https://images.ygoprodeck.com/images/cards/23068051.jpg')
card = Image.open(BytesIO(resp.content))
# card.show()

ygo_scrape = YugiohScraper()
attrbs = ygo_scrape.read_card(ygo_scrape.apply_filter(card))
query = ygo_scrape.gen_query(attrbs)
