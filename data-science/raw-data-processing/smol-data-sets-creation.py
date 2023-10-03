import pandas as pd

train_df = pd.read_csv('data-science/data/train/data.txt')[:3000]
mgc_trn = 0
ygo_trn = 0
pkm_trn = 0
for value in train_df.iloc[:, 1].values:
    if value == 0:
        mgc_trn += 1
    elif value == 1:
        ygo_trn += 1
    elif value == 2:
        pkm_trn += 1
print(f'TRAIN SET \n_trn cnt: {mgc_trn}      ygo cnt: {ygo_trn}      pkm cnt: {pkm_trn}')

test_df = pd.read_csv('data-science/data/test/data.txt')[:3000]
mgc_tst = 0
ygo_tst = 0
pkm_tst = 0
for value in test_df.iloc[:, 1].values:
    if value == 0:
        mgc_tst += 1
    elif value == 1:
        ygo_tst += 1
    elif value == 2:
        pkm_tst += 1
print(f'TEST SET \nmgc cnt: {mgc_tst}      ygo cnt: {ygo_tst}      pkm cnt: {pkm_tst}')
