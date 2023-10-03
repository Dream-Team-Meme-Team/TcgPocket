import numpy as np
import pytesseract as tess
import cv2

class YugiohScraper:

    def apply_filter(self, raw_card):
        """
        Arguments:
            raw_card: user uploaded image of card
            return: one cropped img containing the unique code
        """
        cropped = np.array(raw_card.resize([421,614]))[435:455, 300:385, :]

        thresh = cv2.adaptiveThreshold(cv2.cvtColor(cropped, cv2.COLOR_BGR2GRAY), 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 15, 3)
        median = cv2.medianBlur(thresh, 1)

        return [median]
    
    def read_card(self, filt_cards: list):
        """
        Arguments:
            filt_cards: list of cropped images containing the values needed to be read
            return: the read values from list of cropped images
        """
        params = []
        for card in filt_cards:
            params.append(tess.image_to_string(card, config="--psm 13  -c tessedit_char_whitelist=123456789-ABCDEFGHIJKLMNOPQRSTUVWXYZ").strip('\n'))
        
        return params

    def gen_query(self):
        pass
