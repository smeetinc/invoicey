from flask_mail import Message
import threading




def send_mail(subject, message, **kwargs) -> Message:
	from main import mail
	try:
		msg = Message(subject, **kwargs)
		msg.body = message
		mail.send(msg)
		return True
	except:
		print("error")

def send_mail_text(subject: str, message: str, recipients: list=[]) -> Message:
	from main import mail, app
	ctx = app.app_context()
	ctx.push()
	msg = Message(subject, recipients=recipients)
	msg.body = message
	mail.send(msg)
	return True

def send_mail_text_nonblocking(
			subject: str,
			message: str,
			recipients: list=[]) -> None:
	process = threading.Thread(target=send_mail_text,
					args=(subject, message),
					kwargs={"recipients": recipients})
	return process.start()