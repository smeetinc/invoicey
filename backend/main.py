from flask_httpauth import HTTPTokenAuth
from flask_swagger_ui import get_swaggerui_blueprint
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_mail import Mail
from flask_cors import CORS
from flask import Flask
from utils import Config, DevelopmentConfig



SWAGGER_URL = '/api-docs'
API_URL = '/static/swagger/swagger.json'
ALLOWED_ORGINS = [
    "http://localhost:3000",
    "http://localhost:3000/",
    "http://localhost:5000/",
    "http://olatidejosepha.pythonanywhere.com/"
    "https://invoicey-one.vercel.app",
    "https://olatidejosepha.pythonanywhere.com/"
]


auth = HTTPTokenAuth(scheme="Bearer")
login_manager = LoginManager()
db = SQLAlchemy()
cors = CORS()
mail = Mail()
swagger = get_swaggerui_blueprint(
    SWAGGER_URL,
    API_URL,
    config={
        'app_name': "Invoicey Application API"
    }
)
login_manager.login_message = "User Logged in successfully"
login_manager.login_message_category = "success"
def create_app():
    """\
        A function that creates the application instance
    """
    app = Flask(__name__)
    app.config.from_object(DevelopmentConfig)

    db.init_app(app)
    mail.init_app(app)
    cors.init_app(app, origins="*", supports_credentials=True,
                  methods=['POST', 'GET', 'DELETE', 'PUT'])
    login_manager.init_app(app)

    from users import users
    from base import base
    from api import api

    app.register_blueprint(base)
    app.register_blueprint(swagger)
    app.register_blueprint(api, url_prefix='/api/')
    app.register_blueprint(users, url_prefix='/users/')


    return app

app = create_app()

mail = mail

from users.models import User

@auth.verify_token
def verify_token(token: str):
    """
        An function that validates auth token
    """
    token = User.decode_jwt_token(token)
    _id = token.get("id")
    if _id:
        user = User.query.get(_id)
        if user:
            return User