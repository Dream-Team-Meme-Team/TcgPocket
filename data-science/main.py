# IMPORTS
import cv2
import requests
import numpy as np
import pandas as pd

''' JUST IN CASE '''
# req = urllib.request.Request(url = 'https://images.pokemontcg.io/mcd18/5_hires.png', headers = {'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36'})
# resp = urllib.request.urlopen(req)

# LOAD IN TRAINING DATA
train_data = pd.read_csv('C:/Users/abbyo/Documents/PROJECTS/TcgPocket/data-science/data/train/data.txt')
print(train_data)

# GET IMGS
data = []
for indx, item in train_data.iterrows():
    print(item.card)
    resp = requests.get(item.card, headers = {'X-Api-Key': '7ccb4c32-6299-4533-bf47-36f4d2a95117', 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36'})
    arr = np.asarray(bytearray(resp.content), dtype=np.uint8)
    img = cv2.imdecode(arr, -1)
    data.append(img)
print(len(data))

# DISPLAY A FEW
cv2.imshow('card', data[3])
cv2.waitKey(0)

# RESIZE
img_rsz = cv2.resize(data[3], [421,614])      # smallest card (ygo) size 
cv2.imshow('card', img_rsz)
cv2.waitKey(0)
