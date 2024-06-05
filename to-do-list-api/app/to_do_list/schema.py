import marshmallow as ma
from datetime import datetime
class ToDo(ma.Schema):
    id = ma.fields.Str(dump_only=True, attribute='_id')
    task = ma.fields.Str(required=True)
    description = ma.fields.Str(required=True)
    status = ma.fields.Str(default='665fa52343691636cd0ab63b')
    date = ma.fields.Str(default=f'{datetime.now().date()}')

class Message(ma.Schema):
    message = ma.fields.Str(required=True)

class TodoID(ma.Schema):
    id = ma.fields.Str(required=True)


    