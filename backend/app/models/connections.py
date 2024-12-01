# backend/app/models/connections.py

from app.extensions import db, production_prefix
from app.config import Configuration

class Connection(db.Model):
    __tablename__ = 'connections'
    
    if Configuration.FLASK_ENV == 'production':
        __table_args__ = {'schema': Configuration.SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(production_prefix('users.id'), ondelete="CASCADE"), nullable=False)
    business_id_1 = db.Column(db.Integer, db.ForeignKey(production_prefix('businesses.id'), ondelete="CASCADE"), nullable=False)
    business_id_2 = db.Column(db.Integer, db.ForeignKey(production_prefix('businesses.id'), ondelete="CASCADE"), nullable=False)
    connection_type = db.Column(db.String(255), nullable=True)
    connection_status = db.Column(db.String(255), nullable=True)
    connection_description = db.Column(db.String(500), nullable=True)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'business_id_1': self.business_id_1,
            'business_id_2': self.business_id_2,
            'connection_type': self.connection_type,
            'connection_status': self.connection_status,
            'connection_description': self.connection_description
        }  