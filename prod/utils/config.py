import os
SECRET_KEY = os.environ.get('SECRET_KEY')
class Config:
    SQLALCHEMY_DATABASE_URI = "sqlite:///sqlite.db"
    SQLCHEMY_TRACK_MODIFICATION = False
    SQLALCHEMY_COMMIT_ON_TEARDOWN = True
    SECRET_KEY = SECRET_KEY if SECRET_KEY else "jaksldkfaalkjfklajklakfa"
    MAIL_DEFAULT_SENDER = ("Invoicey", "no-reply@invoicey.com")
    MAIL_USE_TLS = True
    MAIL_PORT = 587
    PER_PAGE = 10

class DevelopmentConfig(Config):
    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_USERNAME = os.environ.get('EMAIL')
    MAIL_PASSWORD = os.environ.get('e_pass')