# backend/app/seeds/__init__.py

from flask.cli import AppGroup
from app.config import Configuration

# Seeds Imports (Seed and Undo)
from .users import seed_users, undo_users
from .businesses import seed_businesses, undo_businesses

seed_commands = AppGroup('seed')

@seed_commands.command('all')
def seed():
    if Configuration.FLASK_ENV == 'production':
        # Undo Seed Commands
        undo_users()
        undo_businesses()

    # Seed Commands
    seed_users()
    seed_businesses()

@seed_commands.command('undo')
def undo():
    # Undo Seed Commands
    undo_users()
    undo_businesses()