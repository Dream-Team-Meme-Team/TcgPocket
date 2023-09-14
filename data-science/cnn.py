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

        self.layer1 = nn.Sequential(
            nn.Conv3d(),
            F.relu(),
            nn.MaxPool3d()
        )
        
        self.layer2 = nn.Sequential(
            nn.conv3d(),
            F.relu(),
            nn.MaxPool3d(),
            nn.Dropout3d()
        )

        self.layer3 = nn.Sequential(
            nn.Flatten(),
            nn.Linear()     # softmax >> output
        )

    #  def forward(self, x): 



