# MLA Fitness App

A simple and interactive fitness tracking application that enables users to track exercises and goals, monitor progress, and view analytics. Built as a microservices architecture featuring Node.js, Python (Flask), and Java (Spring Boot)

![Screenshot](screenshots/frontpage.png)

## Table of Contents

- [Project Overview](#project-overview)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Environment Setup](#environment-setup)
  - [Run via Docker Compose](#run-via-docker-compose)
  - [Run Manually (Local Setup)](#run-manually-local-setup)
  - [Development in GitHub Codespaces](#development-in-github-codespaces)
- [Additional MongoDB Commands](#additional-mongodb-commands)
- [Authors](#authors)
- [Contributing](#contributing)
- [CI/CD](#cicd)
- [Additional Documentation](#additional-documentation)

---

## Project Overview

This application was developed as part of a learning track during the Autumn 2024 CFG MLA to explore the fundamentals of microservice architecture and modern software development. You can:
- **Register an account** and manage authentication with a Java-based authentication microservice.
- **Log exercises** with descriptions, duration, and date, with the Node.js/Express activity-tracking service, backed by MongoDB.
- **Set goals** with the Node.js/Express goals service, where you can define targets.
- **Analyse data** with the Python/Flask analytics service, where aggregated statistics provide insights.

## Architecture

Below is the updated overview of the core microservices and their roles:

- **Activity Tracking (Node.js / Express)**  
  Manages create/read/update/delete (CRUD) operations for user exercise logs and stores them in MongoDB. Now includes Prometheus metrics and additional routes for health checks.

- **Analytics (Python / Flask)**  
  Aggregates exercise data from MongoDB. Provides REST and GraphQL endpoints for calculating statistics such as weekly/hourly totals, progress tracking, and more.

- **Authentication (Java / Spring Boot)**  
  Handles user registration, login, and token-based authentication. Updated with enhanced password encryption, CORS configuration, and integrated security checks.

- **Goals (Python / Flask)**  
  Introduced for setting and tracking user-specific fitness goals. Integrates with user data for monitoring progress and status.

The application also features a React-based frontend that communicates with these microservices to offer a cohesive, interactive fitness tracking experience.

## Prerequisites

- **Node.js (v14+ recommended)**
- **MongoDB** (local installation or Docker)
- **Python (3.7+)** with Flask installed  
- **Java 8+** (Gradle/Maven)  
- **Docker & Docker Compose** (optional for container-based setup)

> **Note: These dependencies come pre-installed in the devcontainer.**

## Getting Started

### Environment Setup

Some microservices rely on environment variables (for example MongoDB credentials). An .env file needs to be created in the root directory and for the activity-tracking directory. Two options:

#### Option A: Use the Bash Script

1. Make the script executable (macOS/Linux):
   ```bash
   chmod +x scripts/create-env.sh
   ```
2. Run the script:
    - macOS/Linux:
        ```bash
        ./scripts/create-env.sh
        ```
    - Windows:
        - Using Git Bash:
        ```bash
         bash scripts/create-env.sh
        ```
        - Using WSL:
        ```bash
         chmod +x scripts/create-env.sh
         ./scripts/create-env.sh
        ```
        - Using PowerShell:
        ```powershell
        scripts\create-env.sh
        ```
3. Fill in the prompts for environment variables (e.g., MONGO_INITDB_ROOT_USERNAME, MONGO_INITDB_ROOT_PASSWORD, GRAFANA_PASSWORD ).

4. Verify that a new .env file has been created in the root directory (where docker-compose.yml resides).

#### Option B: Manual Copy

Alternatively, you can simply copy the included `.env.example` files to `.env`, then edit them:

```bash
# In the root directory, copy .env.example to .env
cp .env.example .env

# Move into the activity-tracking directory and copy its .env.example to .env
cd activity-tracking
cp .env.example .env
```

Open `/.env` and update any placeholder values to your desired credentials, do the same for `activity-tracking/.env`

### Run via Docker Compose

This is the recommended method to get all microservices up and running quickly.

1. Ensure your `.env` file is in the root folder (same level as docker-compose.yml).
2. Build and start all containers:
    ```bash
    docker-compose up --build
    ```

3. Once the build completes, visit <http://localhost:3000> to access the React frontend.

If you only want to start containers without rebuilding:
```bash
docker-compose up
```

To stop the containers:
```bash
docker-compose down
```

Spinning up a single service:
```bash
docker-compose up [servicename]
```

Shutting down a service:
```bash
docker-compose down [servicename]
```

## Run Manually (Local Setup)

You can run each microservice on your local machine without Docker Compose. **Each microservice has its own README file** (in its respective folder) with setup and configuration details.

Additionally you will need to run the MongoDB docker container:

```
docker run --name mongodb -d -p 27017:27017 -v mongodbdata:/data/db mongo:latest
```
> Note: Note: For development environments without GitHub Actions or Docker Compose, MongoDB credentials should be set manually. However, for production deployments, credentials are securely managed via GitHub Secrets in the deployment pipeline.

Once all services are running, open your browser and go to <http://localhost:3000> to interact with the Fitness App.

## Development in Github Codespaces

### Starting a new Devcontainer

1. Click on "Code"
2. Switch to the "Codespaces" tab
3. Create new Codespace from main
   <img src="screenshots/codespaces.png" width="300"/>

4. Open Codespace in VS code for best experience:
   <img src="screenshots/codespaces2.png" width="300"/>

Walkthrough: [https://docs.github.com/en/codespaces/developing-in-a-codespace/using-github-codespaces-in-visual-studio-code]

### Check needed packages are installed:

```sh
.devcontainer/check-installation.sh
```

Expected output:

```
Checking installations...
node is /usr/local/bin/node
node is installed with version: v18.16.0
npm is /usr/local/bin/npm
npm is installed with version: 9.5.1
python3 is /usr/bin/python3
python3 is installed with version: Python 3.9.2
pip3 is /usr/bin/pip3
pip3 is installed with version: pip 20.3.4 from /usr/lib/python3/dist-packages/pip (python 3.9)
gradle is /usr/bin/gradle
gradle is installed with version:
------------------------------------------------------------
Gradle 4.4.1
------------------------------------------------------------
......
Done checking installations.
```

## Additional MongoDB Commands

To connect to MongoDB use:
```
mongosh -u $MONGO_INITDB_ROOT_USERNAME -p $MONGO_INITDB_ROOT_PASSWORD --authenticationDatabase admin --host localhost --port 27017
```

show registered activities:
```
db.exercises.find()
```

show registered users:
```sh
db.users.find()
```
MongoDB shell only shows the first 20 results. If you cannot find your user you can search with the below command:
```sh
db.users.find({ username: "new_username" })
```

## Authors

- Alexandra Ross
- Mariterese Obi
- Nicola Ward
- Sara Sabbagh
- Theresa Okyere

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for this projects coding guide.

## CI/CD

This project uses GitHub Actions for:
- Automated unit and integration tests (Jest, Pytest, Gradle).
- Linting, spelling checks, and code quality checks.
- Docker image building for merges to main.
- Optional deployment to Docker Hub.
- Run security scans (ZAP).

For details, see the [workflow files](.github/workflows).

## Additional Documentation

The application is containerized using Docker and can be deployed on any platform that supports Docker containers. For AWS deployment, a GitHub Actions pipeline is configured for CI/CD.

## Workflows

This application has various automated workflows to increase developer experience as you build onto the code base. This include the following;

- Automated unit tests for javascript using jest
- Automated unit tests for python using pytest
- Automated unit tests for java using gradle
- Automated Markdown linting
- Automated Spell checker
- Automated Markdown linter
- Automated Eslint
- Automated Klint

We have also made use of a dependabot that automatically checks through package upgrades by way of opening PRs.

- Further project documentation is hosted on our [Confluence pages](<https://cfg-mla-fta.atlassian.net/wiki/spaces/FTA/pages>).
