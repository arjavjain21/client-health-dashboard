#!/bin/bash
# One-time ingestion script - runs 15 minutes after scheduling
# Will be triggered by sleep in background

cd /home/ubuntu/client-health-dashboard
source venv/bin/activate

# Log start time
echo "========================================" >> /home/ubuntu/client-health-dashboard/logs/ingest.log
echo "Scheduled ingestion started at $(date)" >> /home/ubuntu/client-health-dashboard/logs/ingest.log

# Run ingestion
python ingest/ingest_main.py >> /home/ubuntu/client-health-dashboard/logs/ingest.log 2>&1

# Log completion time
echo "Scheduled ingestion completed at $(date)" >> /home/ubuntu/client-health-dashboard/logs/ingest.log
echo "========================================" >> /home/ubuntu/client-health-dashboard/logs/ingest.log
