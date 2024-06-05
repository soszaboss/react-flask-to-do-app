from flask import Flask
from .config import Config
from flask_smorest import Api
def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)
    api = Api(app)

    from app.to_do_list import blp as to_do
    api.register_blueprint(to_do)
    
    return app