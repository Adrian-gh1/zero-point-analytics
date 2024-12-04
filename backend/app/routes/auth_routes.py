# backend/app/routes/auth_routes.py

from flask import Blueprint, request, jsonify
from flask_login import login_user, logout_user, login_required, current_user
from flask_wtf.csrf import generate_csrf 
from werkzeug.security import generate_password_hash
from app.extensions import db
from app.models import User
from app.forms import LoginForm, SignupForm

auth_routes = Blueprint('auth_routes', __name__)

# Login Route
@auth_routes.route('/login', methods=['POST'])
def login():
    form = LoginForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        user = User.query.filter(User.email == form.email.data).first()
        login_user(user)
        return user.to_dict()
    
    return form.errors, 401

# Signup Route
@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    form = SignupForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        hashed_password = generate_password_hash(form.password.data)
        user = User(
            username = form.username.data,
            email = form.email.data,
            firstName = form.firstName.data,
            lastName = form.lastName.data,
            role = form.role.data,
            hashedPassword = hashed_password
        )

        db.session.add(user)
        db.session.commit()
        login_user(user)

        return user.to_dict()
    
    return jsonify({'error': form.errors}), 400
    # return form.errors, 400

# Authenticate Route
@auth_routes.route('/')
def authenticate():
    if current_user.is_authenticated:
        return current_user.to_dict()
    return jsonify({'errors': {'message': 'Unauthorized'}}, 401)

# Logout Route
@auth_routes.route('/logout', methods=['POST'])
@login_required
def logout():
    logout_user()
    return jsonify({'message': 'User logged out'}), 200

@auth_routes.route('/unauthorized')
def unauthorized():
    return {'errors': {'message': 'Unauthorized'}}, 401