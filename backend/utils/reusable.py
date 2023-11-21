from flask_mail import Message
from main import mail
import threading




def send_mail(*args, **kwargs) -> Message:
	pass

def send_mail_text(subject: str, message: str, recipients: list=[]) -> Message:
	msg = Message(subject, recipients=recipients)
	msg.body = Message
	mail.send(msg)
	return True

def send_mail_text_nonblocking(
			subject: str,
			message: str,
			recipients: list=[]) -> None:
	process = threading.Thread(target=send_mail_text,
					args=(subject, message),
					kwargs={"recipients": recipients})
	p.run()