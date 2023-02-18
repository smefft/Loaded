import datetime
from twilio.rest import Client
from twilio.base.exceptions import TwilioRestException
from urllib import request
from flask import Flask
import json
import geocoder
from pymongo import MongoClient

###### Authenticate to Twilio ######
account_sid = "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
auth_token = "your_auth_token"
client = Client(account_sid, auth_token)

###### Authenticate to Database ######
def get_database():
    CONNECTION_STRING = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
    client = MongoClient(CONNECTION_STRING)
    return client['shipments'] # This will create a database called 'shipments' if does not exist

###### Initialize the Flask app ######
app = Flask(__name__)

###### API Send Message ######
@app.route("/api/v1/send/message", methods=["POST"])
def sendmessage():
    data = request.get_json()
    try:
        message = client.messages.create(
            to = data.get("msg_to"), # Country Code + Phone Number
            from_= data.get("msg_from"), # Country Code + Phone Number
            body = data.get("msg_body")
        ) # The Message
    except TwilioRestException as err:
        return json.dumps({'error':err}), 500, {'ContentType':'application/json'}
    else:
        return json.dumps({'message_id':message.sid}), 200, {'ContentType':'application/json'}

###### API Send Calls ######
@app.route("/api/v1/send/call", methods=["POST"])
def sendcall():
    data = request.get_json()
    try:
        call = client.call.create(
            to = data.get("msg_to"), # Country Code + Phone Number
            from_= data.get("msg_from"), # Country Code + Phone Number
            url = "http://demo.twilio.com/docs/voice.xml"
        )
    except TwilioRestException as err:
        return json.dumps({'error':err}), 500, {'ContentType':'application/json'}
    else:
        return json.dumps({'call_id':call.sid}), 200, {'ContentType':'application/json'}
    
###### API Audit Calls ######
@app.route("/api/v1/send/auditcalls", methods=["GET"])
def auditcalls():
    sms_dict = {}
    for sms in client.call.list():
        sms_dict.append(sms.to)
    return json.dumps(sms_dict), 200, {'ContentType':'application/json'}

###### API Audit Messages ######
@app.route("/api/v1/send/auditmsg", methods=["GET"])
def auditmsg():
    msg_dict = {}
    for msg in client.messages.list():
        msg_dict.append(msg.to)
    return json.dumps(msg_dict), 200, {'ContentType':'application/json'}

###### API Receive Shipments ######
@app.route("/api/v1/receive", methods=["POST"])
def receive():
    data = request.get_json()
    company = data.get("company")
    pickup_address = data.get("pickup_address")
    delivery_address = data.get("delivery_address")
    description = data.get("description")
    weight = data.get("weight")
    dimensions = data.get("dimensions")
    pickup_address_coordinates = geocoder.google(pickup_address)
    delivery_address_coordinates = geocoder.google(delivery_address)
    expiry = datetime.datetime.now() + datetime.timedelta(hours=1)
    # Process to DB?
    shipment = dbname["shipment"] # This will create a collection called 'shipment' if it does not exist
    details = { "Company": company, "pickup_address": pickup_address, "description": description, "weight": weight, "pickup_address_coordinates": pickup_address_coordinates, "expiry": expiry, "dimensions": dimensions, "delivery_address": delivery_address, "delivery_address_coordinates": delivery_address_coordinates }

    try:
        x = shipment.insert_one(details)
    except:
        return json.dumps({'success':False}), 200, {'ContentType':'application/json'}
    else:
        return json.dumps({'success':True}), 200, {'ContentType':'application/json'}
         

###### Connect to Database and Start the Flask app ######
if __name__ == '__main__':
    dbname = get_database()
    app.run(host='0.0.0.0', port=80)