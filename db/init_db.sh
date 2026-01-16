#!/bin/bash
# Initialize local PostgreSQL database for Client Health Dashboard v1

set -e

# Database configuration
DB_NAME="client_health_dashboard_v1"
DB_USER="ubuntu"
SCHEMA_FILE="/home/ubuntu/client-health-dashboard/db/schema.sql"

echo "Initializing Client Health Dashboard v1 database..."

# Check if database exists
DB_EXISTS=$(sudo -u postgres psql -tAc "SELECT 1 FROM pg_database WHERE datname='$DB_NAME'")

if [ "$DB_EXISTS" = "1" ]; then
    echo "Database $DB_NAME already exists. Skipping creation."
else
    echo "Creating database: $DB_NAME"
    sudo -u postgres psql -c "CREATE DATABASE $DB_NAME;"
    echo "Database created successfully."
fi

# Grant permissions to ubuntu user
echo "Granting permissions to $DB_USER..."
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO $DB_USER;"

# Connect to database and create schema
echo "Creating database schema..."
sudo -u postgres psql -d "$DB_NAME" -f "$SCHEMA_FILE"

echo "Database initialization complete!"
echo "Database: $DB_NAME"
echo "Connection string: postgresql://$DB_USER@localhost:5432/$DB_NAME"
