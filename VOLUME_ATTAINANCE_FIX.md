# Volume Attainment Calculation Fix
**Date:** 2026-01-16
**Issue:** Volume Attainment was calculating on total emails sent instead of unique leads contacted

---

## Problem Description

The **Volume Attainment** metric was incorrectly calculating as:
```
Volume Attainment = (Total Emails Sent / Weekly Target) × 100
```

This resulted in inflated percentages (e.g., 175.1%) because total emails sent can be much higher than unique leads contacted due to multiple sends to the same lead.

**Correct formula should be:**
```
Volume Attainment = (Unique Leads Contacted / Weekly Target) × 100
```

---

## Root Cause

The bug was in `/home/ubuntu/client-health-dashboard/ingest/ingest_main.py` where `volume_attainment` and related calculations used `contacted_7d` (total emails) instead of `new_leads_reached_7d` (unique leads).

---

## Files Modified

**File:** `/home/ubuntu/client-health-dashboard/ingest/ingest_main.py`

### Changes Made:

#### 1. **Volume Attainment Calculation** (Line 383)
**Before:**
```python
ROUND(COALESCE(r.contacted_7d, 0)::numeric / c.weekly_target_int, 4)
```

**After:**
```python
ROUND(COALESCE(r.new_leads_reached_7d, 0)::numeric / c.weekly_target_int, 4)
```

---

#### 2. **Volume Flag Calculation** (Line 397)
**Before:**
```python
AND COALESCE(r.contacted_7d, 0)::numeric / c.weekly_target_int < 0.8 THEN TRUE
```

**After:**
```python
AND COALESCE(r.new_leads_reached_7d, 0)::numeric / c.weekly_target_int < 0.8 THEN TRUE
```

---

#### 3. **Red RAG Status Threshold** (Line 417)
**Before:**
```python
AND COALESCE(r.contacted_7d, 0)::numeric / c.weekly_target_int < 0.5)
```

**After:**
```python
AND COALESCE(r.new_leads_reached_7d, 0)::numeric / c.weekly_target_int < 0.5)
```

---

#### 4. **Yellow RAG Status Threshold** (Line 421)
**Before:**
```python
AND COALESCE(r.contacted_7d, 0)::numeric / c.weekly_target_int < 0.8)
```

**After:**
```python
AND COALESCE(r.new_leads_reached_7d, 0)::numeric / c.weekly_target_int < 0.8)
```

---

#### 5. **RAG Reason Message Condition** (Line 449)
**Before:**
```python
AND contacted_7d::numeric / weekly_target_int < 0.5 THEN
```

**After:**
```python
AND new_leads_reached_7d::numeric / weekly_target_int < 0.5 THEN
```

---

## Impact

### Metrics Affected:
1. **Volume Attainment** - Now correctly shows unique leads vs target
2. **Volume Flag** - Now correctly flags clients below 80% of target (based on unique leads)
3. **RAG Status** - Now correctly evaluates volume attainment using unique leads
4. **RAG Reason Messages** - Now reference correct attainment calculation

### Example Impact:
- **Before:** Client with 1000 emails sent, 500 unique leads, target 500 → 200% attainment ✗
- **After:** Client with 1000 emails sent, 500 unique leads, target 500 → 100% attainment ✓

---

## Verification Steps

1. ✅ **Code Updated:** All 5 occurrences fixed in `ingest_main.py`
2. ✅ **Data Refreshed:** Ingestion completed successfully (2026-01-16 13:47:42 UTC)
3. ✅ **Dashboard Updated:** 116 client rows recomputed with correct formula
4. ✅ **Production Deployed:** Changes now live in production

---

## Testing

To verify the fix:

1. Navigate to http://clienthealth.eagleinfoservice.com
2. Check the **Target** column for any client with a weekly target set
3. Verify the calculation:
   - **Volume Attainment %** = (New Leads (7d) / Weekly Target) × 100
   - Example: If New Leads = 400 and Target = 500, should show 80.0%

4. Check **RAG Status** updates:
   - Below 50% attainment → Red
   - 50-80% attainment → Yellow
   - Above 80% attainment → Green (unless other issues)

---

## Future Prevention

To prevent this regression:
- All volume/attainment calculations must use `new_leads_reached_7d`
- Field `contacted_7d` represents total emails sent (can include duplicates)
- Field `new_leads_reached_7d` represents unique leads contacted

**Rule of Thumb:**
- Use `contacted_7d` for deliverability metrics (bounce rate, etc.)
- Use `new_leads_reached_7d` for volume/attainment metrics

---

## Status

✅ **FIXED AND DEPLOYED TO PRODUCTION**

**Fixed By:** Claude Code AI Agent
**Date:** 2026-01-16 13:47 UTC
**Refresh Log:** `/home/ubuntu/client-health-dashboard/logs/refresh_1768571256564.log`
