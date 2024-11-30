# app/config.py

import os

class Configuration:
    # SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'sqlite:///dev.db')
    # SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL', 'sqlite:///dev.db').replace('postgres://', 'postgresql://', 1)
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL').replace('postgres://', 'postgresql://', 1)
    SECRET_KEY = os.environ.get('SECRET_KEY')
    FLASK_ENV = os.getenv('FLASK_ENV')
    SCHEMA = os.environ.get('SCHEMA')
    