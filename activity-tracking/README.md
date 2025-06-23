# Activity Tracking Micro-service

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

The **Exercise Tracking Microservice** enables users to log, retrieve, update, and delete exercise records. Users can track their activities by logging details such as the type of exercise, duration, and date. This service integrates with a MongoDB database to persist user activity data.

---

### Architecture

The service is structured as a RESTful microservice and includes:

- **Database**: MongoDB stores all exercise logs, indexed by user and activity details.
- **Service Dependencies**: Operates independently but can integrate with broader applications for fitness tracking or analytics.
- **Message Queue/Event System**: Not applicable for this version.

**Key Features**:

- CRUD operations for exercise records.
- Health check endpoint to verify service status.

---

### Technologies Used

- **Language**: JavaScript (Node.js)
- **Framework**: Express.js
- **Database**: MongoDB
- **Others**: Docker for containerization, Mongoose for object modeling

---

### Setup and Installation

Follow these steps to set up and run the service locally:

1. **Clone the Repository**:

   git clone [repository-url]
   cd [activity-tracking]

2. **Install Dependencies**:

  npm install

**Setup Environment**:

Create a .env file at the root of the project and add the following:

MONGO_INITDB_ROOT_USERNAME: MongoDB username. MONGO_INITDB_ROOT_PASSWORD: MongoDB password.

### Running the service

Run Locally

```

node server.js
Dockerized Setup
```

Build the Docker Image:

```
docker build -t activity-tracking .
```

```
Run the Service with Docker:
docker-compose up activity-tracking
Stop the Service:
```

```
docker-compose down activity-tracking
```

### Sample Requests:

Add an Exercise:

{
    "username": "john_doe",
    "exerciseType": "Running",
    "description": "Morning jog",
    "duration": 30,
    "date": "2024-11-24"
}

### Testing

To run activity-tracking tests:
npx jest --coverage

### Deployment

The service is containerized using Docker. You can deploy it on platforms supporting Docker.

Build the Docker image:

docker build -t activity-tracking .

### Troubleshooting

Database Connection Errors:

Verify that MONGO_INITDB_ROOT_USERNAME and MONGO_INITDB_ROOT_PASSWORD are correctly set in the .env file.
Check MongoDB server status and network access.
Service Not Starting:

Ensure all dependencies are installed with npm install.
Check for port conflicts or firewall issues.
Docker Issues:

Ensure Docker daemon is running.
Verify the Dockerfile and docker-compose.yml configurations.

### Documentation

Additional resources:

MongoDB Documentation: <https://www.mongodb.com/docs/>
Express.js Documentation: <https://expressjs.com>
Docker Documentation: <https://docs.docker.com/>
