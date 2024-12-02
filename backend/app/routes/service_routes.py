# backend/app/routes/service_routes.py

# Offer vs Request

from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.extensions import db
from app.models import Service, Business
from app.forms import ServiceForm
import json

service_routes = Blueprint('service_routes', __name__)

# Get All Services
@service_routes.route('/all', methods=['GET'])
def get_all_services():
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

    services = Service.query.all()
    return jsonify([service.to_dict() for service in services]), 200

# Get All Business Services
@service_routes.route('/allBusinessServices', methods=['GET'])
@login_required
def get_all_business_services():
    services = Service.query.filter_by(user_id=current_user.id).all()
   
    if not services:
        return jsonify({'error': 'Business does not have any services'}), 404

    services_list = [service.to_dict() for service in services]
    return jsonify(services_list), 200

# Get a Business Service
@service_routes.route('/businessService', methods=['GET'])
@login_required
def get_business_service():
    service = Service.query.filter_by(user_id=current_user.id).first()
   
    if not service:
        return jsonify({'error': 'Business does not have a service'}), 404

    return jsonify(service.to_dict()), 200

# Get a Selected Service
@service_routes.route('/<int:serviceId>', methods=['GET'])
@login_required
def get_business(serviceId):
    service = Service.query.get(serviceId)

    if not service:
        return jsonify({'error': 'Service not found'}), 404

    return jsonify(service.to_dict()), 200

# Create a Service
@service_routes.route('/create', methods=['POST'])
@login_required
def create_service():
    form = ServiceForm(data=request.json)
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate():
        business = Business.query.filter_by(user_id=current_user.id).first()
        if not business:
            return jsonify({'error': 'User does not have an associated business'}), 403    

        new_service = Service(
            user_id=current_user.id,
            business_id=business.id,
            service_name=form.service_name.data,
            service_live=form.service_live.data,
             service_industry=form.service_industry.data,
            service_description=form.service_description.data,
            service_type=form.service_type.data,
            service_tags=form.service_tags.data
        )
        
        db.session.add(new_service)
        db.session.commit()

        return jsonify({
            'message': 'Service created successfully',
            'service': new_service.to_dict()
        }), 201
    
    return jsonify({'errors': form.errors}), 400

# Edit Service Details
@service_routes.route('/edit/<int:serviceId>', methods=['PATCH'])
@login_required
def edit_service(serviceId):
    service = Service.query.filter_by(id=serviceId, user_id=current_user.id).first()

    if not service:
        return jsonify({'error': 'Service not found for the current business'}), 404

    data = request.get_json()

    if 'service_name' in data:
        service.service_name = data['service_name']
    if 'service_live' in data:
        service.service_live = data['service_live']
    if 'service_industry' in data:
        service.service_industry = data['service_industry']
    if 'service_description' in data:
        service.service_description = data['service_description']
    if 'service_type' in data:
        service.service_type = data['service_type']
    if 'service_tags' in data:
        service.service_tags = data['service_tags']

    db.session.commit()

    return jsonify({
        'message': 'Service updated successfully',
        'service': service.to_dict()
    }), 200

# Delete Service
@service_routes.route('/delete/<int:serviceId>', methods=['DELETE'])
@login_required
def delete_service(serviceId):
    service = Service.query.filter_by(id=serviceId, user_id=current_user.id).first()

    if not service:
        return jsonify({'error': 'Service not found or you do not have permission to delete this service'}), 404

    db.session.delete(service)
    db.session.commit()

    return jsonify({'message': 'Service deleted successfully'}), 200
