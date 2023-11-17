'''
INPUT (IMG)

CONV + ACTIV (ReLU)
POOLING

CONV + ACTIV (ReLU)
POOLING

FLATTEN
FC

OUTPUT (SOFTMAX)
'''

import torch.nn as nn
import torch.nn.functional as F

class CardClassifier(nn.Module):

    def __init__(self):
        super(CardClassifier, self).__init__()
        
        self.conv1 = nn.Sequential(
            nn.Conv2d(in_channels=3, out_channels=32, kernel_size=(3,3), stride = 3, padding=0),
            nn.ReLU(),
            nn.MaxPool2d((3,3), stride = 3)
        )
        
        self.conv2 = nn.Sequential(
            nn.Conv2d(in_channels=32, out_channels=16, kernel_size=(3,3), stride = 3, padding=0),
            nn.ReLU(),
            nn.MaxPool2d((3,3), stride = 3)
        )

        self.fc1 = nn.Sequential(
            nn.Flatten(),
            nn.Linear(in_features=16*5*7, out_features=5),
            nn.Softmax(dim=1)
        )
    #

    def forward(self, x): 
        x = self.conv1(x)
        x = self.conv2(x)
        x = self.fc1(x)
        return x
    #
#
