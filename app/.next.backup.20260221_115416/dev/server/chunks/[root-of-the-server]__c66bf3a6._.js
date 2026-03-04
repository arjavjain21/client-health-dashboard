module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/client-health-dashboard/app/src/lib/db.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "healthCheck",
    ()=>healthCheck,
    "query",
    ()=>query
]);
/**
 * Database connection and query utilities
 */ var __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$pg$29$__ = __turbopack_context__.i("[externals]/pg [external] (pg, esm_import, [project]/client-health-dashboard/app/node_modules/pg)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$pg$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$pg$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
// Validate DATABASE_URL on startup
if (!process.env.DATABASE_URL) {
    throw new Error('FATAL: DATABASE_URL environment variable is not set. ' + 'Please check your .env.local file and ensure DATABASE_URL is defined.');
}
const pool = new __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$pg$29$__["Pool"]({
    connectionString: process.env.DATABASE_URL,
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000
});
// Add connection error handling
pool.on('error', (err)=>{
    console.error('Unexpected database pool error:', {
        code: err.code,
        message: err.message,
        hint: 'Check your DATABASE_URL connection string in .env.local'
    });
});
async function healthCheck() {
    try {
        const client = await pool.connect();
        await client.query('SELECT 1');
        client.release();
        console.log('✓ Database connection healthy');
        return true;
    } catch (error) {
        console.error('✗ Database health check failed:', {
            code: error.code,
            message: error.message,
            hint: 'Verify DATABASE_URL in .env.local and that PostgreSQL is running'
        });
        return false;
    }
}
async function query(text, params) {
    const start = Date.now();
    try {
        const res = await pool.query(text, params);
        const duration = Date.now() - start;
        console.log('Executed query', {
            text,
            duration,
            rows: res.rowCount
        });
        return res.rows;
    } catch (error) {
        console.error('Database query error', {
            text,
            code: error.code,
            message: error.message,
            hint: error.code === '28P01' ? 'Password authentication failed. Check DATABASE_URL password in .env.local' : undefined
        });
        throw error;
    }
}
const __TURBOPACK__default__export__ = pool;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/client-health-dashboard/app/src/app/api/dashboard/historical/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
/**
 * API route for fetching historical dashboard data
 *
 * Fetches client health data for one or more selected historical weeks.
 * Single week: Returns data as-is from that week
 * Multiple weeks: Aggregates data across selected weeks (sums numeric metrics, averages percentages)
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client-health-dashboard/app/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client-health-dashboard/app/src/lib/db.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
/**
 * Validates and parses week numbers from query param
 * @param weeksParam - Comma-separated week numbers (e.g., "1,2,3")
 * @returns Array of valid week numbers (1-4)
 * @throws Error if invalid week numbers provided
 */ function parseAndValidateWeeks(weeksParam) {
    if (!weeksParam || weeksParam.trim() === '') {
        throw new Error('Query parameter "weeks" is required. Example: ?weeks=1 or ?weeks=1,2,3');
    }
    const weekNumbers = weeksParam.split(',').map((w)=>w.trim()).filter((w)=>w !== '').map((w)=>{
        const num = parseInt(w, 10);
        if (isNaN(num)) {
            throw new Error(`Invalid week number: "${w}". Week numbers must be integers 1-4.`);
        }
        if (num < 1 || num > 4) {
            throw new Error(`Week number out of range: ${num}. Only weeks 1-4 are supported.`);
        }
        return num;
    });
    if (weekNumbers.length === 0) {
        throw new Error('At least one valid week number must be provided.');
    }
    // Remove duplicates and sort
    return [
        ...new Set(weekNumbers)
    ].sort((a, b)=>a - b);
}
/**
 * Builds SQL query for single week (no aggregation needed)
 */ function buildSingleWeekQuery(weekNumber) {
    return `
    SELECT
      client_id, client_code, client_name, client_company_name,
      relationship_status, assigned_account_manager_name,
      assigned_inbox_manager_name, assigned_sdr_name,
      weekly_target_int, weekly_target_missing, closelix,
      contacted_7d, replies_7d, positives_7d, bounces_7d,
      reply_rate_7d, positive_reply_rate_7d, bounce_pct_7d,
      new_leads_reached_7d,
      prorated_target,
      volume_attainment, pcpl_proxy_7d,
      not_contacted_leads,
      deliverability_flag, volume_flag, mmf_flag,
      data_missing_flag, data_stale_flag,
      rag_status, rag_reason,
      most_recent_reporting_end_date, computed_at,
      bonus_pool_monthly, weekend_sending_effective, monthly_booking_goal,
      period_start_date, period_end_date, week_number
    FROM client_health_dashboard_historical
    WHERE week_number = $1
    ORDER BY new_leads_reached_7d DESC NULLS LAST
  `;
}
/**
 * Builds SQL query for multiple weeks (with aggregation)
 */ function buildMultiWeekQuery(weekNumbers) {
    const placeholders = weekNumbers.map((_, i)=>`$${i + 1}`).join(', ');
    return `
    SELECT
      client_id,
      client_code,
      -- Sum all numeric metrics
      SUM(contacted_7d) as contacted_7d,
      SUM(replies_7d) as replies_7d,
      SUM(positives_7d) as positives_7d,
      SUM(bounces_7d) as bounces_7d,
      SUM(new_leads_reached_7d) as new_leads_reached_7d,
      SUM(not_contacted_leads) as not_contacted_leads,

      -- Average percentages
      AVG(reply_rate_7d) as reply_rate_7d,
      AVG(positive_reply_rate_7d) as positive_reply_rate_7d,
      AVG(bounce_pct_7d) as bounce_pct_7d,
      AVG(volume_attainment) as volume_attainment,
      AVG(pcpl_proxy_7d) as pcpl_proxy_7d,

      -- Sum targets
      SUM(weekly_target_int) as weekly_target_int,
      SUM(prorated_target) as prorated_target,

      -- Take latest values (most recent week)
      MAX(rag_status) as rag_status,
      MAX(rag_reason) as rag_reason,
      MAX(most_recent_reporting_end_date) as most_recent_reporting_end_date,
      MAX(computed_at) as computed_at,

      -- Keep non-aggregated fields
      ANY_VALUE(client_name) as client_name,
      ANY_VALUE(client_company_name) as client_company_name,
      ANY_VALUE(relationship_status) as relationship_status,
      ANY_VALUE(assigned_account_manager_name) as assigned_account_manager_name,
      ANY_VALUE(assigned_inbox_manager_name) as assigned_inbox_manager_name,
      ANY_VALUE(assigned_sdr_name) as assigned_sdr_name,
      ANY_VALUE(bonus_pool_monthly) as bonus_pool_monthly,
      ANY_VALUE(weekend_sending_effective) as weekend_sending_effective,
      ANY_VALUE(monthly_booking_goal) as monthly_booking_goal,
      ANY_VALUE(weekly_target_missing) as weekly_target_missing,
      ANY_VALUE(closelix) as closelix,

      -- For flags: set TRUE if ANY week has TRUE
      BOOL_OR(deliverability_flag) as deliverability_flag,
      BOOL_OR(volume_flag) as volume_flag,
      BOOL_OR(mmf_flag) as mmf_flag,
      BOOL_OR(data_missing_flag) as data_missing_flag,
      BOOL_OR(data_stale_flag) as data_stale_flag,

      -- Track aggregation metadata
      ARRAY_AGG(DISTINCT week_number ORDER BY week_number) as selected_weeks,
      COUNT(DISTINCT week_number) * 7 as aggregation_days,
      MIN(period_start_date) as period_start_date,
      MAX(period_end_date) as period_end_date

    FROM client_health_dashboard_historical
    WHERE week_number IN (${placeholders})
    GROUP BY client_id, client_code
    ORDER BY SUM(new_leads_reached_7d) DESC NULLS LAST
  `;
}
/**
 * Fetches metadata for the selected week numbers
 */ async function fetchWeekMetadata(weekNumbers) {
    const placeholders = weekNumbers.map((_, i)=>`$${i + 1}`).join(', ');
    const queryText = `
    SELECT
      week_number,
      period_start_date as start_date,
      period_end_date as end_date
    FROM client_health_dashboard_historical
    WHERE week_number IN (${placeholders})
    GROUP BY week_number, period_start_date, period_end_date
    ORDER BY week_number
  `;
    const rows = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])(queryText, weekNumbers);
    return rows;
}
/**
 * Transforms database row to HistoricalClientRow format
 */ function transformToHistoricalRow(row, selectedWeeks, aggregationDays) {
    return {
        client_id: row.client_id,
        client_code: row.client_code,
        client_name: row.client_name,
        client_company_name: row.client_company_name,
        relationship_status: row.relationship_status,
        assigned_account_manager_name: row.assigned_account_manager_name,
        assigned_inbox_manager_name: row.assigned_inbox_manager_name,
        assigned_sdr_name: row.assigned_sdr_name,
        weekly_target_int: row.weekly_target_int,
        weekly_target_missing: row.weekly_target_missing ?? false,
        closelix: row.closelix ?? false,
        contacted_7d: row.contacted_7d ?? 0,
        replies_7d: row.replies_7d ?? 0,
        positives_7d: row.positives_7d ?? 0,
        bounces_7d: row.bounces_7d ?? 0,
        reply_rate_7d: row.reply_rate_7d ? parseFloat(row.reply_rate_7d) : null,
        positive_reply_rate_7d: row.positive_reply_rate_7d ? parseFloat(row.positive_reply_rate_7d) : null,
        bounce_pct_7d: row.bounce_pct_7d ? parseFloat(row.bounce_pct_7d) : null,
        new_leads_reached_7d: row.new_leads_reached_7d ?? 0,
        prorated_target: row.prorated_target ? parseFloat(row.prorated_target) : null,
        volume_attainment: row.volume_attainment ? parseFloat(row.volume_attainment) : null,
        pcpl_proxy_7d: row.pcpl_proxy_7d ? parseFloat(row.pcpl_proxy_7d) : null,
        not_contacted_leads: row.not_contacted_leads ?? 0,
        deliverability_flag: row.deliverability_flag ?? false,
        volume_flag: row.volume_flag ?? false,
        mmf_flag: row.mmf_flag ?? false,
        data_missing_flag: row.data_missing_flag ?? false,
        data_stale_flag: row.data_stale_flag ?? false,
        rag_status: row.rag_status ?? 'Yellow',
        rag_reason: row.rag_reason,
        most_recent_reporting_end_date: row.most_recent_reporting_end_date,
        bonus_pool_monthly: row.bonus_pool_monthly ? parseFloat(row.bonus_pool_monthly) : null,
        weekend_sending_effective: row.weekend_sending_effective ?? false,
        monthly_booking_goal: row.monthly_booking_goal ? parseFloat(row.monthly_booking_goal) : null,
        computed_at: row.computed_at,
        selected_weeks: selectedWeeks,
        aggregation_days: aggregationDays,
        period_start_date: row.period_start_date,
        period_end_date: row.period_end_date
    };
}
async function GET(request) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const weeksParam = searchParams.get('weeks');
        // Parse and validate week numbers
        let selectedWeeks;
        try {
            selectedWeeks = parseAndValidateWeeks(weeksParam);
        } catch (error) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: error instanceof Error ? error.message : 'Invalid week numbers'
            }, {
                status: 400
            });
        }
        const aggregationDays = selectedWeeks.length * 7;
        // Build and execute query based on number of weeks selected
        let rows;
        let queryText;
        let params;
        if (selectedWeeks.length === 1) {
            // Single week: no aggregation
            queryText = buildSingleWeekQuery(selectedWeeks[0]);
            params = [
                selectedWeeks[0]
            ];
            rows = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])(queryText, params);
            // Add metadata fields for consistency
            rows = rows.map((row)=>({
                    ...row,
                    selected_weeks: selectedWeeks,
                    aggregation_days: aggregationDays
                }));
        } else {
            // Multiple weeks: aggregate
            queryText = buildMultiWeekQuery(selectedWeeks);
            params = selectedWeeks;
            rows = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])(queryText, params);
        }
        // Fetch week metadata for response
        const weekMetadata = await fetchWeekMetadata(selectedWeeks);
        // Transform rows to match response format
        const data = rows.map((row)=>transformToHistoricalRow(row, selectedWeeks, aggregationDays));
        const response = {
            data,
            count: data.length,
            selected_weeks: selectedWeeks,
            aggregation_info: {
                total_days: aggregationDays,
                week_ranges: weekMetadata
            }
        };
        return __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(response);
    } catch (error) {
        console.error('Historical dashboard API error:', error);
        const errorMessage = error instanceof Error ? error.message : 'Failed to fetch historical dashboard data';
        return __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: errorMessage
        }, {
            status: 500
        });
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__c66bf3a6._.js.map