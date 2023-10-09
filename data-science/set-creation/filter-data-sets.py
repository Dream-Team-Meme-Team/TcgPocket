###################################
''' FILTERS UNACCESSABLE IMGS IN TEST AND TRAIN SETS'''
###################################


# %% IMPORTS
from torch.utils.data import Dataset
import pandas as pd
import torch
import requests
import numpy as np
from PIL import Image
import cv2 
from io import BytesIO
import torchvision.transforms as transform

# %% LOAD CSV - TRAIN
train_df = pd.read_csv('C:/Users/abbyo/Documents/PROJECTS/TcgPocket/data-science/data/train/data.txt')
display(train_df)

# %% START WEEDING THEM OUT
from_PIL = transform.Compose([transform.PILToTensor()]) 
bad_indx = []

for indx in range(len(train_df)):
    print(f'{indx}/{len(train_df)}')
    if train_df.iloc[indx, 1] == 2:
        try:
            # get and load up card from URL
            resp = requests.get(train_df.iloc[indx, 0], headers = {'X-Api-Key': '7ccb4c32-6299-4533-bf47-36f4d2a95117', 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36'})
            img = np.array(Image.open(BytesIO(resp.content)))

            # rearrange color channels >>> RGBA to BGR, RGB to BGR, etc...
            if img.shape[2] == 4:
                img = cv2.resize(cv2.cvtColor(img, cv2.COLOR_BGRA2BGR), [421, 614])
            else:
                img = cv2.resize(cv2.cvtColor(img, cv2.COLOR_RGB2BGR), [421, 614])
            
            # convert to pytorch tensor (via PIL Image) and normalize
            tensor = from_PIL(Image.fromarray(np.uint8(img))).to(torch.float32)
            data = [(tensor / torch.max(tensor)), train_df.iloc[indx, 1]]
        #
        except:
            print('Exception Occurred')
            bad_indx.append(indx)
        #
#

# %% DELETE 'EM
train_df = train_df.drop(index=bad_indx)
print(len(train_df))

# %% OVERWRITE 'EM
train_df.to_csv('C:/Users/abbyo/Documents/PROJECTS/TcgPocket/data-science/data/train/data.txt', index=False)

# %% LOAD CSV - TEST
test_df = pd.read_csv('C:/Users/abbyo/Documents/PROJECTS/TcgPocket/data-science/data/test/data.txt')
display(test_df)

# %% START WEEDING THEM OUT
from_PIL = transform.Compose([transform.PILToTensor()]) 
bad_indx_2 = []

for indx in range(len(test_df)):
    print(f'{indx}/{len(test_df)}')
    if test_df.iloc[indx, 1] == 2:
        try:
            # get and load up card from URL
            resp = requests.get(test_df.iloc[indx, 0], headers = {'X-Api-Key': '''hidden''', 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36'})
            img = np.array(Image.open(BytesIO(resp.content)))

            # rearrange color channels >>> RGBA to BGR, RGB to BGR, etc...
            if img.shape[2] == 4:
                img = cv2.resize(cv2.cvtColor(img, cv2.COLOR_BGRA2BGR), [421, 614])
            else:
                img = cv2.resize(cv2.cvtColor(img, cv2.COLOR_RGB2BGR), [421, 614])
            
            # convert to pytorch tensor (via PIL Image) and normalize
            tensor = from_PIL(Image.fromarray(np.uint8(img))).to(torch.float32)
            data = [(tensor / torch.max(tensor)), test_df.iloc[indx, 1]]
        #
        except:
            print('Exception Occurred')
            bad_indx_2.append(indx)
        #
#

# %% DELETE 'EM
test_df = test_df.drop(index=bad_indx_2)
print(len(test_df))

# %% OVERWRITE 'EM
test_df.to_csv('C:/Users/abbyo/Documents/PROJECTS/TcgPocket/data-science/data/test/data.txt', index=False)