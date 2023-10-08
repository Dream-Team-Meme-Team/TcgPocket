from scraper.magic_scraper import MagicScraper
from scraper.yugioh_scraper import YugiohScraper
from scraper.pokemon_scraper import PokemonScraper

def scraper_classifier(classifier):
    """
    :param classifier: cards classification as a pkm, mgc, or ygo card
    :return: proper scraper class obj
    """
    if classifier == 0: 
        scraper_obj = MagicScraper()
    elif classifier == 1:
        print('Yu-gi-oh Card')
    else:
        scraper_obj = PokemonScraper()

    return scraper_obj
#