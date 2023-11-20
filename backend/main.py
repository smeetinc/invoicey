from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_cors import CORS
from flask import Flask
from utils import Config

login_manager = LoginManager()
db = SQLAlchemy()
cors = CORS()

def create_app():
    """\
        A function that creates the application instance
    """
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    cors.init_app(app, origins=["http://localhost:3000"], supports_credentials=True)
    login_manager.init_app(app)

    from base import base

    app.register_blueprint(base)

    return app

app = create_app()