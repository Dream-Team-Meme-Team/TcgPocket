# IMPORTS
import torch
from torch.utils.data import DataLoader
from cnn.card_dataset import CardDataSet
from cnn.card_classifier_a import CardClassifier
import torch.nn as nn

# IMPORTANT VARS FOR TRAINING
batch_size = 15
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
train_dataloader = DataLoader(train_dataset, shuffle=False, batch_size=batch_size)

test_dataset = CardDataSet(csv_file='data-science/data/test/data.txt')
test_dataloader = DataLoader(test_dataset, shuffle=False, batch_size=batch_size)

# HYPER PARAMS
model = CardClassifier().to(device)     # cnn
loss_fn = nn.CrossEntropyLoss()     # loss function
optimizer = torch.optim.Adam(model.parameters(), lr=learning_rate) # adam optimizer

# TRAIN & TEST FUNCTION
def train(dataloader, model, loss_fn, optimizer):
    size = len(dataloader.dataset)
    model.train()

    for batch, (X, y) in enumerate(dataloader):
        X, y = X.to(device), y.to(device)

        # Compute prediction error
        pred = model(X)
        loss = loss_fn(pred, y)

        # Backpropagation
        loss.backward()
        optimizer.step()
        optimizer.zero_grad()

        if batch % 100 == 0:
            loss, current = loss.item(), (batch + 1) * len(X)
            print(f"loss: {loss:>7f}  [{current:>5d}/{size:>5d}]")
        #
    #
#

def test(dataloader, model, loss_fn):
    size = len(dataloader.dataset)
    num_batches = len(dataloader)
    model.eval()
    test_loss, correct = 0, 0

    with torch.no_grad():
        for X, y in dataloader:
            X, y = X.to(device), y.to(device)
            pred = model(X)
            test_loss += loss_fn(pred, y).item()
            correct += (pred.argmax(1) == y).type(torch.float).sum().item()

    test_loss /= num_batches
    correct /= size
    print(f"Test Error: \n Accuracy: {(100*correct):>0.1f}%, Avg loss: {test_loss:>8f} \n")

# TRAIN MODEL
for e in range(num_epochs):
    print(f'Epoch {e+1} ----------------------------------------------------------')
    train(train_dataloader, model, loss_fn, optimizer)
    test(test_dataloader, model, loss_fn)
    torch.save(model.state_dict(), 'data-science/cnn/model_a_v1.pt')
    print("Saved Tenative PyTorch Model State")

print('All Done, you can cry over the accuracy now 	。゜゜(´Ｏ`) ゜゜。')

# SAVE MODEL
torch.save(model.state_dict(), 'data-science/cnn/model_a_v1.pt')
print("Saved Final PyTorch Model State")
