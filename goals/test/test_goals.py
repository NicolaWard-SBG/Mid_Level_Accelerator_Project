import pytest
from unittest.mock import MagicMock, patch
from app import create_app
from services.goal_service import GoalService

@pytest.fixture
def client():
    # Mock GoalService
    mock_goal_service = MagicMock(spec=GoalService)

    # Create the app with the mocked GoalService
    app = create_app(goal_service=mock_goal_service)
    app.testing = True  # Enable testing mode

    # Return the test client and mock service
    with app.test_client() as test_client:
        yield test_client, mock_goal_service

def test_health_check(client):
    test_client, _ = client

    response = test_client.get('/health')
    assert response.status_code == 200
    assert response.json == {"status": "healthy"}

def test_get_goals_success(client):
    test_client, mock_goal_service = client

    # Mock data to be returned by the GoalService
    mock_goals = [
        {
            "_id": "64c9d7f4e4b0f5e7d94e3021",
            "user_id": "alisalaman",
            "goal_type": "fitness",
            "date": "2024-12-16T10:00:00Z",
            "status": "in-progress",
        }
    ]
    mock_goal_service.get_goals_by_user.return_value = mock_goals

    # Make a GET request to the /goals endpoint with a query parameter
    response = test_client.get('/goals?user_id=alisalaman')

    # Assert the response
    assert response.status_code == 200
    assert "goals" in response.json
    assert response.json["goals"] == mock_goals

    # Verify the mock was called with the correct arguments
    mock_goal_service.get_goals_by_user.assert_called_once_with("alisalaman")

def test_get_goals_missing_user_id(client):
    test_client, _ = client

    # Make a GET request without the user_id query parameter
    response = test_client.get('/goals')

    # Assert the response
    assert response.status_code == 400
    assert "error" in response.json
    assert response.json["error"] == "user_id is required"

def test_get_goals_service_error(client):
    test_client, mock_goal_service = client

    # Simulate an exception raised by the GoalService
    mock_goal_service.get_goals_by_user.side_effect = Exception("Database error")

    # Make a GET request with a query parameter
    response = test_client.get('/goals?user_id=123')

    # Assert the response
    assert response.status_code == 500
    assert "error" in response.json
    assert response.json["error"] == "Database error"