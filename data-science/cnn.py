'''
INPUT (IMG)

CONV + ACTIV (ReLU)
POOLING

CONV + ACTIV (ReLU)
POOLING

DROPOUT + FLATTEN
FC

OUTPUT (SOFTMAX)
'''

import torch
import torch.nn as nn
import torch.nn.functional as F

class CardClassifier(torch.nn.module):

    def __init__(self):
        super(CardClassifier, self).__init__()

        self.conv1 = nn.Conv3d()        # activ
        self.pool1 = nn.MaxPool3d()

        self.conv2 = nn.Conv3d()        # activ
        self.pool2 = nn.MaxPool3d()

        self.dropout = nn.Dropout3d()       # flatten
        self.fc = nn.Linear()       # softmax >> output

    #  def forward(self, x): 



