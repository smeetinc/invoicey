import requests
import json
import os


token = os.environ.get("PAYSTACK_SECRET_TOKEN")
headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"} # A variable that holds the requests headers
data = {
	"email": "customer@email.com",
	"amount": "20000",
}
json_data = json.dumps(data)
try:
	resp = requests.post("https://api.paystack.co/transaction/initialize", data=json_data, headers=headers)
	print(resp.json())
except requests.exceptions.RequestException as e:
	print("* Request Error")
