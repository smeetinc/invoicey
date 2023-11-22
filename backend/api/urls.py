from flask import jsonify, make_response, url_for, request
from flask_login import current_user, login_user, logout_user
from users.models import User
from . import api


@api.post('/authenticate/')
def authenticate():
	json = request.json
	auth_message = {
		"valid": False,
		"message": '',
		"level": 'NOTSET',
		"authenticated": '',
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

@api.post('/register_user/')
def signup():
	json = request.json
	register_message = {
		'creation': False
	}
	if json:
		pass
	return register_message

@api.post('/users/password-reset/')
def reset_password():
	return ''