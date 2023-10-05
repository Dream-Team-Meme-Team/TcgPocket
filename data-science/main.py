import requests
from PIL import Image
from io import BytesIO
from cnn.apiKeys import IDK_API_KEY
import torchvision.transforms as transform
import numpy as np
import pytesseract as tess
import cv2
import os

from scraper.magic_scraper import MagicScraper
from scraper.yugioh_scraper import YugiohScraper
from scraper.pokemon_scraper import PokemonScraper

from_PIL = transform.Compose([transform.PILToTensor()]) 

"""MAGIC"""
# # get and load up card from URL
# resp_mgc = requests.get('https://cards.scryfall.io/normal/front/e/5/e5594689-0f32-4592-859b-c746f3464fc6.jpg?1573509272', headers = {'X-Api-Key': IDK_API_KEY, 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36'})
# img_mgc_raw = Image.open(BytesIO(resp_mgc.content))
# img_mgc_raw.show()

# # img_mgc_raw = Image.open('data-science/data/collected/card.jpg')      # from directory

# mgc_scrape = MagicScraper()
# filt = mgc_scrape.apply_filter(img_mgc_raw)
# print(mgc_scrape.read_card(filt))


"""YUGIOH"""
# # get and load up ygo card from URL
# resp_ygo = requests.get('https://images.ygoprodeck.com/images/cards/40155554.jpg', headers = {'X-Api-Key': IDK_API_KEY, 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36'})
# img_ygo_raw = Image.open(BytesIO(resp_ygo.content))
# img_ygo_raw.show()

# # img_ygo_raw = Image.open('data-science/data/collected/card2.jpg')     # from directory

# ygo_scrape = YugiohScraper()
# filt = ygo_scrape.apply_filter(img_ygo_raw)
# print(ygo_scrape.read_card(filt))


"""POKEMON"""
# get and load up card from URL
resp_pkm = requests.get('https://images.pokemontcg.io/bw9/11_hires.png', headers = {'X-Api-Key': IDK_API_KEY, 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36'})
img_pkm_raw = Image.open(BytesIO(resp_pkm.content))
# img_pkm_raw.show()

pkm_scrape = PokemonScraper()
filt = pkm_scrape.apply_filter(img_pkm_raw)
print(pkm_scrape.read_card(filt))
