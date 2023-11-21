from werkzeug.security import generate_password_hash as generate, check_password_hash as check_pass
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
    __tablename__ = "users"
    first_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    business = db.relationship("Business", backref="business", lazy=True)
    created_on = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    password = db.Column(db.Text, nullable=False)

    @staticmethod
    def generate_hash(password: str) -> str:
        """\
            A class function that generate hashed based on the data
            given
        """
        return generate(password)

    def check_hash(self, hashed: str) -> bool:
        """\
            Checks if the hashed password match the instance password
        """
        return check_pass(hashed, self.password)

class Business(db.Model, BaseMixin):
    __tablename__ = "business"
    name = db.Column(db.String(120))
    product = db.Column(db.String(100))
    description = db.Column(db.Text)
    user_id = db.Column(db.Integer, db.ForeignKey('users._id'))
    invoices = db.relationship("Invoice", backref="user", lazy=True)

class Client(db.Model, BaseMixin):
    __tablename__ = "clients"
    name = db.Column(db.String(120), unique=False, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users._id"), unique=True)
    invoices = db.relationship("Invoice", backref="client", lazy=True)

class Invoice(db.Model, BaseMixin):
    __tablename__ = "invoices"
    ref = db.Column(db.Text, unique=True, nullable=False)
    product = db.Column(db.String(120), nullable=False)
    description = db.Column(db.Text)
    client_id = db.Column(db.Integer, db.ForeignKey('clients._id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users._id'))
    amount = db.Column(db.Float, nullable=False)
    has_paid = db.Column(db.Boolean, default=False)
    due_date = db.Column(db.Date, nullable=False)
    created_on = db.Column(db.DateTime, default=datetime.datetime.utcnow)
