import numpy as np
import pytesseract as tess

class PokemonScraper:

    query_base = 'https://api.pokemontcg.io/v2/cards?q='

    def apply_filter(self, raw_card):
        """ Crops the key attributes from the card

        Args:
            raw_card (PIL Image): the raw card image

        Returns:
            list : cropped attributes to be read
        """
        name = np.array(raw_card.resize([421,614]))[20:60, 100:275, :]
        set_num = np.array(raw_card.resize([421,614]))[577:592, 330:363, :]

        return [set_num, name]
    
    def read_card(self, filt_attrbs: list):
        """ Reads the card's key attributes

        Args:
            filt_attrbs (list): list of card attributes to read

        Returns:
            list(str): the read attributes
        """
        params = []
        for attrb in filt_attrbs:
            params.append(tess.image_to_string(attrb).strip('\n'))

        return params

    def gen_query(self, params):
        """ Generates query from key attributes on card

        Args:
            params (list): list fo str containing attrbs to gen query from

        Returns:
            str: query
        """
        return self.query_base + 'number:' + params[0].split('/')[0] + ' name:"' + params[1] + '"'