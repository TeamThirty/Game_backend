from app import db
from datetime import datetime


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    password = db.Column(db.String(255), nullable=False)
    login = db.Column(db.String(255), unique=True, nullable=False)
    projects = db.relationship('Project', backref='owner', lazy='dynamic')


class Project(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    preview = db.Column(db.Integer, nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    scene_data = db.Column(db.JSONB, nullable=False)
    creation_date = db.Column(db.DateTime, default=datetime.utcnow)


class Model(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    picture = db.Column(db.LargeBinary, primary_key=True)
    model_name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text)
    model_data = db.Column(db.LargeBinary)
