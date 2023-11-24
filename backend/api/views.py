from flask.views import MethodView, View
from flask_login import login_required, current_user
from flask import request, current_app, url_for, request
from users.models import Client
import datetime

class MultipleClientDataAPIView(View):
	init_every_request = True
	decorators = [login_required]

	def dispatch_request(self):
		page = request.args.get('page',1, type=int)
		per_page = current_app.config.get('PER_PAGE')
		user = current_user._get_current_object()
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
	decorators = [login_required]

	def get(self):
		client_id = request.args.get("id")
		client_id = int(client_id.strip("EP"))
		client = Client.query.get(_id=client_id)
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
			"created": True,
		}
		json = request.json
		if json:
			name = json.get('name')
			email = json.get('email')
			birth_date = json.get('birth_date')
			birth_date = datetime.datetime.strptime('')
			phone = json.get('phone')
			gender = json.get('gender')
			client = Client(name=name, email=email,
						birth_date=birth_date, phone=phone, gender=gender)
			db.session.add(client)
			db.session.commit()
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