# Import Dependencies
import os
from flask import Flask, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

# Create Flask App
app = Flask(__name__)

# Enable CORS
CORS(app)

# DataBase Configuration
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///friend.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# Create Database Instance
db = SQLAlchemy(app)

frontend_folder = os.path.join(os.getcwd(), "..", "frontend")
dist_folder = os.path.join(frontend_folder, "dist")


# Serve Static  files from the dist_folder under the frontend directory
@app.route("/", defaults={"filename": ""})
@app.route("/<path:filename>")
def index(filename):
    if not filename:
        filename = "index.html"
    return send_from_directory(dist_folder, filename)


# Import Routes
import routes

# Create Database Tables (if they don't already exist)
with app.app_context():
    db.create_all()

# Run the Application
if __name__ == "__main__":
    app.run(debug=True)
