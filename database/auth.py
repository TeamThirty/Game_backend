from models import User
from flask import jsonify, make_response
from flask_httpauth import HTTPBasicAuth

auth = HTTPBasicAuth()


@auth.get_password
def get_password(login):
    user = User.query.filter(User.login == login).first()
    if user:
        return user['password']
    else:
        return None


@auth.error_handler
def unauthorized():
    return make_response(jsonify({'error': 'Unauthorized access'}), 401)
