const fs = require('fs');

const BROWSER_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.9'
};

async function fetchOnce(url, signal) {
  return fetch(url, { method: 'GET', redirect: 'follow', headers: BROWSER_HEADERS, signal });
}

async function checkLink(link) {
  for (let attempt = 0; attempt < 2; attempt++) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const res = await fetchOnce(link.url, controller.signal);
      clearTimeout(timeout);
      let category;
      if (res.status < 400) category = 'ok';
      else if (res.status === 403 || res.status === 429 || res.status === 999) category = 'blocked';
      else if (res.status === 404 || res.status === 410) category = 'not_found';
      else category = 'other_error';
      return { ...link, status: res.status, category };
    } catch (err) {
      clearTimeout(timeout);
      if (attempt === 0) { await new Promise(r => setTimeout(r, 1500)); continue; }
      return { ...link, status: null, category: 'network_error', error: err.message };
    }
  }
}

async function main() {
  const links = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
  const results = [];
  const concurrency = 6;
  let i = 0;
  async function worker() {
    while (i < links.length) {
      const link = links[i++];
      results.push(await checkLink(link));
      await new Promise(r => setTimeout(r, 250));
    }
  }
  await Promise.all(Array.from({ length: concurrency }, worker));

  const notFound = results.filter(r => r.category === 'not_found');
  const otherError = results.filter(r => r.category === 'other_error');
  const networkError = results.filter(r => r.category === 'network_error');
  const blocked = results.filter(r => r.category === 'blocked');

  fs.writeFileSync(process.argv[3] || 'results.json', JSON.stringify({
    checkedAt: new Date().toISOString(),
    total: results.length,
    confirmedBroken: [...notFound, ...otherError, ...networkError],
    blocked
  }, null, 2));

  console.log(`Checked ${results.length}. Confirmed broken: ${notFound.length + otherError.length + networkError.length}. Blocked (likely fine): ${blocked.length}.`);
}
main();
