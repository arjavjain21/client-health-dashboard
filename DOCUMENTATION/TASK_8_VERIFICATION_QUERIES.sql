-- ============================================================================
-- Task 8: Historical RAG Computation - Verification Queries
-- ============================================================================
--
-- Purpose: Verify that historical weeks now have proper RAG computation
-- instead of placeholder 'Green' status
--
-- Run these queries after executing the ingestion script to verify the
-- implementation is working correctly.
--
-- Usage:
--   psql -h localhost -U postgres -d client_health_dashboard -f task_8_verification.sql
--
-- ============================================================================

-- ============================================================================
-- TEST 1: Check RAG Status Distribution
-- ============================================================================
-- Expected: Should see mix of Red, Yellow, Green (not all Green)
-- ============================================================================
\echo ''
\echo 'TEST 1: RAG Status Distribution for Historical Weeks'
\echo '====================================================='
SELECT
    week_number,
    period_start_date,
    period_end_date,
    COUNT(*) as total_clients,
    COUNT(CASE WHEN rag_status = 'Red' THEN 1 END) as red_count,
    ROUND(100.0 * COUNT(CASE WHEN rag_status = 'Red' THEN 1 END) / COUNT(*), 1) as red_pct,
    COUNT(CASE WHEN rag_status = 'Yellow' THEN 1 END) as yellow_count,
    ROUND(100.0 * COUNT(CASE WHEN rag_status = 'Yellow' THEN 1 END) / COUNT(*), 1) as yellow_pct,
    COUNT(CASE WHEN rag_status = 'Green' THEN 1 END) as green_count,
    ROUND(100.0 * COUNT(CASE WHEN rag_status = 'Green' THEN 1 END) / COUNT(*), 1) as green_pct
FROM client_health_dashboard_historical
GROUP BY week_number, period_start_date, period_end_date
ORDER BY week_number;

-- ============================================================================
-- TEST 2: Verify No Placeholder RAG Reasons
-- ============================================================================
-- Expected: Should NOT see "RAG computation pending" message
-- ============================================================================
\echo ''
\echo 'TEST 2: Check for Placeholder RAG Reasons'
\echo '=========================================='
SELECT
    COUNT(*) as placeholder_count,
    'If > 0, implementation has issues!' as note
FROM client_health_dashboard_historical
WHERE rag_reason = 'RAG computation pending - using default Green status';

-- Expected result: placeholder_count = 0

-- ============================================================================
-- TEST 3: Sample RAG Reasons (should be specific, not generic)
-- ============================================================================
\echo ''
\echo 'TEST 3: Sample RAG Reasons for Red Status Clients'
\echo '=================================================='
SELECT
    client_code,
    client_name,
    week_number,
    rag_status,
    rag_reason,
    contacted_7d,
    replies_7d,
    positives_7d,
    ROUND(reply_rate_7d * 100, 2) as reply_rate_pct,
    ROUND(bounce_pct_7d * 100, 2) as bounce_rate_pct
FROM client_health_dashboard_historical
WHERE rag_status = 'Red'
ORDER BY week_number, contacted_7d DESC
LIMIT 15;

-- Expected: Should see specific reasons like:
-- - "Critical: reply rate is 1.2% (below 1.5%)"
-- - "Critical: zero positive replies from 45 replies (positive quality issue)"
-- - "Critical: bounce rate is 5.3% (4% or higher)"

-- ============================================================================
-- TEST 4: Verify Flags are Computed
-- ============================================================================
-- Expected: Should see mix of TRUE/FALSE (not all FALSE)
-- ============================================================================
\echo ''
\echo 'TEST 4: Flag Distribution by Week'
\echo '=================================='
SELECT
    week_number,
    COUNT(*) as total_clients,
    SUM(CASE WHEN deliverability_flag THEN 1 ELSE 0 END) as deliverability_flag_count,
    ROUND(100.0 * SUM(CASE WHEN deliverability_flag THEN 1 ELSE 0 END) / COUNT(*), 1) as deliverability_flag_pct,
    SUM(CASE WHEN volume_flag THEN 1 ELSE 0 END) as volume_flag_count,
    ROUND(100.0 * SUM(CASE WHEN volume_flag THEN 1 ELSE 0 END) / COUNT(*), 1) as volume_flag_pct,
    SUM(CASE WHEN mmf_flag THEN 1 ELSE 0 END) as mmf_flag_count,
    ROUND(100.0 * SUM(CASE WHEN mmf_flag THEN 1 ELSE 0 END) / COUNT(*), 1) as mmf_flag_pct,
    SUM(CASE WHEN data_missing_flag THEN 1 ELSE 0 END) as data_missing_count,
    SUM(CASE WHEN data_stale_flag THEN 1 ELSE 0 END) as data_stale_count
