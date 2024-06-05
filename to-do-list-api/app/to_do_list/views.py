from app.db import Database, FetchQuery
from app.to_do_list.schema import ToDo, Message, TodoID
from app.to_do_list import blp as bp
from flask.views import MethodView
from flask_smorest import abort
URL = 'mongodb://127.0.0.1:27017/'
TO_DO_DBS = 'to_do_list'
TASK_COLLECTION = 'tasks'
@bp.route('/')
class Index(MethodView):
    @bp.response(200, ToDo(many=True), description='get all the to do')
    def get(self):
        try:
            query = FetchQuery(URL)
            to_do = query.find(db=TO_DO_DBS, collection_name=TASK_COLLECTION)
            return to_do
        except:
            return abort(500, message='Internal server error, retry later')

    @bp.arguments(ToDo)
    @bp.response(201, ToDo, description='create a to do')
    def post(self, data):
        try:
            database = Database(URL)
            query = FetchQuery(URL)
            insert_to_do = database.insert_one(db=TO_DO_DBS, collection_name=TASK_COLLECTION, doc=data)
            to_do = query.find_one_by_id(db=TO_DO_DBS, collection_name='tasks', id=insert_to_do)
            print(*to_do)
            return to_do[0]
        except:
            return abort(500, message='Internal server error, retry later')

    @bp.arguments(TodoID)
    @bp.response(204, Message, description='delete a to do')
    def delete(self, data):
        try:
            database = Database(URL)
            print(data['id'])
            database.delete_one_by_id(db=TO_DO_DBS, collection_name=TASK_COLLECTION, id=data['id'])
            return 'To Do Deleted Successfully'
        except:
            return abort(500, message='Internal server error, retry later')



