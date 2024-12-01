# backend/app/models/services.py

from app.extensions import db, production_prefix
from app.config import Configuration

class Service(db.Model):
    __tablename__ = 'services'
    
    if Configuration.FLASK_ENV == 'production':
        __table_args__ = {'schema': Configuration.SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(production_prefix('users.id'), ondelete="CASCADE"), nullable=False)
    business_id = db.Column(db.Integer, db.ForeignKey(production_prefix('businesses.id'), ondelete="CASCADE"), nullable=False)
    service_name = db.Column(db.String(255), nullable=False)
    service_description = db.Column(db.String(500), nullable=True)
    service_type = db.Column(db.String(255), nullable=True)
    service_tags = db.Column(db.String(255), nullable=True)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'business_id': self.business_id,
            'service_name': self.service_name,
            'service_description': self.service_description,
            'service_type': self.service_type,
            'service_tags': self.service_tags
        }   