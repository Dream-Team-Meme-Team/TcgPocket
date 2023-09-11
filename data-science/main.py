#%% IMPORTS
import cv2
# import requests
# from PIL import Image
import urllib
import numpy as np
import pandas as pd

# %% SHOW CARDS
req = urllib.request.urlopen('https://cards.scryfall.io/normal/front/0/3/03f4341c-088b-4f35-b82b-3d98d8a93de4.jpg?1576382166')
arr = np.asarray(bytearray(req.read()), dtype=np.uint8)
img = cv2.imdecode(arr, -1) # 'Load it as it is'
cv2.imshow('card', img)
cv2.waitKey(0)

# %%
print(img.shape)
img_rsz = cv2.resize(img, [600,400])
cv2.imshow('card', img_rsz)
cv2.waitKey(0)

# %% 
test_data = pd.read_csv('C:/Users/abbyo/Documents/PROJECTS/TcgPocket/data-science/data/test/data.txt')
display(test_data)

# %%
req = urllib.request.urlopen('https://images.pokemontcg.io/swsh8/240_hires.png')
arr = np.asarray(bytearray(req.read()), dtype=np.uint8)
img = cv2.imdecode(arr, -1) # 'Load it as it is'
cv2.imshow('card', img)
cv2.waitKey(0)
