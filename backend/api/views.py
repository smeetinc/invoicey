from flask.views import MethodView, View
from flask import request, current_app, url_for, request, render_template as render
from users.models import Client, User, Invoice, MerchantBankAccount
from utils import smtnb, create_sub_account
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
				} for client in pclients.items if not client.is_deleted
			],
			"has_next": pclients.has_next,
			"has_prev": pclients.has_prev,
		}
		data['total'] = len(data['clients'])
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
			client = Client.query.filter_by(phone=json.get('phone')).first()
			if client and client.user.business.\
				name == auth.current_user().business.name:
				client_msg['message'] = "Client with that phone already exists"
				client_msg['created'] = False
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
		client_id = request.args.get('_id', type=int)
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
		inv_id = request.args.get("inv_id")
		invoice = Invoice.query.filter_by(inv_id=inv_id).first()
		if invoice and not invoice.is_deleted:
				client = invoice.client
				if client and not client.is_deleted:
					return {
						"inv_id": invoice.inv_id,
						"product_name": invoice.product,
						"description": invoice.description,
						"client_name": invoice.name,
						"amount": invoice.amount,
						"has_paid": invoice.has_paid,
						"due_date": invoice.due_date.strftime("%d/%m/%Y"),
						"pay_type": invoice.payment_type,
					}
		return {
			"message": "invoice not found",
			"valid": False
		}
	
	def delete(self):
		json = request.get_json()
		if json:
			inv_id = json.get('inv_id')
			invoice = Invoice.query.filter_by(inv_id=inv_id).first()
			if invoice and auth.current_user().invoice_created_by_me(invoice.pk):
				invoice.is_deleted = True
				db.session.add(invoice)
				db.session.commit()
				return {
					"message": "Invoice deleted",
					"status": "success"
				}
			return {
				"message": "Invoice not found",
				"status": "error"
			}
		return {
			"message": "Data Not Received",
			"status": "error"
		}
	def post(self):
		data = request.get_json()
		if data:
			merchant = auth.current_user()
			inv_id = secrets.token_hex(25)
			product_name = data.get("product_name")
			description = data.get("description")
			client_name = data.get("client_name")
			amount = data.get("amount")
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
					recipients=[client.email],
					html=render("mail/pay_invoice.html", invoice=invoice, client=client))
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


class BankAPIView(MethodView):
	init_every_request = True
	decorators = [auth.login_required]
	
	def get(self):
		user = auth.current_user()
		if user.bank and not user.bank.is_deleted:
			return {
				"acct_num": user.bank.acct_num,
				"bank_name": user.bank.bank_name,
				"bank_code": user.bank.bank_code,
				"acct_name": user.bank.acct_name,
				"first_name": user.bank.first_name,
				"last_name": user.bank.last_name,
				"status": "success",
				"message": "Merchant Bank"
			}
		return {
			"message": "Merchant bank haven't been created",
			"status": "error"
		}
	
	def post(self):
		json = request.get_json(cache=False)
		user = auth.current_user()
		if json:
			acct_num = json.get("acct_num")
			bank_name = json.get("bank_name")
			acct_name = json.get("acct_name")
			bank_code = json.get("bank_code", type=int),
			first = json.get("first_name")
			last = json.get("last_name")
			other = json.get("other")
			if acct_num and bank_name and acct_name and first and last:
				data = {
					"account_number": str(acct_num),
					"business_name": user.business.name,
					"settlement_bank": str(bank_code),
					"percentage_charge": 10
				}
				bank_account = MerchantBankAccount(acct_num=str(acct_num),
									   bank_name=bank_name, first_name=first,
									   last_name=last, other=other,
									   merchant=user, acct_name=acct_name,
									   bank_code=bank_code)
				resp = create_sub_account(data)
				if resp.get('status'):
					db.session.add(bank_account)
					db.session.commit()
					return {
						"message": "Account number added",
						"status": "success",
					}
				return {
					"message": "Sorry an error occured",
					"status": "error"
				}
			return {
				"message": "Incomplete data resources",
				"status": "error"
			}
		return {
			"message": "Json not received",
			"status": "error"
		}
	def put(self):
		pass
	def delete(self):
		pass