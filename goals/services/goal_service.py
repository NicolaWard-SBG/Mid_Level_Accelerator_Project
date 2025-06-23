from datetime import datetime
from bson.objectid import ObjectId
from models.goal import Goal

class GoalService:
    def __init__(self, goals_collection):
        self.goals_collection = goals_collection

    def create_goal(self, goal: Goal):
        goal_dict = goal.to_dict()
        try:
            result = self.goals_collection.insert_one(goal_dict)
            goal_dict['_id'] = str(result.inserted_id)  # Convert ObjectId to string
            return goal_dict
        except Exception as e:
            raise Exception("Error creating goal") from e

    def update_goal_status(self, goal_id: str, status: str):
        try:
            # Ensure that the goal_id is a valid ObjectId
            if not ObjectId.is_valid(goal_id):
                raise Exception("Invalid goal ID format")

            # Perform the update
            result = self.goals_collection.find_one_and_update(
                {'_id': ObjectId(goal_id)},  # MongoDB ObjectId query
                {'$set': {'status': status}},  # Update the status field
                return_document=True  # Return the updated document
            )

            # If no result found, raise an error
            if not result:
                raise Exception("Goal not found")

            # Convert _id field to string
            result['_id'] = str(result['_id'])

            # Ensure the date is a valid datetime object before converting to ISO format
            if 'date' in result and isinstance(result['date'], datetime):
                result['date'] = result['date'].isoformat()

            return result  # Return the updated goal
        except Exception as e:
            raise Exception(f"Error updating goal status: {str(e)}") from e

    def get_goals_by_user(self, user_id: str):
        try:
            # Fetch all goals for a specific user
            goals = list(self.goals_collection.find({"user_id": user_id}))
            
            # Iterate through the goals and convert fields
            for goal in goals:
                goal['_id'] = str(goal['_id'])  # Convert ObjectId to string

                # Convert date field to ISO format if it's a datetime object
                if 'date' in goal and isinstance(goal['date'], datetime):
                    goal['date'] = goal['date'].isoformat()

            return goals  # Return the list of goals
        except Exception as e:
            raise Exception(f"Error fetching goals: {str(e)}") from e