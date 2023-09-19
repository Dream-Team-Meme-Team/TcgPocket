# IMPORTS
import torch
from torch.utils.data import DataLoader
from cnn.card_dataset import CardDataSet

# IMPORTANT VARS FOR TRAINING
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

# LOAD IN DATA SETS
train_dataset = CardDataSet(csv_file='data-science/data/train/data.txt')
train_dataset_ld = DataLoader(train_dataset, shuffle=False, batch_size=batch_size)

it = iter(train_dataset_ld)

train_d1, train_l1 = next(it)
print(train_d1, train_l1, '\n\n\n')

train_d2, train_l2 = next(it)
print(train_d2, train_l2)
