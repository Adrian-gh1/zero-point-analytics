# backend/app/__init__.py

from flask import Flask, jsonify
from flask_login import LoginManager
from flask_cors import CORS
# from flask_wtf.csrf import CSRFProtect, generate_csrf
from app.config import Configuration
from app.routes import user_routes, auth_routes
from app.extensions import db, migrate
from flask_migrate import Migrate
from app.seeds import seed_commands
# from app.models import User

# app = Flask(__name__, static_folder="../frontend/dist", static_url_path="/")
app = Flask(__name__)

login = LoginManager(app)
login.login_view = 'auth_routes.login'

# @login.user_loader
# def load_user(user_id):
#     return User.query.get(int(user_id))

app.cli.add_command(seed_commands)

app.config.from_object(Configuration)
app.register_blueprint(user_routes, url_prefix='/api/users')
app.register_blueprint(auth_routes, url_prefix='/api/auth')
db.init_app(app)
Migrate(app, db)

CORS(app)