from flask import Flask, request, Response
from apis.user_apis import user
from apis.util_apis import util
import os
# from flask_ngrok import run_with_ngrok
from flask_cors import CORS

app = Flask(__name__)
app.register_blueprint(user)
app.register_blueprint(util)
cors = CORS(app)

# run_with_ngrok(app)


@app.route('/')
def health_check():
    return Response('Health Check Done', status=200)


if __name__ == '__main__':
    app.run(host = '0.0.0.0', port=os.environ.get("PORT", 5000), debug=True)


# app.run(host = '0.0.0.0', port=os.environ.get("PORT", 5000), debug=True)
