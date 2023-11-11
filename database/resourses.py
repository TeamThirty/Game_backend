from app import db
from auth import auth
from flask import request
from flask_restful import Resource
from models import User, Model, Project
from werkzeug.security import generate_password_hash


class UserResource(Resource):
    def post(self):
        json_data = request.get_json()

        if not json_data:
            return {'message': 'No JSON data received'}, 400

        login = json_data.get('login')
        password = json_data.get('password')

        if not login:
            return {'message': 'Invalid login'}, 400
        if User.query.filter(User.login == login).first():
            return {'message': 'Existed login'}, 400

        if not password:
            return {'message': 'Invalid password'}, 400

        password_hash = generate_password_hash(password, method='sha256')
        new_user = User(login=login, password=password_hash)
        db.session.add(new_user)
        db.session.commit()
        return {'id': new_user.id, 'login': new_user.login}, 201
