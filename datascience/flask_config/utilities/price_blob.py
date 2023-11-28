from azure.storage.blob import BlobServiceClient, ContentSettings, ContainerClient
import json

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

def download_json_from_blob(container_name, blob_name, connection_string):
    blob_service_client = BlobServiceClient.from_connection_string(connection_string)
    blob_client = blob_service_client.get_blob_client(container=container_name, blob=blob_name)
    create_blob_container_if_not_exists(container_name, connection_string)

    # Download the JSON data from the blob
    json_bytes = blob_client.download_blob().readall()

    # Convert bytes to JSON data
    return json.loads(json_bytes.decode('utf-8'))
#
