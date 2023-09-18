####################################
''' FOR REFERENCE '''
####################################

# %% IMPORTS
import pandas as pd
import copy
import requests
from PIL import Image
from io import BytesIO

import torch
import torchvision.transforms as trans

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
