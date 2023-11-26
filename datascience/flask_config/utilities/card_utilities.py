class CardFilterDto:
    def __init__(self, name, game_name, set_name, card_number):
        self.name = name
        self.game_name = game_name
        self.set_name = set_name
        self.card_number = card_number

    def to_dict(self):
        return {
            'name': self.name,
            'gameName': self.game_name,
            'setName': self.set_name,
            'cardNumber': self.card_number
        }


def get_card(data, classification):
    card_mapping_fn = game_fn_map[classification]
    return card_mapping_fn(data)


def get_magic_card(data):
    data = data['data'][0]
    name = data['name']
    game_name = 'Magic'
    set_name = data['set_name']
    card_number = data['collector_number']

    return CardFilterDto(name, game_name, set_name, card_number)


def get_yugioh_card(data):
    data = data[0]
    name = data['name']
    game_name = 'Yu-Gi-Oh'
    set_name = data['set_name']
    card_number = data['set_code']

    return CardFilterDto(name, game_name, set_name, card_number)


def get_pokemon_card(data):
    data = data['data'][0]
    name = data['name']
    game_name = 'Pokémon'
    set_name = data['set']['name']
    card_number = data['number']

    return CardFilterDto(name, game_name, set_name, card_number)


game_fn_map = {
    0: get_magic_card,
    1: get_yugioh_card,
    2: get_pokemon_card,
}
