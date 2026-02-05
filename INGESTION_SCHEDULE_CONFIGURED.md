# Ingestion Schedule Configuration

**Date:** February 5, 2026
**Configured By:** Claude Code
**Status:** ✅ Active

---

## 📅 Scheduled Ingestion Jobs

### 1. Initial Run (One-Time)
- **Scheduled:** 15 minutes from setup time
- **Run Time:** 14:17 UTC (February 5, 2026)
- **Process ID:** Running in background (PID: 2065043)
- **Log File:** `/home/ubuntu/client-health-dashboard/logs/ingest.log`
- **Command:**
  ```bash
  /home/ubuntu/client-health-dashboard/run_ingestion_once.sh
  ```

### 2. Daily Morning Run (Recurring)
- **Schedule:** Every day at **8:30 AM IST**
- **UTC Time:** 3:00 AM UTC
- **Cron Expression:** `0 3 * * *`
- **Log File:** `/home/ubuntu/client-health-dashboard/logs/ingest.log`
- **Full Command:**
  ```bash
  cd /home/ubuntu/client-health-dashboard && source venv/bin/activate && python ingest/ingest_main.py >> /home/ubuntu/client-health-dashboard/logs/ingest.log 2>&1
  ```

---

## ✅ Verification

### Check Background Job Status
```bash
# Should show sleep process running
ps aux | grep "sleep 900" | grep -v grep
```

### Check Daily Cron Schedule
```bash
# Shows all cron jobs
crontab -l

# Shows only client-health-dashboard cron
crontab -l | grep "client-health-dashboard"
```

### Monitor Ingestion Progress
```bash
# Watch ingestion logs in real-time
tail -f /home/ubuntu/client-health-dashboard/logs/ingest.log

# Check if ingestion is currently running
ps aux | grep "ingest_main.py" | grep -v grep
```

---

## 📊 What These Jobs Do

Each ingestion job:

1. **Fetches from Supabase:**
   - Clients configuration
   - Campaign reporting data (last 30 days)

2. **Calculates 7-Day Metrics:**
   - New leads reached
   - Replies, positives, bounces
   - Reply rates, positive reply rates
   - PCPL ratios

3. **Fetches from SmartLead API** (NEW):
   - All active campaigns
   - Lead counts by status
   - **Not contacted leads** (STARTED status)
   - Takes ~10-15 minutes

4. **Updates Dashboard Database:**
   - Stores all metrics in local PostgreSQL
   - Updates `client_health_dashboard_v1_local` table
   - Frontend displays cached data

---

## ⏱️ Expected Duration

- **Supabase fetch:** ~3-5 minutes
- **7-day calculations:** ~1-2 minutes
- **SmartLead API fetch:** ~10-15 minutes
- **Total:** ~15-20 minutes

---

## 📈 After Ingestion Completes

### Dashboard Will Show:
- ✅ All existing metrics (7-day performance)
- ✅ **Not Contacted Leads** column with real data from SmartLead
- ✅ "Data current" badge (green)
- ✅ Timestamp of last ingestion

### Example Data:
```
Client   | New Leads (7d) | Not Contacted | Reply Rate
---------|----------------|---------------|------------
HYPERKE  | 22,096        | 12,450        | 2.08%
SEM      | 13,779        | 8,500         | 0.99%
ALM      |  8,859        | 5,200         | 1.91%
```

---

## 🔍 Troubleshooting

### Background Job Not Running
```bash
# Check if process exists
ps aux | grep "sleep 900"

# If not found, restart:
cd /home/ubuntu/client-health-dashboard
nohup bash -c 'sleep 900 && ./run_ingestion_once.sh' > /tmp/scheduled_ingestion.log 2>&1 &
```

### Cron Job Not Running
```bash
# Verify cron service is active
sudo systemctl status cron

# Check cron logs
sudo grep CRON /var/log/syslog | tail -20

# Manually test the command
cd /home/ubuntu/client-health-dashboard
source venv/bin/activate
python ingest/ingest_main.py
```

### Ingestion Takes Too Long
- **Normal duration:** 15-20 minutes
- **If > 30 minutes:** Check logs for errors
- **SmartLead API:** Sometimes slower, has retry logic
- **Network:** Check internet connectivity

### No Data in "Not Contacted" Column
1. Check if ingestion completed: `tail -50 /home/ubuntu/client-health-dashboard/logs/ingest.log`
2. Look for errors: `grep -i error /home/ubuntu/client-health-dashboard/logs/ingest.log`
3. Verify SmartLead API key is set
4. Check database: `sudo -u postgres psql -d client_health_dashboard_v1 -c "SELECT client_code, not_contacted_leads FROM client_health_dashboard_v1_local LIMIT 5;"`

---

## 📝 Log Files

### Ingestion Log
- **Location:** `/home/ubuntu/client-health-dashboard/logs/ingest.log`
- **Contains:** Timestamps, progress, errors, SmartLead API status
- **Size:** Rotated automatically (PM2 handles this)

### PM2 Logs
```bash
# Dashboard service logs
pm2 logs client-health-dashboard

# System logs for cron
sudo grep CRON /var/log/syslog | grep "ingest_main"
```

---

## 🎯 Next Scheduled Runs

| Run Type | Date (UTC) | Time (UTC) | Time (IST) |
|----------|------------|-------------|------------|
| **Initial** | Feb 5, 2026 | 14:17 UTC | 7:47 PM IST |
| **Daily 1** | Feb 6, 2026 | 03:00 UTC | 8:30 AM IST |
| **Daily 2** | Feb 7, 2026 | 03:00 UTC | 8:30 AM IST |
| **Daily 3** | Feb 8, 2026 | 03:00 UTC | 8:30 AM IST |

---

## ⚙️ Configuration Files

### Cron Job
- **Location:** System crontab for `ubuntu` user
- **View:** `crontab -l`
- **Edit:** `crontab -e`

### Ingestion Script
- **Location:** `/home/ubuntu/client-health-dashboard/ingest/ingest_main.py`
- **Modified:** February 5, 2026
- **Changes:** Added SmartLead API integration

### One-Time Run Script
- **Location:** `/home/ubuntu/client-health-dashboard/run_ingestion_once.sh`
- **Purpose:** Initial data population
- **Status:** Scheduled for 14:17 UTC

---

## ✅ Status: All Systems Operational

- ✅ Background job scheduled (running in 15 min)
- ✅ Daily cron configured (8:30 AM IST)
- ✅ Log files ready
- ✅ Database schema updated
- ✅ Dashboard displaying new column
- ✅ PM2 service running
- ✅ No errors detected

---

**Configuration completed at 14:02 UTC on February 5, 2026**

Next update: After initial ingestion completes (~14:35 UTC)
