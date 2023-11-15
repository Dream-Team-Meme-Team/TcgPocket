###############################################
""" 
Generates the initial raw data sets for EV: Retro Mgc (0), Mod Mgc (1), Ygo (2), Left Pkm (3), Right Pkm (4) 
https://github.com/PokemonTCG/pokemon-tcg-sdk-python
https://docs.pokemontcg.io/api-reference/cards/search-cards          
"""
###############################################

# %%
import json
import requests
import pandas as pd

# %%
retro_mgc_df = pd.DataFrame(columns = ['card', 'label'])

resp = requests.get('https://api.scryfall.com/cards/search?q=frame:old')

while json.loads(resp.content)['has_more'] == True:
    retro_mgc_df = retro_mgc_df.append([{'card': card['image_uris']['normal'], 'label': 0} for card in json.loads(resp.content)['data']])
    resp = requests.get(json.loads(resp.content)['next_page'])

retro_mgc_df.to_csv('C:/Users/abbyo/Documents/PROJECTS/TcgPocket/TcgPocket/datascience/data/ev-sets/raw-data/mgc_retro.csv', index=False)

# %%
modern_mgc_df = pd.DataFrame(columns = ['card', 'label'])

resp = requests.get('https://api.scryfall.com/cards/search?q=frame:new')

while json.loads(resp.content)['has_more'] == True:
    rows = []
    for card in json.loads(resp.content)['data']:
        try: 
            rows.append({'card': card['image_uris']['normal'], 'label': 1}) 
        except:
            pass
        #
    #
    modern_mgc_df = modern_mgc_df.append(rows)
    resp = requests.get(json.loads(resp.content)['next_page'])
#

modern_mgc_df.to_csv('C:/Users/abbyo/Documents/PROJECTS/TcgPocket/TcgPocket/datascience/data/ev-sets/raw-data/mgc_mod.csv', index=False)

# %%
ygo = pd.read_csv('C:/Users/abbyo/Documents/PROJECTS/TcgPocket/TcgPocket/datascience/data/ev-sets/raw-data/ygo.csv')
ygo = ygo.replace(1, 2)
ygo.to_csv('C:/Users/abbyo/Documents/PROJECTS/TcgPocket/TcgPocket/datascience/data/ev-sets/raw-data/ygo.csv', index=False)

# %%
left_pkm_set_list = ['https://api.pokemontcg.io/v2/cards?q=set.name:%22Fusion%20Strike%22', 
                     'https://api.pokemontcg.io/v2/cards?q=set.name:%22Paldea%20Evolved%22', 
                     'https://api.pokemontcg.io/v2/cards?q=set.name:%22Cosmic%20Eclipse%22',
                     'https://api.pokemontcg.io/v2/cards?q=set.name:%22Paradox%20Rift%22',
                     'https://api.pokemontcg.io/v2/cards?q=set.name:%22Unified%20Minds%22',
                     'https://api.pokemontcg.io/v2/cards?q=set.name:%22Lost%20Origin%22',
                     'https://api.pokemontcg.io/v2/cards?q=set.name:%22Chilling%20Reign%22',
                     'https://api.pokemontcg.io/v2/cards?q=set.name:%22Darkness%20Ablaze%22',
                     'https://api.pokemontcg.io/v2/cards?q=set.name:%22Lost%20Thunder%22',
                     'https://api.pokemontcg.io/v2/cards?q=set.name:%22Evolving%20Skies%22',
                     'https://api.pokemontcg.io/v2/cards?q=set.name:%22Unbroken%20Bonds%22',
                     'https://api.pokemontcg.io/v2/cards?q=set.name:%22Obsidian%20Flames%22',
                     'https://api.pokemontcg.io/v2/cards?q=set.name:%22Astral%20Radiance%22',
                     'https://api.pokemontcg.io/v2/cards?q=set.name:%22Rebel%20Clash%22',
                     'https://api.pokemontcg.io/v2/cards?q=set.name:%22Silver%20Tempest%22',
                     'https://api.pokemontcg.io/v2/cards?q=set.name:%22Vivid%20Voltage%22',
                     'https://api.pokemontcg.io/v2/cards?q=set.name:%22Darkness%20Ablaze%22',
                     'https://api.pokemontcg.io/v2/cards?q=set.name:%22Guardians%20Rising%22',
                     'https://api.pokemontcg.io/v2/cards?q=set.name:%22Battle%20Styles%22',
                     'https://api.pokemontcg.io/v2/cards?q=set.name:%22Brilliant%20Stars%22',
                     'https://api.pokemontcg.io/v2/cards?q=set.name:%22Breakthrough%22',
                     'https://api.pokemontcg.io/v2/cards?q=set.name:%22Celestial%20Storm%22',
                     'https://api.pokemontcg.io/v2/cards?q=set.name:%22Crown%20Zenith%22']

left_pkm_df = pd.DataFrame(columns = ['card', 'label'])

