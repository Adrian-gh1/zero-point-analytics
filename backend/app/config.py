# app/config.py

import os

class Configuration:
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'sqlite:///dev.db')
    SECRET_KEY = os.environ.get('SECRET_KEY')
    FLASK_ENV = os.getenv('FLASK_ENV')
    SCHEMA = os.environ.get('SCHEMA')


# # New Code

# import os


# class Configuration:
#     SECRET_KEY = os.environ.get('SECRET_KEY')
#     FLASK_RUN_PORT = os.environ.get('FLASK_RUN_PORT')
#     SQLALCHEMY_TRACK_MODIFICATIONS = False
#     # SQLAlchemy 1.4 no longer supports url strings that start with 'postgres'
#     # (only 'postgresql') but heroku's postgres add-on automatically sets the
#     # url in the hidden config vars to start with postgres.
#     # so the connection uri must be updated here (for production)
#     SQLALCHEMY_DATABASE_URI = os.environ.get(
#         'DATABASE_URL').replace('postgres://', 'postgresql://')
#     SQLALCHEMY_ECHO = True

#     FLASK_ENV = os.getenv('FLASK_ENV')
#     SCHEMA = os.environ.get('SCHEMA')