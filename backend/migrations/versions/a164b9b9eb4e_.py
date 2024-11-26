"""empty message

Revision ID: a164b9b9eb4e
Revises: c712c6451a36
Create Date: 2024-11-25 15:21:11.233565

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

# revision identifiers, used by Alembic.
revision = 'a164b9b9eb4e'
down_revision = 'c712c6451a36'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('businesses',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('business_name', sa.String(length=255), nullable=False),
    sa.Column('business_address', sa.String(length=255), nullable=True),
    sa.Column('business_email', sa.String(length=255), nullable=True),
    sa.Column('business_website', sa.String(length=255), nullable=True),
    sa.Column('business_description', sa.String(length=500), nullable=True),
    sa.Column('business_industry', sa.String(length=255), nullable=True),
    sa.Column('business_category', sa.String(length=255), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###
    if environment == "production":
        op.execute(f"ALTER TABLE businesses SET SCHEMA {SCHEMA};")


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('businesses')
    # ### end Alembic commands ###
