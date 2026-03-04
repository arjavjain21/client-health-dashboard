module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/client-health-dashboard/app/src/components/ColumnSelector.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ColumnSelector",
    ()=>ColumnSelector
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client-health-dashboard/app/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client-health-dashboard/app/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings2Icon$3e$__ = __turbopack_context__.i("[project]/client-health-dashboard/app/node_modules/lucide-react/dist/esm/icons/settings-2.js [app-ssr] (ecmascript) <export default as Settings2Icon>");
'use client';
;
;
;
function ColumnSelector({ columns, visibleColumns, onColumnToggle, onShowAll, onHideAll }) {
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Group columns by category
    const groupedColumns = columns.reduce((acc, col)=>{
        const category = col.category || 'Other';
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(col);
        return acc;
    }, {});
    // Close dropdown when clicking outside
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        function handleClickOutside(event) {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return ()=>{
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [
        isOpen
    ]);
    const visibleCount = visibleColumns.size;
    const totalCount = columns.length;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: containerRef,
        className: "relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>setIsOpen(!isOpen),
                className: "inline-flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-md hover:bg-slate-50 hover:border-slate-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2",
                "aria-label": `Column visibility: ${visibleCount} of ${totalCount} columns shown`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings2Icon$3e$__["Settings2Icon"], {
                        className: "w-4 h-4"
                    }, void 0, false, {
                        fileName: "[project]/client-health-dashboard/app/src/components/ColumnSelector.tsx",
                        lineNumber: 68,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: [
                            "Columns (",
                            visibleCount,
                            "/",
                            totalCount,
                            ")"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/client-health-dashboard/app/src/components/ColumnSelector.tsx",
                        lineNumber: 69,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/client-health-dashboard/app/src/components/ColumnSelector.tsx",
                lineNumber: 63,
                columnNumber: 7
            }, this),
            isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute right-0 top-full mt-2 w-72 bg-white border border-slate-200 rounded-lg shadow-lg z-50 max-h-[80vh] overflow-y-auto",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-3 border-b border-slate-200",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-sm font-semibold text-slate-900 mb-2",
                                children: "Show/Hide Columns"
                            }, void 0, false, {
                                fileName: "[project]/client-health-dashboard/app/src/components/ColumnSelector.tsx",
                                lineNumber: 75,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-2",
                                children: [
                                    onShowAll && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>onShowAll(),
                                        className: "flex-1 px-2 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors",
                                        children: "Show All"
                                    }, void 0, false, {
                                        fileName: "[project]/client-health-dashboard/app/src/components/ColumnSelector.tsx",
                                        lineNumber: 78,
                                        columnNumber: 17
                                    }, this),
                                    onHideAll && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>onHideAll(),
                                        className: "flex-1 px-2 py-1.5 text-xs font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-md transition-colors",
                                        children: "Hide All"
                                    }, void 0, false, {
                                        fileName: "[project]/client-health-dashboard/app/src/components/ColumnSelector.tsx",
                                        lineNumber: 86,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/client-health-dashboard/app/src/components/ColumnSelector.tsx",
                                lineNumber: 76,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/client-health-dashboard/app/src/components/ColumnSelector.tsx",
                        lineNumber: 74,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-2",
                        children: Object.entries(groupedColumns).map(([category, cols])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-3 last:mb-0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "px-2 py-1 text-[10px] font-bold text-slate-500 uppercase tracking-wider",
                                        children: category
                                    }, void 0, false, {
                                        fileName: "[project]/client-health-dashboard/app/src/components/ColumnSelector.tsx",
                                        lineNumber: 99,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-0.5",
                                        children: cols.map((col)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "flex items-center gap-2 px-2 py-1.5 hover:bg-slate-50 rounded-md cursor-pointer transition-colors",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "checkbox",
                                                        checked: visibleColumns.has(col.id),
                                                        onChange: ()=>onColumnToggle(col.id),
                                                        className: "w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                                                    }, void 0, false, {
                                                        fileName: "[project]/client-health-dashboard/app/src/components/ColumnSelector.tsx",
                                                        lineNumber: 108,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-sm text-slate-700",
                                                        children: col.label
                                                    }, void 0, false, {
                                                        fileName: "[project]/client-health-dashboard/app/src/components/ColumnSelector.tsx",
                                                        lineNumber: 114,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, col.id, true, {
                                                fileName: "[project]/client-health-dashboard/app/src/components/ColumnSelector.tsx",
                                                lineNumber: 104,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/client-health-dashboard/app/src/components/ColumnSelector.tsx",
                                        lineNumber: 102,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, category, true, {
                                fileName: "[project]/client-health-dashboard/app/src/components/ColumnSelector.tsx",
                                lineNumber: 98,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/client-health-dashboard/app/src/components/ColumnSelector.tsx",
                        lineNumber: 96,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/client-health-dashboard/app/src/components/ColumnSelector.tsx",
                lineNumber: 73,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/client-health-dashboard/app/src/components/ColumnSelector.tsx",
        lineNumber: 62,
        columnNumber: 5
    }, this);
}
}),
"[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HistoricalDashboardClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client-health-dashboard/app/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
/**
 * Historical Weeks Dashboard - Client Component
 *
 * Allows users to select historical weeks and view aggregated client health data
 * Reuses components from the main dashboard for consistency
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client-health-dashboard/app/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client-health-dashboard/app/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client-health-dashboard/app/node_modules/clsx/dist/clsx.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$src$2f$components$2f$ColumnSelector$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client-health-dashboard/app/src/components/ColumnSelector.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
// ============================================================================
// DESIGN TOKENS (Reused from main dashboard)
// ============================================================================
const tokens = {
    spacing: {
        1: '4px',
        2: '8px',
        3: '12px',
        4: '16px',
        6: '24px',
        8: '32px'
    },
    colors: {
        foreground: 'text-slate-900',
        secondary: 'text-slate-600',
        muted: 'text-slate-400',
        border: 'border-slate-200',
        background: 'bg-slate-50',
        surface: 'bg-white'
    },
    shadows: {
        card: '0 0 0 0.5px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.04), 0 2px 4px rgba(0, 0, 0, 0.03), 0 4px 8px rgba(0, 0, 0, 0.02)'
    },
    radius: {
        sm: '4px',
        md: '6px',
        lg: '8px'
    },
    transition: '150ms cubic-bezier(0.16, 1, 0.3, 1)'
};
// ============================================================================
// COLUMN DEFINITIONS (Reused from main dashboard)
// ============================================================================
const COLUMN_DEFINITIONS = [
    {
        id: 'rag_status',
        label: 'Health (RAG)',
        category: 'Health & Status',
        defaultVisible: true
    },
    {
        id: 'contacted_7d',
        label: 'Emails Sent',
        category: 'Health & Status',
        defaultVisible: false
    },
    {
        id: 'new_leads_reached_7d',
        label: 'New Leads',
        category: 'Health & Status',
        defaultVisible: true
    },
    {
        id: 'prorated_target',
        label: 'Target (Expected)',
        category: 'Performance Metrics',
        defaultVisible: true
    },
    {
        id: 'replies_7d',
        label: 'Replies',
        category: 'Performance Metrics',
        defaultVisible: true
    },
    {
        id: 'reply_rate_7d',
        label: 'Reply Rate',
        category: 'Performance Metrics',
        defaultVisible: true
    },
    {
        id: 'bounce_pct_7d',
        label: 'Bounce Rate',
        category: 'Performance Metrics',
        defaultVisible: true
    },
    {
        id: 'positives_7d',
        label: 'Positive Replies',
        category: 'Performance Metrics',
        defaultVisible: true
    },
    {
        id: 'positive_reply_rate_7d',
        label: 'Positive Reply Rate',
        category: 'Performance Metrics',
        defaultVisible: true
    },
    {
        id: 'pcpl',
        label: 'PCPL',
        category: 'Performance Metrics',
        defaultVisible: true
    },
    {
        id: 'volume_attainment',
        label: 'Target (Attainment)',
        category: 'Target & Attainment',
        defaultVisible: true
    },
    {
        id: 'not_contacted_leads',
        label: 'Not Contacted',
        category: 'Target & Attainment',
        defaultVisible: true
    },
    {
        id: 'bonus_pool_monthly',
        label: 'Bonus Pool',
        category: 'Financial',
        defaultVisible: true
    },
    {
        id: 'monthly_booking_goal',
        label: 'Monthly Booking Goal',
        category: 'Financial',
        defaultVisible: true
    }
];
// ============================================================================
// UTILITIES
// ============================================================================
function formatNumber(num) {
    return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(num);
}
function formatPercentage(value, decimals = 1) {
    return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    }).format(value * 100) + '%';
}
// ============================================================================
// ICONS
// ============================================================================
function SortAscIcon({ className }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: className || "w-3 h-3",
        fill: "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        strokeWidth: 2.5,
        "aria-hidden": "true",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M5 15l7-7 7 7-7"
        }, void 0, false, {
            fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
            lineNumber: 172,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
        lineNumber: 164,
        columnNumber: 5
    }, this);
}
function SortDescIcon({ className }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: className || "w-3 h-3",
        fill: "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        strokeWidth: 2.5,
        "aria-hidden": "true",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M19 9l-7 7-7-7"
        }, void 0, false, {
            fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
            lineNumber: 187,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
        lineNumber: 179,
        columnNumber: 5
    }, this);
}
function SortUnsortedIcon({ className }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: className || "w-3 h-3",
        fill: "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        strokeWidth: 2.5,
        "aria-hidden": "true",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M5 15l7-7 7 7M5 9l7 7-7-7"
        }, void 0, false, {
            fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
            lineNumber: 202,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
        lineNumber: 194,
        columnNumber: 5
    }, this);
}
function CheckIcon({ className }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: className || "w-4 h-4",
        fill: "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        strokeWidth: 2.5,
        "aria-hidden": "true",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M5 13l4 4L19 7"
        }, void 0, false, {
            fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
            lineNumber: 217,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
        lineNumber: 209,
        columnNumber: 5
    }, this);
}
function AlertIcon({ className }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: className || "w-4 h-4",
        fill: "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        strokeWidth: 2.5,
        "aria-hidden": "true",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.932-3.006l-.496-2.378C19.163 6.163 18.163 5 17 5H7c-1.163 0-2.163.163-2.502 1.625l-.496 2.378C3.667 9.837 4.667 11 6 11h12c1.333 0 2.333-1.163 1.972-2.625l-.496-2.378z"
            }, void 0, false, {
                fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                lineNumber: 232,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M12 9v2m0 4h.01"
            }, void 0, false, {
                fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                lineNumber: 233,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
        lineNumber: 224,
        columnNumber: 5
    }, this);
}
function TrendingDownIcon({ className }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: className || "w-4 h-4",
        fill: "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        strokeWidth: 2.5,
        "aria-hidden": "true",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
        }, void 0, false, {
            fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
            lineNumber: 248,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
        lineNumber: 240,
        columnNumber: 5
    }, this);
}
function MessageIcon({ className }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: className || "w-4 h-4",
        fill: "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        strokeWidth: 2.5,
        "aria-hidden": "true",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
        }, void 0, false, {
            fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
            lineNumber: 263,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
        lineNumber: 255,
        columnNumber: 5
    }, this);
}
function CalendarIcon({ className }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: className || "w-4 h-4",
        fill: "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        strokeWidth: 2.5,
        "aria-hidden": "true",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        }, void 0, false, {
            fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
            lineNumber: 278,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
        lineNumber: 270,
        columnNumber: 5
    }, this);
}
function ChevronDownIcon({ className }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: className || "w-4 h-4",
        fill: "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        strokeWidth: 2.5,
        "aria-hidden": "true",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M19 9l-7 7-7-7"
        }, void 0, false, {
            fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
            lineNumber: 293,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
        lineNumber: 285,
        columnNumber: 5
    }, this);
}
function DownloadIcon({ className }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: className || "w-4 h-4",
        fill: "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        strokeWidth: 2.5,
        "aria-hidden": "true",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
        }, void 0, false, {
            fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
            lineNumber: 308,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
        lineNumber: 300,
        columnNumber: 5
    }, this);
}
function WeekSelector({ weeks, selectedWeeks, onWeekToggle, onClearSelection, loading = false }) {
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Close dropdown when clicking outside
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        function handleClickOutside(event) {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return ()=>{
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [
        isOpen
    ]);
    const selectedCount = selectedWeeks.size;
    const totalCount = weeks.length;
    // Get display text for button
    const getButtonText = ()=>{
        if (loading) return 'Loading weeks...';
        if (selectedCount === 0) return 'Select weeks';
        if (selectedCount === 1) {
            const week = weeks.find((w)=>w.week_number === Array.from(selectedWeeks)[0]);
            return week ? week.display_name : `${selectedCount} week selected`;
        }
        return `${selectedCount} weeks selected`;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: containerRef,
        className: "relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>setIsOpen(!isOpen),
                disabled: loading || weeks.length === 0,
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])('inline-flex items-center justify-between gap-3 px-4 py-2.5 text-xs font-medium', 'bg-white border rounded-md min-w-[320px]', 'transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2', loading || weeks.length === 0 ? 'border-slate-200 text-slate-400 cursor-not-allowed' : 'border-slate-300 text-slate-700 hover:border-slate-400 hover:bg-slate-50 cursor-pointer'),
                style: {
                    transition: tokens.transition
                },
                "aria-label": getButtonText(),
                "aria-expanded": isOpen,
                "aria-haspopup": "listbox",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CalendarIcon, {
                                className: "w-4 h-4"
                            }, void 0, false, {
                                fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                lineNumber: 383,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: getButtonText()
                            }, void 0, false, {
                                fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                lineNumber: 384,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                        lineNumber: 382,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ChevronDownIcon, {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])('w-4 h-4 transition-transform', isOpen && 'rotate-180')
                    }, void 0, false, {
                        fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                        lineNumber: 386,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                lineNumber: 368,
                columnNumber: 7
            }, this),
            isOpen && weeks.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute left-0 top-full mt-2 w-[380px] bg-white border border-slate-200 rounded-lg shadow-lg z-50 max-h-[400px] overflow-hidden flex flex-col",
                style: {
                    boxShadow: tokens.shadows.card
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-3 border-b border-slate-200 bg-slate-50",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-sm font-semibold text-slate-900",
                                        children: "Select Historical Weeks"
                                    }, void 0, false, {
                                        fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                        lineNumber: 397,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs text-slate-500",
                                        children: selectedCount > 0 ? `${selectedCount} of ${totalCount} selected` : `${totalCount} available`
                                    }, void 0, false, {
                                        fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                        lineNumber: 398,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                lineNumber: 396,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-slate-500 mt-1",
                                children: "Select one or more weeks to view aggregated data"
                            }, void 0, false, {
                                fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                lineNumber: 402,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                        lineNumber: 395,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "overflow-y-auto flex-1 p-2",
                        children: weeks.map((week)=>{
                            const isSelected = selectedWeeks.has(week.week_number);
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])('flex items-start gap-3 px-3 py-2.5 rounded-md cursor-pointer transition-colors', 'hover:bg-slate-50', isSelected && 'bg-blue-50 hover:bg-blue-100'),
                                style: {
                                    transition: tokens.transition
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "checkbox",
                                        checked: isSelected,
                                        onChange: ()=>onWeekToggle(week.week_number),
                                        className: "mt-0.5 w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                                    }, void 0, false, {
                                        fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                        lineNumber: 421,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1 min-w-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between gap-2",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])('text-sm font-medium truncate', isSelected ? 'text-blue-700' : 'text-slate-700'),
                                                    children: week.display_name
                                                }, void 0, false, {
                                                    fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                                    lineNumber: 429,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                                lineNumber: 428,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2 mt-0.5",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs text-slate-500",
                                                    children: [
                                                        week.record_count,
                                                        " clients"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                                    lineNumber: 437,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                                lineNumber: 436,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                        lineNumber: 427,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, week.week_number, true, {
                                fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                lineNumber: 412,
                                columnNumber: 17
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                        lineNumber: 408,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>{
                                    onClearSelection();
                                    setIsOpen(false);
                                },
                                disabled: selectedCount === 0,
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])('px-3 py-1.5 text-xs font-semibold rounded-md transition-colors', selectedCount > 0 ? 'text-slate-700 hover:text-slate-900 hover:bg-slate-200' : 'text-slate-400 cursor-not-allowed'),
                                children: "Clear selection"
                            }, void 0, false, {
                                fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                lineNumber: 449,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setIsOpen(false),
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])('px-3 py-1.5 text-xs font-semibold rounded-md transition-colors', 'text-blue-700 hover:text-blue-800 hover:bg-blue-100'),
                                children: "Close"
                            }, void 0, false, {
                                fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                lineNumber: 464,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                        lineNumber: 448,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                lineNumber: 390,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
        lineNumber: 367,
        columnNumber: 5
    }, this);
}
// ============================================================================
// REUSED UI COMPONENTS
// ============================================================================
// Tooltip component
function Tooltip({ content, children }) {
    const [isVisible, setIsVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative inline-block",
        onMouseEnter: ()=>setIsVisible(true),
        onMouseLeave: ()=>setIsVisible(false),
        onFocus: ()=>setIsVisible(true),
        onBlur: ()=>setIsVisible(false),
        children: [
            children,
            isVisible && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-slate-900 text-white text-xs rounded shadow-lg whitespace-normal z-50 pointer-events-none max-w-xs text-center leading-tight",
                style: {
                    transition: tokens.transition
                },
                role: "tooltip",
                children: [
                    content,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-4 border-transparent border-t-slate-900"
                    }, void 0, false, {
                        fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                        lineNumber: 504,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                lineNumber: 498,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
        lineNumber: 489,
        columnNumber: 5
    }, this);
}
// RAG Status Badge
function RAGStatus({ status }) {
    const config = {
        Red: {
            bg: 'bg-red-50',
            text: 'text-red-700',
            dot: 'bg-red-500',
            border: 'border-red-200',
            display: 'Red'
        },
        Yellow: {
            bg: 'bg-amber-50',
            text: 'text-amber-700',
            dot: 'bg-amber-500',
            border: 'border-amber-200',
            display: 'Amber'
        },
        Green: {
            bg: 'bg-emerald-50',
            text: 'text-emerald-700',
            dot: 'bg-emerald-500',
            border: 'border-emerald-200',
            display: 'Green'
        }
    };
    const { bg, text, dot, border, display } = config[status];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tooltip, {
        content: `RAG Status: ${display}`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(bg, text, border, 'inline-flex items-center gap-2 px-3 py-1.5 rounded-md border font-semibold text-[11px] uppercase tracking-wide'),
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])('w-2 h-2 rounded-full', dot)
                }, void 0, false, {
                    fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                    lineNumber: 549,
                    columnNumber: 9
                }, this),
                display
            ]
        }, void 0, true, {
            fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
            lineNumber: 541,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
        lineNumber: 540,
        columnNumber: 5
    }, this);
}
// Reply Rate Badge
function ReplyRateBadge({ value, replies, newLeads }) {
    if (value === null) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "text-slate-400 text-xs",
        children: "—"
    }, void 0, false, {
        fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
        lineNumber: 558,
        columnNumber: 30
    }, this);
    const percentage = value * 100;
    let color = 'text-emerald-700';
    let bg = 'bg-emerald-50';
    let border = 'border-emerald-200';
    if (percentage < 1.5) {
        color = 'text-red-700';
        bg = 'bg-red-50';
        border = 'border-red-200';
    } else if (percentage < 2) {
        color = 'text-amber-700';
        bg = 'bg-amber-50';
        border = 'border-amber-200';
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col items-end gap-0.5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tooltip, {
                content: `Replies: ${formatNumber(replies)} / New Leads: ${formatNumber(newLeads)} • ${percentage.toFixed(2)}%`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])('inline-flex items-center px-2.5 py-1 rounded-md', bg, color, border, 'border font-semibold text-xs tabular-nums'),
                    children: formatPercentage(value, 1)
                }, void 0, false, {
                    fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                    lineNumber: 579,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                lineNumber: 578,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-[10px] text-slate-500 tabular-nums",
                children: formatNumber(replies)
            }, void 0, false, {
                fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                lineNumber: 591,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
        lineNumber: 577,
        columnNumber: 5
    }, this);
}
// Bounce Rate Badge
function BounceRateBadge({ value, bounces, contacted }) {
    if (value === null || contacted === 0) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "text-slate-400 text-xs",
        children: "—"
    }, void 0, false, {
        fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
        lineNumber: 598,
        columnNumber: 49
    }, this);
    const percentage = value * 100;
    let color = 'text-emerald-700';
    let bg = 'bg-emerald-50';
    let border = 'border-emerald-200';
    if (percentage >= 4) {
        color = 'text-red-700';
        bg = 'bg-red-50';
        border = 'border-red-200';
    } else if (percentage >= 2) {
        color = 'text-amber-700';
        bg = 'bg-amber-50';
        border = 'border-amber-200';
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col items-end gap-0.5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tooltip, {
                content: `Bounces: ${formatNumber(bounces)} / Emails: ${formatNumber(contacted)} • ${percentage.toFixed(2)}%`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])('inline-flex items-center px-2.5 py-1 rounded-md', bg, color, border, 'border font-semibold text-xs tabular-nums'),
                    children: formatPercentage(value, 1)
                }, void 0, false, {
                    fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                    lineNumber: 619,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                lineNumber: 618,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-[10px] text-slate-500 tabular-nums",
                children: formatNumber(bounces)
            }, void 0, false, {
                fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                lineNumber: 631,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
        lineNumber: 617,
        columnNumber: 5
    }, this);
}
// Positive Reply Rate Badge
function PositiveReplyRateBadge({ value, positives, replies }) {
    const positiveRate = replies > 0 ? positives / replies : null;
    const percentage = positiveRate !== null ? positiveRate * 100 : 0;
    let color = 'text-slate-700';
    let bg = 'bg-slate-50';
    let border = 'border-slate-200';
    if (positiveRate !== null) {
        if (percentage >= 8) {
            color = 'text-emerald-700';
            bg = 'bg-emerald-50';
            border = 'border-emerald-200';
        } else if (percentage >= 5) {
            color = 'text-amber-700';
            bg = 'bg-amber-50';
            border = 'border-amber-200';
        } else {
            color = 'text-red-700';
            bg = 'bg-red-50';
            border = 'border-red-200';
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col items-end gap-0.5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tooltip, {
                content: `Positives: ${formatNumber(positives)} / Replies: ${formatNumber(replies)} • ${percentage.toFixed(2)}%`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])('inline-flex items-center px-2.5 py-1 rounded-md', bg, color, border, 'border font-semibold text-xs tabular-nums'),
                    children: positiveRate !== null ? formatPercentage(positiveRate, 2) : 'N/A'
                }, void 0, false, {
                    fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                    lineNumber: 664,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                lineNumber: 663,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-[10px] text-slate-500 tabular-nums",
                children: formatNumber(positives)
            }, void 0, false, {
                fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                lineNumber: 676,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
        lineNumber: 662,
        columnNumber: 5
    }, this);
}
// Target Status Badge
function TargetStatusBadge({ proratedTarget, newLeads }) {
    if (proratedTarget === null || proratedTarget === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-slate-400 text-xs",
            children: "—"
        }, void 0, false, {
            fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
            lineNumber: 684,
            columnNumber: 12
        }, this);
    }
    const isAboveTarget = newLeads >= proratedTarget;
    let color = isAboveTarget ? 'text-emerald-700' : 'text-red-700';
    let bg = isAboveTarget ? 'bg-emerald-50' : 'bg-red-50';
    let border = isAboveTarget ? 'border-emerald-200' : 'border-red-200';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col items-end gap-0.5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tooltip, {
                content: `New Leads: ${formatNumber(newLeads)} / Target: ${formatNumber(Math.round(proratedTarget))}`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])('inline-flex items-center px-2.5 py-1 rounded-md', bg, color, border, 'border font-semibold text-xs tabular-nums'),
                    children: formatNumber(Math.round(proratedTarget))
                }, void 0, false, {
                    fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                    lineNumber: 696,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                lineNumber: 695,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-[10px] text-slate-500 tabular-nums",
                children: formatNumber(newLeads)
            }, void 0, false, {
                fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                lineNumber: 708,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
        lineNumber: 694,
        columnNumber: 5
    }, this);
}
// Attainment Badge
function AttainmentBadge({ value, weeklyTarget, newLeads }) {
    if (weeklyTarget === null) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-slate-400 text-xs",
            children: "Target missing"
        }, void 0, false, {
            fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
            lineNumber: 716,
            columnNumber: 12
        }, this);
    }
    const attainment = weeklyTarget > 0 ? newLeads / weeklyTarget : null;
    const percentage = attainment !== null ? attainment * 100 : 0;
    let color = 'text-emerald-700';
    let bgColor = 'bg-emerald-500';
    if (percentage < 50) {
        color = 'text-red-700 font-semibold';
        bgColor = 'bg-red-500';
    } else if (percentage < 90) {
        color = 'text-amber-700 font-semibold';
        bgColor = 'bg-amber-500';
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tooltip, {
        content: `${percentage.toFixed(1)}% • New Leads: ${formatNumber(newLeads)} / Target: ${formatNumber(weeklyTarget)}`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col items-end gap-1",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-20 h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])('h-full transition-all', bgColor),
                                style: {
                                    width: `${Math.min(percentage, 100)}%`,
                                    transition: tokens.transition
                                }
                            }, void 0, false, {
                                fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                lineNumber: 738,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                            lineNumber: 737,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])('text-xs font-semibold tabular-nums', color),
                            children: formatPercentage(attainment || 0, 1)
                        }, void 0, false, {
                            fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                            lineNumber: 743,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                    lineNumber: 736,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-[10px] text-slate-500 tabular-nums",
                    children: [
                        "/ ",
                        formatNumber(weeklyTarget)
                    ]
                }, void 0, true, {
                    fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                    lineNumber: 747,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
            lineNumber: 735,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
        lineNumber: 734,
        columnNumber: 5
    }, this);
}
// PCPL Badge
function PCPLBadge({ newLeads, positives }) {
    const pcpl = positives > 0 ? newLeads / positives : null;
    const displayValue = pcpl !== null ? pcpl.toFixed(1) : 'N/A';
    let colorClass = 'text-slate-700';
    if (pcpl !== null) {
        if (pcpl <= 500) {
            colorClass = 'text-emerald-700';
        } else if (pcpl <= 800) {
            colorClass = 'text-amber-700';
        } else {
            colorClass = 'text-red-700';
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col items-end gap-0.5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tooltip, {
                content: `${formatNumber(newLeads)} leads / ${formatNumber(positives)} positives = ${displayValue}`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])('inline-flex items-center px-2.5 py-1 rounded-md', 'bg-slate-50 border border-slate-200', colorClass, 'border font-semibold text-xs tabular-nums'),
                    children: displayValue
                }, void 0, false, {
                    fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                    lineNumber: 772,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                lineNumber: 771,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-[10px] text-slate-500 tabular-nums",
                children: "PCPL"
            }, void 0, false, {
                fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                lineNumber: 783,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
        lineNumber: 770,
        columnNumber: 5
    }, this);
}
// Status Badge
function StatusBadge({ status }) {
    if (!status) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "text-slate-400 text-xs",
        children: "—"
    }, void 0, false, {
        fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
        lineNumber: 790,
        columnNumber: 23
    }, this);
    const statusLower = status.toLowerCase();
    const isActive = [
        'active',
        'live',
        'ongoing'
    ].includes(statusLower);
    const configKey = isActive ? 'active' : statusLower === 'paused' ? 'paused' : 'default';
    const badgeClasses = {
        active: 'inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-semibold uppercase tracking-wide bg-emerald-50 text-emerald-700 border border-emerald-200',
        paused: 'inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-semibold uppercase tracking-wide bg-amber-50 text-amber-700 border border-amber-200',
        default: 'inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-semibold uppercase tracking-wide bg-slate-50 text-slate-600 border border-slate-200'
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: badgeClasses[configKey],
        children: status
    }, void 0, false, {
        fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
        lineNumber: 802,
        columnNumber: 10
    }, this);
}
// Issues Flags
function IssuesFlags({ client }) {
    const flags = [];
    if (client.deliverability_flag) {
        flags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tooltip, {
            content: "Deliverability risk",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TrendingDownIcon, {
                className: "w-4 h-4 text-red-600",
                "aria-label": "Deliverability risk"
            }, void 0, false, {
                fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                lineNumber: 812,
                columnNumber: 9
            }, this)
        }, "deliv", false, {
            fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
            lineNumber: 811,
            columnNumber: 7
        }, this));
    }
    if (client.volume_flag && client.weekly_target_int) {
        flags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tooltip, {
            content: "Volume risk",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AlertIcon, {
                className: "w-4 h-4 text-amber-600",
                "aria-label": "Volume risk"
            }, void 0, false, {
                fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                lineNumber: 820,
                columnNumber: 9
            }, this)
        }, "vol", false, {
            fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
            lineNumber: 819,
            columnNumber: 7
        }, this));
    }
    if (client.mmf_flag) {
        flags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tooltip, {
            content: "MMF risk",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(MessageIcon, {
                className: "w-4 h-4 text-amber-600",
                "aria-label": "MMF risk"
            }, void 0, false, {
                fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                lineNumber: 828,
                columnNumber: 9
            }, this)
        }, "mmf", false, {
            fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
            lineNumber: 827,
            columnNumber: 7
        }, this));
    }
    if (client.data_missing_flag) {
        flags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tooltip, {
            content: "No data",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "inline-flex items-center justify-center w-5 h-5 rounded bg-slate-100 text-slate-600 text-[11px] font-semibold border border-slate-200",
                "aria-label": "No data",
                children: "!"
            }, void 0, false, {
                fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                lineNumber: 836,
                columnNumber: 9
            }, this)
        }, "miss", false, {
            fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
            lineNumber: 835,
            columnNumber: 7
        }, this));
    }
    if (flags.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tooltip, {
            content: "All metrics OK",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CheckIcon, {
                className: "w-4 h-4 text-emerald-600",
                "aria-label": "No issues"
            }, void 0, false, {
                fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                lineNumber: 849,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
            lineNumber: 848,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex gap-1.5",
        children: flags
    }, void 0, false, {
        fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
        lineNumber: 854,
        columnNumber: 10
    }, this);
}
// Sortable Header
function SortableHeader({ field, label, sortField, sortOrder, onSort, align = 'left' }) {
    const isActive = sortField === field;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])('px-4 py-3.5 font-semibold text-xs uppercase tracking-wide border-b-2 whitespace-nowrap bg-slate-50/50', align === 'center' && 'text-center', align === 'right' && 'text-right', align === 'left' && 'text-left', isActive ? 'border-blue-500 text-blue-700' : 'border-slate-200 text-slate-600'),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: ()=>onSort(field),
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])('flex items-center gap-2 transition-all', align === 'center' && 'justify-center', align === 'right' && 'justify-end', 'focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 rounded', isActive && 'text-blue-700', !isActive && 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 px-2 py-1 -mx-2 rounded -my-1'),
            style: {
                transition: tokens.transition
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "font-semibold",
                    children: label
                }, void 0, false, {
                    fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                    lineNumber: 897,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "flex items-center",
                    children: isActive && sortOrder ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-blue-600",
                        children: sortOrder === 'asc' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SortAscIcon, {}, void 0, false, {
                            fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                            lineNumber: 901,
                            columnNumber: 38
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SortDescIcon, {}, void 0, false, {
                            fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                            lineNumber: 901,
                            columnNumber: 56
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                        lineNumber: 900,
                        columnNumber: 13
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SortUnsortedIcon, {
                        className: "text-slate-300"
                    }, void 0, false, {
                        fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                        lineNumber: 904,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                    lineNumber: 898,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
            lineNumber: 885,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
        lineNumber: 876,
        columnNumber: 5
    }, this);
}
// KPI Pill
function KpiPill({ status, count, color }) {
    const styles = {
        red: 'bg-red-50 text-red-700 border-red-200',
        amber: 'bg-amber-50 text-amber-700 border-amber-200',
        green: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    };
    const dotColors = {
        red: 'bg-red-500',
        amber: 'bg-amber-500',
        green: 'bg-emerald-500'
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])('inline-flex items-center gap-2 px-3 py-1.5 rounded-md border font-medium text-xs whitespace-nowrap', styles[color]),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])('w-2 h-2 rounded-full', dotColors[color])
            }, void 0, false, {
                fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                lineNumber: 933,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: [
                    status,
                    " ",
                    formatNumber(count)
                ]
            }, void 0, true, {
                fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                lineNumber: 934,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
        lineNumber: 927,
        columnNumber: 5
    }, this);
}
// KPI Tile (compact)
function KpiTileCompact({ label, value }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col justify-center min-w-[90px] px-3 py-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-[10px] font-medium text-slate-500 uppercase tracking-wide whitespace-nowrap",
                children: label
            }, void 0, false, {
                fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                lineNumber: 949,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-lg font-semibold text-slate-900 tabular-nums mt-0.5",
                children: value
            }, void 0, false, {
                fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                lineNumber: 952,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
        lineNumber: 948,
        columnNumber: 5
    }, this);
}
function HistoricalDashboardClient() {
    const [weeks, setWeeks] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedWeeks, setSelectedWeeks] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(new Set());
    const [clients, setClients] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loadingWeeks, setLoadingWeeks] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [loadingData, setLoadingData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [aggregationInfo, setAggregationInfo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [sortField, setSortField] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('new_leads_reached_7d');
    const [sortOrder, setSortOrder] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('desc');
    const [selectedClients, setSelectedClients] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(new Set());
    // Column visibility state
    const [visibleColumns, setVisibleColumns] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>{
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        return new Set(COLUMN_DEFINITIONS.filter((col)=>col.defaultVisible).map((col)=>col.id));
    });
    // Fetch available weeks on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        fetch('/api/weeks').then((res)=>res.json()).then((data)=>{
            setWeeks(data.weeks);
            setLoadingWeeks(false);
        }).catch((err)=>{
            console.error('Failed to fetch weeks:', err);
            setError('Failed to load available weeks');
            setLoadingWeeks(false);
        });
    }, []);
    // Save column visibility to localStorage
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
    }, [
        visibleColumns
    ]);
    // Handle week selection change
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (selectedWeeks.size === 0) {
            setClients([]);
            setAggregationInfo(null);
            return;
        }
        setLoadingData(true);
        setError(null);
        const weeksParam = Array.from(selectedWeeks).sort((a, b)=>a - b).join(',');
        fetch(`/api/dashboard/historical?weeks=${weeksParam}`).then((res)=>res.json()).then((data)=>{
            setClients(data.data);
            setAggregationInfo(data.aggregation_info);
            setLoadingData(false);
        }).catch((err)=>{
            console.error('Failed to fetch historical data:', err);
            setError('Failed to load historical data');
            setLoadingData(false);
        });
    }, [
        selectedWeeks
    ]);
    const handleWeekToggle = (weekNumber)=>{
        setSelectedWeeks((prev)=>{
            const newSet = new Set(prev);
            if (newSet.has(weekNumber)) {
                newSet.delete(weekNumber);
            } else {
                newSet.add(weekNumber);
            }
            return newSet;
        });
    };
    const handleClearSelection = ()=>{
        setSelectedWeeks(new Set());
    };
    const handleSort = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((field)=>{
        if (sortField === field) {
            if (sortOrder === 'asc') setSortOrder('desc');
            else if (sortOrder === 'desc') setSortOrder(null);
            else setSortOrder('asc');
        } else {
            setSortField(field);
            setSortOrder('asc');
        }
    }, [
        sortField,
        sortOrder
    ]);
    const sortedClients = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (!sortOrder) return clients;
        return [
            ...clients
        ].sort((a, b)=>{
            let aVal;
            let bVal;
            if (sortField === 'pcpl') {
                aVal = a.positives_7d > 0 ? a.new_leads_reached_7d / a.positives_7d : null;
                bVal = b.positives_7d > 0 ? b.new_leads_reached_7d / b.positives_7d : null;
            } else if (sortField === 'prorated_target') {
                aVal = a.prorated_target !== null ? Number(a.prorated_target) : null;
                bVal = b.prorated_target !== null ? Number(b.prorated_target) : null;
            } else {
                aVal = a[sortField];
                bVal = b[sortField];
            }
            if (aVal === null && bVal === null) return 0;
            if (aVal === null) return 1;
            if (bVal === null) return -1;
            if (typeof aVal === 'string' && typeof bVal === 'string') {
                return sortOrder === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
            }
            const aNum = typeof aVal === 'number' ? aVal : Number(aVal);
            const bNum = typeof bVal === 'number' ? bVal : Number(bVal);
            if (!isNaN(aNum) && !isNaN(bNum)) {
                return sortOrder === 'asc' ? aNum - bNum : bNum - aNum;
            }
            return 0;
        });
    }, [
        clients,
        sortField,
        sortOrder
    ]);
    const handleColumnToggle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((columnId)=>{
        setVisibleColumns((prev)=>{
            const newSet = new Set(prev);
            if (newSet.has(columnId)) {
                newSet.delete(columnId);
            } else {
                newSet.add(columnId);
            }
            return newSet;
        });
    }, []);
    const handleShowAllColumns = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        setVisibleColumns(new Set(COLUMN_DEFINITIONS.map((col)=>col.id)));
    }, []);
    const handleHideAllColumns = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        setVisibleColumns(new Set([
            'rag_status',
            'new_leads_reached_7d'
        ]));
    }, []);
    const exportToCSV = ()=>{
        const dataToExport = selectedClients.size > 0 ? sortedClients.filter((c)=>selectedClients.has(c.client_id)) : sortedClients;
        const headers = [
            'Client Code',
            'Client Company',
            'Status',
            'RAG Status',
            'New Leads',
            'Emails Sent',
            'Replies',
            'Reply Rate',
            'Positive Replies',
            'Positive Rate',
            'PCPL',
            'Target',
            'Volume Attainment',
            'Not Contacted',
            'Selected Weeks',
            'Aggregation Days'
        ];
        const rows = dataToExport.map((c)=>{
            const newLeads = c.new_leads_reached_7d || 0;
            const positives = c.positives_7d || 0;
            const replies = c.replies_7d || 0;
            const pcpl = positives > 0 ? (newLeads / positives).toFixed(1) : 'N/A';
            const positiveRate = replies > 0 ? (positives / replies * 100).toFixed(2) + '%' : 'N/A';
            return [
                c.client_code,
                c.client_company_name || c.client_name || '',
                c.relationship_status || '',
                c.rag_status,
                newLeads,
                c.contacted_7d || 0,
                replies,
                c.reply_rate_7d ? (c.reply_rate_7d * 100).toFixed(1) + '%' : 'N/A',
                positives,
                positiveRate,
                pcpl,
                c.weekly_target_int || 'N/A',
                c.weekly_target_int ? ((c.new_leads_reached_7d || 0) / c.weekly_target_int * 100).toFixed(1) + '%' : 'N/A',
                c.not_contacted_leads || 0,
                c.selected_weeks.join(','),
                c.aggregation_days
            ];
        });
        const csvContent = [
            headers.join(','),
            ...rows.map((row)=>row.map((cell)=>`"${cell}"`).join(','))
        ].join('\n');
        const blob = new Blob([
            csvContent
        ], {
            type: 'text/csv;charset=utf-8;'
        });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `historical-dashboard-${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    // Calculate KPIs
    const redCount = clients.filter((c)=>c.rag_status === 'Red').length;
    const yellowCount = clients.filter((c)=>c.rag_status === 'Yellow').length;
    const greenCount = clients.filter((c)=>c.rag_status === 'Green').length;
    const totalClients = clients.length;
    // Format the period info for display
    const formatPeriodInfo = ()=>{
        if (!aggregationInfo) return '';
        const weekCount = aggregationInfo.week_ranges.length;
        if (weekCount === 0) return '';
        if (weekCount === 1) {
            const range = aggregationInfo.week_ranges[0];
            const startDate = new Date(range.start_date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric'
            });
            const endDate = new Date(range.end_date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric'
            });
            return `${startDate} - ${endDate}`;
        }
        const start = new Date(aggregationInfo.week_ranges[0].start_date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        });
        const end = new Date(aggregationInfo.week_ranges[weekCount - 1].end_date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        });
        return `${start} - ${end} (${aggregationInfo.total_days} days)`;
    };
    if (loadingWeeks) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "min-h-screen bg-slate-50 flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "inline-block w-8 h-8 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin mb-3"
                    }, void 0, false, {
                        fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                        lineNumber: 1243,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-slate-600",
                        children: "Loading available weeks..."
                    }, void 0, false, {
                        fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                        lineNumber: 1244,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                lineNumber: 1242,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
            lineNumber: 1241,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "min-h-screen bg-slate-50",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "bg-white border-b border-slate-200",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-[1800px] mx-auto px-6 py-5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between mb-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-3",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/",
                                                className: "text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors",
                                                children: "← Back to Current Week"
                                            }, void 0, false, {
                                                fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                                lineNumber: 1258,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                            lineNumber: 1257,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                            className: "text-2xl font-semibold text-slate-900 tracking-tight mt-2",
                                            children: "Historical Weeks Dashboard"
                                        }, void 0, false, {
                                            fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                            lineNumber: 1265,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-slate-500 mt-1",
                                            children: "Select and compare data from historical weeks"
                                        }, void 0, false, {
                                            fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                            lineNumber: 1266,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                    lineNumber: 1256,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-3",
                                    children: [
                                        selectedClients.size > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "inline-flex items-center px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-50 rounded-md border border-slate-200",
                                            children: [
                                                selectedClients.size,
                                                " selected"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                            lineNumber: 1270,
                                            columnNumber: 17
                                        }, this),
                                        selectedWeeks.size > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: exportToCSV,
                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])('inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-700', 'bg-white hover:bg-slate-50 rounded-md border border-slate-300', 'transition-all focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2'),
                                            style: {
                                                transition: tokens.transition
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(DownloadIcon, {}, void 0, false, {
                                                    fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                                    lineNumber: 1284,
                                                    columnNumber: 19
                                                }, this),
                                                "Export"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                            lineNumber: 1275,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$src$2f$components$2f$ColumnSelector$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ColumnSelector"], {
                                            columns: COLUMN_DEFINITIONS,
                                            visibleColumns: visibleColumns,
                                            onColumnToggle: handleColumnToggle,
                                            onShowAll: handleShowAllColumns,
                                            onHideAll: handleHideAllColumns
                                        }, void 0, false, {
                                            fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                            lineNumber: 1288,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                    lineNumber: 1268,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                            lineNumber: 1255,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(WeekSelector, {
                                    weeks: weeks,
                                    selectedWeeks: selectedWeeks,
                                    onWeekToggle: handleWeekToggle,
                                    onClearSelection: handleClearSelection,
                                    loading: loadingWeeks
                                }, void 0, false, {
                                    fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                    lineNumber: 1300,
                                    columnNumber: 13
                                }, this),
                                aggregationInfo && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-md",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CalendarIcon, {
                                            className: "w-4 h-4 text-blue-700"
                                        }, void 0, false, {
                                            fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                            lineNumber: 1309,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm font-medium text-blue-900",
                                            children: [
                                                "Showing ",
                                                formatPeriodInfo()
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                            lineNumber: 1310,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                    lineNumber: 1308,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                            lineNumber: 1299,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                    lineNumber: 1254,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                lineNumber: 1253,
                columnNumber: 7
            }, this),
            loadingData && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-[1800px] mx-auto px-6 py-12",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "inline-block w-8 h-8 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin mb-3"
                        }, void 0, false, {
                            fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                            lineNumber: 1323,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-slate-600",
                            children: "Loading historical data..."
                        }, void 0, false, {
                            fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                            lineNumber: 1324,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                    lineNumber: 1322,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                lineNumber: 1321,
                columnNumber: 9
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-[1800px] mx-auto px-6 py-12",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-red-50 border border-red-200 rounded-lg p-6",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm font-semibold text-red-900",
                        children: error
                    }, void 0, false, {
                        fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                        lineNumber: 1333,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                    lineNumber: 1332,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                lineNumber: 1331,
                columnNumber: 9
            }, this),
            !loadingData && !error && selectedWeeks.size === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-[1800px] mx-auto px-6 py-12",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white border border-slate-200 rounded-lg p-12 text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CalendarIcon, {
                            className: "w-12 h-12 text-slate-300 mx-auto mb-4"
                        }, void 0, false, {
                            fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                            lineNumber: 1342,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-lg font-semibold text-slate-900 mb-2",
                            children: "Select Historical Weeks"
                        }, void 0, false, {
                            fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                            lineNumber: 1343,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-slate-500 mb-4",
                            children: weeks.length === 0 ? 'No historical data available yet.' : `Choose from ${weeks.length} available week${weeks.length !== 1 ? 's' : ''} to view aggregated client health data.`
                        }, void 0, false, {
                            fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                            lineNumber: 1344,
                            columnNumber: 13
                        }, this),
                        weeks.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs text-slate-400",
                            children: "You can select multiple weeks to compare aggregated performance"
                        }, void 0, false, {
                            fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                            lineNumber: 1350,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                    lineNumber: 1341,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                lineNumber: 1340,
                columnNumber: 9
            }, this),
            !loadingData && !error && selectedWeeks.size > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-w-[1800px] mx-auto px-6 py-6",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])('bg-white rounded-lg border border-slate-200', 'p-5'),
                            style: {
                                boxShadow: tokens.shadows.card
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-[40%_60%] gap-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col justify-center gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-3 flex-wrap",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(KpiPill, {
                                                        status: "Red",
                                                        count: redCount,
                                                        color: "red"
                                                    }, void 0, false, {
                                                        fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                                        lineNumber: 1374,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(KpiPill, {
                                                        status: "Amber",
                                                        count: yellowCount,
                                                        color: "amber"
                                                    }, void 0, false, {
                                                        fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                                        lineNumber: 1375,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(KpiPill, {
                                                        status: "Green",
                                                        count: greenCount,
                                                        color: "green"
                                                    }, void 0, false, {
                                                        fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                                        lineNumber: 1376,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                                lineNumber: 1373,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs text-slate-500 mt-1",
                                                children: [
                                                    totalClients,
                                                    " clients"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                                lineNumber: 1378,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                        lineNumber: 1372,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-0 overflow-x-auto pl-4 border-l border-slate-100",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(KpiTileCompact, {
                                                label: "New Leads",
                                                value: formatNumber(clients.reduce((sum, c)=>sum + c.new_leads_reached_7d, 0))
                                            }, void 0, false, {
                                                fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                                lineNumber: 1385,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-px h-8 bg-slate-100 mx-2"
                                            }, void 0, false, {
                                                fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                                lineNumber: 1389,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(KpiTileCompact, {
                                                label: "Replies",
                                                value: formatNumber(clients.reduce((sum, c)=>sum + c.replies_7d, 0))
                                            }, void 0, false, {
                                                fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                                lineNumber: 1390,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-px h-8 bg-slate-100 mx-2"
                                            }, void 0, false, {
                                                fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                                lineNumber: 1394,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(KpiTileCompact, {
                                                label: "Reply Rate",
                                                value: (()=>{
                                                    const totalReplies = clients.reduce((sum, c)=>sum + c.replies_7d, 0);
                                                    const totalNewLeads = clients.reduce((sum, c)=>sum + c.new_leads_reached_7d, 0);
                                                    return totalNewLeads > 0 ? formatPercentage(totalReplies / totalNewLeads, 1) : 'N/A';
                                                })()
                                            }, void 0, false, {
                                                fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                                lineNumber: 1395,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-px h-8 bg-slate-100 mx-2"
                                            }, void 0, false, {
                                                fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                                lineNumber: 1403,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(KpiTileCompact, {
                                                label: "Positives",
                                                value: formatNumber(clients.reduce((sum, c)=>sum + c.positives_7d, 0))
                                            }, void 0, false, {
                                                fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                                lineNumber: 1404,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-px h-8 bg-slate-100 mx-2"
                                            }, void 0, false, {
                                                fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                                lineNumber: 1408,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(KpiTileCompact, {
                                                label: "Positive Rate",
                                                value: (()=>{
                                                    const totalReplies = clients.reduce((sum, c)=>sum + c.replies_7d, 0);
                                                    const totalPos = clients.reduce((sum, c)=>sum + c.positives_7d, 0);
                                                    return totalReplies > 0 ? formatPercentage(totalPos / totalReplies, 2) : 'N/A';
                                                })()
                                            }, void 0, false, {
                                                fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                                lineNumber: 1409,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                        lineNumber: 1384,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                lineNumber: 1370,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                            lineNumber: 1363,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                        lineNumber: 1362,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-w-[1800px] mx-auto px-6 pb-6",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden",
                            style: {
                                boxShadow: tokens.shadows.card
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "overflow-x-auto",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                        className: "w-full",
                                        role: "grid",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                                className: "bg-slate-50 border-b border-slate-200",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "px-4 py-3 w-10",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "checkbox",
                                                                checked: selectedClients.size === sortedClients.length && sortedClients.length > 0,
                                                                onChange: (e)=>{
                                                                    if (e.target.checked) {
                                                                        setSelectedClients(new Set(sortedClients.map((c)=>c.client_id)));
                                                                    } else {
                                                                        setSelectedClients(new Set());
                                                                    }
                                                                },
                                                                className: "w-4 h-4 rounded border-slate-300 text-slate-600 focus:ring-2 focus:ring-slate-400 focus:ring-offset-2",
                                                                "aria-label": "Select all clients"
                                                            }, void 0, false, {
                                                                fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                                                lineNumber: 1433,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                                            lineNumber: 1432,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SortableHeader, {
                                                            field: "client_code",
                                                            label: "Client",
                                                            sortField: sortField,
                                                            sortOrder: sortOrder,
                                                            onSort: handleSort,
                                                            align: "left"
                                                        }, void 0, false, {
                                                            fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                                            lineNumber: 1447,
                                                            columnNumber: 23
                                                        }, this),
                                                        visibleColumns.has('rag_status') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SortableHeader, {
                                                            field: "rag_status",
                                                            label: "Health",
                                                            sortField: sortField,
                                                            sortOrder: sortOrder,
                                                            onSort: handleSort,
                                                            align: "center"
                                                        }, void 0, false, {
                                                            fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                                            lineNumber: 1456,
                                                            columnNumber: 25
                                                        }, this),
                                                        visibleColumns.has('contacted_7d') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SortableHeader, {
                                                            field: "contacted_7d",
                                                            label: "Emails Sent",
                                                            sortField: sortField,
                                                            sortOrder: sortOrder,
                                                            onSort: handleSort,
                                                            align: "right"
                                                        }, void 0, false, {
                                                            fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                                            lineNumber: 1466,
                                                            columnNumber: 25
                                                        }, this),
                                                        visibleColumns.has('new_leads_reached_7d') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SortableHeader, {
                                                            field: "new_leads_reached_7d",
                                                            label: "New Leads",
                                                            sortField: sortField,
                                                            sortOrder: sortOrder,
                                                            onSort: handleSort,
                                                            align: "right"
                                                        }, void 0, false, {
                                                            fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                                            lineNumber: 1476,
                                                            columnNumber: 25
                                                        }, this),
                                                        visibleColumns.has('prorated_target') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SortableHeader, {
                                                            field: "prorated_target",
                                                            label: "Target",
                                                            sortField: sortField,
                                                            sortOrder: sortOrder,
                                                            onSort: handleSort,
                                                            align: "right"
                                                        }, void 0, false, {
                                                            fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                                            lineNumber: 1486,
                                                            columnNumber: 25
                                                        }, this),
                                                        visibleColumns.has('replies_7d') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SortableHeader, {
                                                            field: "replies_7d",
                                                            label: "Replies",
                                                            sortField: sortField,
                                                            sortOrder: sortOrder,
                                                            onSort: handleSort,
                                                            align: "right"
                                                        }, void 0, false, {
                                                            fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                                            lineNumber: 1496,
                                                            columnNumber: 25
                                                        }, this),
                                                        visibleColumns.has('reply_rate_7d') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SortableHeader, {
                                                            field: "reply_rate_7d",
                                                            label: "Reply Rate",
                                                            sortField: sortField,
                                                            sortOrder: sortOrder,
                                                            onSort: handleSort,
                                                            align: "right"
                                                        }, void 0, false, {
                                                            fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                                            lineNumber: 1506,
                                                            columnNumber: 25
                                                        }, this),
                                                        visibleColumns.has('bounce_pct_7d') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SortableHeader, {
                                                            field: "bounce_pct_7d",
                                                            label: "Bounce Rate",
                                                            sortField: sortField,
                                                            sortOrder: sortOrder,
                                                            onSort: handleSort,
                                                            align: "right"
                                                        }, void 0, false, {
                                                            fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                                            lineNumber: 1516,
                                                            columnNumber: 25
                                                        }, this),
                                                        visibleColumns.has('positives_7d') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SortableHeader, {
                                                            field: "positives_7d",
                                                            label: "Positive Replies",
                                                            sortField: sortField,
                                                            sortOrder: sortOrder,
                                                            onSort: handleSort,
                                                            align: "right"
                                                        }, void 0, false, {
                                                            fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                                            lineNumber: 1526,
                                                            columnNumber: 25
                                                        }, this),
                                                        visibleColumns.has('positive_reply_rate_7d') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SortableHeader, {
                                                            field: "positive_reply_rate_7d",
                                                            label: "Positive Rate",
                                                            sortField: sortField,
                                                            sortOrder: sortOrder,
                                                            onSort: handleSort,
                                                            align: "right"
                                                        }, void 0, false, {
                                                            fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                                            lineNumber: 1536,
                                                            columnNumber: 25
                                                        }, this),
                                                        visibleColumns.has('pcpl') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SortableHeader, {
                                                            field: "pcpl",
                                                            label: "PCPL",
                                                            sortField: sortField,
                                                            sortOrder: sortOrder,
                                                            onSort: handleSort,
                                                            align: "right"
                                                        }, void 0, false, {
                                                            fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                                            lineNumber: 1546,
                                                            columnNumber: 25
                                                        }, this),
                                                        visibleColumns.has('volume_attainment') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SortableHeader, {
                                                            field: "volume_attainment",
                                                            label: "Target",
                                                            sortField: sortField,
                                                            sortOrder: sortOrder,
                                                            onSort: handleSort,
                                                            align: "right"
                                                        }, void 0, false, {
                                                            fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                                            lineNumber: 1556,
                                                            columnNumber: 25
                                                        }, this),
                                                        visibleColumns.has('not_contacted_leads') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SortableHeader, {
                                                            field: "not_contacted_leads",
                                                            label: "Not Contacted",
                                                            sortField: sortField,
                                                            sortOrder: sortOrder,
                                                            onSort: handleSort,
                                                            align: "right"
                                                        }, void 0, false, {
                                                            fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                                            lineNumber: 1566,
                                                            columnNumber: 25
                                                        }, this),
                                                        visibleColumns.has('bonus_pool_monthly') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SortableHeader, {
                                                            field: "bonus_pool_monthly",
                                                            label: "Bonus Pool",
                                                            sortField: sortField,
                                                            sortOrder: sortOrder,
                                                            onSort: handleSort,
                                                            align: "right"
                                                        }, void 0, false, {
                                                            fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                                            lineNumber: 1576,
                                                            columnNumber: 25
                                                        }, this),
                                                        visibleColumns.has('monthly_booking_goal') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SortableHeader, {
                                                            field: "monthly_booking_goal",
                                                            label: "Monthly Booking Goal",
                                                            sortField: sortField,
                                                            sortOrder: sortOrder,
                                                            onSort: handleSort,
                                                            align: "right"
                                                        }, void 0, false, {
                                                            fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                                            lineNumber: 1586,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "px-4 py-3.5 text-left font-semibold text-xs uppercase tracking-wide border-b-2 border-slate-200 text-slate-600 bg-slate-50/50 whitespace-nowrap",
                                                            children: "Issues"
                                                        }, void 0, false, {
                                                            fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                                            lineNumber: 1595,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                                    lineNumber: 1431,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                                lineNumber: 1430,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                                className: "divide-y divide-slate-100",
                                                children: sortedClients.map((client, index)=>{
                                                    const newLeads = client.new_leads_reached_7d || 0;
                                                    const positives = client.positives_7d || 0;
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])('group transition-colors', index % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'),
                                                        style: {
                                                            transition: tokens.transition
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "px-4 py-4",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    type: "checkbox",
                                                                    checked: selectedClients.has(client.client_id),
                                                                    onChange: (e)=>{
                                                                        const newSelected = new Set(selectedClients);
                                                                        if (e.target.checked) {
                                                                            newSelected.add(client.client_id);
                                                                        } else {
                                                                            newSelected.delete(client.client_id);
                                                                        }
                                                                        setSelectedClients(newSelected);
                                                                    },
                                                                    className: "w-4 h-4 rounded border-slate-300 text-slate-600 focus:ring-2 focus:ring-slate-400 focus:ring-offset-2",
                                                                    "aria-label": `Select ${client.client_code}`
                                                                }, void 0, false, {
                                                                    fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                                                    lineNumber: 1615,
                                                                    columnNumber: 29
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                                                lineNumber: 1614,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "px-4 py-4",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "font-semibold text-slate-900 text-sm",
                                                                            children: client.client_code
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                                                            lineNumber: 1633,
                                                                            columnNumber: 31
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "text-xs text-slate-500 mt-0.5",
                                                                            children: client.client_company_name || 'No company name'
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                                                            lineNumber: 1636,
                                                                            columnNumber: 31
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "mt-2",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(StatusBadge, {
                                                                                status: client.relationship_status
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                                                                lineNumber: 1640,
                                                                                columnNumber: 33
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                                                            lineNumber: 1639,
                                                                            columnNumber: 31
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                                                    lineNumber: 1632,
                                                                    columnNumber: 29
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                                                lineNumber: 1631,
                                                                columnNumber: 27
                                                            }, this),
                                                            visibleColumns.has('rag_status') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "px-4 py-4 text-center",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RAGStatus, {
                                                                    status: client.rag_status
                                                                }, void 0, false, {
                                                                    fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                                                    lineNumber: 1646,
                                                                    columnNumber: 31
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                                                lineNumber: 1645,
                                                                columnNumber: 29
                                                            }, this),
                                                            visibleColumns.has('contacted_7d') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "px-4 py-4 text-right",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "font-semibold text-slate-900 text-sm tabular-nums",
                                                                    children: formatNumber(client.contacted_7d)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                                                    lineNumber: 1651,
                                                                    columnNumber: 31
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                                                lineNumber: 1650,
                                                                columnNumber: 29
                                                            }, this),
                                                            visibleColumns.has('new_leads_reached_7d') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "px-4 py-4 text-right",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "font-semibold text-slate-900 text-sm tabular-nums",
                                                                    children: formatNumber(client.new_leads_reached_7d)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                                                    lineNumber: 1658,
                                                                    columnNumber: 31
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                                                lineNumber: 1657,
                                                                columnNumber: 29
                                                            }, this),
                                                            visibleColumns.has('prorated_target') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "px-4 py-4 text-right",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TargetStatusBadge, {
                                                                    proratedTarget: client.prorated_target,
                                                                    newLeads: client.new_leads_reached_7d || 0
                                                                }, void 0, false, {
                                                                    fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                                                    lineNumber: 1665,
                                                                    columnNumber: 31
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                                                lineNumber: 1664,
                                                                columnNumber: 29
                                                            }, this),
                                                            visibleColumns.has('replies_7d') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "px-4 py-4 text-right",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-sm text-slate-700 tabular-nums",
                                                                    children: formatNumber(client.replies_7d || 0)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                                                    lineNumber: 1673,
                                                                    columnNumber: 31
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                                                lineNumber: 1672,
                                                                columnNumber: 29
                                                            }, this),
                                                            visibleColumns.has('reply_rate_7d') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "px-4 py-4 text-right",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ReplyRateBadge, {
                                                                    value: client.reply_rate_7d,
                                                                    replies: client.replies_7d || 0,
                                                                    newLeads: client.new_leads_reached_7d || 0
                                                                }, void 0, false, {
                                                                    fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                                                    lineNumber: 1680,
                                                                    columnNumber: 31
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                                                lineNumber: 1679,
                                                                columnNumber: 29
                                                            }, this),
                                                            visibleColumns.has('bounce_pct_7d') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "px-4 py-4 text-right",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(BounceRateBadge, {
                                                                    value: client.bounce_pct_7d,
                                                                    bounces: client.bounces_7d || 0,
                                                                    contacted: client.contacted_7d || 0
                                                                }, void 0, false, {
                                                                    fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                                                    lineNumber: 1689,
                                                                    columnNumber: 31
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                                                lineNumber: 1688,
                                                                columnNumber: 29
                                                            }, this),
                                                            visibleColumns.has('positives_7d') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "px-4 py-4 text-right",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-sm text-slate-700 tabular-nums",
                                                                    children: formatNumber(client.positives_7d || 0)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                                                    lineNumber: 1698,
                                                                    columnNumber: 31
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                                                lineNumber: 1697,
                                                                columnNumber: 29
                                                            }, this),
                                                            visibleColumns.has('positive_reply_rate_7d') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "px-4 py-4 text-right",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(PositiveReplyRateBadge, {
                                                                    value: client.positive_reply_rate_7d,
                                                                    positives: client.positives_7d || 0,
                                                                    replies: client.replies_7d || 0
                                                                }, void 0, false, {
                                                                    fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                                                    lineNumber: 1705,
                                                                    columnNumber: 31
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                                                lineNumber: 1704,
                                                                columnNumber: 29
                                                            }, this),
                                                            visibleColumns.has('pcpl') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "px-4 py-4 text-right",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(PCPLBadge, {
                                                                    newLeads: newLeads,
                                                                    positives: positives
                                                                }, void 0, false, {
                                                                    fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                                                    lineNumber: 1714,
                                                                    columnNumber: 31
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                                                lineNumber: 1713,
                                                                columnNumber: 29
                                                            }, this),
                                                            visibleColumns.has('volume_attainment') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "px-4 py-4 text-right",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AttainmentBadge, {
                                                                    value: client.volume_attainment,
                                                                    weeklyTarget: client.weekly_target_int,
                                                                    newLeads: client.new_leads_reached_7d
                                                                }, void 0, false, {
                                                                    fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                                                    lineNumber: 1722,
                                                                    columnNumber: 31
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                                                lineNumber: 1721,
                                                                columnNumber: 29
                                                            }, this),
                                                            visibleColumns.has('not_contacted_leads') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "px-4 py-4 text-right",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tooltip, {
                                                                    content: "Leads with STARTED status (not yet contacted)",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "font-semibold text-slate-900 text-sm tabular-nums",
                                                                        children: formatNumber(client.not_contacted_leads || 0)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                                                        lineNumber: 1732,
                                                                        columnNumber: 33
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                                                    lineNumber: 1731,
                                                                    columnNumber: 31
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                                                lineNumber: 1730,
                                                                columnNumber: 29
                                                            }, this),
                                                            visibleColumns.has('bonus_pool_monthly') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "px-4 py-4 text-right",
                                                                children: client.bonus_pool_monthly !== null && client.bonus_pool_monthly !== undefined ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tooltip, {
                                                                    content: "Monthly bonus pool allocation",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "font-semibold text-slate-900 text-sm tabular-nums",
                                                                        children: formatNumber(client.bonus_pool_monthly)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                                                        lineNumber: 1742,
                                                                        columnNumber: 35
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                                                    lineNumber: 1741,
                                                                    columnNumber: 33
                                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-sm text-slate-400 tabular-nums",
                                                                    children: "—"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                                                    lineNumber: 1747,
                                                                    columnNumber: 33
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                                                lineNumber: 1739,
                                                                columnNumber: 29
                                                            }, this),
                                                            visibleColumns.has('monthly_booking_goal') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "px-4 py-4 text-right",
                                                                children: client.monthly_booking_goal !== null && client.monthly_booking_goal !== undefined ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tooltip, {
                                                                    content: "Monthly booking goal",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "font-semibold text-slate-900 text-sm tabular-nums",
                                                                        children: formatNumber(client.monthly_booking_goal)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                                                        lineNumber: 1755,
                                                                        columnNumber: 35
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                                                    lineNumber: 1754,
                                                                    columnNumber: 33
                                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-sm text-slate-400 tabular-nums",
                                                                    children: "—"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                                                    lineNumber: 1760,
                                                                    columnNumber: 33
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                                                lineNumber: 1752,
                                                                columnNumber: 29
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "px-4 py-4",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(IssuesFlags, {
                                                                    client: client
                                                                }, void 0, false, {
                                                                    fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                                                    lineNumber: 1765,
                                                                    columnNumber: 29
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                                                lineNumber: 1764,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, client.client_id, true, {
                                                        fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                                        lineNumber: 1606,
                                                        columnNumber: 25
                                                    }, this);
                                                })
                                            }, void 0, false, {
                                                fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                                lineNumber: 1600,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                        lineNumber: 1429,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                    lineNumber: 1428,
                                    columnNumber: 15
                                }, this),
                                sortedClients.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "px-6 py-12 text-center",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-slate-500",
                                        children: "No clients found for the selected weeks"
                                    }, void 0, false, {
                                        fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                        lineNumber: 1776,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                                    lineNumber: 1775,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                            lineNumber: 1424,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
                        lineNumber: 1423,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true)
        ]
    }, void 0, true, {
        fileName: "[project]/client-health-dashboard/app/src/app/historical-weeks/HistoricalDashboardClient.tsx",
        lineNumber: 1251,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__48897ef0._.js.map