from flask_httpauth import HTTPTokenAuth
from flask_swagger_ui import get_swaggerui_blueprint
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_mail import Mail
from flask_cors import CORS
from flask import Flask, request, abort
from utils import Config, DevelopmentConfig
import jwt


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
db = SQLAlchemy()
cors = CORS()
mail = Mail()
migrate = Migrate()
swagger = get_swaggerui_blueprint(
    SWAGGER_URL,
    API_URL,
    config={
        'app_name': "Invoicey Application API"
    }
)
def create_app():
    """\
        A function that creates the application instance
    """
    app = Flask(__name__)
    app.config.from_object(DevelopmentConfig)

    db.init_app(app)
    ctx = app.app_context()
    ctx.push()
    db.create_all()
    mail.init_app(app)
    migrate.init_app(app, db=db)
    cors.init_app(app, origins="*", supports_credentials=True,
                  methods=['POST', 'GET', 'DELETE', 'PUT', 'PATCH'])

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
    try:
        token = User.decode_jwt_token(token) if token else None
        if token:
            _id = token.get("id")
            if _id:
                user = User.query.get(_id)
                allowed_view = ['api.overview']
                h = (request.headers.get("Activated") == 'ccrf')\
                    and request.endpoint in allowed_view
                s = request.endpoint == "api.activate_required"
                if (user and user.is_activated) or (user and h) or s:
                    return user
    except jwt.ExpiredSignatureError:
        abort(401, "Token Signature Expired")
    except jwt.InvalidTokenError:
        abort(401, "Invalid Passed In Token")
    except:
        pass