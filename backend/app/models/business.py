# backend/app/models/business.py

from app.extensions import db
from app.config import Configuration

class Business(db.Model):
    __tablename__ = 'businesses'
    
    if Configuration.FLASK_ENV == 'production':
        __table_args__ = {'schema': Configuration.SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    business_name = db.Column(db.String(255), nullable=False)
    business_address = db.Column(db.String(255), nullable=True)
    business_email = db.Column(db.String(255), nullable=True)
    business_website = db.Column(db.String(255), nullable=True)
    business_description = db.Column(db.String(500), nullable=True)
    business_industry = db.Column(db.String(255), nullable=True)
    business_category = db.Column(db.String(255), nullable=True)
