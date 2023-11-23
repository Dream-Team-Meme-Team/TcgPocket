from azure.storage.blob import BlobServiceClient, ContentSettings, ContainerClient
import json
import datascience.price_scraper as scraper

def create_blob_container_if_not_exists(container_name, connection_string):
    blob_service_client = BlobServiceClient.from_connection_string(connection_string)

    # Create the container if it doesn't exist
    try:
        blob_service_client.create_container(container_name)
    except Exception as e:
        # Container already exists
        pass
    #
#

def upload_json_to_blob(json_data, container_name, blob_name, connection_string):
    blob_service_client = BlobServiceClient.from_connection_string(connection_string)
    blob_client = blob_service_client.get_blob_client(container=container_name, blob=blob_name)
    create_blob_container_if_not_exists(container_name, connection_string)

    # Convert JSON data to bytes
    json_bytes = json.dumps(json_data, indent=2).encode('utf-8')

    # Upload the JSON data to the blob
    blob_client.upload_blob(json_bytes, content_settings=ContentSettings(content_type='application/json'), overwrite=True)
#

# Example usage
# json_data_to_upload = {'magic': {
#                             'Kaldheim': {
#                                 'Lathril': {
#                                     '08-22-2021': 2.99,
#                                     '08-30-2021': 2.99,
#                                     '09-8-2021': 2.95
#                                 },
#                                 'Abomination of Lanowar': {
#                                     '06-12-2021': 5.02,
#                                     '06-23-2021': 4.99,
#                                     '06-30-2021': 4.98
#                                 }
#                             }
#                         }}

json_data_to_upload = scraper.update_prices('magic')
container_name = 'price-data'
blob_name = 'magic-prices.json'
connection_string = 'AccountName=devstoreaccount1;AccountKey=Eby8vdM02xNOcqFlqUwJPLlmEtlCDXJ1OUzFT50uSRZ6IFsuFq2UVErCz4I6tq/K1SZFPTOtr/KBHBeksoGMGw==;BlobEndpoint=http://127.0.0.1:10000/devstoreaccount1;'

create_blob_container_if_not_exists(container_name, connection_string)
upload_json_to_blob(json_data_to_upload, container_name, blob_name, connection_string)
