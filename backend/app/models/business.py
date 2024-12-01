# backend/app/models/business.py

from app.extensions import db, production_prefix
from app.config import Configuration

class Business(db.Model):
    __tablename__ = 'businesses'
    
    if Configuration.FLASK_ENV == 'production':
        __table_args__ = {'schema': Configuration.SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(production_prefix('users.id'), ondelete="CASCADE"), nullable=False)
    business_name = db.Column(db.String(255), nullable=False)
    business_address = db.Column(db.String(255), nullable=True)
    business_email = db.Column(db.String(255), nullable=True)
    business_website = db.Column(db.String(255), nullable=True)
    business_description = db.Column(db.String(500), nullable=True)
    business_industry = db.Column(db.String(255), nullable=True)
    business_category = db.Column(db.String(255), nullable=True)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'business_name': self.business_name,
            'business_address': self.business_address,
            'business_email': self.business_email,
            'business_website': self.business_website,
            'business_description': self.business_description,
            'business_industry': self.business_industry,
            'business_category': self.business_category
        }