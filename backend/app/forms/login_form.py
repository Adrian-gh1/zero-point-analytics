# backend/app/forms/login_form.py

from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField
from wtforms.validators import DataRequired, Email, Length, ValidationError
from app.models import User

def user_exists(form, field):
    user = User.query.filter(User.email == field.data).first()
    if not user:
        raise ValidationError("Email not found.")

def password_matches(form, field):
    user = User.query.filter(User.email == form.email.data).first()
    if user and not user.check_password(field.data):
        raise ValidationError("Incorrect password.")

class LoginForm(FlaskForm):
    email = StringField('Email', validators=[
        DataRequired(message='Email is required'),
        Email(message='Please enter valid email address'),
        user_exists
    ])
    
    password = PasswordField('Password', validators=[
        DataRequired(message='Password is required'),
        Length(min = 6, message='Password must be at least 6 characters or more'),
        password_matches
    ])
