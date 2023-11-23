from flask_wtf.csrf import CSRFProtect
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_mail import Mail
from flask_cors import CORS
from flask import Flask
from utils import Config, DevelopmentConfig





allowed_origins = [
    "http://localhost:3000",
]




login_manager = LoginManager()
db = SQLAlchemy()
cors = CORS()
csrf = CSRFProtect()
mail = Mail()

def create_app():
    """\
        A function that creates the application instance
    """
    app = Flask(__name__)
    app.config.from_object(DevelopmentConfig)

    db.init_app(app)
    csrf.init_app(app)
    mail.init_app(app)
    cors.init_app(app, origins=allowed_origins, supports_credentials=True)
    login_manager.init_app(app)

    from users import users
    from base import base
    from api import api

    app.register_blueprint(base)
    app.register_blueprint(api, url_prefix='/api/')
    app.register_blueprint(users, url_prefix='/users/')

    return app

app = create_app()