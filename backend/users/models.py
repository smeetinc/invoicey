from flask_login import UserMixin
from main import db, login_manager
import datetime

@login_manager.user_loader
def load_user(id):
    user = User.query.get(int(id))
    return user

class BaseMixin:
    _id = db.Column(db.Integer, primary_key=True, unique=True)
    is_deleted = db.Column(db.Boolean, default=False)

    @property
    def pk(self):
        return self._id
    
    @pk.setter
    def set_id(self, _id):
        self._id = _id

class User(db.Model, BaseMixin, UserMixin):
    __tablename__ = "user"
    first_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    business = db.relationship("Business", backref="business", lazy=True)
    created_on = db.Column(db.DateTime, default=datetime.datetime.utcnow)


class Business(db.Model, BaseMixin):
    __tablename__ = "business"
    name = db.Column(db.String(120))
    product = db.Column(db.String(100))
    description = db.Column(db.Text)
    user_id = db.Column(db.Integer, db.ForeignKey('user._id'))