import os
import torch
from PIL import Image
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

  # cast to mgc(0), ygo(1), or pkm(2) for devs
  if classif == 0 or classif == 1:
    return reader.gen_query(read), 0, classif
  elif classif == 2:
    return reader.gen_query(read), 1, classif
  elif classif == 3 or classif == 4:
    return reader.gen_query(read), 2, classif
  #
#
