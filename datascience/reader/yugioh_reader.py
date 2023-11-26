import numpy as np
import easyocr

class YugiohReader:

    reader = easyocr.Reader(['en'])
    query_base = 'https://db.ygoprodeck.com/api/v7/cardsetsinfo.php?setcode='

    def apply_filter(self, raw_card):
        """ Crops the raw img key attributes >>> set code

        Args:
            raw_card (PIL): user uploaded img in original size

        Returns:
            list: the cropped key attributes 
        """

        cropped = np.array(raw_card.resize([421,614]))[435:455, 300:385, :]

        return [cropped]
    
    def read_card(self, filt_attrbs: list):
        """ Reads the passed attribute imgs >>> set code

        Args:
            filt_attrbs (list): cropped imgs of attributes 

        Returns:
            list: the read values from list of key attributes
        """

        return [self.reader.readtext(attrb)[0][1] for attrb in filt_attrbs ]

    def gen_query(self, params: list):
        """ Generates the query to be passed to the backend

        Args:
            params (list): the read key attributes

        Returns:
            str: query with the set code appended
        """
        
        mod = []
        for param in params:
            set, num = param.split('-')
            set = set.replace('0', 'O') if '0' in set else set    
            num = num.replace('O', '0') if 'O' in num else num
            mod.append(set + '-' + num)
        #

        # TODO: query
        q = self.query_base + mod[0]
        
        return q
