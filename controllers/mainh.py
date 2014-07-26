import webapp2, os
from google.appengine.ext.webapp import template

class MainHandler(webapp2.RequestHandler):
    def get(self):
        path = os.path.join(os.path.dirname(__file__),'../index.html')
            # if users.get_current_user():
            #     url = users.create_logout_url(self.request.uri)
            #     url_linktext = 'Logout'
            # else:
            #     url = users.create_login_url(self.request.uri)
            #     url_linktext = 'Login'
        self.response.write(template.render(path,{}))