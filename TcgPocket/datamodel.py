from sys import argv
import datascience.main as av
from azure.storage.blob import BlobServiceClient



if __name__ == '__main__':
    try:
        blob_service_client = BlobServiceClient.from_connection_string("DefaultEndpointsProtocol=http;AccountName=devstoreaccount1;AccountKey=Eby8vdM02xNOcqFlqUwJPLlmEtlCDXJ1OUzFT50uSRZ6IFsuFq2UVErCz4I6tq/K1SZFPTOtr/KBHBeksoGMGw==;BlobEndpoint=http://127.0.0.1:10000/devstoreaccount1;")
        blob_client = blob_service_client.get_blob_client(container="tcgpocketcontainer", blob=argv[1])

        # Download the image as a stream
        result = av.all_of_it(blob_client.download_blob().readall())
        print(result)

    except Exception as e:
        print('av is sad :(')
        print(e)
