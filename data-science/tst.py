import torch
import requests
from PIL import Image
from io import BytesIO
import torchvision.transforms as trans

# tst = torch.tensor([[[1, 2, 3, 4], [5, 6, 7, 8]],
#                     [[1, 2, 3, 4], [5, 6, 7, 8]]])
# print(tst)

# tst_flatten = torch.flatten(tst)
# print(tst_flatten)

resp = requests.get('https://images.pokemontcg.io/ex5/17_hires.png', headers = {'X-Api-Key': '7ccb4c32-6299-4533-bf47-36f4d2a95117', 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36'})
img = Image.open(BytesIO(resp.content))
# img.show()

img_rsz = img.resize([421,614])
img_rsz.show()

PIL_to_tensor = trans.Compose([trans.PILToTensor()])
img_tens = (PIL_to_tensor(img_rsz) / 255.0)
# print(img_tens)

c = torch.nn.Conv2d(in_channels=3, out_channels=32, kernel_size=(3,3), stride = 3, padding=0)
output = c(img_tens)
# print(output)

to_PIL = trans.Compose([trans.ToPILImage()])
img_cnv = to_PIL(output[30])
img_cnv.show()

c2 = torch.nn.Conv2d(in_channels=32, out_channels=16, kernel_size=(3,3), stride = 3, padding=0)
output2 = c2(output)

# to_PIL = trans.Compose([trans.ToPILImage()])
img_cnv = to_PIL(output2[12])
img_cnv.show()