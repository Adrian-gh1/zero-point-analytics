# backend/app/routes/user_routes.py

from flask import Blueprint, jsonify, redirect, url_for
from flask_login import login_user, logout_user, login_required
from app.models import User

user_routes = Blueprint('user_routes', __name__)

@user_routes.route('/')
# @login_required
def Landing_Page_Test():

    return jsonify(message='Landing Page')

@user_routes.route('/users', methods=['GET'])
# @login_required
def users():

    users = User.query.all()
    return jsonify([user.username for user in users])
