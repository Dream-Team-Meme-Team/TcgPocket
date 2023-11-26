""" 
Run the following command if first time using: pip install -r requirements.txt
Run this script to start classifing pokemon cards and follow the instructions
"""

import pandas as pd
import requests
from PIL import Image
from io import BytesIO
from dotenv import load_dotenv
import os

# Load variables from the .env file
load_dotenv()

pokemon_api_key = os.getenv('POKEMON_API_KEY')

my_file = 7  # change this to be your number
path = os.path.dirname(os.path.abspath(__file__))

df = pd.read_csv(f'{path}/{my_file}/pkm_unclassif_{my_file}.csv')
classif_f = open(f'{path}/{my_file}/classif_{my_file}.txt', 'a')

count = 0
for idx, row in df.iterrows():
    resp = requests.get(row['card'], headers = {'X-Api-Key': pokemon_api_key, 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36'})
    img = Image.open(BytesIO(resp.content))
    img.show()
    classif = input(f'({count}/400) Enter 0 for left, 1 for right, or N for neither: ')
    classif_f.write(classif + '\n')
    count += 1
#
