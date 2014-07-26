from google.appengine.api import users
from google.appengine.ext import ndb

import webapp2

from controllers import mainh,otherh

application = webapp2.WSGIApplication([
    ('/', mainh.MainHandler),
    ('/api/crudlist',otherh.OtherHandler),
    ('/api/crudone/([^/]+)',otherh.OneOtherHandler)
], debug=True)
