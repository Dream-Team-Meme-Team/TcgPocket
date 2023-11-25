import os
import torch
from PIL import Image
# import numpy as np
# import cv2
from io import BytesIO
import torchvision.transforms as transform
from cnn.model_ev.card_classifier_ev import CardClassifier
from reader.reader_classifier import reader_classifier

def all_of_it(raw_img: bytes):
  # convert to PIL Image
  raw_img = Image.open(BytesIO(raw_img))

  # loading up model
  card_classify = CardClassifier()
  card_classify.load_state_dict(torch.load(os.path.join(os.path.dirname(__file__), 'cnn/model_ev/model_e_v2.pt')))
  card_classify.eval()
  from_PIL = transform.Compose([transform.PILToTensor()])     # transformer

  # convert RGBA to RGB and resize to proper dimensions
  img = raw_img.convert('RGB').resize((421, 614)) 

  # convert to pytorch tensor (via PIL Image) and normalize
  tensor = from_PIL(img).to(torch.float32)
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

# TODO: to be removed
with open('TcgPocket/datascience/data/collected/card7.jpg', "rb") as image:
  f = image.read()
  b = bytearray(f)
  print(all_of_it(b))
#
