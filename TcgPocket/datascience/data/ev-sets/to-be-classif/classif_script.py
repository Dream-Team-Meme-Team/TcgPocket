""" 
Run the following command if first time using: pip install -r requirements.txt
Run this script to start classifing pokemon cards and follow the instructions
"""

import pandas as pd
import requests
from apiKeys import IDK_API_KEY
from PIL import Image
from io import BytesIO

my_file = 3     # change this to be the your number

df = pd.read_csv(f'TcgPocket/datascience/data/ev-sets/to-be-classif/{my_file}/pkm_unclassif_{my_file}.csv')
classif_f = open(f'TcgPocket/datascience/data/ev-sets/to-be-classif/{my_file}/classif_{my_file}.txt', 'a')

for idx, row in df.iterrows():
    resp = requests.get(row['card'], headers = {'X-Api-Key': IDK_API_KEY, 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36'})
    img = Image.open(BytesIO(resp.content))
    img.show()
    classif = input('Enter 0 for left, 1 for right, or N for neither: ')
    classif_f.write(classif + '\n')
#
