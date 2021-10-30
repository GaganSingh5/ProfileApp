from flask import request, Response, Blueprint
from config import db, bucket
import json


util = Blueprint('util', __name__)


@util.route('/social_dropdown', methods=['GET'])
def social_dropdown():
    try:
        docs = db.collection(u'social_dropdown').stream()
        data = []
        for doc in docs:
            temp_dict = {}
            temp_dict['label'] = doc.id
            temp_dict['value'] = doc.to_dict()['name']
            temp_dict['url'] = doc.to_dict()['image_url']
            data.append(temp_dict)
        user_data = {'message': 'Social Dropdown Data', "data": data}
        return Response(json.dumps(user_data), status=200)
    except Exception as e:
        return Response(str(e), status=400)