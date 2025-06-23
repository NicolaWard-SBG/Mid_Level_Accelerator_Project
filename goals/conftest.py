import pytest

from app import create_app
from dotenv import load_dotenv
load_dotenv()

import sys
import os

sys.path.append(os.path.abspath(os.path.dirname(__file__)))

@pytest.fixture
def client():
    flask_app = create_app()
    flask_app.config["TESTING"] = True

    with flask_app.app_context():
        with flask_app.test_client() as client:
            yield client