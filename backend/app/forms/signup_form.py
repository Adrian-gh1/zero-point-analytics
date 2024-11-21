# backend/app/forms/signup_form.py

from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField
from wtforms.validators import DataRequired, Email, Length, ValidationError
from app.models import User

def unique_email(form, field):
    user = User.query.filter(User.email == field.data).first()
    if user:
        raise ValidationError("Email already exists.")

def unique_username(form, field):
    user = User.query.filter(User.username == field.data).first()
    if user:
        raise ValidationError("Username already exists.")

class SignupForm(FlaskForm):
    username = StringField('Username', validators=[
        DataRequired(message="Username is required"),
        Length(min = 3, max = 80, message="Username must be between 3 and 80 characters"),
        unique_username
    ])

    email = StringField('Email', validators=[
        DataRequired(message="Email is required"),
        Email(message="Please enter a valid email address"),
        unique_email
    ])

    password = PasswordField('Password', validators=[
        DataRequired(message="Password is required"),
        Length(min = 6, message="Password must be at least 6 characters long")
    ])

    firstName = StringField('First Name', validators=[
        DataRequired(message="First name is required"),
        Length(min = 2, max = 80, message="First name must be between 2 and 80 characters")
    ])

    lastName = StringField('Last Name', validators=[
        DataRequired(message="Last name is required"),
        Length(min = 2, max = 80, message="Last name must be between 2 and 80 characters")
    ])

    role = StringField('Role', validators=[
        DataRequired(message="Role is required"),
        Length(min = 3, max = 80, message="Role must be between 3 and 80 characters")
    ])