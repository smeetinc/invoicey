from werkzeug.security import generate_password_hash as generate, check_password_hash as check_pass
from flask_login import UserMixin
from flask import current_app
from main import db, login_manager
import datetime
import jwt

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
    business = db.relationship("Business", backref="business", uselist=False)
    created_on = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    clients = db.relationship("Client", backref='user', lazy=True)
    password = db.Column(db.Text, nullable=False)
    is_activate = db.Column(db.Boolean, default=False)

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

    def client_created_by_me(self, _id: int):
        """\
            checks if the given client id was created by the user
        """
        return (_id in [client.pk for client in self.clients])

    @staticmethod
    def create_jwt_token(**kwargs) -> str:
        encoded = jwt.encode(kwargs, current_app.config['SECRET_KEY'], algorithm="HS256")
        return encoded

    @staticmethod
    def decode_jwt_token(val: str) -> dict:
        decoded = jwt.decode(val, current_app.config['SECRET_KEY'], algorithms="HS256")
        return decoded

    def encode_id(self):
        amt = datetime.timedelta(hours=24)
        encoded = self.create_jwt_token(**{"id": self._id, "exp": datetime.datetime.utcnow() + amt})
        return encoded


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
    email = db.Column(db.String(150), unique=True, nullable=False)
    birth_date = db.Column(db.Date)
    gender = db.Column(db.String(1))
    phone = db.Column(db.String(13))
    user_id = db.Column(db.Integer, db.ForeignKey("users._id"), unique=True)
    invoices = db.relationship("Invoice", backref="client", lazy=True)

class Invoice(db.Model, BaseMixin):
    __tablename__ = "invoices"
    ref_id = db.Column(db.Text, unique=True)
    trsc_id = db.Column(db.Integer, unique=True)
    inv_id = db.Column(db.Text, unique=True)
    product = db.Column(db.String(120), nullable=False)
    description = db.Column(db.Text)
    client_id = db.Column(db.Integer, db.ForeignKey('clients._id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users._id'))
    business_id = db.Column(db.Integer, db.ForeignKey('business._id'))
    amount = db.Column(db.Float, nullable=False)
    has_paid = db.Column(db.Boolean, default=False)
    payment_type = db.Column(db.String(50), default="Transfer", nullable=False)
    due_date = db.Column(db.Date, nullable=False)
    created_on = db.Column(db.DateTime, default=datetime.datetime.utcnow)

class Transaction(db.Model, BaseMixin):
    __tablename__ = "transactions"
    trsc_id = db.Column(db.Integer, unique=True)
    invoice_id = db.Column(db.Integer, db.ForeignKey('invoices._id'))
    client_id = db.Column(db.Integer, db.ForeignKey('clients._id'))