FROM client_health_dashboard_historical
GROUP BY week_number
ORDER BY week_number;

-- Expected: Should see non-zero counts for deliverability_flag, volume_flag, mmf_flag

-- ============================================================================
-- TEST 5: Verify Pro-Rated Targets are Computed
-- ============================================================================
-- Expected: Should see actual values (not NULL) for clients with targets
-- ============================================================================
\echo ''
\echo 'TEST 5: Pro-Rated Target Calculation'
\echo '====================================='
SELECT
    client_code,
    client_name,
    week_number,
    weekly_target_int,
    weekend_sending_effective,
    prorated_target,
    volume_attainment,
    ROUND(volume_attainment * 100, 1) as attainment_pct
FROM client_health_dashboard_historical
WHERE weekly_target_int IS NOT NULL
  AND weekly_target_int > 0
ORDER BY week_number, volume_attainment DESC NULLS LAST
LIMIT 15;

-- Expected: prorated_target and volume_attainment should have actual values

-- ============================================================================
-- TEST 6: Check Individual Metric RAGs (if accessible via view)
-- ============================================================================
-- Note: This requires creating a view that exposes individual RAGs
-- For now, we can infer RAGs from the metrics
-- ============================================================================
\echo ''
\echo 'TEST 6: Infer Individual Metric RAGs from Metrics'
\echo '==================================================='
SELECT
    client_code,
    week_number,
    CASE
        WHEN reply_rate_7d < 0.015 THEN 'Red'
        WHEN reply_rate_7d < 0.02 THEN 'Amber'
        WHEN reply_rate_7d IS NOT NULL THEN 'Green'
        ELSE 'NULL'
    END as inferred_rr_rag,
    ROUND(reply_rate_7d * 100, 2) as reply_rate_pct,
    CASE
        WHEN replies_7d > 0 AND positives_7d = 0 THEN 'Red'
        WHEN replies_7d > 0 AND positives_7d > 0 THEN
            CASE
                WHEN (positives_7d::numeric / replies_7d) < 0.05 THEN 'Red'
                WHEN (positives_7d::numeric / replies_7d) < 0.08 THEN 'Amber'
                ELSE 'Green'
            END
        ELSE 'NULL'
    END as inferred_prr_rag,
    CASE
        WHEN replies_7d > 0 THEN ROUND((positives_7d::numeric / replies_7d) * 100, 2)
        ELSE NULL
    END as positive_reply_rate_pct,
    CASE
        WHEN bounce_pct_7d >= 0.04 THEN 'Red'
        WHEN bounce_pct_7d >= 0.02 THEN 'Amber'
        WHEN bounce_pct_7d IS NOT NULL THEN 'Green'
        ELSE 'NULL'
    END as inferred_br_rag,
    ROUND(bounce_pct_7d * 100, 2) as bounce_rate_pct,
    rag_status as final_rag_status
FROM client_health_dashboard_historical
WHERE contacted_7d > 0
ORDER BY week_number, contacted_7d DESC
LIMIT 15;

-- ============================================================================
-- TEST 7: Compare Current Week vs Historical Week 1
-- ============================================================================
\echo ''
\echo 'TEST 7: Current Week vs Historical Week 1 Comparison'
\echo '====================================================='
SELECT
    'Current Week' as period,
    COUNT(*) as clients,
    ROUND(AVG(reply_rate_7d) * 100, 2) as avg_reply_rate,
    ROUND(AVG(positive_reply_rate_7d) * 100, 2) as avg_positive_rate,
    ROUND(AVG(bounce_pct_7d) * 100, 2) as avg_bounce_rate,
    COUNT(CASE WHEN rag_status = 'Red' THEN 1 END) as red_count,
    ROUND(100.0 * COUNT(CASE WHEN rag_status = 'Red' THEN 1 END) / COUNT(*), 1) as red_pct,
    COUNT(CASE WHEN rag_status = 'Yellow' THEN 1 END) as yellow_count,
    ROUND(100.0 * COUNT(CASE WHEN rag_status = 'Yellow' THEN 1 END) / COUNT(*), 1) as yellow_pct,
    COUNT(CASE WHEN rag_status = 'Green' THEN 1 END) as green_count,
    ROUND(100.0 * COUNT(CASE WHEN rag_status = 'Green' THEN 1 END) / COUNT(*), 1) as green_pct
FROM client_health_dashboard_v1_local

UNION ALL

