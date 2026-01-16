#!/bin/bash
cd /home/ubuntu/client-health-dashboard
source venv/bin/activate
python ingest/ingest_main.py
