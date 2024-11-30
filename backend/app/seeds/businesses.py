# backend/app/seeds/businesses.py

from sqlalchemy.sql import text
from app.config import Configuration
from app.extensions import db
from app.models import Business
from app.seeds.seed_data.data_businesses import data_businesses

def seed_businesses():
    business_list = []
    for business in data_businesses:
        business_class = Business(
            user_id=business['user_id'],
            business_name=business['business_name'],
            business_address=business['business_address'],
            business_email=business['business_email'],
            business_website=business['business_website'],
            business_description=business['business_description'],
            business_industry=business['business_industry'],
            business_category=business['business_category']
        )
        business_list.append(business_class)

    db.session.bulk_save_objects(business_list)
    db.session.commit()

def undo_businesses():
    if Configuration.FLASK_ENV == "production":
        db.session.execute(text(f"TRUNCATE table {Configuration.SCHEMA}.businesses RESTART IDENTITY CASCADE;"))
    else:
        db.session.execute(text("DELETE FROM businesses"))

    db.session.commit()