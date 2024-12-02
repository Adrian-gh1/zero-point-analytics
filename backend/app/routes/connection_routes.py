# backend/app/routes/connection_routes.py

from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.extensions import db
from app.models import Connection

connection_routes = Blueprint('connection_routes', __name__)

# Get All Connections
@connection_routes.route('/all', methods=['GET'])
def get_all_connections():
    connections = Connection.query.all()

    return jsonify([connection.to_dict() for connection in connections]), 200

# Get All Business Connections
@connection_routes.route('/allBusinessConnections', methods=['GET'])
@login_required
def get_all_business_connections():
    connections = Connection.query.filter_by(user_id=current_user.id).all()
   
    if not connections:
        return jsonify({'error': 'Business does not have any connections'}), 404

    connections_list = [connection.to_dict() for connection in connections]
    return jsonify(connections_list), 200

# Get a Business Connection
@connection_routes.route('/businessConnection', methods=['GET'])
@login_required
def get_business_connection():
    connection = Connection.query.filter_by(user_id=current_user.id).first()

    if not connection:
        return jsonify({'error': 'No connections found for this user'}), 404
    
    return jsonify(connection.to_dict()), 200

# Get a Selected Connection
@connection_routes.route('/<int:connectionId>', methods=['GET'])
@login_required
def get_connection(connectionId):
    connection = Connection.query.get(connectionId)

    if not connection:
        return jsonify({'error': 'Connection not found'}), 404
    
    return jsonify(connection.to_dict()), 200

# Create a Connection
@connection_routes.route('/create', methods=['POST'])
@login_required
def create_connection():
    data = request.get_json()

    if not data.get('service_id'):
        return jsonify({'error': 'service_id is required'}), 400
    if not data.get('business_id_1'):
        return jsonify({'error': 'business_id_1 is required'}), 400
    if not data.get('business_id_2'):
        return jsonify({'error': 'business_id_2 is required'}), 400
    if not data.get('connection_type'):
        return jsonify({'error': 'connection_type is required'}), 400
    if not data.get('connection_status'):
        return jsonify({'error': 'connection_status is required'}), 400
    if not data.get('connection_description'):
        return jsonify({'error': 'connection_description is required'}), 400

    if data['business_id_1'] == data['business_id_2']:
        return jsonify({'error': 'A business cannot connect with itself'}), 400

    new_connection = Connection(
        user_id=current_user.id,
        service_id=data['service_id'],
        business_id_1=data['business_id_1'],
        business_id_2=data['business_id_2'],
        connection_type=data['connection_type'],
        connection_status=data['connection_status'],
        connection_description=data['connection_description']
    )

    db.session.add(new_connection)
    db.session.commit()

    return jsonify({
        'message': 'Connection created successfully',
        'connection': new_connection.to_dict()
    }), 201

# Edit Connection Details
@connection_routes.route('/edit/<int:connectionId>', methods=['PATCH'])
@login_required
def edit_connection(connectionId):
    connection = Connection.query.filter_by(id=connectionId, user_id=current_user.id).first()

    if not connection:
        return jsonify({'error': 'Connection not found or you do not have permission to edit this connection'}), 404

    data = request.get_json()

    if 'connection_type' in data:
        connection.connection_type = data['connection_type']
    if 'connection_status' in data:
        connection.connection_status = data['connection_status']
    if 'connection_description' in data:
        connection.connection_description = data['connection_description']

    db.session.commit()

    return jsonify({
        'message': 'Connection updated successfully',
        'connection': connection.to_dict()
    }), 200

# Delete Connection
@connection_routes.route('/delete/<int:connectionId>', methods=['DELETE'])
@login_required
def delete_connection(connectionId):
    connection = Connection.query.filter_by(id=connectionId, user_id=current_user.id).first()

    if not connection:
        return jsonify({'error': 'Connection not found or you do not have permission to delete this connection'}), 404

    db.session.delete(connection)
    db.session.commit()

    return jsonify({'message': 'Connection deleted successfully'}), 200