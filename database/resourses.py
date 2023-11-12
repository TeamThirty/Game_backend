
from init import db
from flask import request
from flask_restful import Resource
from models import User, Model, Project
from schemes import UserSchema, ProjectSchema
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required

user_schema = UserSchema()
project_schema = ProjectSchema()


class LoginResource(Resource):
    def post(self):
        data = request.get_json()
        login = data.get('login')
        password = data.get('password')
        user = User.query.filter_by(login=login).first()
        if user and check_password_hash(user.password, password):
            access_token = create_access_token(identity=user.login)
            return {'access_token': access_token}, 200
        else:
            return {'message': 'Invalid credentials'}, 401


class UserResource(Resource):
    def get(self):
        users = User.query.all()
        return user_schema.dump(users, many=True)

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

        password_hash = generate_password_hash(password)
        new_user = User(login=login, password=password_hash)

        db.session.add(new_user)
        db.session.commit()
        return {'id': new_user.id, 'login': new_user.login}, 201


class ModelResource(Resource):
    def get(self, modelId=None):
        pass
    # todo

    def post(self, modelId=None):
        pass
    # todo


class ProjectResource(Resource):
    @jwt_required()
    def get(self, projectId=None):
        user_login = get_jwt_identity()
        user = User.query.filter_by(login=user_login).first()
        if not user:
            return {'message': 'Bad authorization'}, 400
        user_id = user.id
        if projectId:
            project = Project.query.get(projectId)
            if project and project.owner_id == user_id:
                return project_schema.dump(project)
            return {'message': 'Project not found'}, 404

        projects = Project.query.filter_by(owner_id=user_id).with_entities(
            Project.id, Project.name, Project.creation_date, Project.preview).all()
        return project_schema.dump(projects, many=True)

    @jwt_required()
    def post(self):
        json_data = request.get_json()
        user_login = get_jwt_identity()
        user = User.query.filter_by(login=user_login).first()
        if not user:
            return {'message': 'Bad authorization'}, 400
        user_id = user.id
        name = json_data.get('name')
        preview = json_data.get('preview')
        scene_data = json_data.get('scene_data')

        if not scene_data:
            return {'no_scene'}, 400

        new_project = Project(name=name, preview=preview, owner_id=user_id,
                              scene_data=scene_data)

        db.session.add(new_project)
        db.session.commit()
