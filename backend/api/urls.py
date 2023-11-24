from flask import jsonify, make_response, url_for, request, current_app
from flask_login import current_user, login_user, logout_user, login_required
from users.models import User, Invoice, Client, Business
from .views import ClientDataAPIView, MultipleClientDataAPIView
from . import api
import datetime



# class based urls
api.add_url_rule('/clients/', view_func=ClientDataAPIView.as_view('client'))
api.add_url_rule('/all-client-data/', view_func=MultipleClientDataAPIView.as_view('multiple_client'))

@api.post('/authenticate/')
def authenticate():
	json = request.json
	auth_message = {
		"valid": False,
		"message": 'User Not Found',
		"level": 'NOTSET',
		"authenticated": False,
		"data": False
	}
	if json:
		email = json.get('email')
		password = json.get('password')
		remember = json.get('remember')
		user = User.query.filter_by(email=email).first()
		if user and user.check_pass(password):
			if not user.is_deleted:
				login_user(user, remember=remember)
				auth_message['valid'] = True
				auth_message['message'] = 'User logged in successfully'
				auth_message['level'] = 'success'
				auth_message['authenticated'] = current_user.is_authenticated
				auth_message['data'] = bool(json)
				return auth_message
			auth_message['message'] = 'Invalid Credentials'
			auth_message['level'] = 'warning'
			return auth_message
		return auth_message
	auth_message['data'] = bool(json)
	auth_message['authenticated'] = current_user.is_authenticated
	return auth_message

@api.post('/register-user/')
def signup():
	json = request.json
	register_message = {
		'created': False,
		'message': 'User Not Created',
		"status": "error"
	}
	if json:
		try:
			user = User.query.get(email=json.get("email"))
			if not user:
				name = json.get("name")
				email = json.get("email")
				busi_nm = json.get("busi_name")
				password = json.get("password")
				hashed = User.generate(password)
				first, last = name.split()
				user = User(name=name, first_name=first, last_name=last, password=hashed)
				business = Business(name="busi_nm", user=user)
				db.session.add_all([user, business])
				db.session.commit()
				register_message['created'] = True
				register_message['message'] = "User created please check your email for validation"
				return register_message
			register_message['created'] = True
			register_message['message'] = "User already exists"
			return register_message
		except:
			pass
	return register_message

@api.post('/users/password-reset/')
def reset_password():
	return ''


@api.get('/overview-data/')
@login_required
def overview():
	invoices = current_user.business.invoices
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
@login_required
def invoices():
	per_page = current_app.config.get('PER_PAGE', 3)
	page = request.args.get('page', type=int)
	pinvoices = Invoice.query.order_by(Invoice.has_paid.asc()).\
				paginate(page=page, per_page=per_page)
	invoices = pinvoices.items
	total = pinvoices.total
	data = {
		"invoices": [
			{
				'trsc_id': invoice.trsc_id,
				'client_name': invoice.client.name,
				'type': invoice.payment_type,
				'ref_id': invoice.ref,
				'amt': invoice.amount,
				'has_paid': invoice.has_paid,
			} for invoice in invoices
		],
		"has_next": pinvoices.has_next,
		"has_prev": pinvoices.has_prev,
		"total": total,
	}
	return data