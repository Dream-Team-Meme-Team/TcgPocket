from flask import Flask
from flask_cors import CORS
from flask_config.config import Config
from flask_config.entities.entities import db
from flask_config.routes.card_reader_routes import card_reader_bp

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*", "supports_credentials": True}})
app.config.from_object(Config)

db.init_app(app)

app.register_blueprint(card_reader_bp)

if __name__ == '__main__':
    app.run(debug=True)
