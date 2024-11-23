# backend/app/__init__.py

from flask import Flask
from flask_login import LoginManager
from flask_cors import CORS
from flask_wtf.csrf import CSRFProtect
from app.config import Configuration
from app.routes import user_routes, auth_routes
from app.extensions import db, migrate
from flask_migrate import Migrate
from app.seeds import seed_commands
from app.models import User

# login = LoginManager()

csrf = CSRFProtect()

def create_app():
    app = Flask(__name__)
    # app.config.from_object(Configuration)

    login = LoginManager(app)
    login.login_view = 'auth_routes.login'

    csrf.init_app(app)

    @login.user_loader
    def load_user(user_id):
        return User.query.get(int(user_id))

    # NOTE: For backend testing
    # app.config['WTF_CSRF_ENABLED'] = False

    # CORS(app)

    # login = LoginManager(app)
    # # login.init_app(app)
    # login.login_view = 'auth_routes.login'

    # db.init_app(app)
    # # migrate.init_app(app, db)
    # Migrate(app, db)

    app.cli.add_command(seed_commands)

    # with app.app_context():
    #     db.create_all()

    app.config.from_object(Configuration)
    app.register_blueprint(user_routes)
    app.register_blueprint(auth_routes)
    db.init_app(app)
    Migrate(app, db)

    CORS(app)

    return app

app = create_app()


# @login.user_loader
# def load_user(user_id):
#     return User.query.get(int(user_id))
