# %%
from apiKeys import IDK_API_KEY
from PIL import Image
import requests
from io import BytesIO
import numpy as np
from numpy import random as rndm

# %% 
resp = requests.get('https://images.pokemontcg.io/swsh6/233_hires.png', headers = {'X-Api-Key': IDK_API_KEY, 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36'})
card = Image.open(BytesIO(resp.content))
# card.show()

# %%
print(np.array(card).shape)
card = card.convert('RGB').resize((421, 614))   # it works!
card.show()
print(np.array(card).shape)

# %%
# noise = rndm.normal(0, rndm.randint(30), np.array(card).shape) 
# card += noise
# im = Image.fromarray((card).astype(np.uint8))
# im.show()

img = Image.fromarray((card + np.random.normal(0, np.random.randint(30), np.array(card).shape)).astype(np.uint8))
img.show()