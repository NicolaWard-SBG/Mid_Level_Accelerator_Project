#!/usr/bin/env bash

# Bash script to create the .envs file required for the project 

echo "Let's set up the .env files."
echo

# Prompt for each variable
read -p "Enter MONGO_INITDB_ROOT_USERNAME: " MONGO_INITDB_ROOT_USERNAME
read -p "Enter MONGO_INITDB_ROOT_PASSWORD: " MONGO_INITDB_ROOT_PASSWORD
read -p "Enter GRAFANA_PASSWORD: " GRAFANA_PASSWORD

# Create the .env content
ENV_CONTENT="# Mongo credentials
MONGO_INITDB_ROOT_USERNAME=$MONGO_INITDB_ROOT_USERNAME
MONGO_INITDB_ROOT_PASSWORD=$MONGO_INITDB_ROOT_PASSWORD

# Grafana credentials
GRAFANA_PASSWORD=$GRAFANA_PASSWORD
"

# Write the content to .env file in the project root. This must be in the root as that
# is where docker-compose.yml is located
echo "$ENV_CONTENT" > .env

echo
echo "✅  Root .env file created successfully!"

# Create the content of the activity-tracking/.env (only Mongo credentials)
ACTIVITY_ENV_CONTENT="# Mongo credentials
MONGO_INITDB_ROOT_USERNAME=$MONGO_INITDB_ROOT_USERNAME
MONGO_INITDB_ROOT_PASSWORD=$MONGO_INITDB_ROOT_PASSWORD
"

#Ensure the activity-tracking directory exists and write content to activity-track/.env
if test -d activity-tracking
then 
    echo "$ACTIVITY_ENV_CONTENT" > activity-tracking/.env
fi 

echo "✅  activity-tracking/.env file created successfully!"
echo "❗️ Make sure '.env' files are in your .gitignore so your credentials aren't committed."
echo
