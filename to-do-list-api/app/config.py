import os
import dotenv
import uuid

dotenv.load_dotenv()


class Config:
    SECRET_KEY = uuid.uuid4().hex
    API_TITLE = os.environ.get('API_TITLE')
    API_VERSION = os.environ.get('API_VERSION')
    OPENAPI_VERSION = os.environ.get('OPENAPI_VERSION')