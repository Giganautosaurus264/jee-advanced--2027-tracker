/* Data and assessment rules; no browser dependencies. */
const TrackerCore = (() => {
  const VERSION=1, STORE='jee27_workspace_v1', BACKUP='jee27_workspace_backup_v1';
  const organic=syllabus.flatMap((c,i)=>c.skills.map((s,j)=>({...s,chapterId:c.id,branchId:'organic',subject:'chemistry',legacyKey:i+':'+j,weight:c.weight/c.skills.length})));
  const day=d=>/^\d{4}-\d{2}-\d{2}$/.test(d)&&!isNaN(Date.parse(d+'T12:00:00Z'))&&new Date(d+'T12:00:00Z').toISOString().slice(0,10)===d;
  const today=()=>new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Kolkata',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
  const daysBetween=(a,b)=>Math.round((Date.parse(b+'T12:00:00Z')-Date.parse(a+'T12:00:00Z'))/86400000);
  const addDays=(d,n)=>new Date(Date.parse(d+'T12:00:00Z')+n*86400000).toISOString().slice(0,10);
  function readLegacy(storage){const raw={};for(let i=0;i<storage.length;i++){const k=storage.key(i);if(/^jee/i.test(k)&&k!==STORE&&k!==BACKUP)raw[k]=storage.getItem(k)}return raw}
  const parse=(raw,fallback)=>{try{return JSON.parse(raw)??fallback}catch{return fallback}};
  function load(storage){
    const legacy=readLegacy(storage),raw=storage.getItem(STORE),notices=[];
    let state=raw?parse(raw,null):null;
    if(raw&&(!state||state.version!==VERSION||!Array.isArray(state.attempts)||!Array.isArray(state.activity)||typeof state.notes!=='object'||!state.notes||typeof state.practice!=='object'||!state.practice||typeof state.targets!=='object'||!state.targets||typeof state.capacity!=='object'||!state.capacity||typeof state.skillChildren!=='object'||!state.skillChildren))throw Error('Saved workspace could not be read. Export a recovery copy before repairing it; the original was not changed.');
    if(!state){
      const checks=parse(legacy.jee27_topic_task_checks_v3,{});const dates=parse(legacy.jee27_study_checkins,[]);
      state={version:VERSION,createdAt:new Date().toISOString(),attempts:[],activity:[],notes:{},practice:{},targets:{organic:'2027-01-31'},capacity:{organic:2,physics:2,mathematics:2,physical:2,inorganic:2},skillChildren:{}};
      organic.forEach(t=>{if(checks&&Object.hasOwn(checks,t.legacyKey))state.practice[t.id]=!!checks[t.legacyKey]});
      if(Array.isArray(dates))dates.filter(day).forEach(date=>state.activity.push({id:'legacy-'+date,date,topicId:null,branchId:'organic',kind:'legacy',note:'Existing study check-in; chapter unknown'}));
      const confirmed=['2026-10-14','2026-10-15','2026-10-17','2026-10-18','2026-10-19','2026-10-22','2026-10-25'];
      confirmed.forEach(date=>{if(!state.activity.some(a=>a.date===date&&a.branchId==='organic'))state.activity.push({id:'confirmed-'+date,date,topicId:null,branchId:'organic',kind:'historical',note:'Confirmed session from repository history'})});
      notices.push('Existing records are retained. Old checkmarks mean practice, not assessment completion.');
    }
    validateWorkspace(state,typeof Catalog!=='undefined'?Catalog.topics:organic);return {state,legacy,notices};
  }
  function save(storage,state){const old=storage.getItem(STORE);if(old!==null)storage.setItem(BACKUP,old);storage.setItem(STORE,JSON.stringify(state))}
  const escape=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const https=s=>{try{return new URL(s).protocol==='https:'}catch{return false}};
  function validateAttempt(a,topics){
    if(!a||a.schemaVersion!==1||typeof a.attemptId!=='string'||!a.attemptId.trim()||a.attemptId.length>150)throw Error('An assessment needs schemaVersion 1 and a unique attemptId.');
    if(typeof a.assessmentId!=='string'||!a.assessmentId.trim()||!day(a.date)||a.date>today()||!Number.isFinite(a.durationMinutes)||a.durationMinutes<=0||a.durationMinutes>720||typeof a.unaided!=='boolean')throw Error('Supply a valid assessmentId, date (not in the future), durationMinutes, and unaided flag.');
    if(!Array.isArray(a.results)||!a.results.length||a.results.length>500)throw Error('Supply one or more subtopic results.');
    const ids=new Set(topics.map(t=>t.id)),seen=new Set();
    const clean={schemaVersion:1,attemptId:a.attemptId,assessmentId:a.assessmentId,date:a.date,durationMinutes:a.durationMinutes,unaided:a.unaided,results:[]};
    for(const r of a.results){
      if(!ids.has(r.topicId)||seen.has(r.topicId))throw Error('Unknown or duplicate subtopic ID: '+r.topicId);seen.add(r.topicId);
      if(!Number.isFinite(r.score)||!Number.isFinite(r.maxScore)||r.maxScore<=0||r.score>r.maxScore||r.score < -r.maxScore)throw Error('Scores must be finite, within the marking range; maxScore must be positive.');
      if(!Array.isArray(r.questions)||!r.questions.length||r.questions.length>200)throw Error('Question evidence is required for each subtopic.');
      const questions=r.questions.map(q=>{if(!q||typeof q.reference!=='string'||!q.reference.trim()||!['PYQ','Advanced'].includes(q.kind)||typeof q.challenging!=='boolean'||!Array.isArray(q.dependencies)||q.dependencies.some(id=>!ids.has(id)))throw Error('Each question needs its source reference, kind, challenging flag, and known dependency IDs.');return {reference:q.reference,kind:q.kind,challenging:q.challenging,dependencies:[...new Set(q.dependencies)]}});
      let benchmark=null;
      if(r.benchmark){const b=r.benchmark;if(b.assessmentId!==a.assessmentId||b.topicId!==r.topicId||b.maxScore!==r.maxScore||!https(b.sourceUrl)||typeof b.cohort!=='string'||!b.cohort.trim()||typeof b.conditions!=='string'||!b.conditions.trim()||!Array.isArray(b.scores)||b.scores.length<100||b.scores.length>100000||b.scores.some(v=>!Number.isFinite(v)||v>r.maxScore||v < -r.maxScore))throw Error('Benchmark must match this exact assessment/subtopic/maximum and include an HTTPS source, cohort, conditions, and at least 100 actual scores.');benchmark={assessmentId:b.assessmentId,topicId:b.topicId,maxScore:b.maxScore,sourceUrl:b.sourceUrl,cohort:b.cohort,conditions:b.conditions,scores:b.scores.slice()}}
      clean.results.push({topicId:r.topicId,score:r.score,maxScore:r.maxScore,questions,benchmark});
    }
    return clean;
  }
  function validateWorkspace(state,topics){
    const object=v=>v&&typeof v==='object'&&!Array.isArray(v),ids=new Set(topics.map(t=>t.id)),branches=new Set(topics.map(t=>t.branchId));
    if(state?.version!==VERSION||!Array.isArray(state.attempts)||!Array.isArray(state.activity)||!['notes','practice','targets','capacity','skillChildren'].every(k=>object(state[k])))throw Error('Invalid workspace structure. Original records were not changed.');
    const attempts=new Set();for(const a of state.attempts){validateAttempt(a,topics);if(attempts.has(a.attemptId)||typeof a.reviewed!=='boolean'||typeof a.recordedAt!=='string'||isNaN(Date.parse(a.recordedAt)))throw Error('Invalid or duplicate saved assessment. Original records were not changed.');attempts.add(a.attemptId)}
    for(const [id,value] of Object.entries(state.notes))if(!ids.has(id)||typeof value!=='string')throw Error('Invalid saved note.');
    for(const [id,value] of Object.entries(state.practice))if(!ids.has(id)||typeof value!=='boolean')throw Error('Invalid practice record.');
    for(const [id,value] of Object.entries(state.targets))if(!branches.has(id)||(value!==null&&!day(value)))throw Error('Invalid branch target.');
    for(const [id,value] of Object.entries(state.capacity))if(!branches.has(id)||!Number.isFinite(value)||value<.1||value>30)throw Error('Invalid branch capacity.');
    if(state.restoredLegacy!==undefined&&(!Array.isArray(state.restoredLegacy)||state.restoredLegacy.some(a=>!object(a)||typeof a.exportedAt!=='string'||!object(a.raw)||Object.entries(a.raw).some(([k,v])=>!/^jee/i.test(k)||typeof v!=='string'))))throw Error('Invalid archived legacy records.');
    const events=new Set();for(const a of state.activity){if(!object(a)||typeof a.id!=='string'||events.has(a.id)||!day(a.date)||(a.topicId&&!ids.has(a.topicId))||(a.branchId&&!branches.has(a.branchId))||(a.subjectId&&!['physics','chemistry','mathematics'].includes(a.subjectId))||typeof a.kind!=='string'||typeof a.note!=='string')throw Error('Invalid study activity. Original records were not changed.');events.add(a.id)}
    for(const [id,children] of Object.entries(state.skillChildren)){if(!ids.has(id)||!Array.isArray(children)||children.length>1000)throw Error('Invalid skill breakdown.');const nodes=new Map();for(const child of children){if(!object(child)||typeof child.id!=='string'||nodes.has(child.id)||typeof child.name!=='string'||!child.name.trim()||child.name.length>120)throw Error('Invalid child skill.');nodes.set(child.id,child)}for(const child of children){let cursor=child,seen=new Set();while(cursor){if(seen.has(cursor.id)||seen.size>=12)throw Error('Skill hierarchy is cyclic or exceeds 12 refinement levels.');seen.add(cursor.id);if(cursor.parentId===null)break;cursor=nodes.get(cursor.parentId);if(!cursor)throw Error('Child skill parent is missing.')}}}
    return state;
  }
  function evaluate(attempt,result){
    const integrated=result.questions.length>=2&&result.questions.every(q=>q.challenging&&q.dependencies.includes(result.topicId)&&q.dependencies.length>=2)&&result.questions.some(q=>q.kind==='PYQ');
    const percentile=result.benchmark?100*result.benchmark.scores.filter(s=>s<result.score).length/result.benchmark.scores.length:null;
    const qualified=attempt.reviewed===true&&attempt.unaided&&integrated&&percentile!==null&&percentile>=99;
    return {qualified,percentile,integrated,reason:!attempt.reviewed?'Evidence review pending':!attempt.unaided?'Unaided attempt required':!integrated?'Integrated Advanced + PYQ evidence required':percentile===null?'Matching actual distribution required':percentile<99?'Below the 99th-equivalent threshold':'Meets locally reviewed 99th-equivalent threshold'};
  }
  function latest(state,id){let found=null;for(const attempt of state.attempts){const result=attempt.results.find(r=>r.topicId===id);if(result&&(!found||attempt.date>found.attempt.date||(attempt.date===found.attempt.date&&attempt.recordedAt>=found.attempt.recordedAt)))found={attempt,result}}return found?{...found,...evaluate(found.attempt,found.result)}:null}
  const stats=(state,topics)=>{const assessed=topics.map(t=>latest(state,t.id));return {total:topics.length,complete:assessed.filter(r=>r?.qualified).length,assessed:assessed.filter(Boolean).length,practice:topics.filter(t=>state.practice[t.id]||t.status==='Verified').length,percentage:topics.length?100*assessed.filter(r=>r?.qualified).length/topics.length:0}};
  function scopeActivity(state,topics,branchIds=[]){const ids=new Set(topics.map(t=>t.id));return state.activity.filter(a=>{if(a.topicId)return ids.has(a.topicId);if(a.branchId)return branchIds.includes(a.branchId);if(a.subjectId){const required=a.subjectId==='chemistry'?['organic','physical','inorganic']:[a.subjectId];return required.every(id=>branchIds.includes(id))}return ['physics','organic','physical','inorganic','mathematics'].every(id=>branchIds.includes(id))})}
  function historicalSeries(state,topics){const ids=new Set(topics.map(t=>t.id));const dates=[...new Set(state.attempts.filter(a=>a.results.some(r=>ids.has(r.topicId))).map(a=>a.date))].sort();return dates.map(date=>({date,remaining:stats({...state,attempts:state.attempts.filter(a=>a.date<=date)},topics).total-stats({...state,attempts:state.attempts.filter(a=>a.date<=date)},topics).complete}))}
  function plan(state,topics,target,capacity,now=today()){
    const pending=topics.filter(t=>!latest(state,t.id)?.qualified);const days=target?Math.max(0,daysBetween(now,target)+1):null;const pace=days===null?null:days===0?(pending.length?Infinity:0):pending.length/days;
    return {pending,days,pace,status:!pending.length?'Complete':days===null?'Target needed':days===0?'Overdue':pace>capacity?'Capacity gap':'Within capacity',deadlines:pending.map((t,i)=>({id:t.id,date:days>0?addDays(now,Math.min(days-1,Math.floor(i*days/pending.length))):null}))};
  }
  return {VERSION,STORE,BACKUP,organic,day,today,daysBetween,addDays,parse,readLegacy,load,save,escape,validateAttempt,validateWorkspace,evaluate,latest,stats,scopeActivity,historicalSeries,plan};
})();
if(typeof module!=='undefined')module.exports=TrackerCore;
