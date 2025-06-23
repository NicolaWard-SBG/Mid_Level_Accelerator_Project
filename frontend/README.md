# Frontend Microservice

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

The Frontend Microservice provides the user interface for the MLA Fitness App, enabling users to interact with various features such as activity tracking, goals, and analytics. It serves as the primary point of interaction between users and the backend services.

### Architecture

This microservice is a React-based single-page application (SPA) that communicates with multiple backend microservices to fetch and display data.

- **Service Dependencies**:
  - **Activity Tracking Service**: Manages user exercise logs.
  - **Goals Service**: Manages user goals, including creation, tracking, and completion.
  - **Analytics Service**: Provides insights and statistics.
  - **Authentication Service**: Handles user authentication and authorization.

### Technologies Used

- **Language**: JavaScript, Node.js.
- **Frameworks**: React.js
- **UI Library**: Material-UI
- **Routing**: React Router
- **Package Manager**: npm

### Setup and Installation

Step-by-step instructions to set up and install dependencies for the service.

1. **Clone the Repository**:

   ```bash
   git clone [https://github.com/NicolaWard-SBG/MLA-app.git]
   cd [MLA-app/frontend]
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

### Configuration

Ensure that the frontend is configured to communicate with the correct backend services. Update the API endpoint URLs in the environment configuration files as needed.

### Running the Service

To start the frontend service:

### Developing within a dev container using Docker

#### Spinning up a single service

```sh
docker-compose up [frontend]
```

#### Shutting down a service

```sh
docker-compose down [frontend]
```

### Development without using Docker-Compose

1. **Development Mode**:

   ```bash
   cd frontend
   npm install
   npm start
   ```

   This command runs the app in development mode.

2. **Production Build**:

   ```bash
   npm run build
   ```

   This command builds the app for production to the `build` folder.

### API Endpoints

The frontend interacts with various backend APIs. Ensure that the API endpoint URLs are correctly configured in the frontend code.

**Example:**
POST /api/auth/login - logs user into the app
POST /exercises/add - adds new user exercise data

**Sample Request:**

```
{
    "username": "user1",
    "password": "password"
}
```

### Deployment

The frontend application is containerized using Docker and can be deployed on any platform that supports Docker containers. A GitHub Actions pipeline is configured for CI/CD.

### Testing

Testing is crucial to ensure the reliability of the frontend application.

1. **Unit Tests**:

   ```bash
   npm test
   ```

   This command launches the test runner in interactive watch mode, it will also run a coverage check on the frontend unit tests.

2. **Integration Tests**:

   Integration tests can be set up using testing libraries like Jest and React Testing Library.

3. **Automated Testing**:

   A GitHub Actions CI/CD pipeline has been configured to run tests automatically on pull requests.

### Troubleshooting

Common issues and their solutions:

- **Application Not Starting**:

  - Ensure all dependencies are installed: `npm install`.
  - Check for any errors in the console and address them accordingly.

- **API Connection Issues**:
  - Verify that the backend services are running and accessible.
  - Check the API endpoint URLs in the configuration files.

### Contributing

Contributions are welcome! Please follow the standard GitHub workflow:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes with descriptive messages.
4. Push your branch and create a pull request.

### Documentation

For more detailed information, refer to the following resources:

- [MLA Fitness App Repository](https://github.com/NicolaWard-SBG/MLA-app.git)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Material-UI Documentation](https://mui.com/getting-started/installation/)

For any further questions or issues, please refer to the project's GitHub repository or contact the maintainers.
