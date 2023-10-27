from magic_scraper import MagicScraper
import requests
from PIL import Image
from io import BytesIO

resp = requests.get('https://cards.scryfall.io/normal/front/2/a/2a83882c-3e03-4e85-aaac-97fa1d08a772.jpg?1674135379')
mgc_img = Image.open(BytesIO(resp.content))
mgc_img.show()

scraper = MagicScraper()
params = scraper.read_card(scraper.apply_filter(mgc_img))
print(scraper.gen_query(params))
