import numpy as np
import pytesseract as tess

class YugiohScraper:

    def apply_filter(self, raw_card):
        """
        Arguments:
            raw_card: user uploaded image of card
            return: one cropped img containing the unique code
        """
        code = np.array(raw_card.resize([421,614]))[435:460, 295:385, :]
        
        return code
    
    def read_card(self, filt_cards: list):
        """
        Arguments:
            filt_cards: list of cropped images containing the values needed to be read
            return: the read values from list of cropped images
        """

        params = []
        for card in filt_cards:
            params.append(tess.image_to_string(card).strip('\n'))
        
        return params

    def gen_query(self):
        pass
