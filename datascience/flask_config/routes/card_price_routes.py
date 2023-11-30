from flask import Blueprint
from flask_config.utilities.price_scraper import scrape_prices
from flask_config.utilities.price_blob import upload_json_to_blob, download_json_from_blob
from dotenv import load_dotenv
import os
import plotly.express as px
import pandas as pd


# Load variables from the .env file
load_dotenv()
connection_string = os.getenv('BLOB_CONNECTION_STRING')
container_name = os.getenv('BLOB_CONTAINER_NAME')

card_pricer_bp = Blueprint('card_pricer', __name__)

@card_pricer_bp.route('/api/update-prices/<game>', methods = ['GET'])
def update_prices(game:str) -> str:
    json_data_to_upload = scrape_prices(game)
    blob_name = f'{game}-prices.json'

    upload_json_to_blob(json_data_to_upload, container_name, blob_name, connection_string)

    return f"{game} prices stored in blob successfully!\n"
#

@card_pricer_bp.route('/api/get-prices/<game>', methods = ['GET'])
def get_game_prices(game:str) -> dict:
    blob_name = f'{game}-prices.json'
    data = download_json_from_blob(container_name, blob_name, connection_string)

    return data
#

@card_pricer_bp.route('/api/get-prices/<game>/<set>', methods = ['GET'])
def get_set_prices(game:str, set:str) -> dict:
    blob_name = f'{game}-prices.json'
    data = download_json_from_blob(container_name, blob_name, connection_string)

    return data[set]
#

@card_pricer_bp.route('/api/get-prices/<game>/<set>/<card>', methods = ['GET'])
def get_card_prices(game:str, set:str, card:str) -> dict:
    blob_name = f'{game}-prices.json'
    data = download_json_from_blob(container_name, blob_name, connection_string)
    df = pd.DataFrame.from_dict(data[set][card], orient='index', columns=['Price (USD)'])

    fig = px.line(df, x=df.index, y='Price (USD)')
    fig.update_layout({"title": f'{card} Prices Over Time', "xaxis": {"title":"Date"}})
    fig.show()

    return data[set][card]
#
