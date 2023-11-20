from flask_login import UserMixin
from main import db, login_manager

@login_manager.user_loader
def load_user(id)
    user = User.query.get(int(id))
    return user

class User(db.Model):
    __tablename__ = "user"
    _id = db.Column(db.Integer, primary_key=True, unque=True)
    first_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    last_name = db.Column(db.String(50), nullable=False)