from sys import argv
import datascience.main as av
from azure.storage.blob import BlobServiceClient



if __name__ == '__main__':
    try:
        blob_uri = argv[1]
        print(blob_uri)

        container_name = "tcgpocketcontainer"

        connection_string = "DefaultEndpointsProtocol=http;AccountName=devstoreaccount1;AccountKey=Eby8vdM02xNOcqFlqUwJPLlmEtlCDXJ1OUzFT50uSRZ6IFsuFq2UVErCz4I6tq/K1SZFPTOtr/KBHBeksoGMGw==;BlobEndpoint=http://127.0.0.1:10000/devstoreaccount1;"
        blob_service_client = BlobServiceClient.from_connection_string(connection_string)
        blob_client = blob_service_client.get_blob_client(container=container_name, blob=blob_uri)

        # Download the image as a stream
        image_stream = blob_client.download_blob()
        image_data = image_stream.readall()

        result = av.all_of_it(image_data)
        print(result)

    except Exception as e:
        print('we got err')
        print(e)