for set in left_pkm_set_list:
    
    resp = requests.get(set, headers = {'X-Api-Key': '7ccb4c32-6299-4533-bf47-36f4d2a95117', 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36'})

    for card in json.loads(resp.content)['data']:
        rows = []
        try:
            rows.append({'card': card['images']['large'], 'label': 3}) 
        except:
            pass
        #
        left_pkm_df = left_pkm_df.append(rows)
    #
    print(len(left_pkm_df))
#

# %% CLASSIF PKM SETS LEFT
for num in [1, 3, 4, 5]:
    f = list(open(f'C:/Users/abbyo/Documents/PROJECTS/TcgPocket/TcgPocket/datascience/data/ev-sets/to-be-classif/{num}/classif_{num}.txt'))
    f = list(map(lambda x:x.strip(), f))
    print(f)

    df = pd.read_csv(f'C:/Users/abbyo/Documents/PROJECTS/TcgPocket/TcgPocket/datascience/data/ev-sets/to-be-classif/{num}/pkm_unclassif_{num}.csv')
    df['label'] = f
    left_pkm_df = pd.concat([df.loc[df['label'] == '0'], left_pkm_df], axis=0)
#

display(left_pkm_df)

# %%
left_pkm_df = left_pkm_df.replace('0','3')
left_pkm_df.to_csv('C:/Users/abbyo/Documents/PROJECTS/TcgPocket/TcgPocket/datascience/data/ev-sets/raw-data/left_pkm.csv', index=False)

# %% CLASSIF PKM SETS RIGHT
right_pkm_df = pd.DataFrame(columns = ['card', 'label'])

for num in [1, 3, 4, 5]:
    f = list(open(f'C:/Users/abbyo/Documents/PROJECTS/TcgPocket/TcgPocket/datascience/data/ev-sets/to-be-classif/{num}/classif_{num}.txt'))
    f = list(map(lambda x:x.strip(), f))
    print(f)

    df = pd.read_csv(f'C:/Users/abbyo/Documents/PROJECTS/TcgPocket/TcgPocket/datascience/data/ev-sets/to-be-classif/{num}/pkm_unclassif_{num}.csv')
    df['label'] = f
    right_pkm_df = pd.concat([df.loc[df['label'] == '1'], right_pkm_df], axis=0)
#

display(right_pkm_df)

# %%
right_pkm_set_list = ['https://api.pokemontcg.io/v2/cards?q=set.name:%22Fossil%22',
                      'https://api.pokemontcg.io/v2/cards?q=set.name:%22Neo%20Revelation%22',
                      'https://api.pokemontcg.io/v2/cards?q=set.name:%22Jungle%22',
                      'https://api.pokemontcg.io/v2/cards?q=set.name:%22Neo%20Discovery%22',
                      'https://api.pokemontcg.io/v2/cards?q=set.name:%22Team%20Rocket%22',
                      'https://api.pokemontcg.io/v2/cards?q=set.name:%22Undaunted%22',
                      'https://api.pokemontcg.io/v2/cards?q=set.name:%22Legend%20Maker%22',
                      'https://api.pokemontcg.io/v2/cards?q=set.name:%22Unleashed%22',
                      'https://api.pokemontcg.io/v2/cards?q=set.name:%22Team%20Magma%20vs%20Team%20Aqua%22',
                      'https://api.pokemontcg.io/v2/cards?q=set.name:%22Dragon%20Frontiers%22',
                      'https://api.pokemontcg.io/v2/cards?q=set.name:%22Crystal%20Guardians%22',
                      'https://api.pokemontcg.io/v2/cards?q=set.name:%22Sandstorm%22',
                      'https://api.pokemontcg.io/v2/cards?q=set.name:%22Majestic%20Dawn%22',
                      'https://api.pokemontcg.io/v2/cards?q=set.name:%22Hidden%20Legends%22',
                      'https://api.pokemontcg.io/v2/cards?q=set.name:%22Triumphant%22',
                      'https://api.pokemontcg.io/v2/cards?q=set.name:%22Great%20Encounters%22',
                      'https://api.pokemontcg.io/v2/cards?q=set.name:%22Call%20of%20Legends%22',
                      'https://api.pokemontcg.io/v2/cards?q=set.name:%22Stormfront%22',
                      'https://api.pokemontcg.io/v2/cards?q=set.name:%22Base%20Set%22',
                      'https://api.pokemontcg.io/v2/cards?q=set.name:%22Power%20Keepers%22']

for set in right_pkm_set_list:
    
    resp = requests.get(set, headers = {'X-Api-Key': '7ccb4c32-6299-4533-bf47-36f4d2a95117', 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36'})

    for card in json.loads(resp.content)['data']:
        rows = []
        try:
            rows.append({'card': card['images']['large'], 'label': 4}) 
        except:
            pass
        #
        right_pkm_df = right_pkm_df.append(rows)
    #
    print(len(right_pkm_df))
#

# %%
right_pkm_df = right_pkm_df.replace('1','4')
right_pkm_df.to_csv('C:/Users/abbyo/Documents/PROJECTS/TcgPocket/TcgPocket/datascience/data/ev-sets/raw-data/right_pkm.csv', index=False)
