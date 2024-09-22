# Import Dependencies
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

# Create Flask App
app = Flask(__name__)

# Enable CORS
CORS(app)

# DataBase Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///friend.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Create Database Instance
db = SQLAlchemy(app)

# Set Application Root to /api
app.config["APPLICATION_ROOT"] = "/api"

# Import Routes
import routes

# Create Database Tables (if they don't already exist)
with app.app_context():
  db.create_all()

# Run the Application
if __name__ == '__main__':
  app.run(debug=True)