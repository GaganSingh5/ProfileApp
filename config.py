import firebase_admin
from firebase_admin import credentials, storage
from firebase_admin import firestore

# Use a service account
cred = credentials.Certificate('./hacknitr-profile-app-firebase-adminsdk-pp37m-10d6fbc563.json')
firebase_admin.initialize_app(cred, {'storageBucket': 'hacknitr-profile-app.appspot.com'})

db = firestore.client()
bucket = storage.bucket()

storage = storage