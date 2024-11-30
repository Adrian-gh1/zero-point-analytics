# backend/app/seeds/users.py

from sqlalchemy.sql import text
from werkzeug.security  import generate_password_hash
from app.config import Configuration
from app.extensions import db
from app.models import User
from app.seeds.seed_data.data_users import data_users

def seed_users():
    user_list = []
    for user in data_users:
        hashed_password = generate_password_hash(user['hashed_password'])  
        user_class = User(
            username=user['username'],
            email=user['email'],
            firstName=user['first_name'],
            lastName=user['last_name'],
            role=user['role'],
            hashedPassword=hashed_password
        )
        user_list.append(user_class)

    db.session.bulk_save_objects(user_list)
    db.session.commit()

def undo_users():
    if Configuration.FLASK_ENV == "production":
        db.session.execute(text(f"TRUNCATE table {Configuration.SCHEMA}.users RESTART IDENTITY CASCADE;"))
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()