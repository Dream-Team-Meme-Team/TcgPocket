# %% IMPORTS
import requests
from PIL import Image
from io import BytesIO
import pandas as pd
import cv2
import numpy as np

import torch
import torchvision.transforms as transform

# %% IMPORTANT VARS FOR TRAINING
batch_size = 40
num_classes = 3 # 0 mgc, 1 ygo, 2 pkm
learning_rate = 0.001
num_epochs = 10

device = (
    "cuda"
    if torch.cuda.is_available()
    # else "mps"
    # if torch.backends.mps.is_available()
    else "cpu"
)
print(f'Using {device} device')

# %% FUNCTIONS
from_PIL = transform.Compose([transform.PILToTensor()]) 

def get_cards(df: pd.DataFrame(), num: int):
    print("Card Images Loading... (0/1)")

    data = []
    for indx in range(num):
        print(indx)
        try:
            # get and load up card from URL
            resp = requests.get(df.iloc[indx, 0], headers = {'X-Api-Key': '7ccb4c32-6299-4533-bf47-36f4d2a95117', 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36'})
            img = np.array(Image.open(BytesIO(resp.content)))

            # rearrange color channels >>> RGBA to BGR, RGB to BGR, etc...
            if img.shape[2] == 4:
                img = cv2.resize(cv2.cvtColor(img, cv2.COLOR_BGRA2BGR), [421, 614])
            else:
                img = cv2.resize(cv2.cvtColor(img, cv2.COLOR_RGB2BGR), [421, 614])
            
            # convert to pytorch tensor (via PIL Image) and normalize
            tensor = from_PIL(Image.fromarray(np.uint8(img))).to(torch.float32)
            data.append([(tensor / torch.max(tensor)), df.iloc[indx, 1]])
        #
        except:
            pass
        #
    #
    print("Card Images Loaded. (1/1)")
    return data
# get_cards()

# %% GET TRN CARD IMGS
train_df = pd.read_csv('C:/Users/abbyo/Documents/PROJECTS/TcgPocket/data-science/data/train/data.txt')
display(train_df)

train_data = torch.utils.data.DataLoader(get_cards(train_df, 6000), shuffle=False, batch_size=batch_size)
train_d, train_l = next(iter(train_data))
print(train_d, train_l)

# %% GET TST CARD IMGS
test_df = pd.read_csv('C:/Users/abbyo/Documents/PROJECTS/TcgPocket/data-science/data/test/data.txt')
display(test_df)

test_data = torch.utils.data.DataLoader(get_cards(test_df, 3000), shuffle=False, batch_size=batch_size)
test_d, test_l = next(iter(test_data))
print(test_d, test_l)

# %% INIT MODEL, LOSS FN, OPTIMIZER

# %% TRAIN

# %% TEST






# %%
''' JUST IN CASE '''
# req = urllib.request.Request(url = 'https://images.pokemontcg.io/mcd18/5_hires.png', headers = {'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36'})
# resp = urllib.request.urlopen(req)

# # LOAD IN TRAINING DATA
# old_train_data = pd.read_csv('C:/Users/abbyo/Documents/PROJECTS/TcgPocket/data-science/data/train_old/data.txt')
# print(old_train_data)

# labels = old_train_data.iloc[:, 1].values

# # GET IMGS
# print("Card Images Loading... (0/1)")
# data = []
# for indx, item in old_train_data.iterrows():
#     # print(item.card)
#     resp = requests.get(item.card, headers = {'X-Api-Key': '7ccb4c32-6299-4533-bf47-36f4d2a95117', 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36'})
#     img = Image.open(BytesIO(resp.content))
#     data.append(img)
# print("Card Images Loaded. (1/1)")

# # TRANSFORMING IMGS
# preprocess_img = transform.Compose([transform.Resize((421,614)), 
#                                     transform.PILToTensor(), 
#                                     transform.Normalize()])

# # DISPLAY A FEW
# cv2.imshow('card', data[3])
# cv2.waitKey(0)

# # RESIZE
# img_rsz = cv2.resize(data[3], [421,614])      # smallest card (ygo) size 
# cv2.imshow('card', img_rsz)
# cv2.waitKey(0)


