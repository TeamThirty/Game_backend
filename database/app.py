
from config import Config

from flask_httpauth import HTTPBasicAuth
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api
from resourses import UserResource

app = Flask(__name__)
app.config = Config

db = SQLAlchemy(app)
api = Api(app)

api.add_resource(UserResource, '/user/<int:user_id>', '/user')

if __name__ == '__main__':
    db.create_all()
    app.run(debug=True)
