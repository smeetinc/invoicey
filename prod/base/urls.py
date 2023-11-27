from flask_wtf.csrf import generate_csrf
from flask_login import login_required
from flask import render_template as template, url_for, redirect, abort, request
from main import db, auth
from base import base

@base.route('/')
@auth.login_required
def index():
    is_from_site = request.headers.get('is-from-site')
    print(is_from_site)
    if is_from_site and is_from_site == "x-token-value":
        csrf = {
            "csrf_token": generate_csrf()
        }
        return csrf
    abort(403)
    
@base.route('/home')
@auth.login_required
def home():
    return "<h1>Hello</h1>"