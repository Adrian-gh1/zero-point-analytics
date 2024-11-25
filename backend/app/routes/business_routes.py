# backend/app/routes/business_routes.py

from flask import Blueprint, jsonify, redirect, url_for
from flask_login import login_user, logout_user, login_required
from app.models import Business

business_routes = Blueprint('business_routes', __name__)


@business_routes.route('/all', methods=['GET'])
# @login_required
def get_businesses():
    businesses = Business.query.all()
    return jsonify([{
        'id': business.id,
        'business_name': business.business_name,
        'business_address': business.business_address,
        'business_email': business.business_email,
        'business_website': business.business_website,
        'business_description': business.business_description,
        'business_industry': business.business_industry,
        'business_category': business.business_category
    } for business in businesses])
