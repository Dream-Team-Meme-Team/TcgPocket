import json
from pokemontcgsdk import Card
from pokemontcgsdk import RestClient


''' Read in Card URLs '''
# MAGIC >> needs raw magic.json
with open('data-science/data/raw-data/magic.json', encoding='utf-8') as magic_f:
    mgc_json = json.load(magic_f)
    mgc_cards = [dict(card) for card in mgc_json]

    mgc_card_imgs = []
    for card in mgc_cards:
        for key, value in card.items():
            if key == 'image_uris':
                mgc_card_imgs.append(card['image_uris']['normal'])
    
    magic_fw = open('data-science/data/raw-data/mgc.csv', 'w')
    magic_fw.write('card, label\n')
    for img_url in mgc_card_imgs:
        magic_fw.write((str(img_url) + ", 0\n"))
    magic_fw.close()

# YUGIOH >> needs raw yugioh.json
with open('data-science/data/raw-data/yugioh.json', encoding='utf-8') as yugioh_f:
    ygo_json = json.load(yugioh_f)
    ygo_cards = [dict(card) for card in ygo_json['data']]

    ygo_card_imgs = []
    for card in ygo_cards:
        for card_img_type in card['card_images']:
            ygo_card_imgs.append(card_img_type['image_url'])

    ygo_fw = open('data-science/data/raw-data/ygo.csv', 'w')
    ygo_fw.write('card, label\n')
    for img_url in ygo_card_imgs:
        ygo_fw.write((str(img_url) + ", 1\n"))
    ygo_fw.close()

# POKEMON
RestClient.configure('ca60e338-6ec0-4056-abf5-bab754d1ffa2')
cards = Card.all()

pkm_fw = open('data-science/data/raw-data/pkm.csv', 'w')
pkm_fw.write('card, label\n')
for card in cards:
    pkm_fw.write(f'{card.images.large}, 2\n')
pkm_fw.close()
