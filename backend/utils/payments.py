import requests
import json
import os


token = os.environ.get("PAYSTACK_SECRET_TOKEN")
headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"} # A variable that holds the requests headers
data = {
	"email": "customer@email.com",
	"amount": "90000",
}
json_data = json.dumps(data)
try:
	resp = requests.post("https://api.paystack.co/transaction/initialize", data=json_data, headers=headers)
	print(resp.json())
except requests.exceptions.RequestException as e:
	print(" * Request Error")


def create_sub_account(data):
	"""\
		A function that creates a sub account for a user
	"""
	JSON = json.dumps(data)
	resp = requests.post("https://api.paystack.co/subaccount", data=JSON, headers=headers)
	json_resp = resp.json()
	return json_resp

def create_transaction_link(params):
	json_data = json.dumps(params)
	try:
		resp = requests.post(
			"https://api.paystack.co/transaction/initialize", data=json_data, headers=headers)
		resp_json = resp.json()
		print(resp_json)
		return resp_json
	except requests.exceptions.RequestException as e:
		print(" * Request Error")

def check_transaction_status(ref):
	resp = resp = requests.get(
            f"https://api.paystack.co/transaction/verify/{ref}/", headers=headers)
	resp_json = resp.json()
	return resp_json
