#!/bin/bash

# Database Connection Monitoring Script
# This script checks the database connection and restarts the app if needed

HEALTH_URL="http://localhost:3100/api/health"
LOG_FILE="/home/ubuntu/client-health-dashboard/logs/health-check.log"
MAX_RESTARTS=3
RESTART_COUNT_FILE="/tmp/client-health-restart-count"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

check_health() {
    response=$(curl -s -w "\n%{http_code}" "$HEALTH_URL" 2>/dev/null)
    http_code=$(echo "$response" | tail -n1)
    body=$(echo "$response" | head -n-1)

    if [ "$http_code" = "200" ] && echo "$body" | grep -q "healthy"; then
        return 0
    else
        return 1
    fi
}

restart_app() {
    # Check restart count
    if [ -f "$RESTART_COUNT_FILE" ]; then
        count=$(cat "$RESTART_COUNT_FILE")
        if [ "$count" -ge "$MAX_RESTARTS" ]; then
            log "${RED}ERROR: Already restarted $MAX_RESTARTS times. Not restarting again to avoid restart loop.${NC}"
            return 1
        fi
    else
        count=0
    fi

    # Increment restart count
    echo $((count + 1)) > "$RESTART_COUNT_FILE"

    log "${YELLOW}WARNING: Database health check failed. Restarting application...${NC}"
    pm2 restart client-health-dashboard --update-env

    # Wait for app to start
    sleep 10

    # Reset restart count after successful restart
    if check_health; then
        log "${GREEN}✓ Application restarted successfully${NC}"
        rm -f "$RESTART_COUNT_FILE"
        return 0
    else
        log "${RED}ERROR: Application still unhealthy after restart${NC}"
        return 1
    fi
}

# Main execution
if check_health; then
    log "${GREEN}✓ Database connection healthy${NC}"
    exit 0
else
    log "${RED}✗ Database connection failed${NC}"
    restart_app
    exit $?
fi
