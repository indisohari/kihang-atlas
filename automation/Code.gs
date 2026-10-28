/**
 * Kihang Atlas: bound Google Sheets -> public GitHub Pages projection.
 * The private sheet never becomes public. No credentials are stored here.
 * Run previewAtlasSync first; configure GITHUB_FINE_GRAINED_TOKEN in Apps
 * Script Project Settings; run syncAtlasNow, then installDailyTrigger.
 */
const ATLAS_SYNC = Object.freeze({
  repo:'indisohari/kihang-atlas',path:'index.html',branch:'main',
  sourceTab:'13_개인여행_참고',approvedCount:322,
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
 atlasAssert_(sheet.getLastRow()>=323,'approved rows missing');
 const headers=sheet.getRange(1,1,1,13).getDisplayValues()[0].map(atlasText_);
 atlasAssert_(JSON.stringify(headers)===JSON.stringify(ATLAS_SYNC.headings),'source header layout changed');
 return {records:sheet.getRange(2,1,322,13).getDisplayValues(),pendingRows:Math.max(0,sheet.getLastRow()-323)};
}
function atlasGithubRequest_(url,options){
 const response=UrlFetchApp.fetch(url,Object.assign({muteHttpExceptions:true,followRedirects:true},options||{}));
 const status=response.getResponseCode();
 atlasAssert_(status>=200&&status<300,'GitHub returned HTTP '+status);
 return JSON.parse(response.getContentText());
}
function atlasGetPublicFile_(){
 const url='https://api.github.com/repos/'+ATLAS_SYNC.repo+'/contents/'+ATLAS_SYNC.path+'?ref='+ATLAS_SYNC.branch;
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
 atlasAssert_(Array.isArray(payload.items)&&payload.items.length===322,'approved record count changed');
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
     return item; // Never copy the private original place, relationship or notes.
   }
   atlasAssert_(atlasText_(row[1])===atlasText_(item.place),'source row '+(i+2)+' place changed; manual taxonomy review needed');
   const out=Object.assign({},item);
   [['kind',2],['author_assessment',3],['editorial_reason',4],['verification',5],['author_relation',11]].forEach(([key,col])=>{
     const v=atlasText_(row[col]);
     if(v!==atlasText_(item[key])){
       out[key]=atlasSafePublicField_(v,key+' row '+(i+2));
       if(key==='kind')atlasAssert_(['자연·걷기','도시·생활','역사·문화','음식·주류','숙박·온천'].includes(v),'unknown type');
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
 const result={status:'preview',approvedRecords:322,changedFields:x.changes,modifiedRowNumbers:x.modified,pendingNewRows:x.pendingRows};
 Logger.log(JSON.stringify(result));return result;
}
function syncAtlasNow(){
 const lock=LockService.getScriptLock();lock.waitLock(30000);
 try{
   const x=atlasBuildCandidate_();
   if(!x.changes){const r={status:'no_changes',pendingNewRows:x.pendingRows};Logger.log(JSON.stringify(r));return r;}
   const token=PropertiesService.getScriptProperties().getProperty('GITHUB_FINE_GRAINED_TOKEN');
   atlasAssert_(typeof token==='string'&&token.length>=20,'GITHUB_FINE_GRAINED_TOKEN is not configured');
   const url='https://api.github.com/repos/'+ATLAS_SYNC.repo+'/contents/'+ATLAS_SYNC.path;
   const body={message:'Sync approved public atlas source fields ('+x.changes+' changes)',sha:x.sha,branch:'main',content:Utilities.base64Encode(Utilities.newBlob(x.html,'text/html').getBytes())};
   const r=atlasGithubRequest_(url,{method:'put',contentType:'application/json',
     headers:{Authorization:'Bearer '+token,Accept:'application/vnd.github+json','X-GitHub-Api-Version':'2026-03-10'},payload:JSON.stringify(body)});
   const result={status:'committed',commit:r.commit&&r.commit.sha||'',changedFields:x.changes,pendingNewRows:x.pendingRows};
   Logger.log(JSON.stringify(result));return result;
 }finally{lock.releaseLock();}
}
function installDailyTrigger(){
 ScriptApp.getProjectTriggers().filter(t=>t.getHandlerFunction()==='syncAtlasNow').forEach(t=>ScriptApp.deleteTrigger(t));
 ScriptApp.newTrigger('syncAtlasNow').timeBased().everyDays(1).atHour(9).inTimezone('Asia/Seoul').create();
 Logger.log('Kihang Atlas daily trigger installed (Asia/Seoul)');
}