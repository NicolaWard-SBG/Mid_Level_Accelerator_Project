# Goals Microservice

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [Configuration](#configuration)
- [Running the Service](#running-the-service)
- [API Endpoints](#api-endpoints)
- [Deployment](#deployment)
- [Testing](#testing)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [Documentation](#documentation)

---

### Overview

Provide a brief summary of the microservice’s purpose and functionality.

Example:

> The **Goals Service** manages user goals, including creation, tracking, and completion. It interacts with the Analytics and Notifications services to provide an integrated experience for users tracking their progress.

### Architecture

Explain how this microservice fits into the overall architecture, any dependencies on other services, and any specific architectural patterns it follows.

This follow the same pattern as the rest of the microservices in the app.

- **Database**: It used the same mongoDB database to store a users goals.
- **Service Dependencies**: This doesn't interact with any other microservice perse but it does require a user to be logged in to function.

### Technologies Used

List the main languages, frameworks, and libraries specific to this microservice.

- **Language**: Python
- **Frameworks**: Flask,
- **Database**: MongoDB,

### Setup and Installation

Step-by-step instructions to set up and install dependencies for the service.

1.**Clone the Repository**:

```bash
git clone [repository-url]
cd [microservice-directory]
```

2.**Install Dependencies**:

```bash
git clone [repository-url]
cd [microservice-directory]
```

3.**Install Dependencies**:

`pip install -r requirements.txt`

### Running the Service

```sh
docker-compose up goals
```

#### Shutting down the Service

```sh
docker-compose down goals
```

### API Endpoints

List all the API endpoints exposed by this microservice with descriptions and sample requests.

Example:

GET /api/goals - Retrieve all goals
POST /api/goals - Create a new goal

Sample Request

```
{
    "user": "test"
    "title": "Run a marathon",
    "DateDate": "git add .2024-12-31"
}
```

## Deployment

Example: The application is containerized using Docker and can be deployed on any platform that supports Docker containers.

### Testing

Provide information on the tests available for this microservice and how to run them.

#### Unit Tests:

run:

````
python -m pytest test/test_goals.py

PYTHONPATH=. pytest
````

#### Automated Testing:

Tested on pr merge to main for linting, spelling, unit tests and gherkin tests.

## Troubleshooting

Provide solutions for common issues that may occur while running or developing this microservice.

**Database Connection Errors:**
For example: Ensure MONGO_URI is set correctly in .env.

### Documentation
