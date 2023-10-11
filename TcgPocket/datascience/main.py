import pytesseract
pytesseract.pytesseract.tesseract_cmd = r'C:/Program Files/Tesseract-OCR/tesseract.exe'

import os
import base64
import torch
from PIL import Image
import numpy as np
import cv2
from io import BytesIO
import torchvision.transforms as transform
from .cnn.model_av.card_classifier_a import CardClassifier
from .scraper.scraper_classifier import scraper_classifier
from sys import argv


def all_of_it(raw_img: bytes):
    # convert to PIL Image
    raw_img = Image.open(BytesIO(raw_img))

    # loading up model
    model_path = os.path.join(os.path.dirname(__file__), 'cnn/model_av/model_a_v2.pt')
    card_classify = CardClassifier()
    card_classify.load_state_dict(torch.load(model_path))
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

if __name__ == '__main__':
    byte_array = bytearray(base64.b64decode(argv[1]))
    all_of_it(byte_array)