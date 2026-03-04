module.exports=[93695,(e,t,a)=>{t.exports=e.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},70406,(e,t,a)=>{t.exports=e.x("next/dist/compiled/@opentelemetry/api",()=>require("next/dist/compiled/@opentelemetry/api"))},18622,(e,t,a)=>{t.exports=e.x("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js",()=>require("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js"))},56704,(e,t,a)=>{t.exports=e.x("next/dist/server/app-render/work-async-storage.external.js",()=>require("next/dist/server/app-render/work-async-storage.external.js"))},32319,(e,t,a)=>{t.exports=e.x("next/dist/server/app-render/work-unit-async-storage.external.js",()=>require("next/dist/server/app-render/work-unit-async-storage.external.js"))},24725,(e,t,a)=>{t.exports=e.x("next/dist/server/app-render/after-task-async-storage.external.js",()=>require("next/dist/server/app-render/after-task-async-storage.external.js"))},56417,e=>e.a(async(t,a)=>{try{let t=await e.y("pg-14922844cab3d733");e.n(t),a()}catch(e){a(e)}},!0),77732,e=>e.a(async(t,a)=>{try{var n=e.i(56417),r=t([n]);if([n]=r.then?(await r)():r,!process.env.DATABASE_URL)throw Error("FATAL: DATABASE_URL environment variable is not set. Please check your .env.local file and ensure DATABASE_URL is defined.");let i=new n.Pool({connectionString:process.env.DATABASE_URL,max:10,idleTimeoutMillis:3e4,connectionTimeoutMillis:2e3});async function o(){try{let e=await i.connect();return await e.query("SELECT 1"),e.release(),console.log("✓ Database connection healthy"),!0}catch(e){return console.error("✗ Database health check failed:",{code:e.code,message:e.message,hint:"Verify DATABASE_URL in .env.local and that PostgreSQL is running"}),!1}}async function s(e,t){let a=Date.now();try{let n=await i.query(e,t),r=Date.now()-a;return console.log("Executed query",{text:e,duration:r,rows:n.rowCount}),n.rows}catch(t){throw console.error("Database query error",{text:e,code:t.code,message:t.message,hint:"28P01"===t.code?"Password authentication failed. Check DATABASE_URL password in .env.local":void 0}),t}}i.on("error",e=>{console.error("Unexpected database pool error:",{code:e.code,message:e.message,hint:"Check your DATABASE_URL connection string in .env.local"})}),e.s(["healthCheck",()=>o,"query",()=>s]),a()}catch(e){a(e)}},!1),56605,e=>e.a(async(t,a)=>{try{var n=e.i(72720),r=e.i(77732),o=t([r]);async function s(e,{params:t}){try{let{client_code:e}=await t,a=new Date;a.setHours(0,0,0,0);let o=new Date(a);o.setDate(o.getDate()-1);let s=a.getDay(),i=0===s?6:s-1,l=new Date(a);l.setDate(l.getDate()-(6===i?3:5===i?1:i+3));let c=`
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
        deliverability_flag, volume_flag, mmf_flag,
        data_missing_flag, data_stale_flag,
        rag_status, rag_reason,
        most_recent_reporting_end_date, computed_at,
        weekend_sending_effective,
        monthly_booking_goal
      FROM client_health_dashboard_v1_local
      WHERE client_code = $1
    `,d=await (0,r.query)(c,[e]);if(!d||0===d.length)return n.NextResponse.json({error:"Client not found"},{status:404});let u=d[0],p=`
      SELECT
        end_date,
        SUM(total_sent) as contacted,
        SUM(replies_count) as replies,
        SUM(positive_reply) as positives,
        SUM(bounce_count) as bounces,
        CASE
          WHEN SUM(total_sent) > 0 THEN
            ROUND(SUM(replies_count)::numeric / SUM(total_sent), 4)
          ELSE NULL
        END as reply_rate,
        CASE
          WHEN SUM(total_sent) > 0 THEN
            ROUND(SUM(positive_reply)::numeric / SUM(total_sent), 4)
          ELSE NULL
        END as positive_reply_rate
      FROM campaign_reporting_local
      WHERE client_name_norm IN (
        SELECT DISTINCT client_name_norm
        FROM client_name_map_local
        WHERE client_code = $1
      )
      AND end_date >= $2
      GROUP BY end_date
      ORDER BY end_date DESC
    `,_=new Date(l);_.setDate(_.getDate()-14);let E=await (0,r.query)(p,[e,_.toISOString().split("T")[0]]),h=`
      SELECT
        campaign_id,
        campaign_name,
        status,
        MIN(start_date) as start_date,
        MAX(end_date) as end_date,
        SUM(total_sent)::bigint as total_sent,
        SUM(COALESCE(new_leads_reached, 0))::bigint as new_leads_reached_7d,
        SUM(replies_count)::bigint as replies_count,
        SUM(positive_reply)::bigint as positive_reply,
        SUM(bounce_count)::bigint as bounce_count,
        CASE
          WHEN SUM(COALESCE(new_leads_reached, 0)) > 0 THEN
            ROUND((SUM(replies_count)::numeric / SUM(COALESCE(new_leads_reached, 0))), 4)
          ELSE NULL
        END as reply_rate,
        CASE
          WHEN SUM(replies_count) > 0 THEN
            ROUND((SUM(positive_reply)::numeric / SUM(replies_count)), 4)
          ELSE NULL
        END as positive_reply_rate,
        CASE
          WHEN SUM(total_sent) > 0 THEN
            ROUND((SUM(bounce_count)::numeric / SUM(total_sent)), 4)
          ELSE NULL
        END as bounce_pct_7d,
        NULL::int as weekly_target_int,
        NULL::numeric as volume_attainment
      FROM campaign_reporting_local
      WHERE client_name_norm IN (
        SELECT DISTINCT client_name_norm
        FROM client_name_map_local
        WHERE client_code = $1
      )
      AND end_date >= $2
      AND end_date <= $3
      GROUP BY campaign_id, campaign_name, status
      ORDER BY new_leads_reached_7d DESC, total_sent DESC
    `,g=await (0,r.query)(h,[e,l.toISOString().split("T")[0],o.toISOString().split("T")[0]]);return n.NextResponse.json({client:u,trendData:E,campaigns:g})}catch(e){return console.error("Client detail API error:",e),n.NextResponse.json({error:"Failed to fetch client details"},{status:500})}}[r]=o.then?(await o)():o,e.s(["GET",()=>s]),a()}catch(e){a(e)}},!1),53117,e=>e.a(async(t,a)=>{try{var n=e.i(48175),r=e.i(99135),o=e.i(33332),s=e.i(48807),i=e.i(48975),l=e.i(11411),c=e.i(84777),d=e.i(72450),u=e.i(8491),p=e.i(6932),_=e.i(11710),E=e.i(70270),h=e.i(5995),g=e.i(67956),m=e.i(42615),R=e.i(93695);e.i(17301);var S=e.i(51507),y=e.i(56605),v=t([y]);[y]=v.then?(await v)():v;let A=new n.AppRouteRouteModule({definition:{kind:r.RouteKind.APP_ROUTE,page:"/api/dashboard/[client_code]/route",pathname:"/api/dashboard/[client_code]",filename:"route",bundlePath:""},distDir:".next",relativeProjectDir:"",resolvedPagePath:"[project]/client-health-dashboard/app/src/app/api/dashboard/[client_code]/route.ts",nextConfigOutput:"",userland:y}),{workAsyncStorage:f,workUnitAsyncStorage:C,serverHooks:U}=A;function w(){return(0,o.patchFetch)({workAsyncStorage:f,workUnitAsyncStorage:C})}async function x(e,t,a){A.isDev&&(0,s.addRequestMeta)(e,"devRequestTimingInternalsEnd",process.hrtime.bigint());let n="/api/dashboard/[client_code]/route";n=n.replace(/\/index$/,"")||"/";let o=await A.prepare(e,t,{srcPage:n,multiZoneDraftMode:!1});if(!o)return t.statusCode=400,t.end("Bad Request"),null==a.waitUntil||a.waitUntil.call(a,Promise.resolve()),null;let{buildId:y,params:v,nextConfig:w,parsedUrl:x,isDraftMode:f,prerenderManifest:C,routerServerContext:U,isOnDemandRevalidate:N,revalidateOnlyGenerated:D,resolvedPathname:b,clientReferenceManifest:T,serverActionsManifest:M}=o,L=(0,c.normalizeAppPath)(n),O=!!(C.dynamicRoutes[L]||C.routes[b]),H=async()=>((null==U?void 0:U.render404)?await U.render404(e,t,x,!1):t.end("This page could not be found"),null);if(O&&!f){let e=!!C.routes[b],t=C.dynamicRoutes[L];if(t&&!1===t.fallback&&!e){if(w.experimental.adapterPath)return await H();throw new R.NoFallbackError}}let k=null;!O||A.isDev||f||(k=b,k="/index"===k?"/":k);let P=!0===A.isDev||!O,q=O&&!P;M&&T&&(0,l.setManifestsSingleton)({page:n,clientReferenceManifest:T,serverActionsManifest:M});let I=e.method||"GET",j=(0,i.getTracer)(),B=j.getActiveScopeSpan(),F={params:v,prerenderManifest:C,renderOpts:{experimental:{authInterrupts:!!w.experimental.authInterrupts},cacheComponents:!!w.cacheComponents,supportsDynamicResponse:P,incrementalCache:(0,s.getRequestMeta)(e,"incrementalCache"),cacheLifeProfiles:w.cacheLife,waitUntil:a.waitUntil,onClose:e=>{t.on("close",e)},onAfterTaskError:void 0,onInstrumentationRequestError:(t,a,n,r)=>A.onRequestError(e,t,n,r,U)},sharedContext:{buildId:y}},$=new d.NodeNextRequest(e),W=new d.NodeNextResponse(t),K=u.NextRequestAdapter.fromNodeNextRequest($,(0,u.signalFromNodeResponse)(t));try{let o=async e=>A.handle(K,F).finally(()=>{if(!e)return;e.setAttributes({"http.status_code":t.statusCode,"next.rsc":!1});let a=j.getRootSpanAttributes();if(!a)return;if(a.get("next.span_type")!==p.BaseServerSpan.handleRequest)return void console.warn(`Unexpected root span type '${a.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let r=a.get("next.route");if(r){let t=`${I} ${r}`;e.setAttributes({"next.route":r,"http.route":r,"next.span_name":t}),e.updateName(t)}else e.updateName(`${I} ${n}`)}),l=!!(0,s.getRequestMeta)(e,"minimalMode"),c=async s=>{var i,c;let d=async({previousCacheEntry:r})=>{try{if(!l&&N&&D&&!r)return t.statusCode=404,t.setHeader("x-nextjs-cache","REVALIDATED"),t.end("This page could not be found"),null;let n=await o(s);e.fetchMetrics=F.renderOpts.fetchMetrics;let i=F.renderOpts.pendingWaitUntil;i&&a.waitUntil&&(a.waitUntil(i),i=void 0);let c=F.renderOpts.collectedTags;if(!O)return await (0,E.sendResponse)($,W,n,F.renderOpts.pendingWaitUntil),null;{let e=await n.blob(),t=(0,h.toNodeOutgoingHttpHeaders)(n.headers);c&&(t[m.NEXT_CACHE_TAGS_HEADER]=c),!t["content-type"]&&e.type&&(t["content-type"]=e.type);let a=void 0!==F.renderOpts.collectedRevalidate&&!(F.renderOpts.collectedRevalidate>=m.INFINITE_CACHE)&&F.renderOpts.collectedRevalidate,r=void 0===F.renderOpts.collectedExpire||F.renderOpts.collectedExpire>=m.INFINITE_CACHE?void 0:F.renderOpts.collectedExpire;return{value:{kind:S.CachedRouteKind.APP_ROUTE,status:n.status,body:Buffer.from(await e.arrayBuffer()),headers:t},cacheControl:{revalidate:a,expire:r}}}}catch(t){throw(null==r?void 0:r.isStale)&&await A.onRequestError(e,t,{routerKind:"App Router",routePath:n,routeType:"route",revalidateReason:(0,_.getRevalidateReason)({isStaticGeneration:q,isOnDemandRevalidate:N})},!1,U),t}},u=await A.handleResponse({req:e,nextConfig:w,cacheKey:k,routeKind:r.RouteKind.APP_ROUTE,isFallback:!1,prerenderManifest:C,isRoutePPREnabled:!1,isOnDemandRevalidate:N,revalidateOnlyGenerated:D,responseGenerator:d,waitUntil:a.waitUntil,isMinimalMode:l});if(!O)return null;if((null==u||null==(i=u.value)?void 0:i.kind)!==S.CachedRouteKind.APP_ROUTE)throw Object.defineProperty(Error(`Invariant: app-route received invalid cache entry ${null==u||null==(c=u.value)?void 0:c.kind}`),"__NEXT_ERROR_CODE",{value:"E701",enumerable:!1,configurable:!0});l||t.setHeader("x-nextjs-cache",N?"REVALIDATED":u.isMiss?"MISS":u.isStale?"STALE":"HIT"),f&&t.setHeader("Cache-Control","private, no-cache, no-store, max-age=0, must-revalidate");let p=(0,h.fromNodeOutgoingHttpHeaders)(u.value.headers);return l&&O||p.delete(m.NEXT_CACHE_TAGS_HEADER),!u.cacheControl||t.getHeader("Cache-Control")||p.get("Cache-Control")||p.set("Cache-Control",(0,g.getCacheControlHeader)(u.cacheControl)),await (0,E.sendResponse)($,W,new Response(u.value.body,{headers:p,status:u.value.status||200})),null};B?await c(B):await j.withPropagatedContext(e.headers,()=>j.trace(p.BaseServerSpan.handleRequest,{spanName:`${I} ${n}`,kind:i.SpanKind.SERVER,attributes:{"http.method":I,"http.target":e.url}},c))}catch(t){if(t instanceof R.NoFallbackError||await A.onRequestError(e,t,{routerKind:"App Router",routePath:L,routeType:"route",revalidateReason:(0,_.getRevalidateReason)({isStaticGeneration:q,isOnDemandRevalidate:N})},!1,U),O)throw t;return await (0,E.sendResponse)($,W,new Response(null,{status:500})),null}}e.s(["handler",()=>x,"patchFetch",()=>w,"routeModule",()=>A,"serverHooks",()=>U,"workAsyncStorage",()=>f,"workUnitAsyncStorage",()=>C]),a()}catch(e){a(e)}},!1)];

//# sourceMappingURL=%5Broot-of-the-server%5D__71257872._.js.map