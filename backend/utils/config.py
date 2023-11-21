import os

class Config:
    SQLALCHEMY_DATABASE_URI = "sqlite:///sqlite.db"
    SQLCHEMY_TRACK_MODIFICATION = False
    SQLALCHEMY_COMMIT_ON_TEARDOWN = True
    SECRET_KEY = os.environ.get('SECRET_KEY')
    MAIL_DEFAULT_SENDER = ("Invoicey", "no-reply@invoicey.com")
    MAIL_USE_TLS = True

class DevelopmentConfig(Config):
    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_USERNAME = os.environ.get('EMAIL')
    MAIL_PASSWORD = os.environ.get('e_pass')