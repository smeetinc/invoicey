from flask_mail import Message
from main import mail
import threading




def send_mail(*args, **kwargs) -> Message:
	try:
		msg = Message(*args, **kwargs)
		mail.send(msg)
		return True

def send_mail_text(subject: str, message: str, recipients: list=[]) -> Message:
	try:
		msg = Message(subject, recipients=recipients)
		msg.body = message
		mail.send(msg)
		return True
	return False

def send_mail_text_nonblocking(
			subject: str,
			message: str,
			recipients: list=[]) -> None:
	process = threading.Thread(target=send_mail_text,
					args=(subject, message),
					kwargs={"recipients": recipients})
	return process.start()