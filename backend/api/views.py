from flask.views import MethodView, View
from flask import request, current_app, url_for, request
from users.models import Client, User
from main import auth
import datetime

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
		client_id = request.args.get("name")
		client_id = int(client_id.strip("EP"))
		client = Client.query.filter_by(name=client_id)
		if client and client.\
				client_created_by_me(client_id.pk) and not client.is_deleted:
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
			user = User.query.filter_by(email=json.get('email')).first()
			if user:
				client_msg['message'] = "Client with that email already exists"
				client_msg['created'] = True
				return client_msg
			name = json.get('name')
			email = json.get('email')
			birth_date = json.get('birth_date')
			birth_date = datetime.datetime.strptime('%d/%m/%Y')
			phone = json.get('phone')
			gender = json.get('gender')
			client = Client(name=name, email=email,
						birth_date=birth_date, phone=phone, gender=gender)
			db.session.add(client)
			db.session.commit()
			client_msg['valid'] = True
			client_msg['created'] = True
			return client_msg
		return client_msg

	def delete(self):
		client_id = request.args.get('id')
		client_id = client_id.strip("EP")
		client = Client.query.get(client_id)
		if client and client.client_created_by_me(client_id.pk)\
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
		name = request.args.get('trsc_id')
		if name:
			invoice = Invoice.query.filter_by(trsc_id=trsc_id).first()
			if invoice and invoice:
				pass
	def delete(self):
		pass
	def post(self):
		pass


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
							"due_date": invoice.due_date,
							"created_on": invoice.created_on,
						} for invoice in client.invoices if not invoice.is_deleted
					]
			return invoices
		return {
			"message": "clients not found",
			"status": "error",
		}
