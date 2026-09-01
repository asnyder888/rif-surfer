const fs = require('fs');

async function checkLink(link) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  try {
    // Try HEAD first (cheaper); fall back to GET since some servers reject HEAD.
    let res = await fetch(link.url, { method: 'HEAD', redirect: 'follow', signal: controller.signal });
    if (res.status >= 400) {
      res = await fetch(link.url, { method: 'GET', redirect: 'follow', signal: controller.signal });
    }
    clearTimeout(timeout);
    return { ...link, status: res.status, ok: res.status < 400 };
  } catch (err) {
    clearTimeout(timeout);
    return { ...link, status: null, ok: false, error: err.message };
  }
}

async function main() {
  const links = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
  const results = [];
  // Run a handful concurrently rather than all 177 at once, to be a polite crawler.
  const concurrency = 8;
  let i = 0;
  async function worker() {
    while (i < links.length) {
      const link = links[i++];
      results.push(await checkLink(link));
    }
  }
  await Promise.all(Array.from({ length: concurrency }, worker));

  const broken = results.filter(r => !r.ok);
  fs.writeFileSync(process.argv[3] || 'results.json', JSON.stringify({ checkedAt: new Date().toISOString(), total: results.length, brokenCount: broken.length, broken }, null, 2));
  console.log(`Checked ${results.length} links, ${broken.length} broken.`);
}
main();
