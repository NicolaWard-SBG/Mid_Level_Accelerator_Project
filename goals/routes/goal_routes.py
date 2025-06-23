from flask import jsonify, request
from models.goal import Goal
from services.goal_service import GoalService

class GoalRoutes:
    def __init__(self, app, goal_service: GoalService):
        self.app = app
        self.goal_service = goal_service
        self._setup_routes()

    def _setup_routes(self):
        app = self.app

        @app.route('/health', methods=['GET'])
        def health_check():
            return jsonify({"status": "healthy"}), 200

        @app.route('/goals', methods=['GET'])
        def get_goals():
            user_id = request.args.get('user_id')
            if not user_id:
                return jsonify({"error": "user_id is required"}), 400
            try:
                goals = self.goal_service.get_goals_by_user(user_id)  # Ensure this works with the mock
                print("GOALS: ", goals)

                return jsonify(goals=goals), 200
            except Exception as e:
              print("Error: ", e)
              return jsonify({"error": str(e)}), 500

        @app.route('/goals', methods=['POST'])
        def create_goal():
            data = request.json
            if 'user_id' not in data or 'goal_type' not in data or 'date' not in data:
                return jsonify({"error": "user_id, goal_type, and date are required"}), 400

            try:
                goal = Goal.from_dict(data)
                goal_dict = self.goal_service.create_goal(goal)
                return jsonify(goal=goal_dict), 201
            except Exception as e:
                return jsonify({"error": str(e)}), 500

        @app.route('/goals/<goal_id>', methods=['PUT'])
        def update_goal_status(goal_id):
            data = request.json
            status = data.get('status', 'completed')
            try:
                updated_goal = self.goal_service.update_goal_status(goal_id, status)
                return jsonify(updated_goal), 200
            except Exception as e:
                return jsonify({"error": str(e)}), 500