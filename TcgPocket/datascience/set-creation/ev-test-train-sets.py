###############################################
""" 
Generates the test and train data sets for EV
Retro Mgc (0), Mod Mgc (1), Ygo (2), Left Pkm (3), Right Pkm (4) 
"""
###############################################

# %% IMPORTS
import pandas as pd
import copy

# %% LOADING BASE DATA SETS
mgc_retro = pd.read_csv('C:/Users/abbyo/Documents/PROJECTS/TcgPocket/TcgPocket/datascience/data/ev-sets/raw-data/mgc_retro.csv').sample(frac=1).reset_index(drop=True)
mgc_mod = pd.read_csv('C:/Users/abbyo/Documents/PROJECTS/TcgPocket/TcgPocket/datascience/data/ev-sets/raw-data/mgc_mod.csv').sample(frac=1).reset_index(drop=True)
ygo = pd.read_csv('C:/Users/abbyo/Documents/PROJECTS/TcgPocket/TcgPocket/datascience/data/ev-sets/raw-data/ygo.csv').sample(frac=1).reset_index(drop=True)
pkm_left = pd.read_csv('C:/Users/abbyo/Documents/PROJECTS/TcgPocket/TcgPocket/datascience/data/ev-sets/raw-data/left_pkm.csv').sample(frac=1).reset_index(drop=True)
pkm_right = pd.read_csv('C:/Users/abbyo/Documents/PROJECTS/TcgPocket/TcgPocket/datascience/data/ev-sets/raw-data/right_pkm.csv').sample(frac=1).reset_index(drop=True)

display(mgc_retro, mgc_mod, ygo, pkm_left, pkm_right)
print(f'Mgc Retro {len(mgc_retro)}  Mgc Mod {len(mgc_mod)}  Ygo {len(ygo)}  Left Pkm {len(pkm_left)}    Right Pkm {len(pkm_right)}')


# %% TRAIN DATA SET
train_df = copy.deepcopy(mgc_retro.sample(n = 1500))
mgc_retro = mgc_retro.drop(train_df.index[:1500])

train_df = pd.concat([train_df, copy.deepcopy(mgc_mod.sample(n = 1500))])
mgc_mod = mgc_mod.drop(train_df.index[1500:])

train_df = pd.concat([train_df, copy.deepcopy(ygo.sample(n = 1500))])
ygo = ygo.drop(train_df.index[3000:])

train_df = pd.concat([train_df, copy.deepcopy(pkm_left.sample(n = 1500))])
pkm_left = pkm_left.drop(train_df.index[4500:])

train_df = pd.concat([train_df, copy.deepcopy(pkm_right.sample(n = 1500))])
pkm_right = pkm_right.drop(train_df.index[6000:])

train_df = train_df.sample(frac=1).reset_index(drop=True)
display(train_df)

#%% FIXING YUGIOH BC IT HATES ME
train_df.rename(columns={"label": "label2"}, inplace=True)
train_df = train_df.fillna(2.0).iloc[:, :2].rename(columns = {"label2": "label"}).astype({'label':'int'})
display(train_df)

# %% WRITE IT
train_df.to_csv('C:/Users/abbyo/Documents/PROJECTS/TcgPocket/TcgPocket/datascience/data/ev-sets/train/data.txt', index=False)

# %%
print(f'Mgc Retro {len(mgc_retro)}  Mgc Mod {len(mgc_mod)}  Ygo {len(ygo)}  Left Pkm {len(pkm_left)}    Right Pkm {len(pkm_right)}')

# %% TEST DATA SET
test_df = copy.deepcopy(mgc_retro.sample(n = 1500))
mgc_retro = test_df.drop(test_df.index[:1500])

test_df = pd.concat([test_df, copy.deepcopy(mgc_mod.sample(n = 1500))])
mgc_mod = mgc_mod.drop(test_df.index[1500:])

test_df = pd.concat([test_df, copy.deepcopy(ygo.sample(n = 1500))])
ygo = ygo.drop(test_df.index[3000:])

test_df = pd.concat([test_df, copy.deepcopy(pkm_left.sample(n = 1500))])
pkm_left = pkm_left.drop(test_df.index[4500:])

test_df = pd.concat([test_df, copy.deepcopy(pkm_right.sample(n = 1500))])
pkm_right = pkm_right.drop(test_df.index[6000:])

test_df = test_df.sample(frac=1).reset_index(drop=True)
display(test_df)

#%% FIXING YUGIOH BC IT HATES ME
test_df.rename(columns={"label": "label2"}, inplace=True)
test_df = test_df.fillna(2.0).iloc[:, :2].rename(columns = {"label2": "label"}).astype({'label':'int'})
display(test_df)

# %% WRITE IT
test_df.to_csv('C:/Users/abbyo/Documents/PROJECTS/TcgPocket/TcgPocket/datascience/data/ev-sets/test/data.txt', index=False)

# %%
print(f'Mgc Retro {len(mgc_retro)}  Mgc Mod {len(mgc_mod)}  Ygo {len(ygo)}  Left Pkm {len(pkm_left)}    Right Pkm {len(pkm_right)}')
