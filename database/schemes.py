from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from models import User, Project, Model


class UserSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = User


class ProjectSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Project


class ModelSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Model
