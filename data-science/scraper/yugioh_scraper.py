import numpy as np
import pytesseract as tess
import cv2
import json
from difflib import SequenceMatcher as sm

class YugiohScraper:

    ygo_json = json.load(open("C:/Users/abbyo/OneDrive - selu.edu/Desktop/yugioh.json"))['data']    # also a wip

    def apply_filter(self, raw_card):
        """
        :param raw_card: user uploaded image of card
        :return: one cropped img containing the unique code
        """
        cropped = np.array(raw_card.resize([421,614]))[435:455, 300:385, :]

        thresh = cv2.adaptiveThreshold(cv2.cvtColor(cropped, cv2.COLOR_BGR2GRAY), 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 15, 3)
        median = cv2.medianBlur(thresh, 1)

        return [median]
    
    def read_card(self, filt_attrbs: list):
        """
        :param filt_cards: list of cropped images containing the values needed to be read
        :return: the read values from list of cropped images
        """
        params = []
        for attrb in filt_attrbs:
            params.append(tess.image_to_string(attrb, config="--psm 13  -c tessedit_char_whitelist=123456789-ABCDEFGHIJKLMNOPQRSTUVWXYZ").strip('\n'))
        
        return params

    def get_json(self, params):
        """
        WIP
        """
        for card in self.ygo_json:
            try:
                for set in card['card_sets']:
                    if sm(None, params[0], set['set_code']).ratio() > 0.75:
                        print(set['set_code'])
            except:
                pass
            
        return
