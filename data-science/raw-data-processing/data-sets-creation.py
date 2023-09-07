# %% IMPORTS
import pandas as pd
import copy

import cv2
import requests
from PIL import Image
import urllib
import numpy as np

# %% DF INIT
mgc_df = pd.read_csv('C:/Users/abbyo/Documents/PROJECTS/TcgPocket/data-science/data/raw-data/mgc.csv').sample(frac=1).reset_index(drop=True)
ygo_df = pd.read_csv('C:/Users/abbyo/Documents/PROJECTS/TcgPocket/data-science/data/raw-data/ygo.csv').sample(frac=1).reset_index(drop=True)
pkm_df = pd.read_csv('C:/Users/abbyo/Documents/PROJECTS/TcgPocket/data-science/data/raw-data/pkm.csv').sample(frac=1).reset_index(drop=True)

print(f'Magic Records: {len(mgc_df)}        Yugioh Records: {len(ygo_df)}       Pokemon Records: {len(pkm_df)}')

#%% TRAIN DF
train_df = copy.deepcopy(mgc_df.sample(n = 6000)) # deep copy of rndm samples from mgc df
mgc_df = mgc_df.drop(train_df.index[:6000]) # rmv rndm samples from mgc df to prevent reusage in test dataset

train_df = pd.concat([train_df, copy.deepcopy(ygo_df.sample(n = 6000))])
ygo_df = ygo_df.drop(train_df.index[6000:])

train_df = pd.concat([train_df, copy.deepcopy(pkm_df.sample(n = 6000))])
pkm_df = pkm_df.drop(train_df.index[12000:])

train_df = train_df.sample(frac=1).reset_index(drop=True) # reset indices to be [0: ...] and shuffle
print(train_df)
print(f'\nMagic Records: {len(mgc_df)}        Yugioh Records: {len(ygo_df)}       Pokemon Records: {len(pkm_df)}')

#%% TEST DF
test_df = copy.deepcopy(mgc_df.sample(n = 6000)) # deep copy of rndm samples from mgc df
mgc_df = mgc_df.drop(test_df.index[:6000]) # rmv rndm samples from mgc df to prevent reusage in test dataset

test_df = pd.concat([test_df, copy.deepcopy(ygo_df.sample(n = 6000))])
ygo_df = ygo_df.drop(test_df.index[6000:])

test_df = pd.concat([test_df, copy.deepcopy(pkm_df.sample(n = 6000))])
pkm_df = pkm_df.drop(test_df.index[12000:])

test_df = test_df.sample(frac=1).reset_index(drop=True) # reset indices to be [0: ...] and shuffle
print(test_df)
print(f'\nMagic Records: {len(mgc_df)}        Yugioh Records: {len(ygo_df)}       Pokemon Records: {len(pkm_df)}')

#%% WRITE TO .TXT FILE
train_df.to_csv('C:/Users/abbyo/Documents/PROJECTS/TcgPocket/data-science/data/train/data.txt', index=False)
test_df.to_csv('C:/Users/abbyo/Documents/PROJECTS/TcgPocket/data-science/data/test/data.txt', index=False)

# %% SHOW CARDS
# req = urllib.request.urlopen('https://cards.scryfall.io/normal/front/0/3/03f4341c-088b-4f35-b82b-3d98d8a93de4.jpg?1576382166')
# arr = np.asarray(bytearray(req.read()), dtype=np.uint8)
# img = cv2.imdecode(arr, -1) # 'Load it as it is'
# cv2.imshow('card', img)
# cv2.waitKey(0)