from flask import request, Response, Blueprint
from config import db, bucket
import json
from utils.gstore import save_image_google_storage

user = Blueprint('user', __name__)


@user.route("/create_user", methods=['POST'])
def create_user():
    try:
        data = request.get_json()
        username = data['username']
        user_id = data['user_id']
        first_name = data['first_name']
        last_name = data['last_name']
        phone = data['phone_number']
        email = data['email']
        image = data['image']
        url = save_image_google_storage(image['base64'].encode('utf-8'), '{}.jpg'.format(username), username)
        print(url)
        doc_ref = db.collection(u'users').document()
        user_data = {
            u'username': username,
            u'user_id': user_id,
            u'first_name': first_name,
            u'last_name': last_name,
            u'phone_number': phone,
            u'email': email,
            u'uploaded_photo': url
        }
        doc_ref.set(user_data)
        data = {'message': 'User Added Successfully', 'data': user_data}
        return Response(json.dumps(data), status=200)
    except Exception as e:
        return Response(str(e), status=400)


@user.route("/create_user_profile", methods=['POST'])
def user_profile():
    try:
        data = request.get_json()
        doc_ref = db.collection(u'user_data').document(data['user_id'])
        doc_ref.set(data)
        user_data = {'message':'User data added suceessfully', "data": data}
        return Response(json.dumps(user_data), status=200)
    except Exception as e:
        return Response(str(e), status=400)


@user.route("/get_user_data", methods=['GET'])
def get_user():
    try:
        user_id = request.args.get('user_id')
        doc_ref = db.collection(u'user_data').document(user_id)
        doc = doc_ref.get()
        if doc.exists:
            user_data = {'message': 'User data retrieved suceessfully', "data": [doc.to_dict()]}
            return Response(json.dumps(user_data), status=200)
        else:
            user_data = {'message': 'User not found'}
            return Response(json.dumps(user_data), status=400)
    except Exception as e:
        return Response(str(e), status=400)