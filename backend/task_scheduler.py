#!/usr/bin/python3
"""
The Python Script which will send email to the
dued invoice client through their email
address.
"""
from main import app, mail, Client
import threading

# push the app local context to this outside scheduler
ctx = app.app_context()
ctx.push()

# query all the client stored in the database
clients = Client.query.all()

# A function that sends multiple emails to client that has overdued invoices
def multiple_dued_invoice_emailer():
    with mail.connect() as conn:
        msg = Message()
        #client emails
    conn.send()

def threaded_mdie():
    pass

if __name__ == "__main__":
    threaded_mdie()