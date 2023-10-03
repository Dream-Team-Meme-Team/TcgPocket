import numpy as np
import pytesseract as tess

class MagicScraper:

    def apply_filter(self, raw_card):
        """
        Arguments:
            raw_card: user uploaded image of card
            return: two cropped imgs containing the set number and set abbreviation
        """
        set_num = np.array(raw_card.resize([421,614]))[570:586, 20:79, :]
        set_abbrv = np.array(raw_card.resize([421,614]))[585:596, 20:51, :]
        
        return [set_num, set_abbrv]
    
    def read_card(self, filt_attrbs: list):
        """
        Arguments:
            filt_cards: list of cropped images containing the values needed to be read
            return: the read values from list of cropped images
        """

        params = []
        for attrb in filt_attrbs:
            params.append(tess.image_to_string(attrb).strip('\n'))
        
        return params

    def gen_query(self):
        pass
