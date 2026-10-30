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
    page.on('pageerror', error => errors.push(String(error)));
    await page.goto(pathToFileURL(indexPath).href, { waitUntil: 'load' });
    await count(page, 324, 'initial count');

    const mappedCountries = await page.locator('path.recorded[data-country]').evaluateAll(els =>
      [...new Set(els.map(el => el.getAttribute('data-country')))]);
    ok(mappedCountries.length, 50, 'selectable map country count');
    for (const country of mappedCountries) {
      const expected = items.filter(i => i.country === country).length;
      const pathSelector = 'path.recorded[data-country="' + country.replace(/"/g, '\\"') + '"]';
      await page.locator(pathSelector).first().focus();
      await page.keyboard.press('Enter');
      await count(page, expected, 'keyboard country: ' + country);
    }
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
    await page.locator('#search').fill(ranch.place);
    await count(page, 1, 'private ranch search');
    await page.locator('#cards button.story-card').first().click();
    ok(await page.locator('#detail a[href*="google.com/maps/search"]').count(), 0, 'protected location is not pinned');
    await page.keyboard.press('Escape');
    await reset(page);

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

    for (const width of [320, 390, 768, 1365]) {
      await page.setViewportSize({ width, height: 820 });
      const geometry = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        width: document.documentElement.clientWidth
      }));
      assert(geometry.scrollWidth <= geometry.width + 2,
        'horizontal overflow at ' + width + ': ' + JSON.stringify(geometry));
      checks++;
    }
    ok(errors.length, 0, 'browser JavaScript page errors: ' + errors.join(' | '));
    console.log(JSON.stringify({ status: 'PASS', checks, responsiveWidths: [320,390,768,1365], countries: mappedCountries.length, placeTypes: placeTypes.length, editorialTypes: editorialTypes.length, seasons: seasons.length }));
  } finally {
    await browser.close();
  }
}
main().catch(e => { console.error(e); process.exitCode = 1; });
