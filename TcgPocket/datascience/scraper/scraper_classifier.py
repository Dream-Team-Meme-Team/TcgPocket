from .magic_scraper import MagicScraper
from scraper.yugioh_scraper import YugiohScraper
from .pokemon_scraper import PokemonScraper

def scraper_classifier(classifier):
    """ Classifies the scraper to use based off the card classif

    Args:
        classifier (int): card classification 

    Returns:
        scraper: type of scraper to use
    """
    if classifier == 0: 
        scraper_obj = MagicScraper()
    elif classifier == 1:
        scraper_obj = YugiohScraper()
    else:
        scraper_obj = PokemonScraper()

    return scraper_obj
#