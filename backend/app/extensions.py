# app/extensions.py

from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from app.config import Configuration

db = SQLAlchemy()
migrate = Migrate()

def production_prefix(attribute):
    if Configuration.FLASK_ENV == 'production' and Configuration.SCHEMA:
        return f'{Configuration.SCHEMA}.{attribute}'
    else:
        return attribute