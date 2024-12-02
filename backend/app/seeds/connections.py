# backend/app/seeds/connections.py

from sqlalchemy.sql import text
from app.config import Configuration
from app.extensions import db
from app.models import Connection
from app.seeds.seed_data.data_connections import data_connections

def seed_connections():
    connection_list = []
    for connection in data_connections:
        connection_class = Connection(
            user_id=connection['user_id'],
            service_id=connection['service_id'],
            business_id_1=connection['business_id_1'],
            business_id_2=connection['business_id_2'],
            connection_type=connection['connection_type'],
            connection_status=connection['connection_status'],
            connection_description=connection['connection_description']
        )
        connection_list.append(connection_class)

    db.session.bulk_save_objects(connection_list)
    db.session.commit()

def undo_connections():
    if Configuration.FLASK_ENV == "production":
        db.session.execute(text(f"TRUNCATE table {Configuration.SCHEMA}.connections RESTART IDENTITY CASCADE;"))
    else:
        db.session.execute(text("DELETE FROM connections"))

    db.session.commit()
