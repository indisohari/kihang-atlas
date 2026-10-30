/**
 * Offline Atlas release regression tests. No npm dependencies, no GitHub writes.
 * Run: node tests/atlas_release.test.cjs
 * Fixtures derive only from existing publicly reviewed Atlas JSON. Private Sheet
 * columns I/J/K are synthetic placeholders and are never stored here.
 */
'use strict';
const fs=require('node:fs');
const path=require('node:path');
const assert=require('node:assert/strict');
const vm=require('node:vm');
const root=path.resolve(__dirname,'..');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const gs=fs.readFileSync(path.join(root,'automation/Code.gs'),'utf8');
const token='<script type="application/json" id="atlasData">';
const begin=html.indexOf(token),end=html.indexOf('</script>',begin);
assert(begin>=0&&end>begin,'Atlas JSON present exactly once');
assert.equal(html.indexOf(token,begin+1),-1,'No duplicate Atlas JSON');
const data=JSON.parse(html.slice(begin+token.length,end));
const fixtureHeaders=['지역권','장소·체험','여행 유형','저자 평가·경험','추천 이유(원문 기반)','현행 검증','원문 글 번호','원문 링크','상세 근거 위치','여행 결정 메모','세부 근거','방문·추천 구분','국가'];
const fakeSha='a'.repeat(40),fakeCommit='b'.repeat(40);
function mock(options={}){
 const rows=data.items.map(x=>[
  x.region,x.place,x.kind,x.author_assessment,x.editorial_reason,x.verification,
  x.article_id,x.article_url,'PRIVATE_REFERENCE_NOT_USED',
  'PRIVATE_TRAVEL_NOTE_NOT_USED','PRIVATE_SOURCE_NOT_USED',x.author_relation,x.country
 ]);
 rows[322][1]=options.alias?'Unreviewed alternative name':'The Empire Brunei(구 The Empire Hotel & Country Club)';
 const ranch=data.items.findIndex(x=>x.article_id==='396');
 assert(ranch>=0,'Protected record exists');
 rows[ranch][1]='MOCK_PROTECTED_목장_원문_값';
 if(options.change)rows[0][3]=options.unsafe?'https://example.com/private':'Source review: safe historical note';
 if(options.privateMarker)rows[0][4]='비공개 관계자 주소';
 if(options.location)rows[323][0]='Different unreviewed town';
 if(options.kind)rows[323][2]='역사·문화';
 const sourceHtml=options.oldPublic?html.replace(token+html.slice(begin+token.length,end),token+JSON.stringify({...data,items:data.items.slice(0,322)})):html;
 const calls=[],responses=(code,body)=>({getResponseCode:()=>code,getContentText:()=>JSON.stringify(body)});
 const sheet={getLastRow:()=>325+(options.pending||0),getRange:(r,c,n,cols)=>({getDisplayValues:()=>r===1?[fixtureHeaders]:rows})};
 const fetch=(url,optionsHttp={})=>{
  const method=(optionsHttp.method||'get').toLowerCase();
  calls.push({method,url,body:optionsHttp.payload?JSON.parse(optionsHttp.payload):null});
  if(url.includes('/pulls?'))return responses(200,options.pullOpen?[{html_url:'https://github.com/indisohari/kihang-atlas/pull/999'}]:[]);
  if(url.endsWith('/git/ref/heads/work/atlas-summary-review'))return responses(options.branchExists?200:404,{});
  if(url.endsWith('/git/ref/heads/main'))return responses(200,{object:{sha:fakeCommit}});
  if(url.includes('/contents/index.html?ref='))return responses(200,{encoding:'base64',content:Buffer.from(sourceHtml).toString('base64'),sha:fakeSha});
  if(method==='post'&&url.endsWith('/git/refs'))return responses(201,{ref:'refs/heads/work/atlas-summary-review'});
  if(method==='put'&&url.endsWith('/contents/index.html'))return responses(200,{commit:{sha:fakeCommit}});
  if(method==='post'&&url.endsWith('/pulls'))return responses(201,{html_url:'https://github.com/indisohari/kihang-atlas/pull/1000'});
  throw Error('Unmocked HTTP '+method+' '+url);
 };
 const props={getProperty:key=>key==='ATLAS_REVIEW_PR_SYNC_ENABLED'?(options.optin?'true':null):key==='GITHUB_FINE_GRAINED_TOKEN'?(options.auth?'T'.repeat(40):null):null};
 const ctx={
  SpreadsheetApp:{getActiveSpreadsheet:()=>({getSheetByName:()=>sheet})},
  UrlFetchApp:{fetch},
  Utilities:{
   base64Decode:v=>Buffer.from(v,'base64'),base64Encode:v=>Buffer.from(v).toString('base64'),
   newBlob:v=>({getDataAsString:()=>Buffer.from(v).toString('utf8'),getBytes:()=>Buffer.from(v)}),
   formatDate:()=>'2026-10-30'
  },
  PropertiesService:{getScriptProperties:()=>props},
  Logger:{log:()=>{}},
  LockService:{getScriptLock:()=>({waitLock:()=>{},releaseLock:()=>{}})},
  ScriptApp:{getProjectTriggers:()=>[],deleteTrigger:()=>{},newTrigger:()=>({
   timeBased(){return this},everyDays(){return this},atHour(){return this},
   inTimezone(){return this},create(){return {}}
  })}
 };
 vm.createContext(ctx);vm.runInContext(gs,ctx,{timeout:3000,filename:'automation/Code.gs'});
 return{
  run(name='previewAtlasSync'){return vm.runInContext(name+'()',ctx,{timeout:6000})},
  calls,writes(){return calls.filter(x=>x.method!=='get')}
 };
}
const results=[];
function test(name,fn){try{fn();results.push({name,status:'PASS'})}catch(e){results.push({name,status:'FAIL',error:String(e.message||e)});}}
test('full-source count & original URLs',()=>{
 assert.equal(data.items.length,324);assert.equal(new Set(data.items.map(x=>x.article_url)).size,180);
 assert.equal(new Set(data.items.map(x=>x.country)).size,51);
 assert.equal(data.items.filter(x=>x.country==='한국').length,141);
 assert.deepEqual(data.items.slice(-2).map(x=>x.article_id),['29','67']);
});
test('public redaction, link safety and country map',()=>{
 const ranch=data.items.find(x=>x.article_id==='396');
 assert.equal(ranch.place,'몽골 초원의 사적 목장 방문');
 assert(html.includes('data-country="브루나이"'));
 assert(!/docs\.google\.com\/spreadsheets\/d\/|app\.notion\.com|GITHUB_FINE_GRAINED_TOKEN\s*=/.test(html));
 for(const [i,x] of data.items.entries()){
  assert(/^https:\/\/brunch\.co\.kr\/@gosisain\/\d+$/.test(x.article_url));
  assert((x.related_record_indices||[]).every(j=>Number.isInteger(j)&&j>=0&&j<324),'relation '+i);
 }
});
test('production inline JavaScript parses',()=>{const chunks=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)];assert(chunks.length>0);chunks.forEach((x,i)=>new vm.Script(x[1],{filename:'inline-'+i+'.js'}));});
test('safe 324 source preview is a no-op',()=>{const f=mock(),r=f.run();assert.equal(r.approvedRecords,324);assert.equal(r.autoRefreshRecords,322);assert.equal(r.manualReviewRecords,2);assert.equal(r.changedFields,0);assert.equal(r.pendingNewRows,0);assert.equal(f.writes().length,0);});
test('one unapproved new Sheet row stays pending',()=>{const r=mock({pending:1}).run();assert.equal(r.pendingNewRows,1);assert.equal(r.approvedRecords,324);});
test('safe legacy summary change yields preview only',()=>{const f=mock({change:true}),r=f.run();assert.equal(r.changedFields,1);assert.equal(f.writes().length,0);});
test('private source URL cannot cross into public summary',()=>{assert.throws(()=>mock({change:true,unsafe:true}).run(),/privacy review/);});
test('private label cannot cross into public summary',()=>{assert.throws(()=>mock({privateMarker:true}).run(),/private markers/);});
test('The Empire reviewed source name alias is exact',()=>{assert.throws(()=>mock({alias:true}).run(),/place changed/);});
test('LEGOLAND region/category change halts staging',()=>{assert.throws(()=>mock({location:true}).run(),/identity changed/);assert.throws(()=>mock({kind:true}).run(),/category changed/);});
test('legacy 322 public index fails closed',()=>{assert.throws(()=>mock({oldPublic:true}).run(),/approved record count changed/);});
test('no-op sync never uses GitHub write even without credentials',()=>{const f=mock(),r=f.run('syncAtlasNow');assert.equal(r.status,'no_changes');assert.equal(f.writes().length,0);});
test('staging requires explicit owner-controlled opt-in',()=>{const f=mock({change:true,auth:true});assert.throws(()=>f.run('syncAtlasNow'),/not explicitly enabled/);assert.equal(f.writes().length,0);});
test('staging requires token',()=>{const f=mock({change:true,optin:true});assert.throws(()=>f.run('syncAtlasNow'),/token is not configured/);assert.equal(f.writes().length,0);});
test('existing pending PR prevents overwrite',()=>{const f=mock({change:true,optin:true,auth:true,pullOpen:true}),r=f.run('syncAtlasNow');assert.equal(r.status,'pending_review');assert.equal(f.writes().length,0);});
test('orphan review branch prevents overwrite',()=>{const f=mock({change:true,optin:true,auth:true,branchExists:true});assert.throws(()=>f.run('syncAtlasNow'),/review branch already exists/);assert.equal(f.writes().length,0);});
test('approved staging creates draft PR only, never main',()=>{
 const f=mock({change:true,optin:true,auth:true}),r=f.run('syncAtlasNow'),w=f.writes();
 assert.equal(r.status,'draft_pr_created');assert.equal(w.length,3);
 assert(w.some(x=>x.method==='post'&&x.url.endsWith('/pulls')&&x.body.draft===true));
 assert(w.some(x=>x.method==='put'&&x.body.branch==='work/atlas-summary-review'));
 assert(w.every(x=>x.body?.branch!=='main'));
});
test('trigger needs owner-controlled opt-in',()=>{assert.throws(()=>mock().run('installDailyTrigger'),/not explicitly enabled/);});
test('trigger needs token even after opt-in',()=>{assert.throws(()=>mock({optin:true}).run('installDailyTrigger'),/token missing/);});
const failures=results.filter(x=>x.status!=='PASS');
console.log(JSON.stringify({tests:results.length,passed:results.length-failures.length,failed:failures.length,failures}));
if(failures.length)process.exitCode=1;
