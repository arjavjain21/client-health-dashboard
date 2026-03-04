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
"[project]/client-health-dashboard/app/src/app/api/dashboard/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
/**
 * API route for fetching dashboard data
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client-health-dashboard/app/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client-health-dashboard/app/src/lib/db.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
function buildWhereClause(filters) {
    const conditions = [];
    const params = [];
    let paramIndex = 1;
    if (filters.relationship_status) {
        conditions.push(`relationship_status = $${paramIndex++}`);
        params.push(filters.relationship_status);
    }
    if (filters.closelix !== undefined) {
        conditions.push(`closelix = $${paramIndex++}`);
        params.push(filters.closelix);
    }
    if (filters.assigned_account_manager_name) {
        conditions.push(`assigned_account_manager_name = $${paramIndex++}`);
        params.push(filters.assigned_account_manager_name);
    }
    if (filters.assigned_inbox_manager_name) {
        conditions.push(`assigned_inbox_manager_name = $${paramIndex++}`);
        params.push(filters.assigned_inbox_manager_name);
    }
    if (filters.assigned_sdr_name) {
        conditions.push(`assigned_sdr_name = $${paramIndex++}`);
        params.push(filters.assigned_sdr_name);
    }
    if (filters.rag_status) {
        conditions.push(`rag_status = $${paramIndex++}`);
        params.push(filters.rag_status);
    }
    if (filters.deliverability_flag !== undefined) {
        conditions.push(`deliverability_flag = $${paramIndex++}`);
        params.push(filters.deliverability_flag);
    }
    if (filters.mmf_flag !== undefined) {
        conditions.push(`mmf_flag = $${paramIndex++}`);
        params.push(filters.mmf_flag);
    }
    if (filters.volume_flag !== undefined) {
        conditions.push(`volume_flag = $${paramIndex++}`);
        params.push(filters.volume_flag);
    }
    if (filters.data_missing_flag !== undefined) {
        conditions.push(`data_missing_flag = $${paramIndex++}`);
        params.push(filters.data_missing_flag);
    }
    if (filters.client_code_search) {
        conditions.push(`client_code ILIKE $${paramIndex++}`);
        params.push(`%${filters.client_code_search}%`);
    }
    if (filters.weekend_sending_mode) {
        conditions.push(`weekend_sending_effective = $${paramIndex++}`);
        params.push(filters.weekend_sending_mode === 'active');
    }
    return {
        where: conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '',
        params
    };
}
async function GET(request) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const filters = {};
        if (searchParams.get('relationship_status')) filters.relationship_status = searchParams.get('relationship_status');
        if (searchParams.get('closelix')) filters.closelix = searchParams.get('closelix') === 'true';
        if (searchParams.get('assigned_account_manager_name')) filters.assigned_account_manager_name = searchParams.get('assigned_account_manager_name');
        if (searchParams.get('assigned_inbox_manager_name')) filters.assigned_inbox_manager_name = searchParams.get('assigned_inbox_manager_name');
        if (searchParams.get('assigned_sdr_name')) filters.assigned_sdr_name = searchParams.get('assigned_sdr_name');
        if (searchParams.get('rag_status')) filters.rag_status = searchParams.get('rag_status');
        if (searchParams.get('deliverability_flag') !== null) filters.deliverability_flag = searchParams.get('deliverability_flag') === 'true';
        if (searchParams.get('mmf_flag') !== null) filters.mmf_flag = searchParams.get('mmf_flag') === 'true';
        if (searchParams.get('volume_flag') !== null) filters.volume_flag = searchParams.get('volume_flag') === 'true';
        if (searchParams.get('data_missing_flag') !== null) filters.data_missing_flag = searchParams.get('data_missing_flag') === 'true';
        if (searchParams.get('client_code_search')) filters.client_code_search = searchParams.get('client_code_search');
        if (searchParams.get('weekend_sending_mode')) filters.weekend_sending_mode = searchParams.get('weekend_sending_mode');
        const { where, params } = buildWhereClause(filters);
        const queryText = `
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
        bonus_pool_monthly, weekend_sending_effective, monthly_booking_goal
      FROM client_health_dashboard_v1_local
      ${where}
      ORDER BY new_leads_reached_7d DESC NULLS LAST
    `;
        const rows = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])(queryText, params);
        return __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            data: rows,
            count: rows.length
        });
    } catch (error) {
        console.error('Dashboard API error:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Failed to fetch dashboard data'
        }, {
            status: 500
        });
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__00b27496._.js.map