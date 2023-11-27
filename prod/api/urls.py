from flask import jsonify, make_response, url_for, request, current_app, render_template as render
from users.models import User, Invoice, Client, Business
from utils import smtnb, send_mail_text, send_mail
from main import db, auth
from .views import (ClientDataAPIView, MultipleClientDataAPIView,
					BankAPIView, InvoiceDataAPIView, MultipleInvoiceDataAPIView)
from . import api
import jwt
import datetime



# class based urls
api.add_url_rule('/clients/', view_func=ClientDataAPIView.as_view('client'))
api.add_url_rule('/all-client-data/',
				 view_func=MultipleClientDataAPIView.as_view('multiple_client'))
api.add_url_rule('/invoice/', view_func=InvoiceDataAPIView.as_view('invoice'))
api.add_url_rule('/multi/invoice/', view_func=MultipleInvoiceDataAPIView.as_view('multi_invoice'))
api.add_url_rule('/bank/', view_func=BankAPIView.as_view('bank_acct'))

# function based view
@api.post('/authenticate/')
def authenticate():

	json = request.get_json()
	auth_message = {
		"valid": False,
		"message": 'User Not Found',
		"level": 'NOTSET',
		"authenticated": False,
		"data": False,
		"refresh_token": "",
		"is_activated": "False"
	}
	if json:
		email = json.get('email')
		password = json.get('password')
		remember = json.get('remember')
		user = User.query.filter_by(email=email).first()
		print(user)
		if user and user.check_hash(password):
			if not user.is_deleted:
				#creates refresh token
				refresh_token = user.encode_id()
				auth_message['refresh_token'] = refresh_token
				auth_message['is_activated'] = user.is_activated
				auth_message['data'] = bool(json)
				if user.is_activated:
					#after token created
					auth_message['valid'] = True
					auth_message['message'] = 'User logged in successfully'
					auth_message['level'] = 'success'
					return auth_message
				auth_message['valid'] = True
				auth_message['message'] = "Account is not activated please check your email to activate"
				auth_message['level'] = "warning"
				return auth_message
		auth_message['message'] = 'Invalid Credentials'
		auth_message['level'] = 'warning'
		return auth_message, 401
	auth_message['data'] = bool(json)
	auth_message['authenticated'] = False
	return auth_message, 401

@api.post('/register-user/')
def signup():
	json = request.get_json()
	register_message = {
		'created': False,
		'message': 'User Not Created',
		"status": "error"
	}
	if json:
		user = User.query.filter_by(email=json.get("email")).first()
		if not user:
			name = json.get("name")
			email = json.get("email")
			busi_nm = json.get("busi_nm")
			password = json.get("password")
			hashed = User.generate_hash(password)
			li_name = name.split()
			if len(li_name) == 2:
				first, last = li_name[0], li_name[1]
				user = User(first_name=first, last_name=last, password=hashed,
				email=email, name=name)
				business = Business(name=busi_nm, merchant=user)
				db.session.add_all([user, business])
				db.session.commit()
				register_message['created'] = True
				register_message['message'] = "User created please check your email for validation"
				register_message['status'] = "success"
				token = user.encode_id()
				subject = "Verify Your Invoicy Account"
				html = render("mail/creation_verify.html", token=token, user=user)
				smtnb(subject, recipients=[email], html=html)
				return register_message, 201
			register_message["message"] = "You can only pass in First and Last Name"
			return register_message
		register_message['created'] = True
		register_message['message'] = "User already exists"
		return register_message
	return register_message

@api.post("/users/resend-activation-link/")
def resend_creation_link():
	json = request.get_json()
	email = json.get('email')
	user = User.query.filter_by(email=email).first()
	if user:
		token = user.encode_id()
		subject = "Verify Your Invoicy Account"
		html = render("mail/creation_verify.html", token=token, user=user)
		smtnb(subject, recipients=[email], html=html)
	return {
		"message": "If you have an account with us you'll receive and email",
		"status": "success"
	}

@api.post("/users/activate/<string:token>/")
def activate_user(token: str):
	try:
		token = User.decode_jwt_token(token)
		_id = token.get("id")
		if token and _id:
			user = User.query.get(_id=_id)
			if user:
				user.is_activated = True
				db.session.add(user)
				db.session.commit()
				return {
					"message": "User account activated !",
					"status": "success"
				}
			return {
				"message": "Sorry an error occured",
				"status": "success"
			}
		return {
			"message": "Token was not specified",
			"status": "error"
		}
	except jwt.ExpiredSignatureError:
		return {
			"message": "Token Expired",
			"status": "error"
		}
	except jwt.InvalidTokenError:
		return {
			"message": "Tampered token invalid",
			"status": "error"
		}

