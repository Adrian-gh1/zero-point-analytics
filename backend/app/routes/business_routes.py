# backend/app/routes/business_routes.py

from flask import Blueprint, request, jsonify, redirect, url_for
from flask_login import login_user, logout_user, login_required, current_user
from app.extensions import db
from app.models import Business, User
from app.forms import BusinessForm

business_routes = Blueprint('business_routes', __name__)

@business_routes.route('/all', methods=['GET'])
def get_all_businesses():
    # page = request.args.get('page', 1, type=int) 
    # per_page = request.args.get('per_page', 10, type=int)
    # businesses = Business.query.paginate(page, per_page, False)

    # return jsonify({
    #     'businesses': [{
    #         'id': business.id,
    #         'business_name': business.business_name,
    #         'business_address': business.business_address,
    #         'business_email': business.business_email,
    #         'business_website': business.business_website,
    #         'business_description': business.business_description,
    #         'business_industry': business.business_industry,
    #         'business_category': business.business_category
    #     } for business in businesses.items],
    #     'total_pages': businesses.pages,
    #     'current_page': businesses.page,
    #     'total_items': businesses.total

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
    } for business in businesses],)

@business_routes.route('/my-business', methods=['GET'])
@login_required
def get_user_business():
    user_business = Business.query.filter_by(user_id=current_user.id).first()
   
    if not user_business:
        return jsonify({'error': 'User does not have a business'}), 404

    return jsonify({
        'id': user_business.id,
        'business_name': user_business.business_name,
        'business_address': user_business.business_address,
        'business_email': user_business.business_email,
        'business_website': user_business.business_website,
        'business_description': user_business.business_description,
        'business_industry': user_business.business_industry,
        'business_category': user_business.business_category
    })

@business_routes.route('/<int:businessId>', methods=['GET'])
@login_required
def get_business(businessId):
    business = Business.query.get(businessId)

    if not business:
        return jsonify({'error': 'Business not found'}), 404

    return jsonify({
        'id': business.id,
        'business_name': business.business_name,
        'business_address': business.business_address,
        'business_email': business.business_email,
        'business_website': business.business_website,
        'business_description': business.business_description,
        'business_industry': business.business_industry,
        'business_category': business.business_category
    })

@business_routes.route('/create', methods=['POST'])
@login_required
def create_business():
    form = BusinessForm(request.form)
    
    if form.validate():
        existing_business = Business.query.filter_by(business_name=form.business_name.data).first()
        if existing_business:
            return jsonify({'errors': {'message': 'Business with this name already exists.'}}), 400
        
        new_business = Business(
            business_name=form.business_name.data,
            business_address=form.business_address.data,
            business_email=form.business_email.data,
            business_website=form.business_website.data,
            business_description=form.business_description.data,
            business_industry=form.business_industry.data,
            business_category=form.business_category.data
        )
        
        db.session.add(new_business)
        db.session.commit()

        return jsonify({
            'message': 'Business created successfully',
            'business': new_business.to_dict()
        }), 201

    return jsonify({'errors': form.errors}), 400