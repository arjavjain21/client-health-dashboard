module.exports=[18840,e=>e.a(async(t,a)=>{try{var n=e.i(72720),r=e.i(77732),s=t([r]);async function o(e){let t=e.map((e,t)=>`$${t+1}`).join(", "),a=`
    SELECT
      week_number,
      period_start_date as start_date,
      period_end_date as end_date
    FROM client_health_dashboard_historical
    WHERE week_number IN (${t})
    GROUP BY week_number, period_start_date, period_end_date
    ORDER BY week_number
  `;return await (0,r.query)(a,e)}async function i(e){try{let t,a,s,i,_=e.nextUrl.searchParams.get("weeks");try{t=function(e){if(!e||""===e.trim())throw Error('Query parameter "weeks" is required. Example: ?weeks=1 or ?weeks=1,2,3');let t=e.split(",").map(e=>e.trim()).filter(e=>""!==e).map(e=>{let t=parseInt(e,10);if(isNaN(t))throw Error(`Invalid week number: "${e}". Week numbers must be integers 1-4.`);if(t<1||t>4)throw Error(`Week number out of range: ${t}. Only weeks 1-4 are supported.`);return t});if(0===t.length)throw Error("At least one valid week number must be provided.");return[...new Set(t)].sort((e,t)=>e-t)}(_)}catch(e){return n.NextResponse.json({error:e instanceof Error?e.message:"Invalid week numbers"},{status:400})}let l=7*t.length;if(1===t.length)t[0],s=`
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
  `,i=[t[0]],a=(a=await (0,r.query)(s,i)).map(e=>({...e,selected_weeks:t,aggregation_days:l}));else{let e;e=t.map((e,t)=>`$${t+1}`).join(", "),s=`
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
    WHERE week_number IN (${e})
    GROUP BY client_id, client_code
    ORDER BY SUM(new_leads_reached_7d) DESC NULLS LAST
  `,i=t,a=await (0,r.query)(s,i)}let d=await o(t),c=a.map(e=>{var a;return a=t,{client_id:e.client_id,client_code:e.client_code,client_name:e.client_name,client_company_name:e.client_company_name,relationship_status:e.relationship_status,assigned_account_manager_name:e.assigned_account_manager_name,assigned_inbox_manager_name:e.assigned_inbox_manager_name,assigned_sdr_name:e.assigned_sdr_name,weekly_target_int:e.weekly_target_int,weekly_target_missing:e.weekly_target_missing??!1,closelix:e.closelix??!1,contacted_7d:e.contacted_7d??0,replies_7d:e.replies_7d??0,positives_7d:e.positives_7d??0,bounces_7d:e.bounces_7d??0,reply_rate_7d:e.reply_rate_7d?parseFloat(e.reply_rate_7d):null,positive_reply_rate_7d:e.positive_reply_rate_7d?parseFloat(e.positive_reply_rate_7d):null,bounce_pct_7d:e.bounce_pct_7d?parseFloat(e.bounce_pct_7d):null,new_leads_reached_7d:e.new_leads_reached_7d??0,prorated_target:e.prorated_target?parseFloat(e.prorated_target):null,volume_attainment:e.volume_attainment?parseFloat(e.volume_attainment):null,pcpl_proxy_7d:e.pcpl_proxy_7d?parseFloat(e.pcpl_proxy_7d):null,not_contacted_leads:e.not_contacted_leads??0,deliverability_flag:e.deliverability_flag??!1,volume_flag:e.volume_flag??!1,mmf_flag:e.mmf_flag??!1,data_missing_flag:e.data_missing_flag??!1,data_stale_flag:e.data_stale_flag??!1,rag_status:e.rag_status??"Yellow",rag_reason:e.rag_reason,most_recent_reporting_end_date:e.most_recent_reporting_end_date,bonus_pool_monthly:e.bonus_pool_monthly?parseFloat(e.bonus_pool_monthly):null,weekend_sending_effective:e.weekend_sending_effective??!1,monthly_booking_goal:e.monthly_booking_goal?parseFloat(e.monthly_booking_goal):null,computed_at:e.computed_at,selected_weeks:a,aggregation_days:l,period_start_date:e.period_start_date,period_end_date:e.period_end_date}}),p={data:c,count:c.length,selected_weeks:t,aggregation_info:{total_days:l,week_ranges:d}};return n.NextResponse.json(p)}catch(t){console.error("Historical dashboard API error:",t);let e=t instanceof Error?t.message:"Failed to fetch historical dashboard data";return n.NextResponse.json({error:e},{status:500})}}[r]=s.then?(await s)():s,e.s(["GET",()=>i]),a()}catch(e){a(e)}},!1),90521,e=>e.a(async(t,a)=>{try{var n=e.i(48175),r=e.i(99135),s=e.i(33332),o=e.i(48807),i=e.i(48975),_=e.i(11411),l=e.i(84777),d=e.i(72450),c=e.i(8491),p=e.i(6932),u=e.i(11710),g=e.i(70270),m=e.i(5995),h=e.i(67956),f=e.i(42615),w=e.i(93695);e.i(17301);var y=e.i(51507),R=e.i(18840),v=t([R]);[R]=v.then?(await v)():v;let A=new n.AppRouteRouteModule({definition:{kind:r.RouteKind.APP_ROUTE,page:"/api/dashboard/historical/route",pathname:"/api/dashboard/historical",filename:"route",bundlePath:""},distDir:".next",relativeProjectDir:"",resolvedPagePath:"[project]/client-health-dashboard/app/src/app/api/dashboard/historical/route.ts",nextConfigOutput:"",userland:R}),{workAsyncStorage:k,workUnitAsyncStorage:x,serverHooks:N}=A;function b(){return(0,s.patchFetch)({workAsyncStorage:k,workUnitAsyncStorage:x})}async function E(e,t,a){A.isDev&&(0,o.addRequestMeta)(e,"devRequestTimingInternalsEnd",process.hrtime.bigint());let n="/api/dashboard/historical/route";n=n.replace(/\/index$/,"")||"/";let s=await A.prepare(e,t,{srcPage:n,multiZoneDraftMode:!1});if(!s)return t.statusCode=400,t.end("Bad Request"),null==a.waitUntil||a.waitUntil.call(a,Promise.resolve()),null;let{buildId:R,params:v,nextConfig:b,parsedUrl:E,isDraftMode:k,prerenderManifest:x,routerServerContext:N,isOnDemandRevalidate:O,revalidateOnlyGenerated:U,resolvedPathname:C,clientReferenceManifest:S,serverActionsManifest:T}=s,L=(0,l.normalizeAppPath)(n),M=!!(x.dynamicRoutes[L]||x.routes[C]),P=async()=>((null==N?void 0:N.render404)?await N.render404(e,t,E,!1):t.end("This page could not be found"),null);if(M&&!k){let e=!!x.routes[C],t=x.dynamicRoutes[L];if(t&&!1===t.fallback&&!e){if(b.experimental.adapterPath)return await P();throw new w.NoFallbackError}}let I=null;!M||A.isDev||k||(I=C,I="/index"===I?"/":I);let D=!0===A.isDev||!M,F=M&&!D;T&&S&&(0,_.setManifestsSingleton)({page:n,clientReferenceManifest:S,serverActionsManifest:T});let H=e.method||"GET",Y=(0,i.getTracer)(),V=Y.getActiveScopeSpan(),q={params:v,prerenderManifest:x,renderOpts:{experimental:{authInterrupts:!!b.experimental.authInterrupts},cacheComponents:!!b.cacheComponents,supportsDynamicResponse:D,incrementalCache:(0,o.getRequestMeta)(e,"incrementalCache"),cacheLifeProfiles:b.cacheLife,waitUntil:a.waitUntil,onClose:e=>{t.on("close",e)},onAfterTaskError:void 0,onInstrumentationRequestError:(t,a,n,r)=>A.onRequestError(e,t,n,r,N)},sharedContext:{buildId:R}},$=new d.NodeNextRequest(e),B=new d.NodeNextResponse(t),G=c.NextRequestAdapter.fromNodeNextRequest($,(0,c.signalFromNodeResponse)(t));try{let s=async e=>A.handle(G,q).finally(()=>{if(!e)return;e.setAttributes({"http.status_code":t.statusCode,"next.rsc":!1});let a=Y.getRootSpanAttributes();if(!a)return;if(a.get("next.span_type")!==p.BaseServerSpan.handleRequest)return void console.warn(`Unexpected root span type '${a.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let r=a.get("next.route");if(r){let t=`${H} ${r}`;e.setAttributes({"next.route":r,"http.route":r,"next.span_name":t}),e.updateName(t)}else e.updateName(`${H} ${n}`)}),_=!!(0,o.getRequestMeta)(e,"minimalMode"),l=async o=>{var i,l;let d=async({previousCacheEntry:r})=>{try{if(!_&&O&&U&&!r)return t.statusCode=404,t.setHeader("x-nextjs-cache","REVALIDATED"),t.end("This page could not be found"),null;let n=await s(o);e.fetchMetrics=q.renderOpts.fetchMetrics;let i=q.renderOpts.pendingWaitUntil;i&&a.waitUntil&&(a.waitUntil(i),i=void 0);let l=q.renderOpts.collectedTags;if(!M)return await (0,g.sendResponse)($,B,n,q.renderOpts.pendingWaitUntil),null;{let e=await n.blob(),t=(0,m.toNodeOutgoingHttpHeaders)(n.headers);l&&(t[f.NEXT_CACHE_TAGS_HEADER]=l),!t["content-type"]&&e.type&&(t["content-type"]=e.type);let a=void 0!==q.renderOpts.collectedRevalidate&&!(q.renderOpts.collectedRevalidate>=f.INFINITE_CACHE)&&q.renderOpts.collectedRevalidate,r=void 0===q.renderOpts.collectedExpire||q.renderOpts.collectedExpire>=f.INFINITE_CACHE?void 0:q.renderOpts.collectedExpire;return{value:{kind:y.CachedRouteKind.APP_ROUTE,status:n.status,body:Buffer.from(await e.arrayBuffer()),headers:t},cacheControl:{revalidate:a,expire:r}}}}catch(t){throw(null==r?void 0:r.isStale)&&await A.onRequestError(e,t,{routerKind:"App Router",routePath:n,routeType:"route",revalidateReason:(0,u.getRevalidateReason)({isStaticGeneration:F,isOnDemandRevalidate:O})},!1,N),t}},c=await A.handleResponse({req:e,nextConfig:b,cacheKey:I,routeKind:r.RouteKind.APP_ROUTE,isFallback:!1,prerenderManifest:x,isRoutePPREnabled:!1,isOnDemandRevalidate:O,revalidateOnlyGenerated:U,responseGenerator:d,waitUntil:a.waitUntil,isMinimalMode:_});if(!M)return null;if((null==c||null==(i=c.value)?void 0:i.kind)!==y.CachedRouteKind.APP_ROUTE)throw Object.defineProperty(Error(`Invariant: app-route received invalid cache entry ${null==c||null==(l=c.value)?void 0:l.kind}`),"__NEXT_ERROR_CODE",{value:"E701",enumerable:!1,configurable:!0});_||t.setHeader("x-nextjs-cache",O?"REVALIDATED":c.isMiss?"MISS":c.isStale?"STALE":"HIT"),k&&t.setHeader("Cache-Control","private, no-cache, no-store, max-age=0, must-revalidate");let p=(0,m.fromNodeOutgoingHttpHeaders)(c.value.headers);return _&&M||p.delete(f.NEXT_CACHE_TAGS_HEADER),!c.cacheControl||t.getHeader("Cache-Control")||p.get("Cache-Control")||p.set("Cache-Control",(0,h.getCacheControlHeader)(c.cacheControl)),await (0,g.sendResponse)($,B,new Response(c.value.body,{headers:p,status:c.value.status||200})),null};V?await l(V):await Y.withPropagatedContext(e.headers,()=>Y.trace(p.BaseServerSpan.handleRequest,{spanName:`${H} ${n}`,kind:i.SpanKind.SERVER,attributes:{"http.method":H,"http.target":e.url}},l))}catch(t){if(t instanceof w.NoFallbackError||await A.onRequestError(e,t,{routerKind:"App Router",routePath:L,routeType:"route",revalidateReason:(0,u.getRevalidateReason)({isStaticGeneration:F,isOnDemandRevalidate:O})},!1,N),M)throw t;return await (0,g.sendResponse)($,B,new Response(null,{status:500})),null}}e.s(["handler",()=>E,"patchFetch",()=>b,"routeModule",()=>A,"serverHooks",()=>N,"workAsyncStorage",()=>k,"workUnitAsyncStorage",()=>x]),a()}catch(e){a(e)}},!1)];

//# sourceMappingURL=client-health-dashboard_app_1c5abd43._.js.map