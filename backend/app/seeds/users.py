# backend/app/seeds/users.py

from app.config import Configuration
from app.extensions import db
from sqlalchemy.sql import text
from app.models import User
from werkzeug.security  import generate_password_hash

demo = User(
    username="Demo",
    email="demo@aa.io",
    firstName="Demo",
    lastName="User",
    role="Manager",
    hashedPassword=generate_password_hash("password")
)

john = User(
    username="John",
    email="john@aa.io",
    firstName="John",
    lastName="Doe",
    role="Project Manager",
    hashedPassword=generate_password_hash("password")
)

jane = User(
    username="Jane",
    email="jane@aa.io",
    firstName="Jane",
    lastName="Smith",
    role="HR Manager",
    hashedPassword=generate_password_hash("password")
)

def seed_users():
    db.session.add(demo)
    db.session.add(john)
    db.session.add(jane)
    db.session.commit()

def undo_users():
    if Configuration.FLASK_ENV == "production":
        db.session.execute(f"TRUNCATE table {Configuration.SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()