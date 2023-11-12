from flask import Flask
from flask_cors import CORS
from config import Config
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager

app = Flask(__name__)
CORS(app, resources={r"*": {"origins": "*", "allow_headers": "Content-Type"}})

app.config['SQLALCHEMY_DATABASE_URI'] = Config.SQLALCHEMY_DATABASE_URI
app.config['SECRET_KEY'] = Config.SECRET_KEY

db = SQLAlchemy(app)
api = Api(app)
jwt = JWTManager(app)
