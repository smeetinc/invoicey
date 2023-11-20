from base import base

@base.route('/')
def index():
    return "<h1>Home page</h1>"