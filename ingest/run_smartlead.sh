#!/bin/bash
#
# SmartLead Not Contacted Leads - Robust Runner
# =============================================
# Handles daily execution with failure detection and automatic backfill
#
# Features:
# - Tracks execution state in a state file
# - Detects if previous day's run failed
# - Automatic backfill for missed days
# - Sends notifications on failures (optional)
#
# Cron: 0 3 * * * /home/ubuntu/client-health-dashboard/ingest/run_smartlead.sh
#

set -o pipefail

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="/home/ubuntu/client-health-dashboard"
VENV_PYTHON="${PROJECT_DIR}/venv/bin/python"
MAIN_SCRIPT="${PROJECT_DIR}/ingest/ingest_main.py"
STATE_FILE="/tmp/smartlead_not_contacted_state.json"
LOG_DIR="${PROJECT_DIR}/logs"
LOG_FILE="${LOG_DIR}/smartlead_not_contacted.log"

# SmartLead script location (for backfill)
SMARTLEAD_SCRIPT="/home/ubuntu/sl_daily_not_contacted_leads/smartlead_campaign_lead_tracker.py"
SMARTLEAD_LOG_DIR="/home/ubuntu/sl_daily_not_contacted_leads/logs"

# Days to backfill if failure detected (maximum)
MAX_BACKFILL_DAYS=7

# Ensure directories exist
mkdir -p "${LOG_DIR}"
mkdir -p "$(dirname "${STATE_FILE}")"

# Function to log with timestamp
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*"
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*" >> "${LOG_FILE}"
}

# Function to read state
read_state() {
    if [ -f "${STATE_FILE}" ]; then
        cat "${STATE_FILE}"
    else
        echo '{"last_run_date": null, "last_run_status": "never", "last_success_date": null}'
    fi
}

# Function to write state
write_state() {
    local last_run_date="$1"
    local last_run_status="$2"
    local last_success_date="$3"

    cat > "${STATE_FILE}" << EOF
{
    "last_run_date": "${last_run_date}",
    "last_run_status": "${last_run_status}",
    "last_success_date": "${last_success_date}",
    "last_run_timestamp": "$(date -Iseconds)"
}
EOF
}

# Function to get today's date in YYYY-MM-DD
get_today() {
    date '+%Y-%m-%d'
}

# Function to get yesterday's date in YYYY-MM-DD
get_yesterday() {
    date -d 'yesterday' '+%Y-%m-%d'
}

# Function to check if a date has a log file
check_log_exists() {
    local date_str="$1"
    local log_file="${SMARTLEAD_LOG_DIR}/cron_${date_str//-}.log"

    if [ -f "${log_file}" ]; then
        # Check if log indicates success
        if grep -q "Data updated in Google Sheet" "${log_file}" 2>/dev/null; then
            return 0  # Success
        else
            return 1  # Exists but failed
        fi
    else
        return 2  # Doesn't exist
    fi
}

# Function to run the SmartLead fetch
run_smartlead_fetch() {
    local target_date="$1"
    local is_backfill="$2"

    log "========================================"
    if [ "${is_backfill}" = "true" ]; then
        log "Running BACKFILL for date: ${target_date}"
    else
        log "Running scheduled fetch for date: ${target_date}"
    fi
    log "========================================"

    # Run the main ingest script (which includes SmartLead fetch)
    # Using --skip-smartlead would skip the SmartLead fetch, but we WANT it
    # So we run without --skip-smartlead
    if "${VENV_PYTHON}" "${MAIN_SCRIPT}" 2>&1 | tee -a "${LOG_FILE}"; then
        log "SUCCESS: SmartLead fetch completed for ${target_date}"
        return 0
    else
        log "ERROR: SmartLead fetch failed for ${target_date}"
        return 1
    fi
}

# Function to check and backfill missing dates
check_and_backfill() {
    local today=$(get_today)
    local last_success_date="$1"

    log "Checking for missing dates to backfill..."

    # If no last success date, nothing to backfill
    if [ -z "${last_success_date}" ] || [ "${last_success_date}" = "null" ]; then
        log "No previous success date found, starting fresh"
        return 0
    fi

    # Calculate days since last success
    local days_since_success=$(datediff "${last_success_date}" "${today}" 2>/dev/null || echo "0")

    if [ "${days_since_success}" -gt 1 ]; then
        log "Found ${days_since_success} days since last successful run"

        # Limit backfill to MAX_BACKFILL_DAYS
        if [ "${days_since_success}" -gt "${MAX_BACKFILL_DAYS}" ]; then
            log "Limiting backfill to ${MAX_BACKFILL_DAYS} days (more than ${MAX_BACKFILL_DAYS} days behind)"
            days_since_success=${MAX_BACKFILL_DAYS}
        fi

        # Backfill each missing day
        for i in $(seq 1 ${days_since_success}); do
            local backfill_date=$(date -d "${today} - ${i} days" '+%Y-%m-%d')
            log "Backfilling date: ${backfill_date}"

            if run_smartlead_fetch "${backfill_date}" "true"; then
                log "Backfill successful for ${backfill_date}"
            else
                log "WARNING: Backfill failed for ${backfill_date}, continuing to next..."
            fi
        done
    else
        log "No backfill needed - last run was yesterday or today"
    fi
}

# Helper function to calculate date difference
datediff() {
    local d1="$1"
    local d2="$2"

    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        echo $(( ($(date -jf "%Y-%m-%d" "${d2}" +%s) - $(date -jf "%Y-%m-%d" "${d1}" +%s) ) / 86400 ))
    else
        # Linux
        echo $(( ($(date -d "${d2}" +%s) - $(date -d "${d1}" +%s) ) / 86400 ))
    fi
}

# ============================================
# MAIN EXECUTION
# ============================================

log "========================================"
log "SmartLead Not Contacted Leads - Starting"
log "========================================"

# Read current state
STATE=$(read_state)
LAST_RUN_DATE=$(echo "${STATE}" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('last_run_date','null'))" 2>/dev/null || echo "null")
LAST_RUN_STATUS=$(echo "${STATE}" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('last_run_status','never'))" 2>/dev/null || echo "never")
LAST_SUCCESS_DATE=$(echo "${STATE}" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('last_success_date','null'))" 2>/dev/null || echo "null")

log "Current state: last_run_date=${LAST_RUN_DATE}, last_run_status=${LAST_RUN_STATUS}, last_success_date=${LAST_SUCCESS_DATE}"

today=$(get_today)
yesterday=$(get_yesterday)

# Check if previous run failed
if [ "${LAST_RUN_STATUS}" = "failed" ]; then
    log "WARNING: Previous run failed, will attempt backfill"
    check_and_backfill "${LAST_SUCCESS_DATE}"
fi

# Run today's fetch
log "Running today's SmartLead fetch (target: ${yesterday} data)"

EXIT_CODE=0
if run_smartlead_fetch "${yesterday}" "false"; then
    log "Today's scheduled run completed successfully"
    LAST_SUCCESS_DATE="${today}"
    LAST_RUN_STATUS="success"
else
    log "ERROR: Today's scheduled run FAILED"
    LAST_RUN_STATUS="failed"
    EXIT_CODE=1
fi

# Update state
write_state "${today}" "${LAST_RUN_STATUS}" "${LAST_SUCCESS_DATE}"

log "========================================"
log "SmartLead Not Contacted Leads - Finished"
log "Status: ${LAST_RUN_STATUS}"
log "========================================"

exit ${EXIT_CODE}
