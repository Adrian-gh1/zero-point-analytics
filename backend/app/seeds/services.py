# backend/app/seeds/services.py

from sqlalchemy.sql import text
from app.config import Configuration
from app.extensions import db
from app.models import Service
from app.seeds.seed_data.data_services import data_services

def seed_services():
    service_list = []
    for service in data_services:
        service_class = Service(
            user_id=service['user_id'],
            business_id=service['business_id'],
            service_name=service['service_name'],
            service_live=service['service_live'],
            service_industry=service['service_industry'],
            service_description=service['service_description'],
            service_type=service['service_type'],
            service_tags=service['service_tags']
        )
        service_list.append(service_class)

    db.session.bulk_save_objects(service_list)
    db.session.commit()

def undo_services():
    if Configuration.FLASK_ENV == "production":
        db.session.execute(text(f"TRUNCATE table {Configuration.SCHEMA}.services RESTART IDENTITY CASCADE;"))
    else:
        db.session.execute(text("DELETE FROM services"))

    db.session.commit()
