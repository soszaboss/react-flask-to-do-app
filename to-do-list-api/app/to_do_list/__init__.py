from flask_smorest import abort, Blueprint

blp = Blueprint("To Do", __name__, url_prefix="/to-do", description="To do view handling")

from app.to_do_list.views import *


