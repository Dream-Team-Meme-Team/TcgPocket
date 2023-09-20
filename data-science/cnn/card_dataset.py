from torch.utils.data import Dataset
import pandas as pd
import torch
import requests
import numpy as np
from PIL import Image
import cv2 
from io import BytesIO
import torchvision.transforms as transform
from apiKeys import IDK_API_KEY

from_PIL = transform.Compose([transform.PILToTensor()]) 

class CardDataSet(Dataset):
    """ Card Data Set """

    def __init__(self, csv_file):
        """
        Arguments:
            csv_file (string): Path to the csv file with card img URL and label
            root_dir (string): Directory with the data
            transform (callable, optional): Optional transform to be applied on a sample.
        """
        self.df = pd.read_csv(csv_file)
    #

    def __len__(self):
        return len(self.df)
    #

    def __getitem__(self, indx):
        
        # try:
        # get and load up card from URL
        resp = requests.get(self.df.iloc[indx, 0], headers = {'X-Api-Key': IDK_API_KEY, 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36'})
        img = np.array(Image.open(BytesIO(resp.content)))

        # rearrange color channels >>> RGBA to BGR, RGB to BGR, etc...
        if img.shape[2] == 4:
            img = cv2.resize(cv2.cvtColor(img, cv2.COLOR_BGRA2BGR), [421, 614])
        else:
            img = cv2.resize(cv2.cvtColor(img, cv2.COLOR_RGB2BGR), [421, 614])
        
        # convert to pytorch tensor (via PIL Image) and normalize
        tensor = from_PIL(Image.fromarray(np.uint8(img))).to(torch.float32)
        data = [(tensor / torch.max(tensor)), self.df.iloc[indx, 1]]
        #
        # except:
        #     pass
        # #

        return data
    #
#
