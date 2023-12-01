from werkzeug.security import generate_password_hash
from flask import (jsonify, make_response, url_for, request,
                   current_app, render_template as render, abort)
from users import User, Invoice, Client, Business, Transaction
from utils import (smtnb, send_mail_text, send_mail,
				    check_transaction_status, create_transaction_link)
from main import db, auth
from .views import (ClientDataAPIView, MultipleClientDataAPIView,
                    BankAPIView, InvoiceDataAPIView, MultipleInvoiceDataAPIView,
					QueryTrscByInvView)
from . import api
import jwt
import secrets
import datetime


# class based urls
api.add_url_rule('/clients/', view_func=ClientDataAPIView.as_view('client'))
api.add_url_rule('/all-client-data/',
                 view_func=MultipleClientDataAPIView.as_view('multiple_client'))
api.add_url_rule('/invoice/', view_func=InvoiceDataAPIView.as_view('invoice'))
api.add_url_rule('/multi/invoice/<string:client_name>/',
                 view_func=MultipleInvoiceDataAPIView.as_view('multi_invoice'))
api.add_url_rule('/bank/', view_func=BankAPIView.as_view('bank_acct'))
api.add_url_rule('/all-inv-trsc/', view_func=QueryTrscByInvView.as_view('inv_trsc_all'))

# function based view


@api.post('/authenticate/')
def authenticate():
	"""\
		The user authentication endpoint.
	"""
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
				# creates refresh token
				refresh_token = user.encode_id()
				auth_message['refresh_token'] = refresh_token
				auth_message['is_activated'] = user.is_activated
				auth_message['data'] = bool(json)
				if user.is_activated:
					# after token created
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
	"""\
		The user registration endpoint
	"""
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
	"""\
		an endpoint that resends activation/creation link
	"""
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
	"""\
		an endpoint that activates user based on the token
		passed on by path.
	"""
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
	"""\
		an endpoint that sends a password reset
		message to the user
	"""
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


@api.post('/verify_reset/<string:token>/<string:password>/')
def verify_reset(token: str, password: str):
	"""\
		An endpoint that verifies password reset
		and changes it to the user password
	"""
	message = {
		"message": "User Password Changed",
		"status": "error",
		"changed": True
	}
	try:
		user_id = User.decode_jwt_token(token)
		if user_id:
			user_id = user_id['id']
			user = User.query.get(user_id)
			if user and not user.is_deleted:
				user.password = generate_password_hash(password)
				db.session.add(user)
				db.session.commit()
				return message
			message['message'] = "User not found"
			message['status'] = "success"
			message['changed'] = False
			return message
	except jwt.ExpiredSignatureError:
		message['message'] = "Expired user token"
		message['status'] = " error"
		message['changed'] = False
		return message
	except jwt.InvalidTokenError:
		message['message'] = "Invalid user token"
		message['status'] = " error"
		message['changed'] = False
		return message
	except:
		abort(401, "Error outside of expected token")


@api.get('/overview-data/')
@auth.login_required
def overview():
	"""\
		Gets the dashboard data overview data
	"""
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
	"""\
		Returns a paginated list of invoice
	"""
	per_page = current_app.config.get('PER_PAGE', 3)
	page = request.args.get('page', type=int)
	pinvoices = Invoice.query.order_by(Invoice.has_paid.asc()).\
            paginate(page=page, per_page=per_page)
	invoices = pinvoices.items
	data = {
		"invoices": [
			{
				'trsc_id': invoice.trsc_id,
				'client_name': invoice.client.name,
				'type': invoice.payment_type,
				'ref_id': invoice.ref_id,
				'inv_id': invoice.inv_id,
				'amt': invoice.amount,
				'description': invoice.description,
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
	"""\
		A function view that activates the user based on the passed
		on the header
	"""
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
	"""\
		Get the current authenticated user data
	"""
	user = auth.current_user()
	data = {
		"name": user.name,
		"first_name": user.first_name,
		"last_name": user.last_name,
		"email": user.email,
		"business_name": user.business.name
	}
	return data


@api.post("/send-trsc-link/")
@auth.login_required
def send_trsc_link():
	"""\
		Resends transaction link to client email
	"""
	json = request.get_json()
	ref = json['trsc_id']
	old_trsc = Transaction.query.filter_by(trsc_id=ref).first()
	if old_trsc:
		all_trsc = [trsc.trsc_id for trsc in Transaction.query.all()]
		transaction_ref = secrets.token_hex(16)
		client = old_trsc.client
		invoice = old_trsc.client
		while (transaction_ref in all_trsc):
			transaction_ref = secrets.token_hex(16)
		link = create_transaction_link({
			"email": client.email,
			"amount": int(old_trsc.amount),
			"reference": transaction_ref,
			"metadata": {
				"business_name": auth.current_user().business.name
			}
		})
		if link['status']:
			transaction = Transaction(trsc_id=transaction_ref, status="Pending",
								client=client,
								invoice=invoice, payout=link['data']['authorization_url'])
			invoice.trsc_id = transaction.trsc_id
			db.session.add_all([invoice, transaction])
			db.session.commit()
			# send a nonblocking io mail
			smtnb(f"Invoice Notification for {invoice.inv_id}",
						recipients=[client.email],
						html=render("mail/pay_invoice.html", invoice=invoice, client=client,
									user=auth.current_user(), transaction=transaction))
			return {
                    "message": "Mail Sent",
					"status": "success",
					"ref": transaction.trsc_id,
					"inv_id": invoice.inv_id,
					"old_ref": old_trsc.trsc_id
            }
		return {
			"message": "Error creating transaction link",
			"status": "error"
		}
	return {
		"message": "No transaction with that ref id",
		"status": "error"
	}


@api.get("/update-transaction-status/")
@auth.login_required
def update_transaction():
	"""\
		Updates the transaction status of an invoice
	"""
	merchants_clients = auth.current_user().clients
	ref = request.args.get("trsc_ref")
	trsc = Transaction.query.filter_by(trsc_id=ref).first()
	if (trsc.client in merchants_clients) and (not trsc.client.is_deleted):
		trsc_status = check_transaction_status(ref)
		data_status = trsc_status['data']['status']
		if trsc_status['status'] and data_status == 'success':
			trsc.status = trsc_status['data']['status']
			invoice = trsc.invoice
			invoice.has_paid = True
			user_email = invoice.client.user.email
			mail_subject = f"Client {invoice.client.name} Paid {invoice.amount}"
			smtnb(mail_subject, recipients=[user_email], html="")
			db.session.add_all([invoice, trsc])
			db.session.commit()
			return {
				"status": "success",
				"pay_stats": trsc.status,
			}
		return {
                    "status": "network error",
					"pay_stats": data_status,
                }
	return {
		"status": "reference not found",
		"pay_stats": "error"
	}


@api.get("/trsc-inv-by-ref/")
@auth.login_required
def trsc_inv():
	"""\
		Returns all the transactions invoice
	"""
	ref = request.args.get('ref')
	trsc = Transaction.query.filter_by(trsc_id=ref).first()
	current_user = auth.current_user()
	if trsc and trsc.client in current_user.clients:
		invoice = trsc.invoice
		return {
                    'trsc_id': invoice.trsc_id,
                    'client_name': invoice.client.name,
                    'type': invoice.payment_type,
					'ref_id': invoice.ref_id,
					'inv_id': invoice.inv_id,
					'amt': invoice.amount,
					'has_paid': invoice.has_paid,
					'py_type': invoice.payment_type,
                }
	return {
		"message": "Either an invoice with that ref is not found, or transaction client is not you",
		"status": "error"
	}

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
