import pytesseract
pytesseract.pytesseract.tesseract_cmd = r'C:/Program Files/Tesseract-OCR/tesseract.exe'

import torch
import requests
from PIL import Image
import numpy as np
import cv2
from io import BytesIO, BufferedReader
import torchvision.transforms as transform
from cnn.apiKeys import IDK_API_KEY
from cnn.model_av.card_classifier_a import CardClassifier
from scraper.scraper_classifier import scraper_classifier

def all_of_it(raw_img: bytes):
    # convert to PIL Image
    raw_img = Image.open(BytesIO(raw_img))

    # loading up model
    card_classify = CardClassifier()
    card_classify.load_state_dict(torch.load('./cnn/model_av/model_a_v2.pt'))
    card_classify.eval()
    from_PIL = transform.Compose([transform.PILToTensor()])     # transformer

    # arrange color channels appropriately >>> RGBA to BGR, RGB to BGR, etc...
    if np.array(raw_img).shape[2] == 4:
        img = cv2.resize(cv2.cvtColor(np.array(raw_img), cv2.COLOR_BGRA2BGR), [421, 614])
    else:
        img = cv2.resize(cv2.cvtColor(np.array(raw_img), cv2.COLOR_RGB2BGR), [421, 614])

    # convert to pytorch tensor (via PIL Image) and normalize
    tensor = from_PIL(Image.fromarray(np.uint8(img))).to(torch.float32)
    card = tensor / torch.max(tensor)
    card = card.unsqueeze(0)

    # classify
    classif = torch.argmax(card_classify(card)).item()

    # scrape
    scraper = scraper_classifier(classif)
    filt = scraper.apply_filter(raw_img)
    read = scraper.read_card(filt)
    json = scraper.get_json(read)

    return json
#

cards = ['1.jpg']

for card in cards:
    try:
        # resp = requests.get(card, headers = {'X-Api-Key': IDK_API_KEY, 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36'})
        # json = all_of_it(Image.open(BytesIO(resp.content)))
        # json = all_of_it(resp.content)
        with open(card, "rb") as image_file:
            print(1)
            # image = Image.open(image_file)

            print(2)
            byte_array = bytearray(image_file.read())
            
            print(3)
            json = all_of_it(byte_array)

            print(json, '\n\n')

    except Exception as e:
        # print('Could not be found.\n\n')
        print(e)