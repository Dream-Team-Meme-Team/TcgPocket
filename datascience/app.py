import os
from flask import Flask
from flask_cors import CORS
from flask_config.config import Config
from flask_config.entities.entities import db
from flask_config.routes.card_reader_routes import card_reader_bp
from flask_config.routes.card_price_routes import card_pricer_bp

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": os.environ.get('ORIGINS'), "supports_credentials": True}})
app.config.from_object(Config)

db.init_app(app)

app.register_blueprint(card_reader_bp)
app.register_blueprint(card_pricer_bp)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)
