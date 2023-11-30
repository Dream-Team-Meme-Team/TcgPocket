import requests
from bs4 import BeautifulSoup as bs

base = 'https://www.pricecharting.com'
mgc_editions = {'1st': 'First', '2nd': 'Second', '3rd': 'Third', 
                '4th': 'Fourth', '5th': 'Fifth', '6th': 'Sixth', 
                '7th': 'Seventh', '8th': 'Eighth', '9th': 'Ninth', 
                '10th': 'Tenth'}

def scrape_prices(game:str) -> dict:
    """
    Updates the price info for all cards in a given game
    """
    set_link = 'https://www.pricecharting.com/category/' + game.lower() + '-cards'
    set_resp = bs(requests.get(set_link).content, 'html.parser')
    data = {}

    print('Beginning Scraping...')
    for set in set_resp.find('div', class_='home-box all').ul.find_all('li'):
    
        ''' Set Name Handling '''
        # skip sets in japanese
        if 'Japanese' in set.text.strip('\n'):
            continue
        #

        # remove tcg name in the set key
        if 'Magic ' in set.text.strip('\n'):
            parsed_set = set.text.strip('\n').removeprefix('Magic ')

            # map to correct edition format
            if parsed_set.split(' ')[0] in mgc_editions.keys():
                parsed_set = parsed_set.replace(parsed_set.split(' ')[0], mgc_editions[parsed_set.split(' ')[0]])
            #
        elif 'Pokemon ' in set.text.strip('\n'):
            parsed_set = set.text.strip('\n').removeprefix('Pokemon ')
        elif 'YuGiOh ' in set.text.strip('\n'):
            parsed_set = set.text.strip('\n').removeprefix('YuGiOh ')
        #
        
        data[parsed_set] = {}
        card_resp = bs(requests.get(base + set.a.get('href')).content, 'html.parser')
        for card in card_resp.find('table', id='games_table').tbody.find_all('td', class_='title'):

            ''' Card Name Handling '''
            if 'Foil' in card.text.strip('\n'):
                continue
            #
            
            prices = bs(requests.get(base + card.a.get('href')).content, 'html.parser')
            try:
                card_dates = prices.find('table', class_='hoverable-rows sortable').tbody.find_all('td', class_='date')
                card_prices = prices.find('table', class_='hoverable-rows sortable').tbody.find_all('td', class_='numeric')

                data[parsed_set][card.text.strip('\n')] = dict([(date.text, float(price.span.text.strip('$'))) for (date, price) in zip(card_dates, card_prices)])
            except:
                data[parsed_set][card.text.strip('\n')] = None
            #
        #
        print(f'>>> {parsed_set} has been successfully scraped...')
    #
    print(f'All {game} data scraped.')
    return data
#
