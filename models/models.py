from google.appengine.ext import ndb

class Contacts(ndb.Model):
	name = ndb.StringProperty()
	contact = ndb.IntegerProperty()
	designation = ndb.StringProperty()
	sex = ndb.StringProperty()
	address = ndb.StringProperty()
	email = ndb.StringProperty()