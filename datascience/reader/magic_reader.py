import numpy as np
import easyocr

class ModernMagicReader:
    
    reader = easyocr.Reader(['en'])
    query_base = 'https://api.scryfall.com/cards/search?q='

    def apply_filter(self, raw_card):
        """ Crops the key attributes from the card

        Args:
            raw_card (PIL Image): the raw card image

        Returns:
            list : cropped attributes to be read
        """
        set_num = np.array(raw_card.resize([421,614]))[570:586, 20:79, :]
        set_abbrv = np.array(raw_card.resize([421,614]))[585:596, 20:51, :]
        
        return [set_num, set_abbrv]
    
    def read_card(self, filt_attrbs: list):
        """ Reads the card's key attributes

        Args:
            filt_attrbs (list): list of card attributes to read

        Returns:
            list(str): the read attributes
        """
        params = []
        for attrb in filt_attrbs:
            try:
                params.append(self.reader.readtext(attrb)[0][1].strip('\n'))
            except:
                params.append('')
        #
        
        return params

    def gen_query(self, params):
        """ Generates query from key attributes on card

        Args:
            params (list): list fo str containing attrbs to gen query from

        Returns:
            str: query
        """
        return self.query_base + 'number:' + params[0].split('/')[0] + ' s:' + params[1]
    #
#