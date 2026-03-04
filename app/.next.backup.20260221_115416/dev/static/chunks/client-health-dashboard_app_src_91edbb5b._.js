(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/client-health-dashboard/app/src/components/ColumnSelector.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ColumnSelector",
    ()=>ColumnSelector
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client-health-dashboard/app/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client-health-dashboard/app/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings2Icon$3e$__ = __turbopack_context__.i("[project]/client-health-dashboard/app/node_modules/lucide-react/dist/esm/icons/settings-2.js [app-client] (ecmascript) <export default as Settings2Icon>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function ColumnSelector({ columns, visibleColumns, onColumnToggle, onShowAll, onHideAll }) {
    _s();
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
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
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ColumnSelector.useEffect": ()=>{
            function handleClickOutside(event) {
                if (containerRef.current && !containerRef.current.contains(event.target)) {
                    setIsOpen(false);
                }
            }
            if (isOpen) {
                document.addEventListener('mousedown', handleClickOutside);
            }
            return ({
                "ColumnSelector.useEffect": ()=>{
                    document.removeEventListener('mousedown', handleClickOutside);
                }
            })["ColumnSelector.useEffect"];
        }
    }["ColumnSelector.useEffect"], [
        isOpen
    ]);
    const visibleCount = visibleColumns.size;
    const totalCount = columns.length;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: containerRef,
        className: "relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>setIsOpen(!isOpen),
                className: "inline-flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-md hover:bg-slate-50 hover:border-slate-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2",
                "aria-label": `Column visibility: ${visibleCount} of ${totalCount} columns shown`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings2Icon$3e$__["Settings2Icon"], {
                        className: "w-4 h-4"
                    }, void 0, false, {
                        fileName: "[project]/client-health-dashboard/app/src/components/ColumnSelector.tsx",
                        lineNumber: 68,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
            isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute right-0 top-full mt-2 w-72 bg-white border border-slate-200 rounded-lg shadow-lg z-50 max-h-[80vh] overflow-y-auto",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-3 border-b border-slate-200",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-sm font-semibold text-slate-900 mb-2",
                                children: "Show/Hide Columns"
                            }, void 0, false, {
                                fileName: "[project]/client-health-dashboard/app/src/components/ColumnSelector.tsx",
                                lineNumber: 75,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-2",
                                children: [
                                    onShowAll && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>onShowAll(),
                                        className: "flex-1 px-2 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors",
                                        children: "Show All"
                                    }, void 0, false, {
                                        fileName: "[project]/client-health-dashboard/app/src/components/ColumnSelector.tsx",
                                        lineNumber: 78,
                                        columnNumber: 17
                                    }, this),
                                    onHideAll && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-2",
                        children: Object.entries(groupedColumns).map(([category, cols])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-3 last:mb-0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "px-2 py-1 text-[10px] font-bold text-slate-500 uppercase tracking-wider",
                                        children: category
                                    }, void 0, false, {
                                        fileName: "[project]/client-health-dashboard/app/src/components/ColumnSelector.tsx",
                                        lineNumber: 99,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-0.5",
                                        children: cols.map((col)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "flex items-center gap-2 px-2 py-1.5 hover:bg-slate-50 rounded-md cursor-pointer transition-colors",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "checkbox",
                                                        checked: visibleColumns.has(col.id),
                                                        onChange: ()=>onColumnToggle(col.id),
                                                        className: "w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                                                    }, void 0, false, {
                                                        fileName: "[project]/client-health-dashboard/app/src/components/ColumnSelector.tsx",
                                                        lineNumber: 108,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
_s(ColumnSelector, "S+VxyoOAGV/pXeK+kYNNNH3d2q4=");
_c = ColumnSelector;
var _c;
__turbopack_context__.k.register(_c, "ColumnSelector");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/client-health-dashboard/app/src/app/DashboardClient.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DashboardClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client-health-dashboard/app/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
/**
 * Client Health Dashboard - Premium Modern Design
 * Enterprise/Finance personality: Sophistication & Trust
 * Foundation: Cool (slate), Depth: Layered shadows, Spacing: 4px grid
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client-health-dashboard/app/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client-health-dashboard/app/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client-health-dashboard/app/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client-health-dashboard/app/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$src$2f$components$2f$ColumnSelector$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client-health-dashboard/app/src/components/ColumnSelector.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
// ============================================================================
// DESIGN TOKENS
// ============================================================================
const tokens = {
    // Spacing: 4px grid
    spacing: {
        1: '4px',
        2: '8px',
        3: '12px',
        4: '16px',
        6: '24px',
        8: '32px',
        16: '64px'
    },
    // Contrast hierarchy
    colors: {
        foreground: 'text-slate-900',
        secondary: 'text-slate-600',
        muted: 'text-slate-400',
        faint: 'text-slate-200',
        border: 'border-slate-200',
        background: 'bg-slate-50',
        surface: 'bg-white'
    },
    // Layered shadows for depth
    shadows: {
        card: '0 0 0 0.5px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.04), 0 2px 4px rgba(0, 0, 0, 0.03), 0 4px 8px rgba(0, 0, 0, 0.02)',
        subtle: '0 1px 3px rgba(0, 0, 0, 0.08)'
    },
    // Sharp system for technical/enterprise feel
    radius: {
        sm: '4px',
        md: '6px',
        lg: '8px'
    },
    // Smooth transitions
    transition: '150ms cubic-bezier(0.16, 1, 0.3, 1)'
};
// ============================================================================
// COLUMN DEFINITIONS
// ============================================================================
/**
 * Column definitions for the client health dashboard table
 * Used for column visibility toggle functionality
 */ const COLUMN_DEFINITIONS = [
    // Health & Status
    {
        id: 'rag_status',
        label: 'Health (RAG)',
        category: 'Health & Status',
        defaultVisible: true
    },
    {
        id: 'contacted_7d',
        label: 'Emails Sent (7d)',
        category: 'Health & Status',
        defaultVisible: false
    },
    {
        id: 'new_leads_reached_7d',
        label: 'New Leads (7d)',
        category: 'Health & Status',
        defaultVisible: true
    },
    // Performance Metrics
    {
        id: 'prorated_target',
        label: 'Target (Expected)',
        category: 'Performance Metrics',
        defaultVisible: true
    },
    {
        id: 'replies_7d',
        label: 'Replies (7d)',
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
        label: 'Positive Replies (7d)',
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
    // Target & Attainment
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
    // Financial
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
/**
 * Format numbers with thousands separators, no abbreviations
 * Uses Intl.NumberFormat for consistent, locale-aware formatting
 */ function formatNumber(num) {
    return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(num);
}
/**
 * Format percentages with controlled decimals
 */ function formatPercentage(value, decimals = 1) {
    return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    }).format(value * 100) + '%';
}
// ============================================================================
// ICONS
// ============================================================================
// Simple sorting arrows
function SortAscIcon({ className }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: className || "w-3 h-3",
        fill: "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        strokeWidth: 2.5,
        "aria-hidden": "true",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M5 15l7-7 7 7-7"
        }, void 0, false, {
            fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
            lineNumber: 202,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
        lineNumber: 194,
        columnNumber: 5
    }, this);
}
_c = SortAscIcon;
function SortDescIcon({ className }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: className || "w-3 h-3",
        fill: "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        strokeWidth: 2.5,
        "aria-hidden": "true",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M19 9l-7 7-7-7"
        }, void 0, false, {
            fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
            lineNumber: 217,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
        lineNumber: 209,
        columnNumber: 5
    }, this);
}
_c1 = SortDescIcon;
function SortUnsortedIcon({ className }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: className || "w-3 h-3",
        fill: "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        strokeWidth: 2.5,
        "aria-hidden": "true",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M5 15l7-7 7 7M5 9l7 7-7-7"
        }, void 0, false, {
            fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
            lineNumber: 232,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
        lineNumber: 224,
        columnNumber: 5
    }, this);
}
_c2 = SortUnsortedIcon;
function CheckIcon({ className }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: className || "w-4 h-4",
        fill: "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        strokeWidth: 2.5,
        "aria-hidden": "true",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M5 13l4 4L19 7"
        }, void 0, false, {
            fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
            lineNumber: 247,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
        lineNumber: 239,
        columnNumber: 5
    }, this);
}
_c3 = CheckIcon;
function AlertIcon({ className }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: className || "w-4 h-4",
        fill: "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        strokeWidth: 2.5,
        "aria-hidden": "true",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.932-3.006l-.496-2.378C19.163 6.163 18.163 5 17 5H7c-1.163 0-2.163.163-2.502 1.625l-.496 2.378C3.667 9.837 4.667 11 6 11h12c1.333 0 2.333-1.163 1.972-2.625l-.496-2.378z"
            }, void 0, false, {
                fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                lineNumber: 262,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M12 9v2m0 4h.01"
            }, void 0, false, {
                fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                lineNumber: 263,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
        lineNumber: 254,
        columnNumber: 5
    }, this);
}
_c4 = AlertIcon;
function TrendingDownIcon({ className }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: className || "w-4 h-4",
        fill: "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        strokeWidth: 2.5,
        "aria-hidden": "true",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
        }, void 0, false, {
            fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
            lineNumber: 278,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
        lineNumber: 270,
        columnNumber: 5
    }, this);
}
_c5 = TrendingDownIcon;
function MessageIcon({ className }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: className || "w-4 h-4",
        fill: "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        strokeWidth: 2.5,
        "aria-hidden": "true",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
        }, void 0, false, {
            fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
            lineNumber: 293,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
        lineNumber: 285,
        columnNumber: 5
    }, this);
}
_c6 = MessageIcon;
function DownloadIcon({ className }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: className || "w-4 h-4",
        fill: "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        strokeWidth: 2.5,
        "aria-hidden": "true",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
        }, void 0, false, {
            fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
            lineNumber: 308,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
        lineNumber: 300,
        columnNumber: 5
    }, this);
}
_c7 = DownloadIcon;
function RefreshIcon({ className, spinning }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: className || "w-4 h-4",
        fill: "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        strokeWidth: 2.5,
        "aria-hidden": "true",
        style: spinning ? {
            animation: 'spin 1s linear infinite'
        } : undefined,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        }, void 0, false, {
            fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
            lineNumber: 324,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
        lineNumber: 315,
        columnNumber: 5
    }, this);
}
_c8 = RefreshIcon;
function FilterIcon({ className }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: className || "w-4 h-4",
        fill: "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        strokeWidth: 2.5,
        "aria-hidden": "true",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
        }, void 0, false, {
            fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
            lineNumber: 339,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
        lineNumber: 331,
        columnNumber: 5
    }, this);
}
_c9 = FilterIcon;
// ============================================================================
// COMPONENTS
// ============================================================================
// Date range utility - Previous Friday to Yesterday (inclusive)
// Always shows from previous Friday to yesterday, no special cases
function getDateRangeInfo() {
    const today = new Date();
    const now = new Date(today.getTime());
    // Get current day of week in UTC (0=Sunday, 1=Monday, ..., 5=Friday, 6=Saturday)
    const currentDay = now.getUTCDay();
    // End date: Always yesterday at midnight UTC
    const endDate = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - 1));
    const endStr = endDate.toISOString().split('T')[0];
    // Start date: Always go back to previous Friday
    // Calculate days to go back:
    // Sunday (0): go back 2 days (Sun->Sat->Fri) = 2 days
    // Monday (1): go back 3 days (Mon->Sun->Sat->Fri) = 3 days
    // Tuesday (2): go back 4 days (Tue->Mon->Sun->Sat->Fri) = 4 days
    // Wednesday (3): go back 5 days = 5 days
    // Thursday (4): go back 6 days = 6 days
    // Friday (5): go back 7 days to previous Friday = 7 days
    // Saturday (6): go back 1 day (Sat->Fri) = 1 day
    let daysToSubtract;
    if (currentDay === 0) {
        daysToSubtract = 2;
    } else if (currentDay === 6) {
        daysToSubtract = 1;
    } else {
        daysToSubtract = currentDay + 2;
    }
    const startDate = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - daysToSubtract));
    const startStr = startDate.toISOString().split('T')[0];
    // Format for display
    const options = {
        month: 'short',
        day: 'numeric',
        timeZone: 'UTC'
    };
    const startDisplay = startDate.toLocaleDateString('en-US', options);
    const endDisplay = endDate.toLocaleDateString('en-US', options);
    return {
        start: startStr,
        end: endStr,
        display: `${startDisplay} - ${endDisplay} (UTC)`
    };
}
// Status Chip for data freshness (compact)
function StatusChip({ isStale }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])('inline-flex items-center gap-2 px-3 py-1.5 rounded-md border font-semibold text-xs', isStale ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'),
        children: isStale ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AlertIcon, {
                    className: "w-3.5 h-3.5",
                    "aria-hidden": "true"
                }, void 0, false, {
                    fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                    lineNumber: 407,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    children: "Data needs refresh"
                }, void 0, false, {
                    fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                    lineNumber: 408,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CheckIcon, {
                    className: "w-3.5 h-3.5",
                    "aria-hidden": "true"
                }, void 0, false, {
                    fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                    lineNumber: 412,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    children: "Data current"
                }, void 0, false, {
                    fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                    lineNumber: 413,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true)
    }, void 0, false, {
        fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
        lineNumber: 397,
        columnNumber: 5
    }, this);
}
_c10 = StatusChip;
// KPI Pill Component (for Red/Amber/Green counts)
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])('inline-flex items-center gap-2 px-3 py-1.5 rounded-md border font-medium text-xs whitespace-nowrap', styles[color]),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])('w-2 h-2 rounded-full', dotColors[color]),
                "aria-hidden": "true"
            }, void 0, false, {
                fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                lineNumber: 441,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: [
                    status,
                    " ",
                    formatNumber(count)
                ]
            }, void 0, true, {
                fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                lineNumber: 442,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
        lineNumber: 435,
        columnNumber: 5
    }, this);
}
_c11 = KpiPill;
// KPI Tile Component (individual metric)
function KpiTile({ label, value, align = 'left' }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])('flex flex-col justify-center min-w-[120px] px-4 py-3', align === 'center' && 'text-center', align === 'right' && 'items-end text-right'),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-xs font-medium text-slate-500 uppercase tracking-wide whitespace-nowrap overflow-hidden text-ellipsis",
                children: label
            }, void 0, false, {
                fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                lineNumber: 464,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-2xl font-semibold text-slate-900 tabular-nums mt-1",
                children: value
            }, void 0, false, {
                fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                lineNumber: 468,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
        lineNumber: 458,
        columnNumber: 5
    }, this);
}
_c12 = KpiTile;
// Compact KPI Tile (for horizontal layout)
function KpiTileCompact({ label, value }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col justify-center min-w-[90px] px-3 py-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-[10px] font-medium text-slate-500 uppercase tracking-wide whitespace-nowrap overflow-hidden text-ellipsis",
                children: label
            }, void 0, false, {
                fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                lineNumber: 486,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-lg font-semibold text-slate-900 tabular-nums mt-0.5",
                children: value
            }, void 0, false, {
                fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                lineNumber: 490,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
        lineNumber: 484,
        columnNumber: 5
    }, this);
}
_c13 = KpiTileCompact;
// Tooltip component with proper background
function Tooltip({ content, children }) {
    _s();
    const [isVisible, setIsVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative inline-block",
        onMouseEnter: ()=>setIsVisible(true),
        onMouseLeave: ()=>setIsVisible(false),
        onFocus: ()=>setIsVisible(true),
        onBlur: ()=>setIsVisible(false),
        children: [
            children,
            isVisible && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-slate-900 text-white text-xs rounded shadow-lg whitespace-normal z-50 pointer-events-none max-w-xs text-center leading-tight",
                style: {
                    transition: tokens.transition
                },
                role: "tooltip",
                children: [
                    content,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-4 border-transparent border-t-slate-900"
                    }, void 0, false, {
                        fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                        lineNumber: 517,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                lineNumber: 511,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
        lineNumber: 502,
        columnNumber: 5
    }, this);
}
_s(Tooltip, "QjDZesRvLCmcrZLxgN677nXnVLA=");
_c14 = Tooltip;
// Sortable Table Header with arrow icons
function SortableHeader({ field, label, sortField, sortOrder, onSort, align = 'left', sticky = false }) {
    const isActive = sortField === field;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])('px-4 py-3.5 font-semibold text-xs uppercase tracking-wide border-b-2 whitespace-nowrap bg-slate-50/50', align === 'center' && 'text-center', align === 'right' && 'text-right', align === 'left' && 'text-left', isActive ? 'border-blue-500 text-blue-700' : 'border-slate-200 text-slate-600', sticky && 'left-0 z-20 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]'),
        style: sticky ? {
            position: 'sticky',
            left: '0'
        } : undefined,
        role: "columnheader",
        "aria-sort": isActive ? sortOrder === 'asc' ? 'ascending' : 'descending' : undefined,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: ()=>onSort(field),
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])('flex items-center gap-2 transition-all', align === 'center' && 'justify-center', align === 'right' && 'justify-end', 'focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 rounded', isActive && 'text-blue-700', !isActive && 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 px-2 py-1 -mx-2 rounded -my-1'),
            style: {
                transition: tokens.transition
            },
            "aria-label": `Sort by ${label}${isActive ? sortOrder === 'asc' ? ' (ascending)' : ' (descending)' : ''}`,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "font-semibold",
                    children: label
                }, void 0, false, {
                    fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                    lineNumber: 577,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "flex items-center",
                    "aria-hidden": "true",
                    children: isActive && sortOrder ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-blue-600",
                        children: sortOrder === 'asc' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SortAscIcon, {}, void 0, false, {
                            fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                            lineNumber: 581,
                            columnNumber: 38
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SortDescIcon, {}, void 0, false, {
                            fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                            lineNumber: 581,
                            columnNumber: 56
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                        lineNumber: 580,
                        columnNumber: 13
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SortUnsortedIcon, {
                        className: "text-slate-300"
                    }, void 0, false, {
                        fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                        lineNumber: 584,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                    lineNumber: 578,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
            lineNumber: 564,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
        lineNumber: 545,
        columnNumber: 5
    }, this);
}
_c15 = SortableHeader;
// Status Badge
function StatusBadge({ status }) {
    if (!status) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "text-slate-400 text-xs",
        children: "—"
    }, void 0, false, {
        fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
        lineNumber: 594,
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: badgeClasses[configKey],
        children: status
    }, void 0, false, {
        fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
        lineNumber: 606,
        columnNumber: 10
    }, this);
}
_c16 = StatusBadge;
// RAG Status with visual indicators
function RAGStatus({ status }) {
    const config = {
        Red: {
            bg: 'bg-red-50',
            text: 'text-red-700',
            dot: 'bg-red-500',
            border: 'border-red-200',
            description: 'Critical: needs immediate attention',
            display: 'Red'
        },
        Yellow: {
            bg: 'bg-amber-50',
            text: 'text-amber-700',
            dot: 'bg-amber-500',
            border: 'border-amber-200',
            description: 'Warning: monitor closely',
            display: 'Amber'
        },
        Green: {
            bg: 'bg-emerald-50',
            text: 'text-emerald-700',
            dot: 'bg-emerald-500',
            border: 'border-emerald-200',
            description: 'Healthy: within acceptable thresholds',
            display: 'Green'
        }
    };
    const { bg, text, dot, border, description, display } = config[status];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tooltip, {
        content: description,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(bg, text, border, 'inline-flex items-center gap-2 px-3 py-1.5 rounded-md border font-semibold text-[11px] uppercase tracking-wide cursor-pointer transition-colors hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2'),
            style: {
                transition: tokens.transition
            },
            role: "status",
            "aria-label": "RAG status: " + display,
            tabIndex: 0,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])('w-2 h-2 rounded-full', dot),
                    "aria-hidden": "true"
                }, void 0, false, {
                    fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                    lineNumber: 654,
                    columnNumber: 9
                }, this),
                display
            ]
        }, void 0, true, {
            fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
            lineNumber: 642,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
        lineNumber: 641,
        columnNumber: 5
    }, this);
}
_c17 = RAGStatus;
// Reply Rate Badge with threshold styling
function ReplyRateBadge({ value, replies, newLeads }) {
    if (value === null) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "text-slate-400 text-xs",
        children: "—"
    }, void 0, false, {
        fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
        lineNumber: 663,
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col items-end gap-0.5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tooltip, {
                content: `Replies: ${formatNumber(replies)} / New Leads: ${formatNumber(newLeads)} • Target: 2% or higher. Current: ${percentage.toFixed(2)}%`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])('inline-flex items-center px-2.5 py-1 rounded-md', bg, color, border, 'border font-semibold text-xs tabular-nums focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 rounded-md'),
                    "aria-label": `${percentage.toFixed(2)}% reply rate`,
                    tabIndex: 0,
                    children: formatPercentage(value, 1)
                }, void 0, false, {
                    fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                    lineNumber: 684,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                lineNumber: 683,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-[10px] text-slate-500 tabular-nums",
                children: formatNumber(replies)
            }, void 0, false, {
                fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                lineNumber: 698,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
        lineNumber: 682,
        columnNumber: 5
    }, this);
}
_c18 = ReplyRateBadge;
// Bounce Rate Badge with threshold styling (higher is worse)
function BounceRateBadge({ value, bounces, contacted }) {
    if (value === null || contacted === 0) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "text-slate-400 text-xs",
        children: "—"
    }, void 0, false, {
        fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
        lineNumber: 705,
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col items-end gap-0.5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tooltip, {
                content: `Bounces: ${formatNumber(bounces)} / Emails Sent: ${formatNumber(contacted)} • Target: Below 2%. Current: ${percentage.toFixed(2)}%`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])('inline-flex items-center px-2.5 py-1 rounded-md', bg, color, border, 'border font-semibold text-xs tabular-nums focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 rounded-md'),
                    "aria-label": `${percentage.toFixed(2)}% bounce rate`,
                    tabIndex: 0,
                    children: formatPercentage(value, 1)
                }, void 0, false, {
                    fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                    lineNumber: 726,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                lineNumber: 725,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-[10px] text-slate-500 tabular-nums",
                children: formatNumber(bounces)
            }, void 0, false, {
                fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                lineNumber: 740,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
        lineNumber: 724,
        columnNumber: 5
    }, this);
}
_c19 = BounceRateBadge;
// Positive Reply Rate Badge with threshold styling (higher is better)
function PositiveReplyRateBadge({ value, positives, replies }) {
    // Calculate PRR as positives / replies (not positives / new leads)
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col items-end gap-0.5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tooltip, {
                content: `Positive Replies: ${formatNumber(positives)} / Replies: ${formatNumber(replies)} • Target: 8% or higher. Current: ${percentage.toFixed(2)}%`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])('inline-flex items-center px-2.5 py-1 rounded-md', bg, color, border, 'border font-semibold text-xs tabular-nums focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 rounded-md'),
                    "aria-label": `${percentage.toFixed(2)}% positive reply rate`,
                    tabIndex: 0,
                    children: positiveRate !== null ? formatPercentage(positiveRate, 2) : 'N/A'
                }, void 0, false, {
                    fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                    lineNumber: 774,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                lineNumber: 773,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-[10px] text-slate-500 tabular-nums",
                children: formatNumber(positives)
            }, void 0, false, {
                fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                lineNumber: 788,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
        lineNumber: 772,
        columnNumber: 5
    }, this);
}
_c20 = PositiveReplyRateBadge;
// Target Status Badge - Binary Red/Green based on new_leads vs prorated_target
function TargetStatusBadge({ proratedTarget, newLeads }) {
    if (proratedTarget === null || proratedTarget === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-slate-400 text-xs",
            children: "—"
        }, void 0, false, {
            fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
            lineNumber: 796,
            columnNumber: 12
        }, this);
    }
    const isAboveTarget = newLeads >= proratedTarget;
    let color = isAboveTarget ? 'text-emerald-700' : 'text-red-700';
    let bg = isAboveTarget ? 'bg-emerald-50' : 'bg-red-50';
    let border = isAboveTarget ? 'border-emerald-200' : 'border-red-200';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col items-end gap-0.5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tooltip, {
                content: `New Leads: ${formatNumber(newLeads)} / Target (Expected): ${formatNumber(Math.round(proratedTarget))} • ${isAboveTarget ? 'At or above target' : 'Below target'}`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])('inline-flex items-center px-2.5 py-1 rounded-md', bg, color, border, 'border font-semibold text-xs tabular-nums focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 rounded-md'),
                    "aria-label": `Target status: ${isAboveTarget ? 'At/Above target' : 'Below target'}`,
                    tabIndex: 0,
                    children: formatNumber(Math.round(proratedTarget))
                }, void 0, false, {
                    fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                    lineNumber: 808,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                lineNumber: 807,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-[10px] text-slate-500 tabular-nums",
                children: formatNumber(newLeads)
            }, void 0, false, {
                fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                lineNumber: 822,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
        lineNumber: 806,
        columnNumber: 5
    }, this);
}
_c21 = TargetStatusBadge;
// Attainment Badge with progress bar - NOW COMPARING NEW LEADS TO TARGET
function AttainmentBadge({ value, weeklyTarget, newLeads }) {
    if (weeklyTarget === null) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tooltip, {
            content: "Weekly target not set",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-slate-400 text-xs",
                children: "Target missing"
            }, void 0, false, {
                fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                lineNumber: 832,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
            lineNumber: 831,
            columnNumber: 7
        }, this);
    }
    // Calculate attainment based on NEW LEADS, not emails sent
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
    // 90% and above is green (default)
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tooltip, {
        content: `${percentage.toFixed(1)}% of weekly target • New Leads: ${formatNumber(newLeads)} / Target: ${formatNumber(weeklyTarget)}`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col items-end gap-1",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-20 h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])('h-full transition-all', bgColor),
                                style: {
                                    width: `${Math.min(percentage, 100)}%`,
                                    transition: tokens.transition
                                },
                                "aria-hidden": "true"
                            }, void 0, false, {
                                fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                lineNumber: 858,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                            lineNumber: 857,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])('text-xs font-semibold tabular-nums', color),
                            "aria-label": `${percentage.toFixed(1)}% attainment`,
                            children: formatPercentage(attainment || 0, 1)
                        }, void 0, false, {
                            fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                            lineNumber: 864,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                    lineNumber: 856,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-[10px] text-slate-500 tabular-nums",
                    children: [
                        "/ ",
                        formatNumber(weeklyTarget)
                    ]
                }, void 0, true, {
                    fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                    lineNumber: 868,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
            lineNumber: 855,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
        lineNumber: 854,
        columnNumber: 5
    }, this);
}
_c22 = AttainmentBadge;
// PCPL Badge (Prospects Contacted Per Lead)
function PCPLBadge({ newLeads, positives }) {
    // PCPL = new leads / positive replies (lower is better - how many leads needed per positive reply)
    const pcpl = positives > 0 ? newLeads / positives : null;
    const displayValue = pcpl !== null ? pcpl.toFixed(1) : 'N/A';
    // Color coding: lower is better (green), higher is worse (red/amber)
    // Thresholds: 0-500 green, 501-800 amber, 800+ red
    let colorClass = 'text-slate-700';
    if (pcpl !== null) {
        if (pcpl <= 500) {
            colorClass = 'text-emerald-700'; // Great: 0-500 leads per positive
        } else if (pcpl <= 800) {
            colorClass = 'text-amber-700'; // Okay: 501-800 leads per positive
        } else {
            colorClass = 'text-red-700'; // Poor: more than 800 leads per positive
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col items-end gap-0.5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tooltip, {
                content: `PCPL: Leads Contacted Per Positive Reply (lower is better) • ${formatNumber(newLeads)} leads / ${formatNumber(positives)} positives = ${displayValue} leads per positive reply`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])('inline-flex items-center px-2.5 py-1 rounded-md', 'bg-slate-50 border border-slate-200', colorClass, 'border font-semibold text-xs tabular-nums focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 rounded-md'),
                    "aria-label": `PCPL: ${displayValue} leads per positive reply. Lower is better.`,
                    tabIndex: 0,
                    children: displayValue
                }, void 0, false, {
                    fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                    lineNumber: 896,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                lineNumber: 895,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-[10px] text-slate-500 tabular-nums",
                children: "PCPL"
            }, void 0, false, {
                fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                lineNumber: 909,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
        lineNumber: 894,
        columnNumber: 5
    }, this);
}
_c23 = PCPLBadge;
// Issues Flags with consistent icon styling
function IssuesFlags({ client }) {
    const flags = [];
    if (client.deliverability_flag) {
        flags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tooltip, {
            content: `Deliverability risk: Reply rate below 2% or bounce rate 5% or higher`,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TrendingDownIcon, {
                className: "w-4 h-4 text-red-600",
                "aria-label": "Deliverability risk"
            }, void 0, false, {
                fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                lineNumber: 921,
                columnNumber: 9
            }, this)
        }, "deliv", false, {
            fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
            lineNumber: 920,
            columnNumber: 7
        }, this));
    }
    if (client.volume_flag && client.weekly_target_int) {
        flags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tooltip, {
            content: "Volume risk: New Leads below 80% of weekly target",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AlertIcon, {
                className: "w-4 h-4 text-amber-600",
                "aria-label": "Volume risk"
            }, void 0, false, {
                fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                lineNumber: 929,
                columnNumber: 9
            }, this)
        }, "vol", false, {
            fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
            lineNumber: 928,
            columnNumber: 7
        }, this));
    }
    if (client.mmf_flag) {
        flags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tooltip, {
            content: "MMF risk: Positive reply rate below 0.2%",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MessageIcon, {
                className: "w-4 h-4 text-amber-600",
                "aria-label": "MMF risk"
            }, void 0, false, {
                fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                lineNumber: 937,
                columnNumber: 9
            }, this)
        }, "mmf", false, {
            fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
            lineNumber: 936,
            columnNumber: 7
        }, this));
    }
    if (client.data_missing_flag) {
        flags.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tooltip, {
            content: "No data: No contacted volume in last 7 days",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "inline-flex items-center justify-center w-5 h-5 rounded bg-slate-100 text-slate-600 text-[11px] font-semibold border border-slate-200",
                "aria-label": "No data",
                children: "!"
            }, void 0, false, {
                fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                lineNumber: 945,
                columnNumber: 9
            }, this)
        }, "miss", false, {
            fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
            lineNumber: 944,
            columnNumber: 7
        }, this));
    }
    if (flags.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tooltip, {
            content: "All metrics within acceptable thresholds",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CheckIcon, {
                className: "w-4 h-4 text-emerald-600",
                "aria-label": "No issues"
            }, void 0, false, {
                fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                lineNumber: 958,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
            lineNumber: 957,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex gap-1.5",
        children: flags
    }, void 0, false, {
        fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
        lineNumber: 963,
        columnNumber: 10
    }, this);
}
_c24 = IssuesFlags;
function DashboardClient() {
    _s1();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [clients, setClients] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    // Default to showing only active clients (note: database uses UPPERCASE)
    const [filters, setFilters] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        relationship_status: 'ACTIVE'
    });
    const [filterOptions, setFilterOptions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [staleData, setStaleData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [sortField, setSortField] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('new_leads_reached_7d');
    const [sortOrder, setSortOrder] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('desc');
    const [selectedClients, setSelectedClients] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Set());
    const [refreshing, setRefreshing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [refreshMessage, setRefreshMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Local search input state for immediate feedback
    const [searchInputValue, setSearchInputValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    // Column visibility state - initialize from localStorage or defaults
    const [visibleColumns, setVisibleColumns] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "DashboardClient.useState": ()=>{
            if ("TURBOPACK compile-time truthy", 1) {
                const saved = localStorage.getItem('client_dashboard_visible_columns');
                if (saved) {
                    try {
                        return new Set(JSON.parse(saved));
                    } catch (e) {
                        console.error('Failed to parse saved column visibility:', e);
                    }
                }
            }
            // Default to columns marked as defaultVisible
            return new Set(COLUMN_DEFINITIONS.filter({
                "DashboardClient.useState": (col)=>col.defaultVisible
            }["DashboardClient.useState"]).map({
                "DashboardClient.useState": (col)=>col.id
            }["DashboardClient.useState"]));
        }
    }["DashboardClient.useState"]);
    // ==========================================================================
    // URL STATE MANAGEMENT
    // ==========================================================================
    // Handle search submission - updates filter only on Enter or blur
    const handleSearchSubmit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DashboardClient.useCallback[handleSearchSubmit]": (value)=>{
            setFilters({
                "DashboardClient.useCallback[handleSearchSubmit]": (prev)=>({
                        ...prev,
                        client_code_search: value.trim() || undefined
                    })
            }["DashboardClient.useCallback[handleSearchSubmit]"]);
        }
    }["DashboardClient.useCallback[handleSearchSubmit]"], []);
    // Initialize state from URL on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DashboardClient.useEffect": ()=>{
            if (!searchParams) return;
            const urlFilters = {};
            // Parse filter params from URL
            const relationshipStatus = searchParams.get('relationship_status');
            if (relationshipStatus) urlFilters.relationship_status = relationshipStatus;
            const closelix = searchParams.get('closelix');
            if (closelix !== null) urlFilters.closelix = closelix === 'true';
            const accountManager = searchParams.get('assigned_account_manager_name');
            if (accountManager) urlFilters.assigned_account_manager_name = accountManager;
            const inboxManager = searchParams.get('assigned_inbox_manager_name');
            if (inboxManager) urlFilters.assigned_inbox_manager_name = inboxManager;
            const sdrName = searchParams.get('assigned_sdr_name');
            if (sdrName) urlFilters.assigned_sdr_name = sdrName;
            const ragStatus = searchParams.get('rag_status');
            if (ragStatus) urlFilters.rag_status = ragStatus;
            const deliverability = searchParams.get('deliverability_flag');
            if (deliverability !== null) urlFilters.deliverability_flag = deliverability === 'true';
            const mmf = searchParams.get('mmf_flag');
            if (mmf !== null) urlFilters.mmf_flag = mmf === 'true';
            const volume = searchParams.get('volume_flag');
            if (volume !== null) urlFilters.volume_flag = volume === 'true';
            const dataMissing = searchParams.get('data_missing_flag');
            if (dataMissing !== null) urlFilters.data_missing_flag = dataMissing === 'true';
            const clientSearch = searchParams.get('client_code_search');
            if (clientSearch) {
                urlFilters.client_code_search = clientSearch;
                setSearchInputValue(clientSearch);
            }
            const pcplRange = searchParams.get('pcpl_range');
            if (pcplRange) urlFilters.pcpl_range = pcplRange;
            const replyRateRange = searchParams.get('reply_rate_range');
            if (replyRateRange) urlFilters.reply_rate_range = replyRateRange;
            const bounceRateRange = searchParams.get('bounce_rate_range');
            if (bounceRateRange) urlFilters.bounce_rate_range = bounceRateRange;
            const positiveReplyRateRange = searchParams.get('positive_reply_rate_range');
            if (positiveReplyRateRange) urlFilters.positive_reply_rate_range = positiveReplyRateRange;
            const targetStatus = searchParams.get('target_status');
            if (targetStatus) urlFilters.target_status = targetStatus;
            const weekendSendingMode = searchParams.get('weekend_sending_mode');
            if (weekendSendingMode) urlFilters.weekend_sending_mode = weekendSendingMode;
            // Update filters from URL if any exist
            if (Object.keys(urlFilters).length > 0) {
                setFilters({
                    "DashboardClient.useEffect": (prev)=>({
                            ...prev,
                            ...urlFilters
                        })
                }["DashboardClient.useEffect"]);
            }
            // Parse sort params from URL
            const sort = searchParams.get('sort');
            const order = searchParams.get('order');
            if (sort) setSortField(sort);
            if (order) setSortOrder(order);
        }
    }["DashboardClient.useEffect"], [
        searchParams
    ]);
    // Update URL when filters change
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DashboardClient.useEffect": ()=>{
            const params = new URLSearchParams();
            // Add filters to URL
            Object.entries(filters).forEach({
                "DashboardClient.useEffect": ([key, value])=>{
                    if (value !== undefined && value !== null && value !== '') {
                        // Skip default relationship_status if it's the only filter
                        if (key === 'relationship_status' && value === 'ACTIVE' && Object.keys(filters).length === 1) {
                            return;
                        }
                        params.append(key, String(value));
                    }
                }
            }["DashboardClient.useEffect"]);
            // Add sort to URL
            if (sortField) params.append('sort', sortField);
            if (sortOrder) params.append('order', sortOrder);
            // Update URL without page reload
            const queryString = params.toString();
            const newPath = queryString ? `/?${queryString}` : '/';
            router.push(newPath, {
                scroll: false
            });
        }
    }["DashboardClient.useEffect"], [
        filters,
        sortField,
        sortOrder,
        router
    ]);
    // Save column visibility to localStorage whenever it changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DashboardClient.useEffect": ()=>{
            if ("TURBOPACK compile-time truthy", 1) {
                localStorage.setItem('client_dashboard_visible_columns', JSON.stringify(Array.from(visibleColumns)));
            }
        }
    }["DashboardClient.useEffect"], [
        visibleColumns
    ]);
    // ==========================================================================
    // DATA REFRESH HANDLER
    // ==========================================================================
    const handleRefresh = async ()=>{
        setRefreshing(true);
        setRefreshMessage(null);
        try {
            const response = await fetch('/api/dashboard/refresh', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            if (response.ok && data.success) {
                setRefreshMessage(`✓ Refreshed in ${data.duration}! (Not contacted leads: updated daily at 3:00 AM UTC)`);
                // Auto-refresh the page data after 2 seconds
                setTimeout(()=>{
                    window.location.reload();
                }, 2000);
            } else if (response.status === 207) {
                // Partial success (207 Multi-Status)
                setRefreshMessage(`⚠ Refreshed with warnings in ${data.duration}. Check console for details.`);
                setTimeout(()=>{
                    window.location.reload();
                }, 3000);
            } else {
                setRefreshMessage('✗ Failed to refresh. Please try again or contact tech team.');
                setTimeout(()=>setRefreshMessage(null), 5000);
            }
        } catch (error) {
            console.error('Refresh error:', error);
            setRefreshMessage('✗ Failed to refresh. Please try again.');
            setTimeout(()=>setRefreshMessage(null), 5000);
        } finally{
            setRefreshing(false);
        }
    };
    // ==========================================================================
    // COLUMN VISIBILITY HANDLERS
    // ==========================================================================
    const handleColumnToggle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DashboardClient.useCallback[handleColumnToggle]": (columnId)=>{
            setVisibleColumns({
                "DashboardClient.useCallback[handleColumnToggle]": (prev)=>{
                    const newSet = new Set(prev);
                    if (newSet.has(columnId)) {
                        newSet.delete(columnId);
                    } else {
                        newSet.add(columnId);
                    }
                    return newSet;
                }
            }["DashboardClient.useCallback[handleColumnToggle]"]);
        }
    }["DashboardClient.useCallback[handleColumnToggle]"], []);
    const handleShowAllColumns = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DashboardClient.useCallback[handleShowAllColumns]": ()=>{
            setVisibleColumns(new Set(COLUMN_DEFINITIONS.map({
                "DashboardClient.useCallback[handleShowAllColumns]": (col)=>col.id
            }["DashboardClient.useCallback[handleShowAllColumns]"])));
        }
    }["DashboardClient.useCallback[handleShowAllColumns]"], []);
    const handleHideAllColumns = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DashboardClient.useCallback[handleHideAllColumns]": ()=>{
            // Don't allow hiding all columns - keep at least one essential column
            setVisibleColumns(new Set([
                'rag_status',
                'new_leads_reached_7d'
            ]));
        }
    }["DashboardClient.useCallback[handleHideAllColumns]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DashboardClient.useEffect": ()=>{
            fetch('/api/dashboard/filters').then({
                "DashboardClient.useEffect": (res)=>res.json()
            }["DashboardClient.useEffect"]).then({
                "DashboardClient.useEffect": (data)=>setFilterOptions(data)
            }["DashboardClient.useEffect"]).catch({
                "DashboardClient.useEffect": (err)=>console.error('Failed to fetch filters:', err)
            }["DashboardClient.useEffect"]);
        }
    }["DashboardClient.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DashboardClient.useEffect": ()=>{
            setLoading(true);
            const params = new URLSearchParams();
            Object.entries(filters).forEach({
                "DashboardClient.useEffect": ([key, value])=>{
                    // Skip calculated field filters for API (will be filtered client-side)
                    const calculatedFields = [
                        'pcpl_range',
                        'reply_rate_range',
                        'bounce_rate_range',
                        'positive_reply_rate_range',
                        'target_status'
                    ];
                    if (!calculatedFields.includes(key) && value !== undefined && value !== null && value !== '') {
                        params.append(key, String(value));
                    }
                }
            }["DashboardClient.useEffect"]);
            fetch(`/api/dashboard?${params.toString()}`).then({
                "DashboardClient.useEffect": (res)=>res.json()
            }["DashboardClient.useEffect"]).then({
                "DashboardClient.useEffect": (data)=>{
                    let filteredData = data.data || [];
                    // Apply PCPL filter client-side
                    if (filters.pcpl_range) {
                        filteredData = filteredData.filter({
                            "DashboardClient.useEffect": (c)=>{
                                const newLeads = c.new_leads_reached_7d || 0;
                                const positives = c.positives_7d || 0;
                                const pcpl = positives > 0 ? newLeads / positives : null;
                                if (pcpl === null) return false;
                                switch(filters.pcpl_range){
                                    case '0-500':
                                        return pcpl <= 500;
                                    case '501-800':
                                        return pcpl > 500 && pcpl <= 800;
                                    case '800+':
                                        return pcpl > 800;
                                    default:
                                        return true;
                                }
                            }
                        }["DashboardClient.useEffect"]);
                    }
                    // Apply Reply Rate filter client-side
                    if (filters.reply_rate_range) {
                        filteredData = filteredData.filter({
                            "DashboardClient.useEffect": (c)=>{
                                if (c.reply_rate_7d === null) return false;
                                const percentage = c.reply_rate_7d * 100;
                                switch(filters.reply_rate_range){
                                    case '0-1.5':
                                        return percentage < 1.5;
                                    case '1.5-2':
                                        return percentage >= 1.5 && percentage < 2;
                                    case '2+':
                                        return percentage >= 2;
                                    default:
                                        return true;
                                }
                            }
                        }["DashboardClient.useEffect"]);
                    }
                    // Apply Bounce Rate filter client-side
                    if (filters.bounce_rate_range) {
                        filteredData = filteredData.filter({
                            "DashboardClient.useEffect": (c)=>{
                                if (c.bounce_pct_7d === null) return false;
                                const percentage = c.bounce_pct_7d * 100;
                                switch(filters.bounce_rate_range){
                                    case '0-2':
                                        return percentage < 2;
                                    case '2-4':
                                        return percentage >= 2 && percentage < 4;
                                    case '4+':
                                        return percentage >= 4;
                                    default:
                                        return true;
                                }
                            }
                        }["DashboardClient.useEffect"]);
                    }
                    // Apply Positive Reply Rate filter client-side
                    // Calculate as positives / replies (same as badge) for consistency
                    if (filters.positive_reply_rate_range) {
                        filteredData = filteredData.filter({
                            "DashboardClient.useEffect": (c)=>{
                                const replies = c.replies_7d || 0;
                                const positives = c.positives_7d || 0;
                                const positiveRate = replies > 0 ? positives / replies : null;
                                if (positiveRate === null) return false;
                                const percentage = positiveRate * 100;
                                switch(filters.positive_reply_rate_range){
                                    case '0-5':
                                        return percentage < 5;
                                    case '5-8':
                                        return percentage >= 5 && percentage < 8;
                                    case '8+':
                                        return percentage >= 8;
                                    default:
                                        return true;
                                }
                            }
                        }["DashboardClient.useEffect"]);
                    }
                    // Apply Target Status filter client-side (based on prorated_target comparison)
                    if (filters.target_status) {
                        filteredData = filteredData.filter({
                            "DashboardClient.useEffect": (c)=>{
                                if (c.prorated_target === null || c.prorated_target === 0) return false;
                                const newLeads = c.new_leads_reached_7d || 0;
                                const isAboveTarget = newLeads >= c.prorated_target;
                                switch(filters.target_status){
                                    case 'below':
                                        return !isAboveTarget; // Below target (Red)
                                    case 'above':
                                        return isAboveTarget; // At/Above target (Green)
                                    default:
                                        return true;
                                }
                            }
                        }["DashboardClient.useEffect"]);
                    }
                    setClients(filteredData);
                    setStaleData(filteredData.some({
                        "DashboardClient.useEffect": (c)=>c.data_stale_flag
                    }["DashboardClient.useEffect"]) || false);
                    setLoading(false);
                }
            }["DashboardClient.useEffect"]).catch({
                "DashboardClient.useEffect": (err)=>{
                    console.error('Failed to fetch dashboard data:', err);
                    setLoading(false);
                }
            }["DashboardClient.useEffect"]);
        }
    }["DashboardClient.useEffect"], [
        filters
    ]);
    const redCount = clients.filter((c)=>c.rag_status === 'Red').length;
    const yellowCount = clients.filter((c)=>c.rag_status === 'Yellow').length;
    const greenCount = clients.filter((c)=>c.rag_status === 'Green').length;
    const totalClients = clients.length;
    const totalContacted = clients.reduce((sum, c)=>sum + c.contacted_7d, 0);
    const totalPositives = clients.reduce((sum, c)=>sum + c.positives_7d, 0);
    const handleSort = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DashboardClient.useCallback[handleSort]": (field)=>{
            if (sortField === field) {
                if (sortOrder === 'asc') setSortOrder('desc');
                else if (sortOrder === 'desc') setSortOrder(null);
                else setSortOrder('asc');
            } else {
                setSortField(field);
                setSortOrder('asc');
            }
        }
    }["DashboardClient.useCallback[handleSort]"], [
        sortField,
        sortOrder
    ]);
    const sortedClients = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DashboardClient.useMemo[sortedClients]": ()=>{
            if (!sortOrder) return clients;
            return [
                ...clients
            ].sort({
                "DashboardClient.useMemo[sortedClients]": (a, b)=>{
                    // Handle PCPL calculation specially
                    let aVal;
                    let bVal;
                    if (sortField === 'pcpl') {
                        aVal = a.positives_7d > 0 ? a.new_leads_reached_7d / a.positives_7d : null;
                        bVal = b.positives_7d > 0 ? b.new_leads_reached_7d / b.positives_7d : null;
                    } else if (sortField === 'prorated_target') {
                        // Ensure numeric conversion for proper sorting
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
                    // Handle numeric comparison (including converted strings)
                    const aNum = typeof aVal === 'number' ? aVal : Number(aVal);
                    const bNum = typeof bVal === 'number' ? bVal : Number(bVal);
                    if (!isNaN(aNum) && !isNaN(bNum)) {
                        return sortOrder === 'asc' ? aNum - bNum : bNum - aNum;
                    }
                    return 0;
                }
            }["DashboardClient.useMemo[sortedClients]"]);
        }
    }["DashboardClient.useMemo[sortedClients]"], [
        clients,
        sortField,
        sortOrder
    ]);
    const removeFilter = (key)=>{
        setFilters((prev)=>{
            const newFilters = {
                ...prev
            };
            delete newFilters[key];
            return newFilters;
        });
    };
    const clearAllFilters = ()=>{
        // Keep relationship_status as 'ACTIVE' even when clearing filters (uppercase matches database)
        setFilters({
            relationship_status: 'ACTIVE'
        });
    };
    const exportToCSV = ()=>{
        const dataToExport = selectedClients.size > 0 ? sortedClients.filter((c)=>selectedClients.has(c.client_id)) : sortedClients;
        const headers = [
            'Client Code',
            'Client Company',
            'Status',
            'RAG Status',
            'New Leads (7d)',
            'Emails Sent (7d)',
            'Replies (7d)',
            'Reply Rate (7d)',
            'Positive Replies (7d)',
            'Positive Rate (7d)',
            'Positives (7d)',
            'PCPL',
            'Target',
            'Volume Attainment',
            'Not Contacted',
            'Issues'
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
                c.replies_7d || 0,
                c.reply_rate_7d ? (c.reply_rate_7d * 100).toFixed(1) + '%' : 'N/A',
                positives,
                positiveRate,
                positives,
                pcpl,
                c.weekly_target_int || 'N/A',
                c.weekly_target_int ? ((c.new_leads_reached_7d || 0) / c.weekly_target_int * 100).toFixed(1) + '%' : 'N/A',
                c.not_contacted_leads || 0,
                [
                    c.deliverability_flag ? 'Deliverability' : null,
                    c.volume_flag ? 'Volume' : null,
                    c.mmf_flag ? 'MMF' : null,
                    c.data_missing_flag ? 'No Data' : null
                ].filter(Boolean).join('; ')
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
        link.setAttribute('download', `client-health-${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    const activeFilterCount = Object.keys(filters).length;
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "min-h-screen bg-slate-50 flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "inline-block w-8 h-8 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin mb-3"
                    }, void 0, false, {
                        fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                        lineNumber: 1475,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-slate-600",
                        children: "Loading dashboard..."
                    }, void 0, false, {
                        fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                        lineNumber: 1476,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                lineNumber: 1474,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
            lineNumber: 1473,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "min-h-screen bg-slate-50",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "bg-white border-b border-slate-200",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-[1800px] mx-auto px-6 py-5",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between mb-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "text-2xl font-semibold text-slate-900 tracking-tight",
                                        children: "Client Health Dashboard"
                                    }, void 0, false, {
                                        fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                        lineNumber: 1490,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-3 mt-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-slate-500",
                                                children: [
                                                    "Weekly metrics (Previous Fri to Yesterday) • ",
                                                    totalClients,
                                                    " clients"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                lineNumber: 1492,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-slate-300",
                                                children: "•"
                                            }, void 0, false, {
                                                fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                lineNumber: 1493,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-slate-500 font-medium",
                                                children: getDateRangeInfo().display
                                            }, void 0, false, {
                                                fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                lineNumber: 1494,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                        lineNumber: 1491,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                lineNumber: 1489,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3",
                                children: [
                                    refreshMessage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs font-medium px-3 py-1.5 rounded-md border bg-slate-50",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: refreshMessage.startsWith('✓') ? 'text-emerald-700' : 'text-red-700',
                                            children: refreshMessage
                                        }, void 0, false, {
                                            fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                            lineNumber: 1500,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                        lineNumber: 1499,
                                        columnNumber: 17
                                    }, this),
                                    selectedClients.size > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "inline-flex items-center px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-50 rounded-md border border-slate-200",
                                        children: [
                                            selectedClients.size,
                                            " selected"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                        lineNumber: 1506,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleRefresh,
                                        disabled: refreshing,
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])('inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold', 'bg-white hover:bg-slate-50 rounded-md border border-slate-300', 'transition-all focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2', refreshing && 'opacity-50 cursor-not-allowed'),
                                        style: {
                                            transition: tokens.transition
                                        },
                                        "aria-label": "Refresh data",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(RefreshIcon, {
                                                spinning: refreshing
                                            }, void 0, false, {
                                                fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                lineNumber: 1522,
                                                columnNumber: 17
                                            }, this),
                                            refreshing ? 'Refreshing...' : 'Refresh'
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                        lineNumber: 1510,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: exportToCSV,
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])('inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-700', 'bg-white hover:bg-slate-50 rounded-md border border-slate-300', 'transition-all focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2'),
                                        style: {
                                            transition: tokens.transition
                                        },
                                        "aria-label": "Export to CSV",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DownloadIcon, {}, void 0, false, {
                                                fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                lineNumber: 1535,
                                                columnNumber: 17
                                            }, this),
                                            "Export"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                        lineNumber: 1525,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$src$2f$components$2f$ColumnSelector$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ColumnSelector"], {
                                        columns: COLUMN_DEFINITIONS,
                                        visibleColumns: visibleColumns,
                                        onColumnToggle: handleColumnToggle,
                                        onShowAll: handleShowAllColumns,
                                        onHideAll: handleHideAllColumns
                                    }, void 0, false, {
                                        fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                        lineNumber: 1538,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/historical-weeks",
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])('inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-700', 'bg-white hover:bg-slate-50 rounded-md border border-slate-300', 'transition-all focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2'),
                                        style: {
                                            transition: tokens.transition
                                        },
                                        children: "Historical Weeks"
                                    }, void 0, false, {
                                        fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                        lineNumber: 1545,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/unmatched",
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])('inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-700', 'bg-white hover:bg-slate-50 rounded-md border border-slate-300', 'transition-all focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2'),
                                        style: {
                                            transition: tokens.transition
                                        },
                                        children: "Data Quality"
                                    }, void 0, false, {
                                        fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                        lineNumber: 1556,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                lineNumber: 1497,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                        lineNumber: 1488,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                    lineNumber: 1486,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                lineNumber: 1485,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-[1800px] mx-auto px-6 py-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])('bg-white rounded-lg border border-slate-200', 'p-5' // Card padding
                    ),
                    style: {
                        boxShadow: tokens.shadows.card
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-[40%_60%] gap-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col justify-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-3 flex-wrap",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(KpiPill, {
                                                status: "Red",
                                                count: redCount,
                                                color: "red"
                                            }, void 0, false, {
                                                fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                lineNumber: 1586,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(KpiPill, {
                                                status: "Amber",
                                                count: yellowCount,
                                                color: "amber"
                                            }, void 0, false, {
                                                fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                lineNumber: 1587,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(KpiPill, {
                                                status: "Green",
                                                count: greenCount,
                                                color: "green"
                                            }, void 0, false, {
                                                fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                lineNumber: 1588,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                        lineNumber: 1585,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-1",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatusChip, {
                                            isStale: staleData
                                        }, void 0, false, {
                                            fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                            lineNumber: 1592,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                        lineNumber: 1591,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                lineNumber: 1584,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-0 overflow-x-auto pl-4 border-l border-slate-100",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(KpiTileCompact, {
                                        label: "New Leads",
                                        value: formatNumber(clients.reduce((sum, c)=>sum + c.new_leads_reached_7d, 0))
                                    }, void 0, false, {
                                        fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                        lineNumber: 1599,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-px h-8 bg-slate-100 mx-2"
                                    }, void 0, false, {
                                        fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                        lineNumber: 1603,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(KpiTileCompact, {
                                        label: "Replies",
                                        value: formatNumber(clients.reduce((sum, c)=>sum + c.replies_7d, 0))
                                    }, void 0, false, {
                                        fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                        lineNumber: 1604,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-px h-8 bg-slate-100 mx-2"
                                    }, void 0, false, {
                                        fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                        lineNumber: 1608,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(KpiTileCompact, {
                                        label: "Reply Rate",
                                        value: (()=>{
                                            const totalReplies = clients.reduce((sum, c)=>sum + c.replies_7d, 0);
                                            const totalNewLeads = clients.reduce((sum, c)=>sum + c.new_leads_reached_7d, 0);
                                            return totalNewLeads > 0 ? formatPercentage(totalReplies / totalNewLeads, 1) : 'N/A';
                                        })()
                                    }, void 0, false, {
                                        fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                        lineNumber: 1609,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-px h-8 bg-slate-100 mx-2"
                                    }, void 0, false, {
                                        fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                        lineNumber: 1617,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(KpiTileCompact, {
                                        label: "Positives",
                                        value: formatNumber(totalPositives)
                                    }, void 0, false, {
                                        fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                        lineNumber: 1618,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-px h-8 bg-slate-100 mx-2"
                                    }, void 0, false, {
                                        fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                        lineNumber: 1622,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(KpiTileCompact, {
                                        label: "Positive Rate",
                                        value: (()=>{
                                            const totalReplies = clients.reduce((sum, c)=>sum + c.replies_7d, 0);
                                            const totalPos = clients.reduce((sum, c)=>sum + c.positives_7d, 0);
                                            return totalReplies > 0 ? formatPercentage(totalPos / totalReplies, 2) : 'N/A';
                                        })()
                                    }, void 0, false, {
                                        fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                        lineNumber: 1623,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-px h-8 bg-slate-100 mx-2"
                                    }, void 0, false, {
                                        fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                        lineNumber: 1631,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(KpiTileCompact, {
                                        label: "PCPL",
                                        value: (()=>{
                                            const totalNewLeads = clients.reduce((sum, c)=>sum + c.new_leads_reached_7d, 0);
                                            const totalPos = clients.reduce((sum, c)=>sum + c.positives_7d, 0);
                                            return totalPos > 0 ? (totalNewLeads / totalPos).toFixed(1) : 'N/A';
                                        })()
                                    }, void 0, false, {
                                        fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                        lineNumber: 1632,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                lineNumber: 1597,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                        lineNumber: 1582,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                    lineNumber: 1574,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                lineNumber: 1573,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-[1800px] mx-auto px-6 pb-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "sticky top-0 z-40 bg-white rounded-lg border border-slate-200 shadow-sm",
                    style: {
                        boxShadow: tokens.shadows.card,
                        top: '6px'
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-4 flex-wrap",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "inline-flex items-center gap-2 px-4 py-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FilterIcon, {}, void 0, false, {
                                            fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                            lineNumber: 1655,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xs font-semibold text-slate-900",
                                            children: "Filters"
                                        }, void 0, false, {
                                            fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                            lineNumber: 1656,
                                            columnNumber: 17
                                        }, this),
                                        activeFilterCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "inline-flex items-center justify-center w-5 h-5 text-[10px] font-bold bg-slate-900 text-white rounded-full",
                                            children: activeFilterCount
                                        }, void 0, false, {
                                            fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                            lineNumber: 1658,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                    lineNumber: 1654,
                                    columnNumber: 15
                                }, this),
                                filterOptions && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-4 flex-wrap flex-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2 pr-4 border-r border-slate-200",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[10px] font-bold text-slate-400 uppercase tracking-wider",
                                                    children: "Search"
                                                }, void 0, false, {
                                                    fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                    lineNumber: 1669,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "text",
                                                    placeholder: "Search client codes...",
                                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])('px-4 py-2.5 w-64 text-xs font-medium text-slate-700', 'bg-white border border-slate-300 rounded-md', 'focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:border-slate-400', 'placeholder:text-slate-400'),
                                                    style: {
                                                        transition: tokens.transition
                                                    },
                                                    value: searchInputValue,
                                                    onChange: (e)=>{
                                                        // Only update local state for immediate UI feedback
                                                        setSearchInputValue(e.target.value);
                                                    },
                                                    onKeyDown: (e)=>{
                                                        // Trigger search on Enter key
                                                        if (e.key === 'Enter') {
                                                            e.preventDefault();
                                                            handleSearchSubmit(searchInputValue);
                                                            // Blur the input to remove focus
                                                            e.currentTarget.blur();
                                                        }
                                                    },
                                                    onBlur: ()=>{
                                                        // Trigger search when user clicks outside (blur)
                                                        handleSearchSubmit(searchInputValue);
                                                    },
                                                    "aria-label": "Search by client code"
                                                }, void 0, false, {
                                                    fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                    lineNumber: 1670,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                            lineNumber: 1668,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2 pr-4 border-r border-slate-200",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[10px] font-bold text-slate-400 uppercase tracking-wider",
                                                    children: "Ownership"
                                                }, void 0, false, {
                                                    fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                    lineNumber: 1704,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])('px-4 py-2.5 text-xs font-medium text-slate-700', 'bg-white border border-slate-300 rounded-md', 'focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:border-slate-400', 'cursor-pointer'),
                                                    style: {
                                                        transition: tokens.transition
                                                    },
                                                    value: filters.assigned_account_manager_name || '',
                                                    onChange: (e)=>setFilters({
                                                            ...filters,
                                                            assigned_account_manager_name: e.target.value || undefined
                                                        }),
                                                    "aria-label": "Filter by account manager",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "",
                                                            children: "All AMs"
                                                        }, void 0, false, {
                                                            fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                            lineNumber: 1717,
                                                            columnNumber: 23
                                                        }, this),
                                                        filterOptions.account_managers.map((am)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: am,
                                                                children: am
                                                            }, am, false, {
                                                                fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                                lineNumber: 1719,
                                                                columnNumber: 25
                                                            }, this))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                    lineNumber: 1705,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])('px-4 py-2.5 text-xs font-medium text-slate-700', 'bg-white border border-slate-300 rounded-md', 'focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:border-slate-400', 'cursor-pointer'),
                                                    style: {
                                                        transition: tokens.transition
                                                    },
                                                    value: filters.assigned_inbox_manager_name || '',
                                                    onChange: (e)=>setFilters({
                                                            ...filters,
                                                            assigned_inbox_manager_name: e.target.value || undefined
                                                        }),
                                                    "aria-label": "Filter by inbox manager",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "",
                                                            children: "All IMs"
                                                        }, void 0, false, {
                                                            fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                            lineNumber: 1735,
                                                            columnNumber: 23
                                                        }, this),
                                                        filterOptions.inbox_managers.map((im)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: im,
                                                                children: im
                                                            }, im, false, {
                                                                fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                                lineNumber: 1737,
                                                                columnNumber: 25
                                                            }, this))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                    lineNumber: 1723,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])('px-4 py-2.5 text-xs font-medium text-slate-700', 'bg-white border border-slate-300 rounded-md', 'focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:border-slate-400', 'cursor-pointer'),
                                                    style: {
                                                        transition: tokens.transition
                                                    },
                                                    value: filters.assigned_sdr_name || '',
                                                    onChange: (e)=>setFilters({
                                                            ...filters,
                                                            assigned_sdr_name: e.target.value || undefined
                                                        }),
                                                    "aria-label": "Filter by SDR",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "",
                                                            children: "All SDRs"
                                                        }, void 0, false, {
                                                            fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                            lineNumber: 1753,
                                                            columnNumber: 23
                                                        }, this),
                                                        filterOptions.sdrs.map((sdr)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: sdr,
                                                                children: sdr
                                                            }, sdr, false, {
                                                                fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                                lineNumber: 1755,
                                                                columnNumber: 25
                                                            }, this))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                    lineNumber: 1741,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                            lineNumber: 1703,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2 pr-4 border-r border-slate-200",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[10px] font-bold text-slate-400 uppercase tracking-wider",
                                                    children: "Status"
                                                }, void 0, false, {
                                                    fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                    lineNumber: 1762,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])('px-4 py-2.5 text-xs font-medium text-slate-700', 'bg-white border border-slate-300 rounded-md', 'focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:border-slate-400', 'cursor-pointer'),
                                                    style: {
                                                        transition: tokens.transition
                                                    },
                                                    value: filters.relationship_status || '',
                                                    onChange: (e)=>setFilters({
                                                            ...filters,
                                                            relationship_status: e.target.value || undefined
                                                        }),
                                                    "aria-label": "Filter by relationship status",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "",
                                                            children: "All Statuses"
                                                        }, void 0, false, {
                                                            fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                            lineNumber: 1775,
                                                            columnNumber: 23
                                                        }, this),
                                                        filterOptions.relationship_statuses.map((status)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: status,
                                                                children: status
                                                            }, status, false, {
                                                                fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                                lineNumber: 1777,
                                                                columnNumber: 25
                                                            }, this))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                    lineNumber: 1763,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])('px-4 py-2.5 text-xs font-medium text-slate-700', 'bg-white border border-slate-300 rounded-md', 'focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:border-slate-400', 'cursor-pointer'),
                                                    style: {
                                                        transition: tokens.transition
                                                    },
                                                    value: filters.rag_status || '',
                                                    onChange: (e)=>setFilters({
                                                            ...filters,
                                                            rag_status: e.target.value || undefined
                                                        }),
                                                    "aria-label": "Filter by RAG status",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "",
                                                            children: "All RAG"
                                                        }, void 0, false, {
                                                            fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                            lineNumber: 1793,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "Red",
                                                            children: "Red"
                                                        }, void 0, false, {
                                                            fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                            lineNumber: 1794,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "Yellow",
                                                            children: "Amber"
                                                        }, void 0, false, {
                                                            fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                            lineNumber: 1795,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "Green",
                                                            children: "Green"
                                                        }, void 0, false, {
                                                            fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                            lineNumber: 1796,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                    lineNumber: 1781,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])('px-4 py-2.5 text-xs font-medium text-slate-700', 'bg-white border border-slate-300 rounded-md', 'focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:border-slate-400', 'cursor-pointer'),
                                                    style: {
                                                        transition: tokens.transition
                                                    },
                                                    value: filters.pcpl_range || '',
                                                    onChange: (e)=>setFilters({
                                                            ...filters,
                                                            pcpl_range: e.target.value || undefined
                                                        }),
                                                    "aria-label": "Filter by PCPL",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "",
                                                            children: "All PCPL"
                                                        }, void 0, false, {
                                                            fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                            lineNumber: 1811,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "0-500",
                                                            children: "0-500 (Green)"
                                                        }, void 0, false, {
                                                            fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                            lineNumber: 1812,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "501-800",
                                                            children: "501-800 (Amber)"
                                                        }, void 0, false, {
                                                            fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                            lineNumber: 1813,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "800+",
                                                            children: "800+ (Red)"
                                                        }, void 0, false, {
                                                            fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                            lineNumber: 1814,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                    lineNumber: 1799,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])('px-4 py-2.5 text-xs font-medium text-slate-700', 'bg-white border border-slate-300 rounded-md', 'focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:border-slate-400', 'cursor-pointer'),
                                                    style: {
                                                        transition: tokens.transition
                                                    },
                                                    value: filters.reply_rate_range || '',
                                                    onChange: (e)=>setFilters({
                                                            ...filters,
                                                            reply_rate_range: e.target.value || undefined
                                                        }),
                                                    "aria-label": "Filter by Reply Rate",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "",
                                                            children: "All Reply Rate"
                                                        }, void 0, false, {
                                                            fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                            lineNumber: 1829,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "0-1.5",
                                                            children: "<1.5% (Red)"
                                                        }, void 0, false, {
                                                            fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                            lineNumber: 1830,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "1.5-2",
                                                            children: "1.5-2% (Amber)"
                                                        }, void 0, false, {
                                                            fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                            lineNumber: 1831,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "2+",
                                                            children: "≥2% (Green)"
                                                        }, void 0, false, {
                                                            fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                            lineNumber: 1832,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                    lineNumber: 1817,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])('px-4 py-2.5 text-xs font-medium text-slate-700', 'bg-white border border-slate-300 rounded-md', 'focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:border-slate-400', 'cursor-pointer'),
                                                    style: {
                                                        transition: tokens.transition
                                                    },
                                                    value: filters.bounce_rate_range || '',
                                                    onChange: (e)=>setFilters({
                                                            ...filters,
                                                            bounce_rate_range: e.target.value || undefined
                                                        }),
                                                    "aria-label": "Filter by Bounce Rate",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "",
                                                            children: "All Bounce Rate"
                                                        }, void 0, false, {
                                                            fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                            lineNumber: 1847,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "0-2",
                                                            children: "<2% (Green)"
                                                        }, void 0, false, {
                                                            fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                            lineNumber: 1848,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "2-4",
                                                            children: "2-4% (Amber)"
                                                        }, void 0, false, {
                                                            fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                            lineNumber: 1849,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "4+",
                                                            children: "≥4% (Red)"
                                                        }, void 0, false, {
                                                            fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                            lineNumber: 1850,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                    lineNumber: 1835,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])('px-4 py-2.5 text-xs font-medium text-slate-700', 'bg-white border border-slate-300 rounded-md', 'focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:border-slate-400', 'cursor-pointer'),
                                                    style: {
                                                        transition: tokens.transition
                                                    },
                                                    value: filters.positive_reply_rate_range || '',
                                                    onChange: (e)=>setFilters({
                                                            ...filters,
                                                            positive_reply_rate_range: e.target.value || undefined
                                                        }),
                                                    "aria-label": "Filter by Positive Reply Rate",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "",
                                                            children: "All Positive Rate"
                                                        }, void 0, false, {
                                                            fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                            lineNumber: 1865,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "0-5",
                                                            children: "<5% (Red)"
                                                        }, void 0, false, {
                                                            fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                            lineNumber: 1866,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "5-8",
                                                            children: "5-8% (Amber)"
                                                        }, void 0, false, {
                                                            fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                            lineNumber: 1867,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "8+",
                                                            children: "≥8% (Green)"
                                                        }, void 0, false, {
                                                            fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                            lineNumber: 1868,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                    lineNumber: 1853,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])('px-4 py-2.5 text-xs font-medium text-slate-700', 'bg-white border border-slate-300 rounded-md', 'focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:border-slate-400', 'cursor-pointer'),
                                                    style: {
                                                        transition: tokens.transition
                                                    },
                                                    value: filters.weekend_sending_mode || '',
                                                    onChange: (e)=>setFilters({
                                                            ...filters,
                                                            weekend_sending_mode: e.target.value || undefined
                                                        }),
                                                    "aria-label": "Filter by Weekend Sending",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "",
                                                            children: "All Weekend"
                                                        }, void 0, false, {
                                                            fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                            lineNumber: 1883,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "active",
                                                            children: "Weekend Sending"
                                                        }, void 0, false, {
                                                            fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                            lineNumber: 1884,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "inactive",
                                                            children: "Weekday Only"
                                                        }, void 0, false, {
                                                            fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                            lineNumber: 1885,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                    lineNumber: 1871,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])('px-4 py-2.5 text-xs font-medium text-slate-700', 'bg-white border border-slate-300 rounded-md', 'focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:border-slate-400', 'cursor-pointer'),
                                                    style: {
                                                        transition: tokens.transition
                                                    },
                                                    value: filters.target_status || '',
                                                    onChange: (e)=>setFilters({
                                                            ...filters,
                                                            target_status: e.target.value || undefined
                                                        }),
                                                    "aria-label": "Filter by Target Status",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "",
                                                            children: "All Target Status"
                                                        }, void 0, false, {
                                                            fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                            lineNumber: 1900,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "below",
                                                            children: "Below Target (Red)"
                                                        }, void 0, false, {
                                                            fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                            lineNumber: 1901,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "above",
                                                            children: "At/Above Target (Green)"
                                                        }, void 0, false, {
                                                            fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                            lineNumber: 1902,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                    lineNumber: 1888,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                            lineNumber: 1761,
                                            columnNumber: 19
                                        }, this),
                                        activeFilterCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: clearAllFilters,
                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])('px-4 py-2.5 text-xs font-semibold text-red-700 hover:text-red-800', 'transition-colors focus:outline-none focus:underline', 'focus:ring-2 focus:ring-red-400 focus:ring-offset-2 rounded-md'),
                                            style: {
                                                transition: tokens.transition
                                            },
                                            children: "Clear all"
                                        }, void 0, false, {
                                            fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                            lineNumber: 1907,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                    lineNumber: 1666,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                            lineNumber: 1652,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                        lineNumber: 1651,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                    lineNumber: 1647,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                lineNumber: 1646,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-[1800px] mx-auto px-6 pb-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden",
                    style: {
                        boxShadow: tokens.shadows.card
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "overflow-x-auto",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                className: "w-full",
                                role: "grid",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                        className: "bg-slate-50 border-b border-slate-200",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "px-4 py-3 w-10",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
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
                                                        fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                        lineNumber: 1938,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                    lineNumber: 1937,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SortableHeader, {
                                                    field: "client_code",
                                                    label: "Client",
                                                    sortField: sortField,
                                                    sortOrder: sortOrder,
                                                    onSort: handleSort,
                                                    align: "left",
                                                    sticky: true
                                                }, void 0, false, {
                                                    fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                    lineNumber: 1952,
                                                    columnNumber: 19
                                                }, this),
                                                visibleColumns.has('rag_status') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SortableHeader, {
                                                    field: "rag_status",
                                                    label: "Health",
                                                    sortField: sortField,
                                                    sortOrder: sortOrder,
                                                    onSort: handleSort,
                                                    align: "center"
                                                }, void 0, false, {
                                                    fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                    lineNumber: 1962,
                                                    columnNumber: 21
                                                }, this),
                                                visibleColumns.has('contacted_7d') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SortableHeader, {
                                                    field: "contacted_7d",
                                                    label: "Emails Sent (7d)",
                                                    sortField: sortField,
                                                    sortOrder: sortOrder,
                                                    onSort: handleSort,
                                                    align: "right"
                                                }, void 0, false, {
                                                    fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                    lineNumber: 1972,
                                                    columnNumber: 21
                                                }, this),
                                                visibleColumns.has('new_leads_reached_7d') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SortableHeader, {
                                                    field: "new_leads_reached_7d",
                                                    label: "New Leads (7d)",
                                                    sortField: sortField,
                                                    sortOrder: sortOrder,
                                                    onSort: handleSort,
                                                    align: "right"
                                                }, void 0, false, {
                                                    fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                    lineNumber: 1982,
                                                    columnNumber: 21
                                                }, this),
                                                visibleColumns.has('prorated_target') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SortableHeader, {
                                                    field: "prorated_target",
                                                    label: "Target (Expected)",
                                                    sortField: sortField,
                                                    sortOrder: sortOrder,
                                                    onSort: handleSort,
                                                    align: "right"
                                                }, void 0, false, {
                                                    fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                    lineNumber: 1992,
                                                    columnNumber: 21
                                                }, this),
                                                visibleColumns.has('replies_7d') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SortableHeader, {
                                                    field: "replies_7d",
                                                    label: "Replies (7d)",
                                                    sortField: sortField,
                                                    sortOrder: sortOrder,
                                                    onSort: handleSort,
                                                    align: "right"
                                                }, void 0, false, {
                                                    fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                    lineNumber: 2002,
                                                    columnNumber: 21
                                                }, this),
                                                visibleColumns.has('reply_rate_7d') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SortableHeader, {
                                                    field: "reply_rate_7d",
                                                    label: "Reply Rate",
                                                    sortField: sortField,
                                                    sortOrder: sortOrder,
                                                    onSort: handleSort,
                                                    align: "right"
                                                }, void 0, false, {
                                                    fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                    lineNumber: 2012,
                                                    columnNumber: 21
                                                }, this),
                                                visibleColumns.has('bounce_pct_7d') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SortableHeader, {
                                                    field: "bounce_pct_7d",
                                                    label: "Bounce Rate",
                                                    sortField: sortField,
                                                    sortOrder: sortOrder,
                                                    onSort: handleSort,
                                                    align: "right"
                                                }, void 0, false, {
                                                    fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                    lineNumber: 2022,
                                                    columnNumber: 21
                                                }, this),
                                                visibleColumns.has('positives_7d') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SortableHeader, {
                                                    field: "positives_7d",
                                                    label: "Positive Replies (7d)",
                                                    sortField: sortField,
                                                    sortOrder: sortOrder,
                                                    onSort: handleSort,
                                                    align: "right"
                                                }, void 0, false, {
                                                    fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                    lineNumber: 2032,
                                                    columnNumber: 21
                                                }, this),
                                                visibleColumns.has('positive_reply_rate_7d') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SortableHeader, {
                                                    field: "positive_reply_rate_7d",
                                                    label: "Positive Rate",
                                                    sortField: sortField,
                                                    sortOrder: sortOrder,
                                                    onSort: handleSort,
                                                    align: "right"
                                                }, void 0, false, {
                                                    fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                    lineNumber: 2042,
                                                    columnNumber: 21
                                                }, this),
                                                visibleColumns.has('pcpl') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SortableHeader, {
                                                    field: "pcpl",
                                                    label: "PCPL",
                                                    sortField: sortField,
                                                    sortOrder: sortOrder,
                                                    onSort: handleSort,
                                                    align: "right"
                                                }, void 0, false, {
                                                    fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                    lineNumber: 2052,
                                                    columnNumber: 21
                                                }, this),
                                                visibleColumns.has('volume_attainment') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SortableHeader, {
                                                    field: "volume_attainment",
                                                    label: "Target",
                                                    sortField: sortField,
                                                    sortOrder: sortOrder,
                                                    onSort: handleSort,
                                                    align: "right"
                                                }, void 0, false, {
                                                    fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                    lineNumber: 2062,
                                                    columnNumber: 21
                                                }, this),
                                                visibleColumns.has('not_contacted_leads') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SortableHeader, {
                                                    field: "not_contacted_leads",
                                                    label: "Not Contacted",
                                                    sortField: sortField,
                                                    sortOrder: sortOrder,
                                                    onSort: handleSort,
                                                    align: "right"
                                                }, void 0, false, {
                                                    fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                    lineNumber: 2072,
                                                    columnNumber: 21
                                                }, this),
                                                visibleColumns.has('bonus_pool_monthly') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SortableHeader, {
                                                    field: "bonus_pool_monthly",
                                                    label: "Bonus Pool",
                                                    sortField: sortField,
                                                    sortOrder: sortOrder,
                                                    onSort: handleSort,
                                                    align: "right"
                                                }, void 0, false, {
                                                    fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                    lineNumber: 2082,
                                                    columnNumber: 21
                                                }, this),
                                                visibleColumns.has('monthly_booking_goal') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SortableHeader, {
                                                    field: "monthly_booking_goal",
                                                    label: "Monthly Booking Goal",
                                                    sortField: sortField,
                                                    sortOrder: sortOrder,
                                                    onSort: handleSort,
                                                    align: "right"
                                                }, void 0, false, {
                                                    fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                    lineNumber: 2092,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "px-4 py-3.5 text-left font-semibold text-xs uppercase tracking-wide border-b-2 border-slate-200 text-slate-600 bg-slate-50/50 whitespace-nowrap",
                                                    children: "Issues"
                                                }, void 0, false, {
                                                    fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                    lineNumber: 2101,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                            lineNumber: 1936,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                        lineNumber: 1935,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                        className: "divide-y divide-slate-100",
                                        children: sortedClients.map((client, index)=>{
                                            // Calculate PCPL for this client
                                            const newLeads = client.new_leads_reached_7d || 0;
                                            const positives = client.positives_7d || 0;
                                            const pcpl = positives > 0 ? newLeads / positives : null;
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])('group transition-colors', index % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'),
                                                style: {
                                                    transition: tokens.transition
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "px-4 py-4",
                                                        onClick: (e)=>e.stopPropagation(),
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
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
                                                            fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                            lineNumber: 2123,
                                                            columnNumber: 25
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                        lineNumber: 2122,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])('px-4 py-4 cursor-pointer hover:bg-slate-50 transition-colors left-0 z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]', index % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'),
                                                        style: {
                                                            position: 'sticky',
                                                            left: '0'
                                                        },
                                                        onClick: ()=>window.location.href = `/client/${client.client_code}`,
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "font-semibold text-slate-900 text-sm group-hover:text-blue-700 transition-colors focus:outline-none focus:underline",
                                                                    children: client.client_code
                                                                }, void 0, false, {
                                                                    fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                                    lineNumber: 2148,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-xs text-slate-500 mt-0.5",
                                                                    children: client.client_company_name || 'No company name'
                                                                }, void 0, false, {
                                                                    fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                                    lineNumber: 2151,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "mt-2",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatusBadge, {
                                                                        status: client.relationship_status
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                                        lineNumber: 2155,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                                    lineNumber: 2154,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                            lineNumber: 2147,
                                                            columnNumber: 25
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                        lineNumber: 2139,
                                                        columnNumber: 23
                                                    }, this),
                                                    visibleColumns.has('rag_status') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "px-4 py-4 text-center",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(RAGStatus, {
                                                            status: client.rag_status
                                                        }, void 0, false, {
                                                            fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                            lineNumber: 2161,
                                                            columnNumber: 27
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                        lineNumber: 2160,
                                                        columnNumber: 25
                                                    }, this),
                                                    visibleColumns.has('contacted_7d') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "px-4 py-4 text-right",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "font-semibold text-slate-900 text-sm tabular-nums",
                                                            children: formatNumber(client.contacted_7d)
                                                        }, void 0, false, {
                                                            fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                            lineNumber: 2166,
                                                            columnNumber: 27
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                        lineNumber: 2165,
                                                        columnNumber: 25
                                                    }, this),
                                                    visibleColumns.has('new_leads_reached_7d') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "px-4 py-4 text-right",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "font-semibold text-slate-900 text-sm tabular-nums",
                                                            children: formatNumber(client.new_leads_reached_7d)
                                                        }, void 0, false, {
                                                            fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                            lineNumber: 2173,
                                                            columnNumber: 27
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                        lineNumber: 2172,
                                                        columnNumber: 25
                                                    }, this),
                                                    visibleColumns.has('prorated_target') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "px-4 py-4 text-right",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TargetStatusBadge, {
                                                            proratedTarget: client.prorated_target,
                                                            newLeads: client.new_leads_reached_7d || 0
                                                        }, void 0, false, {
                                                            fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                            lineNumber: 2180,
                                                            columnNumber: 27
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                        lineNumber: 2179,
                                                        columnNumber: 25
                                                    }, this),
                                                    visibleColumns.has('replies_7d') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "px-4 py-4 text-right",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-sm text-slate-700 tabular-nums",
                                                            children: formatNumber(client.replies_7d || 0)
                                                        }, void 0, false, {
                                                            fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                            lineNumber: 2188,
                                                            columnNumber: 27
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                        lineNumber: 2187,
                                                        columnNumber: 25
                                                    }, this),
                                                    visibleColumns.has('reply_rate_7d') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "px-4 py-4 text-right",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ReplyRateBadge, {
                                                            value: client.reply_rate_7d,
                                                            replies: client.replies_7d || 0,
                                                            newLeads: client.new_leads_reached_7d || 0
                                                        }, void 0, false, {
                                                            fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                            lineNumber: 2195,
                                                            columnNumber: 27
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                        lineNumber: 2194,
                                                        columnNumber: 25
                                                    }, this),
                                                    visibleColumns.has('bounce_pct_7d') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "px-4 py-4 text-right",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BounceRateBadge, {
                                                            value: client.bounce_pct_7d,
                                                            bounces: client.bounces_7d || 0,
                                                            contacted: client.contacted_7d || 0
                                                        }, void 0, false, {
                                                            fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                            lineNumber: 2204,
                                                            columnNumber: 27
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                        lineNumber: 2203,
                                                        columnNumber: 25
                                                    }, this),
                                                    visibleColumns.has('positives_7d') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "px-4 py-4 text-right",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-sm text-slate-700 tabular-nums",
                                                            children: formatNumber(client.positives_7d || 0)
                                                        }, void 0, false, {
                                                            fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                            lineNumber: 2213,
                                                            columnNumber: 27
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                        lineNumber: 2212,
                                                        columnNumber: 25
                                                    }, this),
                                                    visibleColumns.has('positive_reply_rate_7d') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "px-4 py-4 text-right",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PositiveReplyRateBadge, {
                                                            value: client.positive_reply_rate_7d,
                                                            positives: client.positives_7d || 0,
                                                            replies: client.replies_7d || 0
                                                        }, void 0, false, {
                                                            fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                            lineNumber: 2220,
                                                            columnNumber: 27
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                        lineNumber: 2219,
                                                        columnNumber: 25
                                                    }, this),
                                                    visibleColumns.has('pcpl') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "px-4 py-4 text-right",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PCPLBadge, {
                                                            newLeads: newLeads,
                                                            positives: positives
                                                        }, void 0, false, {
                                                            fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                            lineNumber: 2229,
                                                            columnNumber: 27
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                        lineNumber: 2228,
                                                        columnNumber: 25
                                                    }, this),
                                                    visibleColumns.has('volume_attainment') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "px-4 py-4 text-right",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AttainmentBadge, {
                                                            value: client.volume_attainment,
                                                            weeklyTarget: client.weekly_target_int,
                                                            newLeads: client.new_leads_reached_7d
                                                        }, void 0, false, {
                                                            fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                            lineNumber: 2237,
                                                            columnNumber: 27
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                        lineNumber: 2236,
                                                        columnNumber: 25
                                                    }, this),
                                                    visibleColumns.has('not_contacted_leads') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "px-4 py-4 text-right",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tooltip, {
                                                            content: "Leads with STARTED status (not yet contacted) from SmartLead API",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "font-semibold text-slate-900 text-sm tabular-nums",
                                                                children: formatNumber(client.not_contacted_leads || 0)
                                                            }, void 0, false, {
                                                                fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                                lineNumber: 2247,
                                                                columnNumber: 29
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                            lineNumber: 2246,
                                                            columnNumber: 27
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                        lineNumber: 2245,
                                                        columnNumber: 25
                                                    }, this),
                                                    visibleColumns.has('bonus_pool_monthly') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "px-4 py-4 text-right",
                                                        children: client.bonus_pool_monthly !== null && client.bonus_pool_monthly !== undefined ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tooltip, {
                                                            content: "Monthly bonus pool allocation",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "font-semibold text-slate-900 text-sm tabular-nums",
                                                                children: formatNumber(client.bonus_pool_monthly)
                                                            }, void 0, false, {
                                                                fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                                lineNumber: 2257,
                                                                columnNumber: 31
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                            lineNumber: 2256,
                                                            columnNumber: 29
                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-sm text-slate-400 tabular-nums",
                                                            children: "—"
                                                        }, void 0, false, {
                                                            fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                            lineNumber: 2262,
                                                            columnNumber: 29
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                        lineNumber: 2254,
                                                        columnNumber: 25
                                                    }, this),
                                                    visibleColumns.has('monthly_booking_goal') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "px-4 py-4 text-right",
                                                        children: client.monthly_booking_goal !== null && client.monthly_booking_goal !== undefined ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tooltip, {
                                                            content: "Monthly booking goal from Supabase",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "font-semibold text-slate-900 text-sm tabular-nums",
                                                                children: formatNumber(client.monthly_booking_goal)
                                                            }, void 0, false, {
                                                                fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                                lineNumber: 2270,
                                                                columnNumber: 31
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                            lineNumber: 2269,
                                                            columnNumber: 29
                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-sm text-slate-400 tabular-nums",
                                                            children: "—"
                                                        }, void 0, false, {
                                                            fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                            lineNumber: 2275,
                                                            columnNumber: 29
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                        lineNumber: 2267,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "px-4 py-4",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(IssuesFlags, {
                                                            client: client
                                                        }, void 0, false, {
                                                            fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                            lineNumber: 2280,
                                                            columnNumber: 25
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                        lineNumber: 2279,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, client.client_id, true, {
                                                fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                                lineNumber: 2114,
                                                columnNumber: 21
                                            }, this);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                        lineNumber: 2106,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                lineNumber: 1934,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                            lineNumber: 1933,
                            columnNumber: 11
                        }, this),
                        sortedClients.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "px-6 py-12 text-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-slate-500",
                                    children: "No clients match your filters"
                                }, void 0, false, {
                                    fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                    lineNumber: 2291,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: clearAllFilters,
                                    className: "mt-2 text-sm font-semibold text-blue-700 hover:text-blue-800 focus:outline-none focus:underline focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 rounded-md",
                                    children: "Clear all filters"
                                }, void 0, false, {
                                    fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                                    lineNumber: 2292,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                            lineNumber: 2290,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                    lineNumber: 1929,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
                lineNumber: 1928,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/client-health-dashboard/app/src/app/DashboardClient.tsx",
        lineNumber: 1483,
        columnNumber: 5
    }, this);
}
_s1(DashboardClient, "kxoN2GrCcbjgQtGYGuw/CRGQulA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$client$2d$health$2d$dashboard$2f$app$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c25 = DashboardClient;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10, _c11, _c12, _c13, _c14, _c15, _c16, _c17, _c18, _c19, _c20, _c21, _c22, _c23, _c24, _c25;
__turbopack_context__.k.register(_c, "SortAscIcon");
__turbopack_context__.k.register(_c1, "SortDescIcon");
__turbopack_context__.k.register(_c2, "SortUnsortedIcon");
__turbopack_context__.k.register(_c3, "CheckIcon");
__turbopack_context__.k.register(_c4, "AlertIcon");
__turbopack_context__.k.register(_c5, "TrendingDownIcon");
__turbopack_context__.k.register(_c6, "MessageIcon");
__turbopack_context__.k.register(_c7, "DownloadIcon");
__turbopack_context__.k.register(_c8, "RefreshIcon");
__turbopack_context__.k.register(_c9, "FilterIcon");
__turbopack_context__.k.register(_c10, "StatusChip");
__turbopack_context__.k.register(_c11, "KpiPill");
__turbopack_context__.k.register(_c12, "KpiTile");
__turbopack_context__.k.register(_c13, "KpiTileCompact");
__turbopack_context__.k.register(_c14, "Tooltip");
__turbopack_context__.k.register(_c15, "SortableHeader");
__turbopack_context__.k.register(_c16, "StatusBadge");
__turbopack_context__.k.register(_c17, "RAGStatus");
__turbopack_context__.k.register(_c18, "ReplyRateBadge");
__turbopack_context__.k.register(_c19, "BounceRateBadge");
__turbopack_context__.k.register(_c20, "PositiveReplyRateBadge");
__turbopack_context__.k.register(_c21, "TargetStatusBadge");
__turbopack_context__.k.register(_c22, "AttainmentBadge");
__turbopack_context__.k.register(_c23, "PCPLBadge");
__turbopack_context__.k.register(_c24, "IssuesFlags");
__turbopack_context__.k.register(_c25, "DashboardClient");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=client-health-dashboard_app_src_91edbb5b._.js.map