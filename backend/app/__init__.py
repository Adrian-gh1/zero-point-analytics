# backend/app/__init__.py

import os
from flask import Flask, request, redirect
from flask_login import LoginManager
from flask_cors import CORS
from flask_wtf.csrf import generate_csrf
from app.config import Configuration
from flask_migrate import Migrate

from app.extensions import db
from app.models import User
from app.seeds import seed_commands

from app.routes import auth_routes
from app.routes import user_routes
from app.routes import business_routes

app = Flask(__name__, static_folder="../../frontend/dist", static_url_path="/")

login = LoginManager(app)
login.login_view = 'auth_routes.login'

@login.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

app.cli.add_command(seed_commands)

app.config.from_object(Configuration)
app.register_blueprint(auth_routes, url_prefix='/api/auth')
app.register_blueprint(user_routes, url_prefix='/api/users')
app.register_blueprint(business_routes, url_prefix='/api/businesses')
db.init_app(app)
Migrate(app, db)

CORS(app)

# NOTE: Verify if needed
# inject_csrf_token - Is needed to pass the CSRF to the frontend 

@app.before_request
def https_redirect():
    if os.environ.get("FLASK_ENV") == "production":
        if request.headers.get("X-Forwarded-Proto") == "http":
            url = request.url.replace("http://", "https://", 1)
            code = 301
            return redirect(url, code=code)

@app.after_request
def inject_csrf_token(response):
    response.set_cookie(
        "csrf_token",
        generate_csrf(),
        secure=True if os.environ.get("FLASK_ENV") == "production" else False,
        samesite="Strict" if os.environ.get("FLASK_ENV") == "production" else None,
        httponly=True,
    )
    return response

@app.route("/api/docs")
def api_help():
    """
    Returns all API routes and their doc strings
    """
    acceptable_methods = ["GET", "POST", "PUT", "PATCH", "DELETE"]
    route_list = {
        rule.rule: [
            [method for method in rule.methods if method in acceptable_methods],
            app.view_functions[rule.endpoint].__doc__,
        ]
        for rule in app.url_map.iter_rules()
        if rule.endpoint != "static"
    }
    return route_list

@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def react_root(path):
    """
    This route will direct to the public directory in our
    react builds in the production environment for favicon
    or index.html requests
    """
    if path == "favicon.ico":
        return app.send_from_directory("public", "favicon.ico")
    return app.send_static_file("index.html")

@app.errorhandler(404)
def not_found(e):
    return app.send_static_file("index.html")