@api.post('/users/password-reset/')
def reset_password():
	json = request.get_json()
	if json:
		email = json.get("email")
		user = User.query.filter_by(email=email).first()
		if user and not user.is_deleted:
			try:
				token = user.encode_id()
				if token:
					subject = "Reset Password Token"
					html = render("mail/merchant_reset.html", token=token, user=user)
					smtnb(subject, recipients=[email], html=html)
					return {
						"status": "success",
						"message": "Mail sent !",
					}

			except:
				return {
					"status": "error",
					"message": "An error has occured"
				}
		return {
			"status": "error",
			"message": "No user found for that email address"
		}
	return {
		"status": "error",
		"message": "JSON data not received"
	}

@api.post('/verify_reset/<string:token>/<int:_id>')
def verify_reset(token: str, _id: int):
	user = User.query.get(_id)
	data = {
		"message": "Error with token provided",
		"valid": False,
		"changed": False
	}
	if user:
		decoded = user.decode_jwt_token(token)
		if decoded.get('id') == _id:
			user.is_activated = True
			db.session.add(user)
			db.session.commit()
			data['message'] = "Validated"
			return data
		
@api.get('/overview-data/')
@auth.login_required
def overview():
	invoices = auth.current_user().business.invoices
	total_invoices = len(invoices)
	total_dued = 0
	total_paid = 0
	for invoice in invoices:
		if invoice.has_paid:
			total_paid += invoices.amount
			continue
		due_date = datetime.date.today() - invoice.due_date
		if due_date.days >= 0:
			total_dued += 1

	data = {
		"total_invoice": total_invoices,
		"total_dued": total_dued,
		"total_paid": total_paid,
	}
	return data

@api.get("/invoices-data/")
@auth.login_required
def invoices():
	per_page = current_app.config.get('PER_PAGE', 3)
	page = request.args.get('page', type=int)
	pinvoices = Invoice.query.order_by(Invoice.has_paid.asc()).\
				paginate(page=page, per_page=per_page)
	invoices = pinvoices.items
	total = 0
	data = {
		"invoices": [
			{
				'trsc_id': invoice.trsc_id,
				'client_name': invoice.client.name,
				'type': invoice.payment_type,
				'ref_id': invoice.ref_id,
				'inv_id': invoice.inv_id,
				'amt': invoice.amount,
				'has_paid': invoice.has_paid,
				'py_type': invoice.payment_type,
			} for invoice in invoices if invoice.user.name == auth.current_user().name
		],
		"has_next": pinvoices.has_next,
		"has_prev": pinvoices.has_prev,
	}
	data['total'] = len(data['invoices'])
	return data

@api.post("/activate_required/")
@auth.login_required
def activate_required():
	user = auth.current_user()
	user.is_activated = True
	db.session.add(user)
	db.session.commit()
	return {
		"message": "User Account Activated",
		"status": "success",
	}

@api.get("/get-user-data/")
@auth.login_required
def get_user_data():
	user = auth.current_user()
	data = {
		"name": user.name,
		"first_name": user.first_name,
		"last_name": user.last_name,
		"email": user.email,
		"business_name": user.business.name
	}
	return data

@api.app_errorhandler(500)
def internal_error(e):
	return {
		"message": e.name,
		"code": e.code,
	}, 500

@api.app_errorhandler(404)
def not_found(e):
	return {
		"message": e.name,
		"code": e.code,
	}, 404

@api.app_errorhandler(403)
def forbidden(e):
	return {
		"message": e.name,
		"code": e.code,
	}, 403

@api.app_errorhandler(401)
def unauthorized(e):
	return {
		"message": e.name,
		"code": e.code,
		"description": e.description,
	}, 401

@api.app_errorhandler(502)
def bad_gateway(e):
	return {
		"message": e.name,
		"code": e.code,
	}, 502

# @api.app_errorhandler(400)
# def bad_request(e):
# 	return {
# 		"message": e.nam
# 		"code": e.code,
# 	}, 400