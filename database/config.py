import os
import secrets


class Config:
    SQLALCHEMY_DATABASE_URI = f"postgresql://{os.environ['POSTGRES_USER']}:{os.environ['POSTGRES_PASSWORD']}@db:5432/{os.environ['POSTGRES_DB']}"
    SECRET_KEY = '2cc9ece5deb86f921ea268242af0b5965f6b24c1d762992b87271902db844f02'
