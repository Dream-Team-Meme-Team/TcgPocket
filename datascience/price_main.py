import price_blob as blob
import price_scraper as scraper

games = ['magic', 'yugioh', 'pokemon']

for game in games: 
    json_data_to_upload = scraper.update_prices(game)
    container_name = 'price-data'
    blob_name = f'{game}-prices.json'
    connection_string = 'AccountName=devstoreaccount1;AccountKey=Eby8vdM02xNOcqFlqUwJPLlmEtlCDXJ1OUzFT50uSRZ6IFsuFq2UVErCz4I6tq/K1SZFPTOtr/KBHBeksoGMGw==;BlobEndpoint=http://127.0.0.1:10000/devstoreaccount1;'
    
    blob.upload_json_to_blob(json_data_to_upload, container_name, blob_name, connection_string)
#