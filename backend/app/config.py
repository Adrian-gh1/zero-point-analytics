# app/config.py

import os

class Configuration:
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'sqlite:///dev.db')
    SECRET_KEY = os.environ.get('SECRET_KEY', 'zKqOTYSp1Svu4bCctn7qFkInQE8gvmgQEPtSYoSo/5I=')
    FLASK_ENV = os.getenv('FLASK_ENV')
    SCHEMA = os.getenv('SCHEMA')