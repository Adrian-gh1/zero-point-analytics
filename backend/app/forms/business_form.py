# backend/app/forms/business_form.py

from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired, Email, Length, ValidationError, Optional
from app.models import Business

# Custom validation function to check if business name already exists
def business_exists(form, field):
    business = Business.query.filter(Business.businessName == field.data).first()
    if business:
        raise ValidationError("A business with this name already exists.")

class BusinessForm(FlaskForm):
    business_name = StringField('Business Name', validators=[
        DataRequired(message='Business Name is required'),
        Length(min=3, message='Business Name must be at least 3 characters'),
        business_exists
    ])
    
    business_address = StringField('Business Address', validators=[
        DataRequired(message='Business Address is required'),
        Length(min=5, message='Business Address must be at least 5 characters')
    ])
    
    business_email = StringField('Business Email', validators=[
        DataRequired(message='Business Email is required'),
        Email(message='Please enter a valid email address'),
        Optional()  # Makes email optional, but if provided it should be a valid email
    ])
    
    business_website = StringField('Business Website', validators=[
        Optional(),  # Website is optional
        Length(max=255, message='Website URL is too long (max 255 characters)')
    ])
    
    business_description = TextAreaField('Business Description', validators=[
        Optional(),  # Description is optional
        Length(max=500, message='Business Description is too long (max 500 characters)')
    ])
    
    business_industry = StringField('Business Industry', validators=[
        Optional(),  # Industry is optional
        Length(max=100, message='Business Industry should be less than 100 characters')
    ])
    
    business_category = StringField('Business Category', validators=[
        Optional(),  # Category is optional
        Length(max=100, message='Business Category should be less than 100 characters')
    ])
