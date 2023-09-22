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

# GET IMG
resp = requests.get('https://images.pokemontcg.io/ex5/17_hires.png', headers = {'X-Api-Key': '7ccb4c32-6299-4533-bf47-36f4d2a95117', 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36'})
img = Image.open(BytesIO(resp.content))
# img.show()

transform = trans.Compose([trans.Resize((614, 421)),
                           trans.PILToTensor()])

transform2 = trans.Compose([trans.ToPILImage()])

img_toTens = transform(img).to(torch.float32)
print(img_toTens / torch.max(img_toTens))

print(img_toTens.shape)

# # RSZ IMG
# img_rsz = img.resize([421,614])
# img_rsz.show()

# # TRANSFORM TO TENSOR
# PIL_to_tensor = trans.Compose([trans.PILToTensor()])
# img_tens = (PIL_to_tensor(img_rsz) / 255.0)
# # print(img_tens)

# to_PIL = trans.Compose([trans.ToPILImage()])

# # FIRST CVN
# c1 = torch.nn.Conv2d(in_channels=3, out_channels=32, kernel_size=(3,3), stride = 3, padding=0)
# c1_output = c1(img_tens)
# # print(c1_output)
# img_cnv = to_PIL(c1_output[7])
# img_cnv.show()

# # ACTIV
# c1_relu = torch.nn.functional.relu(c1_output, inplace=True)
# # print(c1_relu)
# img_cnv = to_PIL(c1_relu[7])
# img_cnv.show()

# # MX POOL
# mxpool = torch.nn.MaxPool2d((3,3), stride = 3)
# c1_mxpool_output = mxpool(c1_relu)
# # print(c1_mxpool_output)
# img_cnv = to_PIL(c1_mxpool_output[7])
# img_cnv.show()


# # SECOND CVN
# c2 = torch.nn.Conv2d(in_channels=32, out_channels=16, kernel_size=(3,3), stride = 3, padding=0)
# c2_output = c2(c1_mxpool_output)
# # print(c2_output)
# img_cnv = to_PIL(c2_output[7])
# img_cnv.show()

# # ACTIV
# c2_relu = torch.nn.functional.relu(c2_output, inplace=True)
# # print(c1_relu)
# img_cnv = to_PIL(c2_relu[7])
# img_cnv.show()

# # MX POOL
# c2_mxpool_output = mxpool(c2_relu)
# # print(c1_mxpool_output)
# img_cnv = to_PIL(c2_mxpool_output[7])
# img_cnv.show()

# # FULLY CONNECTED 
# # output is 5x7 or 35 channels for FC Layer
# flat_tens = torch.flatten(c2_mxpool_output)
# # print(flat_tens)

# m = torch.nn.Linear(16*5*7, 3)
# classify = m(flat_tens)

# sft_mx = torch.nn.functional.softmax(classify)
# print(torch.argmax(sft_mx))
