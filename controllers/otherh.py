from models.models import Contacts
import json, webapp2

from google.appengine.ext import ndb
from google.appengine.api import memcache

class OneOtherHandler(webapp2.RequestHandler):
	def get(self,key):
		getId = int(key)
		contact = Contacts.get_by_id(getId)
		contact_result = {
			"id" : contact.key.id(),
			"name": contact.name,
			"contact": contact.contact,
			"designation": contact.designation,
			"email": contact.email,
			"sex": contact.sex,
			"address": contact.address
			}
		json_str = json.dumps(contact_result)
		self.response.write(json_str)
	def put(self,key):
		json_ip = json.loads(self.request.body)
		put_id = int(key)
		contact = Contacts.get_by_id(put_id)
		contact.name = json_ip['name']
		contact.contact = json_ip['contact']
		contact.address = json_ip['address']
		contact.sex = json_ip['sex']
		contact.email = json_ip['email']
		contact.designation = json_ip['designation']
		contact.put()
		self.response.write("Success: Put")
	def delete(self,key):
		#json_ip = json.loads(self.request.body)
		delete_id = int(key)
		contact  = Contacts.get_by_id(delete_id)
		contact.key.delete()
		self.response.write("Success: Delete")

class OtherHandler(webapp2.RequestHandler):
	def get(self):#R
		contact_list = Contacts.query()
		contact_result = []
		for emp in contact_list:
			contact_result.append({
				"id" : emp.key.id(),
				"name": emp.name,
				"contact": emp.contact,
				"designation": emp.designation,
				"email": emp.email,
				"sex": emp.sex,
				"address": emp.address
				})
		json_str = json.dumps(contact_result)
		# Caching it for five minutes:
        #memcache.add("UsersCache", jsonStr, 300)
		self.response.write(json_str)
	def post(self):#C
		json_ip = json.loads(self.request.body)
		contact = Contacts()
		contact.name = json_ip['name']
		contact.contact = json_ip['contact']
		contact.address = json_ip['address']
		contact.sex = json_ip['sex']
		contact.email = json_ip['email']
		contact.designation = json_ip['designation']
		contact.put()
		self.response.write("Success: Post")
