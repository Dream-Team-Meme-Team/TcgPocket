from .modern_magic_reader import ModernMagicReader
from .yugioh_reader import YugiohReader
from .left_pokemon_reader import LeftPokemonReader
from .right_pokemon_reader import RightPokemonReader

def reader_classifier(classifier):
    """ Classifies the scraper to use based off the card classif

    Args:
        classifier (int): card classification 

    Returns:
        scraper: type of scraper to use
    """
    if classifier == 0: # TODO: find key attrbs of retro magic cards
        raise Exception("Retro magic cards cannot be read at this time.")
    elif classifier == 1:
        reader_obj = ModernMagicReader()
    elif classifier == 2:
        reader_obj = YugiohReader()
    elif classifier == 3:
        reader_obj = LeftPokemonReader()
    elif classifier == 4:
        reader_obj = RightPokemonReader()
    else:
        raise Exception("This card cannot be read at this time.")
    #

    return reader_obj
#