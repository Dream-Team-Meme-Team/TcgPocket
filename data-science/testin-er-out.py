import torch
import requests
from PIL import Image
import numpy as np
import cv2
from io import BytesIO
import torchvision.transforms as transform
from apiKeys import IDK_API_KEY
from cnn.card_classifier import CardClassifier
from torch.utils.data import DataLoader

card_classify = CardClassifier()
card_classify.load_state_dict(torch.load('data-science/cnn/model_a_v1.pt'))
card_classify.eval()

from_PIL = transform.Compose([transform.PILToTensor()]) 

# # get and load up card from URL
# resp = requests.get('https://images.ygoprodeck.com/images/cards/88204302.jpg', headers = {'X-Api-Key': IDK_API_KEY, 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36'})
# img = np.array(Image.open(BytesIO(resp.content)))

# get and load up card from file
img = np.array(Image.open('data-science/data/card.jpg'))

# rearrange color channels >>> RGBA to BGR, RGB to BGR, etc...
if img.shape[2] == 4:
    img = cv2.resize(cv2.cvtColor(img, cv2.COLOR_BGRA2BGR), [421, 614])
else:
    img = cv2.resize(cv2.cvtColor(img, cv2.COLOR_RGB2BGR), [421, 614])

# convert to pytorch tensor (via PIL Image) and normalize
tensor = from_PIL(Image.fromarray(np.uint8(img))).to(torch.float32)
card = tensor / torch.max(tensor)
card = card.unsqueeze(0)
print(card.shape)

print(torch.argmax(card_classify(card))) # may need to change with model_e