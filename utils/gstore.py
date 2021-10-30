import base64
import io
import cv2
from imageio import imread
from config import db, bucket
import os

def save_image_google_storage(file, filename, username):
    filename = username+'_'+filename
    b64_string = file.decode()
    img = imread(io.BytesIO(base64.b64decode(b64_string)))
    cv2_img = cv2.cvtColor(img, cv2.COLOR_RGB2BGR)
    cv2.imwrite(filename, cv2_img)
    blob = bucket.blob(filename)
    image = open(filename, 'rb')
    blob.upload_from_file(image)
    blob.make_public()
    os.remove(filename)

    return blob.public_url