SELECT
    'Week 1 (' || period_start_date || ')' as period,
    COUNT(*) as clients,
    ROUND(AVG(reply_rate_7d) * 100, 2) as avg_reply_rate,
    ROUND(AVG(positive_reply_rate_7d) * 100, 2) as avg_positive_rate,
    ROUND(AVG(bounce_pct_7d) * 100, 2) as avg_bounce_rate,
    COUNT(CASE WHEN rag_status = 'Red' THEN 1 END) as red_count,
    ROUND(100.0 * COUNT(CASE WHEN rag_status = 'Red' THEN 1 END) / COUNT(*), 1) as red_pct,
    COUNT(CASE WHEN rag_status = 'Yellow' THEN 1 END) as yellow_count,
    ROUND(100.0 * COUNT(CASE WHEN rag_status = 'Yellow' THEN 1 END) / COUNT(*), 1) as yellow_pct,
    COUNT(CASE WHEN rag_status = 'Green' THEN 1 END) as green_count,
    ROUND(100.0 * COUNT(CASE WHEN rag_status = 'Green' THEN 1 END) / COUNT(*), 1) as green_pct
FROM client_health_dashboard_historical
WHERE week_number = 1;

-- Expected: Similar distribution of RAG status (not all Green in historical)

-- ============================================================================
-- TEST 8: Verify Critical Overrides are Working
-- ============================================================================
\echo ''
\echo 'TEST 8: Critical Overrides Verification'
\echo '========================================='
-- Find clients that should be Red due to critical overrides
SELECT
    'Critical: contacted_7d = 0' as override_type,
    COUNT(*) as client_count
FROM client_health_dashboard_historical
WHERE contacted_7d = 0 AND rag_status = 'Red'

UNION ALL

SELECT
    'Critical: reply_rate < 1.5%' as override_type,
    COUNT(*) as client_count
FROM client_health_dashboard_historical
WHERE reply_rate_7d < 0.015 AND rag_status = 'Red'

UNION ALL

SELECT
    'Critical: bounce_rate >= 4%' as override_type,
    COUNT(*) as client_count
FROM client_health_dashboard_historical
WHERE bounce_pct_7d >= 0.04 AND rag_status = 'Red'

UNION ALL

SELECT
    'Critical: volume_attainment < 50%' as override_type,
    COUNT(*) as client_count
FROM client_health_dashboard_historical
WHERE volume_attainment < 0.5 AND rag_status = 'Red';

-- Expected: All counts should be > 0 (overrides are working)

-- ============================================================================
-- TEST 9: Check RAG Reason Variety
-- ============================================================================
\echo ''
\echo 'TEST 9: Unique RAG Reason Count'
\echo '==============================='
SELECT
    rag_status,
    COUNT(DISTINCT rag_reason) as unique_reason_count
FROM client_health_dashboard_historical
GROUP BY rag_status
ORDER BY rag_status;

-- Expected: Should see multiple unique reasons (not just 1 generic message)

-- ============================================================================
-- TEST 10: Top 10 Clients by Contacted Volume (Week 1)
-- ============================================================================
\echo ''
\echo 'TEST 10: Sample Clients - Week 1 Performance'
\echo '============================================='
SELECT
    client_code,
    client_name,
    contacted_7d,
    replies_7d,
    positives_7d,
    ROUND(reply_rate_7d * 100, 2) || '%' as reply_rate,
    ROUND(positive_reply_rate_7d * 100, 2) || '%' as positive_rate,
    ROUND(bounce_pct_7d * 100, 2) || '%' as bounce_rate,
    ROUND(volume_attainment * 100, 1) || '%' as volume_attainment,
    rag_status,
    rag_reason
FROM client_health_dashboard_historical
WHERE week_number = 1
ORDER BY contacted_7d DESC
LIMIT 10;

-- ============================================================================
-- SUMMARY: All Tests Complete
-- ============================================================================
\echo ''
\echo '============================================================='
\echo 'VERIFICATION COMPLETE'
\echo '============================================================='
\echo ''
\echo 'Key Checks:'
\echo '  1. RAG distribution: Should see mix of Red/Yellow/Green'
\echo '  2. No placeholder reasons: Should be 0'
\echo '  3. Specific RAG reasons: Should be detailed'
\echo '  4. Flags computed: Should see TRUE/FALSE mix'
\echo '  5. Pro-rated targets: Should have values (not NULL)'
\echo '  6. Critical overrides: Should be working'
\echo '  7. RAG reason variety: Should have multiple unique reasons'
\echo ''
\echo 'If all checks pass, Task 8 implementation is successful!'
\echo '============================================================='
\echo ''
