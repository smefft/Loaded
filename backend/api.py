import datetime
from twilio.rest import Client
from twilio.base.exceptions import TwilioRestException
from urllib import request
from flask import Flask
import json
import geocoder
from pymongo import MongoClient

# Authenticate to Twilio
account_sid = "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
auth_token = "your_auth_token"
client = Client(account_sid, auth_token)

# Authenticate to Database
def get_database():
    CONNECTION_STRING = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
    client = MongoClient(CONNECTION_STRING)
    return client['shipments'] # This will create a database called 'shipments' if does not exist

# Initialize the Flask app
app = Flask(__name__)

# API Send Message
@app.route("/api/v1/send/message", methods=["POST"])
def sendmessage():
    data = request.get_json()
    try:
        message = client.messages.create(
            to = data.get("msg_to"), # Country Code + Phone Number
            from_= data.get("msg_from"), # Country Code + Phone Number
            body = data.get("msg_body")
        ) # The Message
        return json.dumps({'message_id':message.sid}), 200, {'ContentType':'application/json'}
    except TwilioRestException as err:
        return json.dumps({'error':err}), 500, {'ContentType':'application/json'}

# API Send Calls
@app.route("/api/v1/send/call", methods=["POST"])
def sendcall():
    data = request.get_json()
    try:
        call = client.call.create(
            to = data.get("msg_to"), # Country Code + Phone Number
            from_= data.get("msg_from"), # Country Code + Phone Number
            url = "http://demo.twilio.com/docs/voice.xml"
        )
        return json.dumps({'call_id':call.sid}), 200, {'ContentType':'application/json'}
    except TwilioRestException as err:
        return json.dumps({'error':err}), 500, {'ContentType':'application/json'}

# API Receive Shipments
@app.route("/api/v1/receive", methods=["POST"])
def receive():
    data = request.get_json()
    company = data.get("company")
    address = data.get("address")
    description = data.get("description")
    weight = data.get("weight")
    dimensions = data.get("dimensions")
    
    coordinates = geocoder.google(address)
    expiry = datetime.datetime.now() + datetime.timedelta(hours=1)
    # Process to DB?
    shipment = dbname["shipment"] # This will create a collection called 'shipment' if it does not exist
    details ={ "Company": company, "address": address, "description": description, "weight": weight, "coordinates": coordinates, "expiry": expiry, "dimensions": dimensions }
    try:
        x = shipment.insert_one(details)
    except:
        return json.dumps({'success':False}), 200, {'ContentType':'application/json'}
    else:
        return json.dumps({'success':True}), 200, {'ContentType':'application/json'}
         

# Start the Flask app
if __name__ == '__main__':
    dbname = get_database()
    app.run(host='0.0.0.0', port=80)