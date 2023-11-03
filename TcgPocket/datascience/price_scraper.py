import requests
from bs4 import BeautifulSoup as bs
from collections import defaultdict


def price_scraper(game: str):
    set_link = 'https://www.pricecharting.com/category/' + game + '-cards'
    base = 'https://www.pricecharting.com'

    set_resp = bs(requests.get(set_link).content, 'html.parser')

    data = defaultdict(dict)

    for set in set_resp.find('div', class_='home-box all').ul.find_all('li'):
        card_resp = bs(requests.get(base + set.a.get('href')).content, 'html.parser')

        for card in card_resp.find('table', id='games_table').tbody.find_all('td', class_='title'):
            prices = bs(requests.get(base + card.a.get('href')).content)
            
            try:
                card_dates = prices.find('table', class_='hoverable-rows sortable').tbody.find_all('td', class_='date')
                card_prices = prices.find('table', class_='hoverable-rows sortable').tbody.find_all('td', class_='numeric')

                data[set.text.strip('\n')][card.text.strip('\n')] = dict([(date.text, float(price.span.text.strip('$'))) for  i, (date, price) in enumerate(zip(card_dates, card_prices))])
            except:
                data[set.text.strip('\n')][card.text.strip('\n')] = None
            #
        #

        print(data[set.text.strip('\n')])
    #

    return data
#

print(price_scraper('magic'))
