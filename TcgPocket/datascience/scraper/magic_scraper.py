import numpy as np
import pytesseract as tess

class MagicScraper:

    query_base = 'https://api.scryfall.com/cards/search?q='

    def apply_filter(self, raw_card):
        """
        :param raw_card: user uploaded image of card
        :return: two cropped imgs containing the set number and set abbreviation
        """
        set_num = np.array(raw_card.resize([421,614]))[570:586, 20:79, :]
        set_abbrv = np.array(raw_card.resize([421,614]))[585:596, 20:51, :]
        
        return [set_num, set_abbrv]
    
    def read_card(self, filt_attrbs: list):
        """
        :param filt_cards: list of cropped images containing the values needed to be read
        :return: the read values from list of cropped images
        """
        params = []
        for attrb in filt_attrbs:
            params.append(tess.image_to_string(attrb).strip('\n'))
        #
        
        return params

    def get_json(self, params):
        """
        :param params: list of querable parameters 
        :return: card json object
        """
        return self.query_base + 'number:' + params[0].split('/')[0] + ' s:' + params[1]
