import os

class Config:
    SQLALCHEMY_DATABASE_URI = "sqlite:///sqlite.db"
    SQLCHEMY_TRACK_MODIFICATION = False
    SQLALCHEMY_COMMIT_ON_TEARDOWN = True
    SECRET_KEY = os.environ.get('SECRET_KEY')