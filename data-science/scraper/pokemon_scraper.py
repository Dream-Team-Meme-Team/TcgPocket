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
        
        set_num = np.array(raw_card.resize([421,614]))[577:592, 330:363, :]
        set_symb = np.array(raw_card.resize([421,614]))[570:595, 375:400, :]

        return [set_num, set_symb]
    
    def read_card(self, filt_attrbs: list):
        """
        Arguments:
            filt_cards: list of cropped images containing the values needed to be read
            return: the read values from list of cropped images
        """
        params = []
        params.append(tess.image_to_string(filt_attrbs[0]).strip('\n'))

        return params

    def gen_query(self):
        pass