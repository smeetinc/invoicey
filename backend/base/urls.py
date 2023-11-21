from flask_wtf.csrf import generate_csrf
from flask_login import login_required
from flask import render_template as template, url_for, redirect, abort, request
from main import db
from base import base

@base.route('/')
def index():
    is_from_site = request.headers.get('is_from_site')
    if is_from_site:
        csrf = {
            "csrf_token": generate_csrf()
        }
        return csrf
    abort(403)
    
@base.route('/home')
@login_required
def home():
    return "<h1>Hello</h1>"