import numpy as np
import cv2
import pytesseract as tess

class PokemonScraper:

    set_imgs = []

    def apply_filter(self, raw_card):
        """
        Arguments:
            raw_card: user uploaded image of card
            return: two cropped imgs containing the set number and set abbreviation
        """
        
        name = np.array(raw_card.resize([421,614]))[20:60, 100:275, :]
        set_num = np.array(raw_card.resize([421,614]))[577:592, 330:363, :]

        return [set_num, name]
    
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