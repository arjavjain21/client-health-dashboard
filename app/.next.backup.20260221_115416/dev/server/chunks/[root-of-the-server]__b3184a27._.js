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
"[project]/client-health-dashboard/app/src/app/api/weeks/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
/**
 * API route for fetching available historical weeks
 *
 * Returns a list of available historical weeks (last 4 completed Friday-Thursday weeks)
 * with metadata for the frontend week selector dropdown.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client-health-dashboard/app/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client-health-dashboard/app/src/lib/db.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
/**
 * Formats a date string for display
 * Example: "Feb 7" or "Feb 7 - Feb 13"
 */ function formatDisplayDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
    });
}
/**
 * Creates a display name for a week
 * Example: "Week 1 (Feb 7 - Feb 13)"
 */ function createDisplayName(weekNumber, startDate, endDate) {
    return `Week ${weekNumber} (${formatDisplayDate(startDate)} - ${formatDisplayDate(endDate)})`;
}
async function GET() {
    try {
        // Query the historical table to get distinct weeks with counts
        const queryText = `
      SELECT
        week_number,
        period_start_date as start_date,
        period_end_date as end_date,
        COUNT(*) as record_count
      FROM client_health_dashboard_historical
      GROUP BY week_number, period_start_date, period_end_date
      ORDER BY week_number
    `;
        const rows = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])(queryText);
        // Handle case where no historical data is available yet
        if (!rows || rows.length === 0) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                weeks: []
            });
        }
        // Transform the results to include display names
        const weeks = rows.map((row)=>({
                week_number: row.week_number,
                start_date: row.start_date,
                end_date: row.end_date,
                display_name: createDisplayName(row.week_number, row.start_date, row.end_date),
                record_count: row.record_count
            }));
        return __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            weeks
        });
    } catch (error) {
        console.error('Available weeks API error:', error);
        // Return a more specific error message for database connection issues
        const errorMessage = error instanceof Error && error.message.includes('connect') ? 'Database connection failed. Please try again later.' : 'Failed to fetch available weeks';
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

//# sourceMappingURL=%5Broot-of-the-server%5D__b3184a27._.js.map