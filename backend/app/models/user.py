# backend/app/models/user.py

from flask_login import UserMixin
from werkzeug.security import check_password_hash
from app.extensions import db
from app.config import Configuration


class User(db.Model, UserMixin):
    __tablename__ = 'users'
    if Configuration.FLASK_ENV == 'Production':
        __table_args__ = {'schema': Configuration.SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    firstName = db.Column(db.String(80), nullable=False)
    lastName = db.Column(db.String(80), nullable=False)
    role = db.Column(db.String(80), nullable=False)
    hashedPassword = db.Column(db.String(255), nullable=False)
    
    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'firstName': self.firstName,
            'lastName': self.lastName,
            'role': self.role
        }

    def check_password(self, password):
        return check_password_hash(self.hashedPassword, password)