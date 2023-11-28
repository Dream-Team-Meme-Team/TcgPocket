import price_blob as blob
import price_scraper as scraper
from dotenv import load_dotenv
import os


# Load variables from the .env file
load_dotenv()
connection_string = os.getenv('BLOB_CONNECTION_STRING')
container_name = os.getenv('BLOB_CONTAINER_NAME')

games = ['magic', 'yugioh', 'pokemon']
for game in games: 
    json_data_to_upload = scraper.update_prices(game)
    blob_name = f'{game}-prices.json'

    blob.upload_json_to_blob(json_data_to_upload, container_name, blob_name, connection_string)
#
