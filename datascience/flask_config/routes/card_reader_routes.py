from flask import Blueprint
from flask_config.entities.entities import Card
from flask_config.utilities.card_utilities import get_card
from flask import jsonify, request
from main import all_of_it
import requests

card_reader_bp = Blueprint('card_reader', __name__)


@card_reader_bp.post('/api/read-card')
def read_card():
    try:
        query, classification = all_of_it(request.data)
        api_response = requests.get(query).json()
        card_data = get_card(api_response, classification)

        cards = (
            Card.query
            .filter(
                Card.Name == card_data.name,
                Card.CardNumber == card_data.card_number)
            .all()
        )

        def game_set_filter(x):
            return x.Game.Name == card_data.game_name and x.Set.Name == card_data.set_name

        card = next(filter(game_set_filter, cards))

        response = jsonify({
            'data': card.to_dict(),
            'errors': None,
            'hasErrors': False
        })

        return response, 200

    except Exception as e:
        print(e)
        response = jsonify({
            'data': None,
            'errors': [{'message': 'Error classifying card', 'property': ''}],
            'hasErrors': True
        })

        return response, 500
