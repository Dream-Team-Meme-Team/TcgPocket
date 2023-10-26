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

    def __init__(self, csv_file):
        """
        Args:
            csv_file (str): contains the cards with their labels
        """
        self.df = pd.read_csv(csv_file)[:9000]
    #

    def __len__(self):
        """
        Returns:
           (int) : length of df
        """
        return len(self.df)
    #

    def __getitem__(self, indx):
        """ Loads, Resizes, and Normalizes the card image 

        Args:
            indx (int): the cards index in the df

        Returns:
            data: card image vector
        """
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

        return data
    #
#
