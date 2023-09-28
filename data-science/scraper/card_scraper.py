import requests
from PIL import Image
from io import BytesIO
from apiKeys import IDK_API_KEY
import torchvision.transforms as transform
import numpy as np
import cv2

from_PIL = transform.Compose([transform.PILToTensor()]) 

"""YUGIOH"""
# # get and load up ygo card from URL
# resp_ygo = requests.get('https://images.ygoprodeck.com/images/cards/13026402.jpg', headers = {'X-Api-Key': IDK_API_KEY, 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36'})
# img_ygo_raw = Image.open(BytesIO(resp_ygo.content))
# img_ygo_raw.show()

# img_ygo_np = np.array(img_ygo_raw.resize([421,614]))
# # img_ygo_np[440:455, 300:380, :] = 0
# img_ygo_np[:435, :, :] = 0
# img_ygo_np[460:, :, :] = 0
# img_ygo_np[:, :295, :] = 0
# img_ygo_np[:, 385:, :] = 0
# img_ygo = Image.fromarray(img_ygo_np)
# img_ygo.show()

"""MAGIC"""
# # get and load up card from URL
# resp_mgc = requests.get('https://cards.scryfall.io/normal/front/e/5/e5594689-0f32-4592-859b-c746f3464fc6.jpg?1573509272', headers = {'X-Api-Key': IDK_API_KEY, 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36'})
# img_mgc_raw = Image.open(BytesIO(resp_mgc.content))
# img_mgc_raw.show()

# img_mgc_np_num = np.array(img_mgc_raw.resize([421,614]))
# # img_mgc_np_num[570:585, 20:80, :] = 0
# img_mgc_np_num[:570, :, :] = 0
# img_mgc_np_num[586:, :, :] = 0
# img_mgc_np_num[:, :20, :] = 0
# img_mgc_np_num[:, 79:, :] = 0
# img_mgc_num = Image.fromarray(img_mgc_np_num)
# img_mgc_num.show()

# img_mgc_np_set = np.array(img_mgc_raw.resize([421,614]))
# # img_mgc_np_set[585:595, 20:80, :] = 0
# img_mgc_np_set[:585, :, :] = 0
# img_mgc_np_set[596:, :, :] = 0
# img_mgc_np_set[:, :20, :] = 0
# img_mgc_np_set[:, 51:, :] = 0
# img_mgc_set = Image.fromarray(img_mgc_np_set)
# img_mgc_set.show()

"""POKEMON"""
# get and load up card from URL
resp_pkm = requests.get('https://images.pokemontcg.io/bw8/1_hires.png', headers = {'X-Api-Key': IDK_API_KEY, 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36'})
img_pkm_raw = Image.open(BytesIO(resp_pkm.content))
# img_pkm_raw.show()

img_pkm_np_num = np.array(img_pkm_raw.resize([421,614]))
# img_pkm_np_num[577:592, 330:363, :] = 0
img_pkm_np_num[:577, :, :] = 0
img_pkm_np_num[592:, :, :] = 0
img_pkm_np_num[:, :330, :] = 0
img_pkm_np_num[:, 363:, :] = 0
img_pkm_num = Image.fromarray(img_pkm_np_num)
# img_pkm_num.show()

img_pkm_np_set = np.array(img_pkm_raw.resize([421,614]))
# img_pkm_np_set[570:595, 375:400, :] = 0
img_pkm_np_set[:570, :, :] = 0
img_pkm_np_set[595:, :, :] = 0
img_pkm_np_set[:, :375, :] = 0
img_pkm_np_set[:, 400:, :] = 0
img_pkm_set = Image.fromarray(img_pkm_np_set)
img_pkm_set.show()


img = np.array(Image.open('data-science/data/tst.png').resize([421,614]))

if img_pkm_np_set.shape[2] == 4:
    img_pkm_np_set = cv2.resize(cv2.cvtColor(cv2.cvtColor(img, cv2.COLOR_BGRA2BGR), cv2.COLOR_BGR2GRAY), [421, 614])
else:
    img_pkm_np_set = cv2.resize(cv2.cvtColor(img, cv2.COLOR_RGB2BGR), [421, 614])

print((img_pkm_np_set - img).mean())
