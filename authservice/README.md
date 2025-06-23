# Authservice

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

The **Auth Service** provides user authentication and registration functionalities. It enables user management through signup and login endpoints. This service leverages Spring Security for authentication and MongoDB for storing user data.

### Architecture

This microservice is designed to handle authentication and registration processes.

- **Database**: MongoDB is used to store user information such as username, email, and hashed passwords.
- **Service Dependencies**: It operates as an independent microservice but can integrate with other services requiring authentication.
- **Message Queue/Event System**: Utilizes Spring Security for enforcing authentication and password encryption.

### Technologies Used

List the main languages, frameworks, and libraries specific to this microservice.

- **Language**: Java 8 (Spring Boot) (Already installed in the dev container)
- **Frameworks**: Spring Boot for application development, Spring Security for authentication
- **Database**: MongoDB
- **Others**: Docker for containerization

### Setup and Installation

Step-by-step instructions to set up and install dependencies for the authservice.

1. Clone the repository:

   ```bash
   git clone [repository-url]
   cd authservice
   ```

2. Install Dependencies:

Make sure you have Gradle installed. Then run:

```bash
./gradlew build

```

### Configuration

**Application Properties:**

spring.data.mongodb.database: Name of the MongoDB database.
spring.data.mongodb.uri: MongoDB connection string (includes username and password).

**Environment Variables:**

MONGO_INITDB_ROOT_USERNAME: MongoDB username.
MONGO_INITDB_ROOT_PASSWORD: MongoDB password.

### Running The Service

**Run the Service using Gradle:**

Start the service using:

```bash
./gradlew bootRun
```

#### Spinning up a single service using Docker

```sh
docker-compose up authservice
```

#### Shutting down a service

```sh
docker-compose down authservice
```

### API Endpoints

**Endpoint** | **Method** | **Description**
/api/auth/signup | POST | Register a new user
/api/auth/login | POST | Authenticate a user

Sample Request for `/api/auth/signup`

```
{
  "username": "johndoe",
  "password": "securepassword",
  "email": "john.doe@example.com"
}
```

Sample Response for `/api/auth/signup`

```
{
  "message": "User registered successfully!"
}
```

## Deployment

The service is containerized using Docker. You can deploy it on platforms supporting Docker.

**Build the Docker image:**

```
docker build -t authservice .

```

### Testing

The service includes basic tests.

- AuthserviceApplicationTests: Verifies application context loading.

To run tests use command:

```bash
./gradlew test

Runs tests without cleaning the build directory

or

./gradlew clean test

Cleans the build directory and then runs tests with a fresh build.

visual test to view coverage

./gradlew jacocoTestReport
cd build/reports/jacoco/html
open -a "Google Chrome" index.html

```

## Troubleshooting

**Database Connection Errors:**

Ensure MONGO_INITDB_ROOT_USERNAME and MONGO_INITDB_ROOT_PASSWORD are set correctly. To run locally you may need to add a .env file to your root folder.

Verify that the MongoDB server is running and accessible.

**CORS Issues:**

Configure the allowed origins in AuthApplication.java if you face CORS-related errors.

### Documentation

Link to any additional documentation specific to this service, such as API documentation, architectural diagrams, or setup guides.

- [Spring Security Documentation](https://spring.io/projects/spring-security)
- [MongoDB Documentation](https://www.mongodb.com/docs/)
- [Docker Documentation](https://docs.docker.com/)
- [Gradle Documentation](https://docs.gradle.org/current/userguide/userguide.html)
