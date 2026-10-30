/**
 * Kihang Atlas: bound Google Sheets -> public GitHub Pages projection.
 * The private sheet never becomes public. No credentials are stored here.
 * Run previewAtlasSync first; configure GITHUB_FINE_GRAINED_TOKEN in Apps
 * Script Project Settings; run syncAtlasNow, then installDailyTrigger.
 */
const ATLAS_SYNC = Object.freeze({
  repo:'indisohari/kihang-atlas',path:'index.html',branch:'main',
  sourceTab:'13_개인여행_참고',approvedCount:324,autoRefreshCount:322,
  reviewBranch:'work/atlas-summary-review',
  headings:['지역권','장소·체험','여행 유형','저자 평가·경험','추천 이유(원문 기반)','현행 검증','원문 글 번호','원문 링크','상세 근거 위치','여행 결정 메모','세부 근거','방문·추천 구분','국가']
});
function atlasAssert_(test,description){if(!test)throw new Error('Atlas sync halted: '+description);}
function atlasText_(v){return String(v===null||v===undefined?'':v).trim();}
function atlasSafePublicField_(v,name){
 const text=atlasText_(v);
 atlasAssert_(text.length<=1500,name+' exceeds publication length');
 atlasAssert_(!/(?:https?:\/\/|docs\.google|notion\.|file-upload:|@|\b\d{2,3}[-. ]\d{3,4}[-. ]\d{4}\b)/i.test(text),name+' needs manual privacy review');
 atlasAssert_(!/(?:비공개|주민번호|연락처|개인전화|사유지 주소)/.test(text),name+' includes private markers');
 return text;
}
function atlasReadApprovedRows_(){
 const ss=SpreadsheetApp.getActiveSpreadsheet();
 atlasAssert_(!!ss,'script must be bound to the canonical Google Sheet');
 const sheet=ss.getSheetByName(ATLAS_SYNC.sourceTab);
 atlasAssert_(!!sheet,'source tab missing');
 atlasAssert_(sheet.getLastRow()>=ATLAS_SYNC.approvedCount+1,'approved rows missing');
 const headers=sheet.getRange(1,1,1,13).getDisplayValues()[0].map(atlasText_);
 atlasAssert_(JSON.stringify(headers)===JSON.stringify(ATLAS_SYNC.headings),'source header layout changed');
 return {records:sheet.getRange(2,1,ATLAS_SYNC.approvedCount,13).getDisplayValues(),pendingRows:Math.max(0,sheet.getLastRow()-ATLAS_SYNC.approvedCount-1)};
}
function atlasGithubRequest_(url,options){
 const response=UrlFetchApp.fetch(url,Object.assign({muteHttpExceptions:true,followRedirects:true},options||{}));
 const status=response.getResponseCode();
 atlasAssert_(status>=200&&status<300,'GitHub returned HTTP '+status);
 return JSON.parse(response.getContentText());
}
function atlasGetPublicFile_(ref){
 const url='https://api.github.com/repos/'+ATLAS_SYNC.repo+'/contents/'+ATLAS_SYNC.path+'?ref='+encodeURIComponent(ref||ATLAS_SYNC.branch);
 const headers={Accept:'application/vnd.github+json','X-GitHub-Api-Version':'2026-03-10'};
 const token=PropertiesService.getScriptProperties().getProperty('GITHUB_FINE_GRAINED_TOKEN');
 if(token)headers.Authorization='Bearer '+token;
 const result=atlasGithubRequest_(url,{method:'get',headers:headers});
 atlasAssert_(result.encoding==='base64'&&typeof result.content==='string'&&/^[0-9a-f]{40}$/i.test(result.sha),'unexpected GitHub file response');
 const bytes=Utilities.base64Decode(result.content.replace(/\s+/g,''));
 return {sha:result.sha,html:Utilities.newBlob(bytes).getDataAsString('UTF-8')};
}
function atlasBuildCandidate_(){
 const sheet=atlasReadApprovedRows_();
 const remote=atlasGetPublicFile_();
 const re=/(<script type="application\/json" id="atlasData">)([\s\S]*?)(<\/script>)/g;
 const found=[...remote.html.matchAll(re)];
 atlasAssert_(found.length===1,'public JSON block missing or duplicated');
 atlasAssert_(remote.html.includes('id="themeShortcuts"')&&remote.html.includes('id="search"'),'unexpected website version');
 atlasAssert_(!/(?:app\.notion\.com|docs\.google\.com|id="myTripData"|file-upload:\/\/)/i.test(remote.html),'private link found on public site');
 const payload=JSON.parse(found[0][2]);
 atlasAssert_(Array.isArray(payload.items)&&payload.items.length===ATLAS_SYNC.approvedCount,'approved record count changed');
 atlasAssert_(payload.items[322].article_id==='29'&&payload.items[323].article_id==='67','reviewed new records/order changed');
 let changes=0;const modified=[];
 const newItems=payload.items.map((item,i)=>{
   const row=sheet.records[i];
   [['region',0],['article_id',6],['article_url',7],['country',12]].forEach(([key,col])=>{
     atlasAssert_(atlasText_(row[col])===atlasText_(item[key]),'source row '+(i+2)+' '+key+' identity changed');
   });
   atlasAssert_(/^https:\/\/brunch\.co\.kr\/@gosisain\/\d+$/.test(item.article_url||''),'unapproved article URL');
   const isRedacted=item.article_id==='396'&&item.country==='몽골'&&item.place==='몽골 초원의 사적 목장 방문';
   if(isRedacted){
     atlasAssert_(atlasText_(row[1]).includes('목장'),'protected anonymous record changed');
     return item; // Never copy the private original name, relationship or notes.
   }
   // One reviewed public display name intentionally omits the old hotel name in the source.
   const expectedSourcePlace=item.article_id==='29'
     ?'The Empire Brunei(구 The Empire Hotel & Country Club)'
     :atlasText_(item.place);
   atlasAssert_(atlasText_(row[1])===expectedSourcePlace,'source row '+(i+2)+' place changed; manual place review required');
   atlasAssert_(atlasText_(row[2])===atlasText_(item.kind),'source row '+(i+2)+' original category changed');
   // The two newly approved records are public, but their descriptive fields require
   // individual editorial review; do not silently copy future private Sheet edits.
   if(i>=ATLAS_SYNC.autoRefreshCount)return item;
   const out=Object.assign({},item);
   [['author_assessment',3],['editorial_reason',4],['verification',5],['author_relation',11]].forEach(([key,col])=>{
     const v=atlasText_(row[col]);
     if(v!==atlasText_(item[key])){
       out[key]=atlasSafePublicField_(v,key+' row '+(i+2));
       changes++;modified.push(i+2);
     }
   });
   return out;
 });
 const next=Object.assign({},payload,{items:newItems});
 if(changes)next.sourceSyncDate=Utilities.formatDate(new Date(),'Asia/Seoul','yyyy-MM-dd');
 const serialized=JSON.stringify(next).replace(/</g,'\\u003c');
 const candidate=remote.html.replace(found[0][0],found[0][1]+serialized+found[0][3]);
 atlasAssert_(candidate.length<800000,'generated index too large');
 atlasAssert_(!/(?:app\.notion\.com|docs\.google\.com|file-upload:\/\/|id="myTripData")/i.test(candidate),'private content rejected');
 return {changes:changes,modified:[...new Set(modified)],pendingRows:sheet.pendingRows,sha:remote.sha,html:candidate};
}
function previewAtlasSync(){
 const x=atlasBuildCandidate_();
 const result={status:'preview',approvedRecords:324,autoRefreshRecords:322,manualReviewRecords:2,changedFields:x.changes,modifiedRowNumbers:x.modified,pendingNewRows:x.pendingRows};
 Logger.log(JSON.stringify(result));return result;
}
// No automated writes to main. Optional script-side staging is an explicit opt-in.
// The only permitted write target is a new review branch and a DRAFT pull request.
function atlasGithubHeaders_(token){
 const headers={Accept:'application/vnd.github+json','X-GitHub-Api-Version':'2026-03-10'};
 if(token)headers.Authorization='Bearer '+token;
 return headers;
}
function atlasEnsureReviewBranchAbsent_(token){
 const url='https://api.github.com/repos/'+ATLAS_SYNC.repo+'/git/ref/heads/'+ATLAS_SYNC.reviewBranch;
 const response=UrlFetchApp.fetch(url,{method:'get',muteHttpExceptions:true,headers:atlasGithubHeaders_(token)});
 const status=response.getResponseCode();
 atlasAssert_(status===404,'review branch already exists or branch lookup failed (HTTP '+status+')');
}
function syncAtlasNow(){
 const lock=LockService.getScriptLock();lock.waitLock(30000);
 try{
   const x=atlasBuildCandidate_(); // Safe preview and full 324-row identity gate first.
   if(!x.changes){const r={status:'no_changes',approvedRecords:324,pendingNewRows:x.pendingRows};Logger.log(JSON.stringify(r));return r;}
   const props=PropertiesService.getScriptProperties();
   atlasAssert_(props.getProperty('ATLAS_REVIEW_PR_SYNC_ENABLED')==='true','draft-PR staging not explicitly enabled');
   const token=props.getProperty('GITHUB_FINE_GRAINED_TOKEN');
   atlasAssert_(typeof token==='string'&&token.length>=20,'draft-PR token is not configured');
   const base='https://api.github.com/repos/'+ATLAS_SYNC.repo;
   const headers=atlasGithubHeaders_(token);
   // Never overwrite a prior pending writer or silently revise an already reviewed PR.
   const pulls=atlasGithubRequest_(base+'/pulls?state=open&head='+encodeURIComponent('indisohari:'+ATLAS_SYNC.reviewBranch)+'&base=main&per_page=10',{method:'get',headers:headers});
   atlasAssert_(Array.isArray(pulls),'unexpected pull request list');
   if(pulls.length){
     const r={status:'pending_review',url:pulls[0].html_url||'',changedFields:x.changes};
     Logger.log(JSON.stringify(r));return r;
   }
   atlasEnsureReviewBranchAbsent_(token);
   const main=atlasGithubRequest_(base+'/git/ref/heads/main',{method:'get',headers:headers});
   atlasAssert_(main&&main.object&&/^[0-9a-f]{40}$/i.test(main.object.sha),'invalid main commit ref');
   const pinned=atlasGetPublicFile_(main.object.sha);
   atlasAssert_(pinned.sha===x.sha,'main changed while preparing review: retry later');
   atlasGithubRequest_(base+'/git/refs',{method:'post',headers:headers,contentType:'application/json',
     payload:JSON.stringify({ref:'refs/heads/'+ATLAS_SYNC.reviewBranch,sha:main.object.sha})});
   const content=Utilities.base64Encode(Utilities.newBlob(x.html,'text/html').getBytes());
   atlasGithubRequest_(base+'/contents/'+ATLAS_SYNC.path,{method:'put',headers:headers,contentType:'application/json',
     payload:JSON.stringify({message:'Review selected public atlas summary updates',sha:x.sha,branch:ATLAS_SYNC.reviewBranch,content:content})});
   const pr=atlasGithubRequest_(base+'/pulls',{method:'post',headers:headers,contentType:'application/json',
     payload:JSON.stringify({title:'Review public atlas summary changes ('+x.changes+' fields)',
       head:ATLAS_SYNC.reviewBranch,base:'main',draft:true,maintainer_can_modify:false,
       body:'Draft only. '+x.changes+' vetted-source field differences from the original 322 refreshable rows. Human inspection and explicit approval required. No new destinations, private source links, coordinates or operator availability. Never auto-merge.'})});
   atlasAssert_(pr&&typeof pr.html_url==='string','GitHub draft PR creation unverified; inspect created review branch');
   const result={status:'draft_pr_created',url:pr.html_url,changedFields:x.changes,pendingNewRows:x.pendingRows};
   Logger.log(JSON.stringify(result));return result;
 }finally{lock.releaseLock();}
}
function installDailyTrigger(){
 const props=PropertiesService.getScriptProperties();
 atlasAssert_(props.getProperty('ATLAS_REVIEW_PR_SYNC_ENABLED')==='true','draft-PR staging not explicitly enabled');
 atlasAssert_((props.getProperty('GITHUB_FINE_GRAINED_TOKEN')||'').length>=20,'draft-PR token missing');
 ScriptApp.getProjectTriggers().filter(t=>t.getHandlerFunction()==='syncAtlasNow').forEach(t=>ScriptApp.deleteTrigger(t));
 ScriptApp.newTrigger('syncAtlasNow').timeBased().everyDays(1).atHour(9).inTimezone('Asia/Seoul').create();
 Logger.log('Atlas draft review PR trigger installed (Asia/Seoul). No automatic main commits.');
}
