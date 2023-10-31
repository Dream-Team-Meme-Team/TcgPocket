#%% IMPORTS
import requests
from bs4 import BeautifulSoup as bs

# %% FUNCTIONS
base = 'https://www.pricecharting.com'

def get_sets(url: str) -> list:

    resp = requests.get(url, headers = {'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36'})
    soup = bs(resp.content, 'html.parser')
    sets = soup.find('div', class_='home-box all').ul.find_all('li')

    return {set.text.strip('\n'): base + set.a.get('href') for set in sets}
#

def get_cards(url: str):
    resp = requests.get(url, headers = {'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36'})
    soup = bs(resp.content, 'html.parser')
    cards = soup.find('table', id='games_table').tbody.find_all('td', class_='title')

    return {card.text.strip('\n'): base + card.a.get('href') for card in cards}
#

def get_prices(url: str):

    try:
        resp = requests.get(url, headers = {'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36'})
        soup = bs(resp.content, 'html.parser')
        card_dates = soup.find('table', class_='hoverable-rows sortable').tbody.find_all('td', class_='date')
        card_prices = soup.find('table', class_='hoverable-rows sortable').tbody.find_all('td', class_='numeric')
        # print([date.text for date in card_dates], [price.span.text for price in card_prices])
        print([date.text for date in card_dates])
        # return {price.span.text for price in cards}
    except:
        pass
    #

    return
#

# %% SET LINKS
set_links = get_sets('https://www.pricecharting.com/category/magic-cards')
print(set_links)

# %% CARD LINKS
for name, link in set_links.items():
    set_links[name] = get_cards(link)
#
print(set_links)

# %% CARD PRICES
for set, cards in set_links.items():
    for card, link in cards.items():
        # print(card, get_prices(link))
        get_prices(link)
