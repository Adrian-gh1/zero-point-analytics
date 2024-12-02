# backend/app/forms/service_form.py

from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SelectField, FieldList, FormField, BooleanField
from wtforms.validators import DataRequired, Length, Optional, ValidationError
from app.models import Service

# def service_name_exists(form, field):
#     business_id = form.business_id.data
#     if Service.query.filter_by(business_id=business_id, service_name=field.data).first():
#         raise ValidationError("A service with this name already exists for the selected business.")

class ServiceForm(FlaskForm):
    service_name = StringField('Service Name', validators=[
        DataRequired(message='Service Name is required'),
        Length(min=3, message='Service Name must be at least 3 characters'),
        # service_name_exists
    ])
    
    service_description = TextAreaField('Service Description', validators=[
        DataRequired(message='Service Description is required'),
        Length(max=500, message='Service Description is too long (max 500 characters)')
    ])
    
    service_type = StringField('Service Type', validators=[
        # DataRequired(message='Service Type is required'),
        Optional(),
        Length(max=100, message='Service Type should be less than 100 characters')
    ])
    
    service_tags = StringField('Service Tags', validators=[
        # DataRequired(message='Service Tags are required'),
        Optional(),
        Length(max=255, message='Service Tags should be less than 255 characters')
    ])

    service_live = BooleanField('Service Live', default=False, validators=[
        # DataRequired(message='Service Live status is required')
        Optional(),
    ])
    
    service_industry = StringField('Service Industry', validators=[
        Optional(),
        Length(max=255, message='Service Industry should be less than 255 characters')
    ])
