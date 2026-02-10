#!/bin/bash
#
# Client Health Dashboard - Robust Ingestion Wrapper
# Designed to handle all edge cases and prevent silent failures
#

set -o pipefail  # Catch errors in pipes

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
LOG_DIR="${PROJECT_DIR}/logs"
VENV_PYTHON="${PROJECT_DIR}/venv/bin/python"
MAIN_SCRIPT="${SCRIPT_DIR}/ingest_main.py"
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
LOG_FILE="${LOG_DIR}/ingest.log"

# Ensure log directory exists
mkdir -p "${LOG_DIR}"

# Function to log with timestamp
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*" | tee -a "${LOG_FILE}"
}

# Function to handle errors
error_exit() {
    log "ERROR: $1"
    log "Ingestion failed at $(date '+%Y-%m-%d %H:%M:%S')"
    exit 1
}

# Start logging
{
    echo "========================================"
    echo "Scheduled ingestion started at ${TIMESTAMP}"
    echo "========================================"
} >> "${LOG_FILE}"

log "Starting ingestion process..."
log "Working directory: ${PROJECT_DIR}"

# Change to project directory
cd "${PROJECT_DIR}" || error_exit "Failed to change to project directory: ${PROJECT_DIR}"

# Verify Python venv exists
if [ ! -f "${VENV_PYTHON}" ]; then
    error_exit "Python venv not found at ${VENV_PYTHON}"
fi

# Verify main script exists
if [ ! -f "${MAIN_SCRIPT}" ]; then
    error_exit "Ingest script not found at ${MAIN_SCRIPT}"
fi

# Check if process is already running (prevent duplicate executions)
PID_FILE="${PROJECT_DIR}/ingest.pid"
if [ -f "${PID_FILE}" ]; then
    OLD_PID=$(cat "${PID_FILE}")
    if ps -p "${OLD_PID}" > /dev/null 2>&1; then
        log "WARNING: Ingestion already running with PID ${OLD_PID}, skipping this run"
        log "Ingestion skipped at $(date '+%Y-%m-%d %H:%M:%S')"
        exit 0
    else
        log "Removing stale PID file ${PID_FILE}"
        rm -f "${PID_FILE}"
    fi
fi

# Write current PID
echo $$ > "${PID_FILE}"

# Run ingestion with full error handling
log "Executing: ${VENV_PYTHON} ${MAIN_SCRIPT}"

# Capture exit code
if "${VENV_PYTHON}" "${MAIN_SCRIPT}" 2>&1 | tee -a "${LOG_FILE}"; then
    EXIT_CODE=$?
    log "Ingestion completed successfully with exit code: ${EXIT_CODE}"
else
    EXIT_CODE=$?
    log "ERROR: Ingestion failed with exit code: ${EXIT_CODE}"
    log "Check logs above for details"
fi

# Clean up PID file
rm -f "${PID_FILE}"

# End logging
{
    echo "========================================"
    echo "Scheduled ingestion completed at $(date '+%Y-%m-%d %H:%M:%S')"
    echo "Exit code: ${EXIT_CODE}"
    echo "========================================"
    echo ""
} >> "${LOG_FILE}"

exit ${EXIT_CODE}
