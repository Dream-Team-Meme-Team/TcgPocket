import os
import torch
from PIL import Image
import numpy as np
import cv2
from io import BytesIO
import torchvision.transforms as transform
from cnn.model_av.card_classifier_a import CardClassifier
from reader.reader_classifier import reader_classifier

def all_of_it(raw_img: bytes):
    # convert to PIL Image
    raw_img = Image.open(BytesIO(raw_img))

    # loading up model
    card_classify = CardClassifier()
    card_classify.load_state_dict(torch.load(os.path.join(os.path.dirname(__file__), 'cnn/model_av/model_a_v2.pt')))
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
    reader = reader_classifier(classif)
    filt = reader.apply_filter(raw_img)
    read = reader.read_card(filt)

    return reader.gen_query(read), classif
#
