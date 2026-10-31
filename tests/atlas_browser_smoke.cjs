/**
 * Zero-write browser regression against local public index.html.
 * Run after installing playwright and its Chromium browser.
 */
'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { chromium } = require('playwright');

const indexPath = path.join(__dirname, '..', 'index.html');
const html = fs.readFileSync(indexPath, 'utf8');
const marker = '<script type="application/json" id="atlasData">';
const start = html.indexOf(marker);
const end = html.indexOf('</script>', start);
assert(start >= 0 && end > start, 'single public source payload');
const data = JSON.parse(html.slice(start + marker.length, end));
const items = data.items;
let checks = 0;
function ok(actual, expected, label) {
  assert.equal(actual, expected, label);
  checks++;
}

function isMapDestination(link) {
 const label=String(link.label||'');
 if(/지도|길찾기|map(s)?|directions/i.test(label))return true;
 let url;
 try { url=new URL(link.href); } catch { return false; }
 const host=url.hostname.toLowerCase(), route=(url.pathname+url.search+url.hash).toLowerCase();
 if(host==='maps.app.goo.gl'||host==='naver.me'||host==='kko.to')return true;
 if(/(^|\.)google\.[a-z.]+$/.test(host)&&(host.startsWith('maps.')||route.startsWith('/maps')))return true;
 if(host==='map.naver.com'||host==='maps.naver.com'||host==='map.kakao.com'||host==='place.map.kakao.com')return true;
 if(host==='www.openstreetmap.org'||host==='openstreetmap.org'||host==='www.mapbox.com')return true;
 return /(^|[./-])(maps?|directions)([./?=#-]|$)/.test(host+route);
}
async function detailMapLinks(page) {
 const links=await page.locator('#detail a[href]').evaluateAll(els=>
  els.map(el=>({href:el.href,label:el.textContent||''})));
 return links.filter(isMapDestination);
}
async function visibleCardIndices(page) {
 return page.locator('#cards button.story-card').evaluateAll(els=>els.map(el=>Number(el.dataset.index)));
}
async function allCardIndices(page) {
 const indices=[];
 for(let pageNumber=0;pageNumber<60;pageNumber++) {
  indices.push(...await visibleCardIndices(page));
  if(await page.locator('#nextPage').isDisabled())return indices;
  await page.locator('#nextPage').click();
 }
 throw Error('Pagination did not terminate within 60 pages');
}

async function count(page, expected, label) {
  const value = (await page.locator('#resultCount').innerText()).replace(/,/g, '').trim();
  ok(value, expected + '\uAC74', label);
}
async function reset(page) {
  await page.locator('#clearFilters').click();
  await count(page, 324, 'reset count');
}
async function main() {
  ok(items.length, 324, 'record count');
  ok(new Set(items.map(i => i.article_url)).size, 180, 'original URL count');
  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 1365, height: 900 }, reducedMotion: 'reduce' });
    const errors = [];
    const consoleErrors = [];
    page.on('pageerror', error => errors.push(String(error)));
    page.on('console', message => { if(message.type()==='error') consoleErrors.push(message.text()); });
    await page.goto(pathToFileURL(indexPath).href, { waitUntil: 'load' });
    await count(page, 324, 'initial count');

    const mappedCountries = await page.locator('path.recorded[data-country]').evaluateAll(els =>
      [...new Set(els.map(el => el.getAttribute('data-country')))]);
    ok(mappedCountries.length, 50, 'selectable map country count');
    const countryRecordSets=new Map();
    await page.locator('#moreCountries').click();
    for (const country of mappedCountries) {
      const expectedIndices=items.map((item,i)=>item.country===country?i:-1).filter(i=>i>=0);
      const expected=expectedIndices.length;
      const pathSelector='path.recorded[data-country="' + country.replace(/"/g,'\\"') + '"]';
      await page.locator(pathSelector).first().focus();
      await page.keyboard.press('Enter');
      await count(page, expected, 'keyboard country: ' + country);
      ok(await page.locator('#countryList button[data-country="' + country.replace(/"/g,'\\"') + '"]').getAttribute('aria-pressed'),
        'true','country pressed state: ' + country);
      ok((await page.locator('#placePath button[aria-current="location"]').innerText()).trim(),country,'country breadcrumb: ' + country);
      ok((await page.locator('#selectedTitle').innerText()).startsWith(country+','),true,'country heading: ' + country);
      const rendered=await allCardIndices(page);
      assert.deepEqual(rendered,expectedIndices,'source record IDs for '+country);
      checks++;
      countryRecordSets.set(country,rendered);
    }
    const equalCountPair=mappedCountries.flatMap((c,i)=>
      mappedCountries.slice(i+1).filter(d=>countryRecordSets.get(c).length===countryRecordSets.get(d).length).map(d=>[c,d]))[0];
    assert(equalCountPair,'fixture must contain countries with equal result counts');
    const [firstCountry,secondCountry]=equalCountPair;
    const selectorFor=c=>'path.recorded[data-country="' + c.replace(/"/g,'\\"') + '"]';
    await page.locator(selectorFor(firstCountry)).first().dispatchEvent('click');
    await count(page,countryRecordSets.get(firstCountry).length,'SVG click first same-count country');
    await page.locator(selectorFor(secondCountry)).first().focus();
    await page.keyboard.press('Space');
    await count(page,countryRecordSets.get(secondCountry).length,'SVG Space second same-count country');
    ok(await page.locator('#placePath button[aria-current="location"]').innerText(),secondCountry,'same-count breadcrumb transition');
    ok(await page.locator('#countryList button[data-country="' + secondCountry.replace(/"/g,'\\"') + '"]').getAttribute('aria-pressed'),
      'true','same-count pressed transition');
    assert.notDeepEqual(countryRecordSets.get(firstCountry),countryRecordSets.get(secondCountry),'equal-count countries have distinct source IDs');
    checks++;
    await reset(page);

    const placeTypes = await page.locator('#spotCategory option').evaluateAll(xs => xs.map(x => x.value).filter(Boolean));
    ok(placeTypes.length, 12, 'place type choices');
    for (const type of placeTypes) {
      await page.locator('#spotCategory').selectOption(type);
      await count(page, items.filter(i => i.place_type === type).length, 'place type: ' + type);
    }
    await reset(page);

    const editorialTypes = await page.locator('#category option').evaluateAll(xs => xs.map(x => x.value).filter(Boolean));
    ok(editorialTypes.length, 5, 'original editorial categories');
    for (const kind of editorialTypes) {
      await page.locator('#category').selectOption(kind);
      await count(page, items.filter(i => i.kind === kind).length, 'editorial category: ' + kind);
    }
    await reset(page);

    const seasons = await page.locator('#season option').evaluateAll(xs => xs.map(x => x.value).filter(Boolean));
    ok(seasons.length, 8, 'season facet choices');
    for (const value of seasons) {
      const [source, season] = value.split(':');
      const expected = items.filter(i => source === 'verified'
        ? i.verified_seasons?.some(x => x.season === season)
        : i.source_seasons?.includes(season)).length;
      await page.locator('#season').selectOption(value);
      await count(page, expected, 'season facet: ' + value);
    }
    await reset(page);

    await page.locator('#search').fill('The Empire Brunei');
    await count(page, 1, 'Brunei search');
    const bruneiCard = page.locator('#cards button.story-card').first();
    assert.match(await bruneiCard.innerText(), /The Empire Brunei/);
    checks++;
    await bruneiCard.click();
    ok(await page.locator('#detail').isVisible(), true, 'Brunei modal visible');
    ok(await page.locator('#detail a[href="https://brunch.co.kr/@gosisain/29"]').count() > 0, true, 'Brunei original essay link');
    ok(await page.locator('#detail a[href*="theempirebrunei.com"]').count() > 0, true, 'Brunei authority link');
    await page.keyboard.press('Escape');
    ok(await page.locator('#detail').isVisible(), false, 'Escape closes modal');
    ok(await page.evaluate(() => document.activeElement?.matches('#cards button.story-card') || false), true, 'focus returns to card');
    await reset(page);

    await page.locator('#search').fill('LEGOLAND');
    await count(page, 1, 'LEGOLAND search');
    await page.locator('#cards button.story-card').first().click();
    ok(await page.locator('#detail a[href="https://brunch.co.kr/@gosisain/67"]').count() > 0, true, 'LEGOLAND original essay link');
    await page.keyboard.press('Escape');
    await reset(page);

    const ranch = items.find(i => i.article_id === '396' && i.place.includes('\uBABD\uACE8'));
    assert(ranch, 'protected record exists');
    ok(ranch.place,'몽골 초원의 사적 목장 방문','ranch anonymous public label');
    for(const href of [
      'https://www.google.com/maps/search/?api=1&query=synthetic',
      'https://maps.google.com/?q=synthetic','https://maps.app.goo.gl/example',
      'https://map.naver.com/p/search/synthetic','https://naver.me/example',
      'https://map.kakao.com/?q=synthetic','https://place.map.kakao.com/12345',
      'https://kko.to/example','https://www.openstreetmap.org/#map=13/0/0'
    ])ok(isMapDestination({href,label:''}),true,'map provider detection: '+href);
    await page.locator('#search').fill(ranch.place);
    await count(page, 1, 'private ranch search');
    await page.locator('#cards button.story-card').first().click();
    ok((await page.locator('#detailTitle').innerText()).trim(),ranch.place,'protected title');
    ok((await detailMapLinks(page)).length,0,'no public map provider/deep link for private ranch');
    await page.evaluate(()=>{
      const probe=document.createElement('a');
      probe.id='synthetic-map-link-probe';probe.href='https://map.naver.com/p/search/SYNTHETIC';
      probe.textContent='네이버 지도';
      document.querySelector('#detail .detail-refs').appendChild(probe);
    });
    ok((await detailMapLinks(page)).length,1,'injected alternate-provider privacy leak is detected');
    await page.locator('#synthetic-map-link-probe').evaluate(el=>el.remove());
    ok((await detailMapLinks(page)).length,0,'injected link removed');
    await page.keyboard.press('Escape');
    await reset(page);

    // In-memory geo-status mutation: no real address, coordinates or public row is changed.
    const syntheticPayload=structuredClone(data);
    const syntheticRanch=syntheticPayload.items.find(i=>i.article_id==='396');
    syntheticRanch.geo_review={...syntheticRanch.geo_review,status:'verified_admin',
      regions:['SYNTHETIC REGION'],localities:['SYNTHETIC LOCALITY']};
    syntheticRanch.map_search_query='SYNTHETIC NONPUBLIC TEST PLACE';
    const syntheticHtml=html.slice(0,start+marker.length)+JSON.stringify(syntheticPayload)+html.slice(end);
    const syntheticPage=await browser.newPage({viewport:{width:390,height:820}});
    await syntheticPage.setContent(syntheticHtml,{waitUntil:'load'});
    await syntheticPage.locator('#search').fill(ranch.place);
    await syntheticPage.locator('#cards button.story-card').first().click();
    ok((await detailMapLinks(syntheticPage)).length,0,'protected #396 remains unlinked after geo verification promotion');
    await syntheticPage.close();

    // Demonstrate that the privacy assertion catches removal of the explicit #396 guard.
    const unsafeHtml=syntheticHtml.replace("||item.article_id==='396'",'');
    assert.notEqual(unsafeHtml,syntheticHtml,'guard mutation fixture must alter app source');
    const unsafePage=await browser.newPage({viewport:{width:390,height:820}});
    await unsafePage.setContent(unsafeHtml,{waitUntil:'load'});
    await unsafePage.locator('#search').fill(ranch.place);
    await unsafePage.locator('#cards button.story-card').first().click();
    ok((await detailMapLinks(unsafePage)).length>0,true,
      'mutated guard exposes a synthetic map URL, proving the regression test can catch it');
    await unsafePage.close();

    const linkedIsland = items.find(i => i.article_id === '283' && i.place === '\uC5F0\uD64D\uB3C4');
    assert(linkedIsland, 'island record exists');
    await page.locator('#search').fill(linkedIsland.place);
    await count(page, 2, 'related island source observations');
    await page.locator('#cards button.story-card').filter({ hasText: '#283' }).first().click();
    ok(await page.locator('#detail button[data-related-index]').count() > 0, true, 'related original source link');
    await page.keyboard.press('Escape');
    await reset(page);

    await page.locator('#spotCategory').selectOption('stay');
    await count(page, 21, 'lodging facet');
    await reset(page);
    await page.locator('#category').selectOption('\uC219\uBC15\u00B7\uC628\uCC9C');
    await count(page, 25, 'original lodging theme');
    await reset(page);

    // Independent combinations: a known hit, a guaranteed empty intersection, reset,
    // a source-evidence season intersection and pagination changes.
    await page.locator('#search').fill('The Empire Brunei');
    await page.locator('#spotCategory').selectOption('stay');
    await page.locator('#category').selectOption('숙박·온천');
    await count(page,1,'combined country-independent search / type / editorial kind');
    await page.locator('#season').selectOption('verified:겨울');
    await count(page,0,'verified winter excludes a source with no verified season');
    ok(await page.locator('#emptyReset').count(),1,'empty result exposes reset');
    await page.locator('#emptyReset').click();
    await count(page,324,'empty result reset restores all observations');
    ok(await page.locator('#search').inputValue(),'','empty reset clears search');
    ok(await page.locator('#spotCategory').inputValue(),'','empty reset clears place type');
    ok(await page.locator('#category').inputValue(),'','empty reset clears kind');
    ok(await page.locator('#season').inputValue(),'','empty reset clears season');
    await page.locator('path.recorded[data-country="일본"]').first().dispatchEvent('click');
    await page.locator('#spotCategory').selectOption('nature');
    await page.locator('#category').selectOption('자연·걷기');
    await page.locator('#season').selectOption('mentioned:봄');
    const japanNatureSpring=items.filter(i=>i.country==='일본'&&i.place_type==='nature'
      &&i.kind==='자연·걷기'&&i.source_seasons?.includes('봄')).length;
    await count(page,japanNatureSpring,'country + place + editorial + source season intersection');
    await reset(page);

    const firstPage=await visibleCardIndices(page);
    await page.locator('#nextPage').click();
    ok((await page.locator('#pageInfo').innerText()).trim(),'2 / '+Math.ceil(items.length/6),
      'next page updates pager');
    assert.notDeepEqual(await visibleCardIndices(page),firstPage,'next page must change source IDs');
    checks++;
    await page.locator('#search').fill('The Empire Brunei');
    await count(page,1,'search after pagination');
    ok((await page.locator('#pageInfo').innerText()).trim(),'1 / 1',
      'search returns pagination to first page');
    await reset(page);

    for (const width of [320, 390, 768, 1365]) {
      await page.setViewportSize({ width, height: 820 });
      const geometry = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        width: document.documentElement.clientWidth
      }));
      assert(geometry.scrollWidth <= geometry.width + 2,
        'horizontal overflow at ' + width + ': ' + JSON.stringify(geometry));
      checks++;
      if(width===320||width===390){
        await page.locator('#search').fill('The Empire Brunei');
        const opener=page.locator('#cards button.story-card').first();
        await opener.click();
        ok(await page.locator('#detail').isVisible(),true,'mobile dialog visible at '+width);
        const measures=await page.locator('#detail').evaluate(el=>{
          const rect=el.getBoundingClientRect(),title=el.querySelector('h2'),
            close=el.querySelector('#closeDetail').getBoundingClientRect();
          return {left:rect.left,right:rect.right,bottom:rect.bottom,top:rect.top,
            panelOverflow:el.scrollWidth-el.clientWidth,titleOverflow:title.scrollWidth-title.clientWidth,
            pageOverflow:document.documentElement.scrollWidth-document.documentElement.clientWidth,
            closeHeight:close.height,closeWidth:close.width,scrollStyle:getComputedStyle(el).overflowY};
        });
        ok(measures.left>=-1&&measures.right<=width+1&&measures.top>=-1&&measures.bottom<=821,true,
          'mobile popup bounds at '+width+': '+JSON.stringify(measures));
        ok(measures.panelOverflow<=2&&measures.titleOverflow<=2&&measures.pageOverflow<=2,true,
          'mobile popup/content horizontal overflow at '+width+': '+JSON.stringify(measures));
        ok(measures.scrollStyle,'auto','dialog must scroll instead of clipping body at '+width);
        ok(measures.closeHeight>=44&&measures.closeWidth>=44,true,'mobile close hit area at '+width);
        ok((await page.locator('#closeDetail').innerText()).includes('닫기'),true,'close accessible name at '+width);
        ok(await page.evaluate(()=>document.activeElement?.id),'detail','initial dialog focus at '+width);
        await page.locator('#closeDetail').focus();
        await page.keyboard.press('Shift+Tab');
        ok(await page.evaluate(()=>Boolean(document.activeElement?.closest('#detail'))),true,
          'reverse Tab stays in dialog at '+width);
        await page.locator('#detail a[href]').last().focus();
        await page.keyboard.press('Tab');
        ok(await page.evaluate(()=>document.activeElement?.id),'closeDetail','Tab wraps to close at '+width);
        await page.keyboard.press('Escape');
        ok(await page.locator('#detail').isVisible(),false,'Escape dismisses mobile dialog at '+width);
        ok(await opener.evaluate(el=>document.activeElement===el),true,'mobile focus returns to opener at '+width);
        await reset(page);
      }
    }
    ok(errors.length, 0, 'browser JavaScript page errors: ' + errors.join(' | '));
    ok(consoleErrors.length, 0, 'browser console errors: ' + consoleErrors.join(' | '));
    console.log(JSON.stringify({ status: 'PASS', checks, responsiveWidths: [320,390,768,1365], countries: mappedCountries.length, placeTypes: placeTypes.length, editorialTypes: editorialTypes.length, seasons: seasons.length }));
  } finally {
    await browser.close();
  }
}
main().catch(e => { console.error(e); process.exitCode = 1; });
