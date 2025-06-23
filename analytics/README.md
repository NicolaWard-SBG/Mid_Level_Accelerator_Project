# Analytics Microservice

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

The Analytics Microservice provides statistical insights and aggregated data based on user activities. It processes exercise data to generate meaningful statistics, such as total duration of exercises per user, types of exercises performed, and weekly summaries. This microservice enhances the user experience by offering analytical views of their fitness progress.

### Architecture

The Analytics Microservice is designed to retrieve and process data from the MongoDB database used by the Activity Tracking Microservice. It performs aggregation queries to compute statistics and exposes RESTful and GraphQL APIs for data retrieval.

- **Database**: Uses MongoDB to read exercise data stored by the Activity Tracking Microservice.
- **Service Dependencies**: Depends on the Activity Tracking Microservice for data input.
- **Message Queue/Event System**: Not applicable in the current architecture.

### Technologies Used

- **Language**: Python 3
- **Frameworks**: Flask, Graphene (for GraphQL)
- **Database**: MongoDB
- **Others**:
  - **PyMongo**: MongoDB driver for Python.
  - **Prometheus Client Library**: For exposing metrics.
  - **Docker**: Containerisation.

### Setup and Installation

Step-by-step instructions to set up and install dependencies for the service.

1.**Clone the Repository**:

```bash
git clone [repository-url]
cd analytics
```

2.**Install Dependencies**:

```bash
pip install -r requirements.txt
```

### Configuration

**Environment Variables**:

- MONGO_INITDB_ROOT_USERNAME: MongoDB username.
- MONGO_INITDB_ROOT_PASSWORD: MongoDB password.
- MONGO_URI: MongoDB connection string.

Ensure these variables are set in your environment (for example a .env file.)

### Running the Service

**Locally:**

```bash
flask run -h localhost -p 5050
```

#### Spinning up a single service

```sh
docker-compose up analytics
```

#### Shutting down a service

```sh
docker-compose down analytics
```

### API Endpoints

**REST Endpoints:**

- GET /
Retrieves all exercise entries.
- GET /stats
Retrieves aggregated statistics for all users.
- GET /stats/<username>
Retrieves aggregated statistics for a specific user.
- GET /stats/weekly/?user=<username>&start=<start_date>&end=<end_date>
Retrieves weekly statistics for a user between specified dates.
- GET /metrics
Exposes Prometheus metrics for monitoring.

**GraphQL Endpoint:**

- POST /api/graphql
Supports GraphQL queries for retrieving statistics.

Sample Query:

```
query {
  stats {
    success
    errors
    results {
      username
      exercises {
        exerciseType
        totalDuration
      }
    }
  }
}
```

## Deployment

The Analytics Microservice is containerised using Docker and can be deployed on any platform that supports Docker containers.

### Testing

#### Automated Testing:

Set up in the CI/CD pipeline using GitHub Actions to run tests on each push or pull request.

## Troubleshooting

**Database Connection Errors:**

- Ensure MONGO_URI is set correctly in .env.
- Ensure MONGO_INITDB_ROOT_USERNAME and MONGO_INITDB_ROOT_PASSWORD are correctly set.
- Verify that the MongoDB server is running and accessible.
- Check that the MONGO_URI is correctly written.
