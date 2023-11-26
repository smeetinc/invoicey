from flask.views import MethodView, View
from flask import request, current_app, url_for, request, render_template as render
from users.models import Client, User, Invoice
from utils import send_mail_text_nonblocking as smtnb
from main import auth, db
import datetime
import secrets

class MultipleClientDataAPIView(View):
	init_every_request = True
	decorators = [auth.login_required]

	def dispatch_request(self):
		page = request.args.get('page',1, type=int)
		per_page = current_app.config.get('PER_PAGE')
		user = auth.current_user()
		pclients = Client.query.filter_by(user=user).paginate(page=page, per_page=per_page)
		data = {
			"clients": [
				{
					"id": f'EP{client._id}',
					"name": client.name,
					"email": client.email,
					"phone": client.phone,
					"birth_date": client.birth_date.strftime("%d/%m/%Y"),
					"gender": client.gender,
				} for client in pclients.items
			],
			"has_next": pclients.has_next,
			"has_prev": pclients.has_prev,
			"total": pclients.total,
		}
		return data

class ClientDataAPIView(MethodView):
	init_every_request = True
	decorators = [auth.login_required]

	def get(self):
		client_id = request.args.get("_id")
		client_id = int(client_id)
		client = Client.query.get(client_id)
		if client and auth.current_user().\
				client_created_by_me(client_id) and (not client.is_deleted):
			client_data = {
				"id": f'EP{client._id}',
				"name": client.name,
				"email": client.email,
				"phone": client.phone,
				"birth_date": client.birth_date.strftime("%d/%m/%Y"),
				"gender": client.gender,
			}
			return client_data
		return {
			"message": "Client Not Found",
			"status": "error"
		}

	def post(self):
		client_msg = {
			"valid": False,
			"created": False,
		}
		json = request.json
		if json:
			client = Client.query.filter_by(email=json.get('email')).first()
			if client:
				client_msg['message'] = "Client with that email already exists"
				client_msg['created'] = True
				return client_msg
			name = json.get('name')
			email = json.get('email')
			birth_date = json.get('birth_date')
			birth_date = datetime.datetime.strptime(birth_date, '%d/%m/%Y')
			phone = json.get('phone')
			gender = json.get('gender')
			client = Client(name=name, email=email,
						birth_date=birth_date, phone=phone, gender=gender,
						user=auth.current_user())
			db.session.add(client)
			db.session.commit()
			client_msg['valid'] = True
			client_msg['created'] = True
			return client_msg
		return client_msg

	def delete(self):
		client_id = request.args.get('id', type=int)
		current_user = auth.current_user()
		client = Client.query.get(client_id)
		if client and current_user.client_created_by_me(client.pk)\
				and not client.is_deleted:
			client.is_deleted = True
			db.session.add(client)
			db.session.commit()
			resp = {
				"message": "client deleted",
				"status": "success"
			}
			return resp
		return {
			"message": "Client Not Found",
			"status": "error"
		}

class InvoiceDataAPIView(MethodView):
	init_every_request = True
	decorators = [auth.login_required]

	def get(self):
		client_name = request.args.get("client_name")
		client = Client.query.filter_by(name=client_name).first()
		if client and not client.is_deleted:
			invoice = Invoice.query.filter_by(inv_id=name).last()
			if invoice and not invoice.is_deleted:
				return {
					"inv_id": invoice.inv_id,
					"product_name": invoice.product,
					"description": invoice.description,
					"client_name": client_name,
					"amount": client.amount,
					"has_paid": client.has_paid,
					"due_date": client.due_date.strftime("%d/%m/%Y"),
					"pay_type": client.payment_type,
				}
			return {
				"message": "invoice not found",
				"valid": False
			}
		return {
			"message": "client passed in is not found",
			"valid": False,
		}
	def delete(self):
		pass
	def post(self):
		data = request.get_json()
		if data:
			merchant = auth.current_user()
			inv_id = secrets.token_hex(25)
			product_name = data.get("product_name")
			description = data.get("description")
			client_name = data.get("client_name")
			amount = data.get("amt")
			has_paid = data.get("has_paid")
			py_type = data.get("py_type")
			due_date = datetime.datetime.strptime(data.get("due_date"), "%d/%m/%Y")
			client = Client.query.filter_by(name=client_name).first()
			if client and not client.is_deleted:
				invoice = Invoice(inv_id=inv_id, product=product_name,
							description=description, amount=amount,
							payment_type=py_type, has_paid=has_paid,
							due_date=due_date, user=merchant, client=client,
						business=merchant.business)
				db.session.add(invoice)
				db.session.commit()
				#send a nonblocking io mail
				smtnb(f"Invoice Notification for {inv_id}",
					render("pay_invoice.html", invoice=invoice, client=client),
					recipients=[client.email])
				return {
					"message": "invoice created",
					"status": "success"
				}, 201
			return {
				"message": "A client with that name is not found",
				"status": "error"
			}
		return {
			"message": "The Json/body data is not posted",
			"status": "error",
		}



class MultipleInvoiceDataAPIView(View):
	init_every_request = True
	decorators = [auth.login_required]

	def dispatch_request(self, client_name):
		client = Client.query.filter_by("name").first()
		if client and not client.is_deleted:
			invoices = [
						{
							"trsc_id": invoice.trsc_id,
							"inv_id": invoice.inv_id,
							"product": invoice.product,
							"description": invoice.description,
							"has_paid": invoice.has_paid,
							"payment_type": invoice.payment_type,
							"due_date": invoice.due_date.strftime("%d/%m/%Y"),
							"created_on": invoice.created_on,
						} for invoice in client.invoices if not invoice.is_deleted
					]
			return invoices
		return {
			"message": "clients not found",
			"status": "error",
		}