# Incident Report: Database Authentication Failure

**Date:** 2026-01-20
**Status:** ✅ Resolved
**Root Cause:** PostgreSQL password mismatch in environment configuration

## Problem

The client health dashboard API returned 500 Internal Server Error for all requests. Browser console showed:
```
Application error: a client-side exception has occurred
```

API endpoint: `https://clienthealth.eagleinfoservice.com/api/dashboard?relationship_status=ACTIVE`

## Root Cause

PostgreSQL password for user `ubuntu` was changed from `ubuntu` to `temp12345`, but the application's `.env.local` file still contained the old password.

**Error:**
```
FATAL: password authentication failed for user "ubuntu"
PostgreSQL error code: 28P01
```

**Affected Files:**
- `/home/ubuntu/client-health-dashboard/app/.env.local`
- `/home/ubuntu/client-health-dashboard/.env`

**Incorrect Connection String:**
```
DATABASE_URL=postgresql://ubuntu:ubuntu@localhost:5432/client_health_dashboard_v1
```

**Correct Connection String:**
```
DATABASE_URL=postgresql://ubuntu:temp12345@localhost:5432/client_health_dashboard_v1
```

## Resolution

1. **Identified root cause:** Database password changed but environment files not updated
2. **Updated connection strings** in both `.env` and `.env.local` files
3. **Rebuilt the Next.js application** (Next.js bakes env vars into build)
4. **Restarted PM2 process** with updated environment

## Prevention Measures Implemented

### 1. Enhanced Error Messages
Updated `app/src/lib/db.ts` to provide:
- Startup validation that DATABASE_URL is set
- Clear error messages for password authentication failures (error code 28P01)
- Helpful hints pointing to `.env.local` file

### 2. Database Health Check Function
Added `healthCheck()` function to verify database connectivity on startup.

### 3. Better Logging
Added structured logging that includes:
- Error codes for quick diagnosis
- Specific hints for common issues
- Connection error monitoring

## Future Prevention

### For Database Password Changes:
1. **Inventory all applications** using the database before changing passwords
2. **Update all environment files** in this order:
   - `.env` files in project roots
   - `.env.local` files in app directories
   - PM2 ecosystem configuration files (if needed)
3. **Rebuild all applications** that use the database:
   ```bash
   cd /path/to/app
   npm run build
   pm2 restart app-name --update-env
   ```
4. **Test each application** before considering the change complete

### Monitoring:
- Watch for PostgreSQL error code `28P01` (password authentication failed)
- Monitor PM2 restart count (abnormally high restarts indicate issues)
- Check error logs regularly for database connection errors

### Files to Check When Troubleshooting:
1. `/home/ubuntu/client-health-dashboard/app/.env.local` - DATABASE_URL
2. `/home/ubuntu/client-health-dashboard/.env` - LOCAL_DB_URL
3. PostgreSQL: `~/.pgpass` for stored passwords
4. PM2 logs: `logs/pm2-error.log`

## Recovery Time
- **Detection:** User reported issue
- **Diagnosis:** 5 minutes (systematic debugging approach)
- **Fix:** 3 minutes (update env files, rebuild, restart)
- **Total:** ~8 minutes

## Related
- PostgreSQL authentication: https://www.postgresql.org/docs/current/auth-password.html
- Next.js environment variables: https://nextjs.org/docs/basic-features/environment-variables
- PM2 environment management: https://pm2.keymetrics.io/docs/usage/environment/
