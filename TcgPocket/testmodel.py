import datascience.main as av

# cards = ['https://cards.scryfall.io/normal/front/e/5/e55503d2-1b32-43cf-95c6-a4a61047a4dc.jpg?1664415241',
#          'https://images.pokemontcg.io/xy11/10_hires.png',
#          'https://cards.scryfall.io/normal/front/e/5/e555b5af-48ed-4682-bf9a-f9f145548e18.jpg?1562276473']

cards = ['data-science/data/collected/card.jpg']

if __name__ == '__main__':
    for card in cards:
        try:
            with open(card, "rb") as image_file:
                json = av.all_of_it(bytearray(image_file.read()))
                print(json)
    
        except Exception as e:
            print('av did not like this card beacause:')
            print(e)
#
