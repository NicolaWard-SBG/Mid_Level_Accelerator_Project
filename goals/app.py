from flask import Flask
from flask_cors import CORS  # Import Flask-CORS
from services.goal_service import GoalService
from routes.goal_routes import GoalRoutes
from pymongo import MongoClient  # Assuming you are using MongoDB

import os

def create_app(goal_service=None):
    """
    Factory function to create the Flask app.
    Allows injecting a custom goal_service for testing.
    """
    app = Flask(__name__)
    CORS(app)

    # Set up the database and services only if not testing
    if goal_service is None:
        mongo_uri = os.getenv("MONGO_URI", "mongodb://root:password@localhost:27017")
        client = MongoClient(mongo_uri)
        db = client["goals"]
        goals_collection = db["goals"]
        goal_service = GoalService(goals_collection)  # Default production service

    # Pass the goal_service (mock or real) to GoalRoutes
    GoalRoutes(app, goal_service)

    return app

# Define the WSGI app for Gunicorn
app = create_app()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5020)