import requests
from bs4 import BeautifulSoup as bs


def price_scraper(game: str):
    set_link = 'https://www.pricecharting.com/category/' + game + '-cards'
    base = 'https://www.pricecharting.com'

    set_resp = bs(requests.get(set_link).content, 'html.parser')
    sets = set_resp.find('table', id='games_table').tbody.find_all('td', class_='title')
    print(sets)
#

price_scraper('magic')
