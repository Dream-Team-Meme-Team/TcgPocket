from .magic_reader import MagicReader
from .yugioh_reader import YugiohReader
from .pokemon_reader import PokemonReader

def reader_classifier(classifier):
    """ Classifies the scraper to use based off the card classif

    Args:
        classifier (int): card classification 

    Returns:
        scraper: type of scraper to use
    """
    if classifier == 0: 
        reader_obj = MagicReader()
    elif classifier == 1:
        reader_obj = YugiohReader()
    else:
        reader_obj = PokemonReader()

    return reader_obj
#