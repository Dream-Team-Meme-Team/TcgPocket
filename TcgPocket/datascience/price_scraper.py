import requests
from bs4 import BeautifulSoup as bs


def price_scraper(game: str):
    set_link = 'https://www.pricecharting.com/category/' + game + '-cards'
    base = 'https://www.pricecharting.com'

    # grab link to list of cards in set
    set_resp = bs(requests.get(set_link).content, 'html.parser')
    # data = {set.text.strip('\n'): base + set.a.get('href') for set in set_resp.find('div', class_='home-box all').ul.find_all('li')}
    
    # # grab link to price listings for cards in sets
    # for set, link in data.items():
    #     card_resp = bs(requests.get(link).content, 'html.parser')
    #     data[set] = {card.text.strip('\n, Magic '): base + card.a.get('href') for card in card_resp.find('table', id='games_table').tbody.find_all('td', class_='title')}
    #     print(data[set])
    # #

    for set in set_resp.find('div', class_='home-box all').ul.find_all('li'):
        print(base + set.a.get('href'))

    # print(data)
#

price_scraper('pokemon')
