# backend/app/__init__.py

from flask import Flask
from flask_login import LoginManager
from app.config import Configuration
from app.routes import user_routes
from app.extensions import db, migrate
from app.seeds  import seed_commands

def create_app():
    app = Flask(__name__)
    app.config.from_object(Configuration)

    login_manager = LoginManager()
    login_manager.init_app(app)
    # login_manager.login_view = 'user_routes.login'

    db.init_app(app)
    migrate.init_app(app, db)

    app.cli.add_command(seed_commands)

    with app.app_context():
        db.create_all()

    app.register_blueprint(user_routes)

    return app

app = create_app()





# from flask_login import LoginManager
# from app.models import User

# login_manager = LoginManager()

# @login_manager.user_loader
# def load_user(user_id):
#     return User.query.get(int(user_id))
