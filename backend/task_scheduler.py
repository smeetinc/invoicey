#!/usr/bin/python3
"""
The Python Script which will send email to the
dued invoice client through their email
address.
"""
from flask_mail import Message
from main import app, mail, Client
from datetime import datetime, time
import threading


# push the app local context to this outside scheduler
ctx = app.app_context()
ctx.push()

# query all the client stored in the database
clients = Client.query.all()

# A function that sends multiple emails to client that has overdued invoices
def multiple_dued_invoice_emailer():
    with mail.connect() as conn:
        for client in clients:
            if not client.is_deleted:
                invoices = client.invoices
                for invoice in invoices:
                    if not invoice.is_deleted and not invoice.has_paid:
                        # converts the date object to a datetime object
                        d_to_dt = datetime.combine(invoice.due_date, time())
                        if datetime.utcnow() >= d_to_dt:
                            msg = Message(f"Dued Invoice for {invoice.product}",
                                recipients=[client.email], html='')
                            conn.send(msg)

def threaded_mdie():
    mdie = threading.Thread(target=multiple_dued_invoice_emailer)
    return mdie.start()

if __name__ == "__main__":
    threaded_mdie()