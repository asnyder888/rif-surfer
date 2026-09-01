const fs = require('fs');
const html = fs.readFileSync(process.argv[2], 'utf8');
const links = [];

// 1. Benefits array direct links (http only)
const benefitsMatch = html.match(/const benefits=\[([\s\S]*?)\n\];/);
if (benefitsMatch) {
  const entryRegex = /\{id:'([^']+)'[^}]*?link:'([^']+)'/g;
  let m;
  while ((m = entryRegex.exec(benefitsMatch[1])) !== null) {
    const [, id, link] = m;
    if (link.startsWith('http')) links.push({ id, url: link });
  }
}

// 2. Per-state government links (ui, medicaid, snap)
const stateMatch = html.match(/const stateLinks=\{([\s\S]*?)\};/);
if (stateMatch) {
  const stateEntryRegex = /([A-Z]{2}|other):\{([^}]+)\}/g;
  let sm;
  while ((sm = stateEntryRegex.exec(stateMatch[1])) !== null) {
    const [, state, fields] = sm;
    const fieldRegex = /(ui|medicaid|snap):'([^']+)'/g;
    let fm;
    while ((fm = fieldRegex.exec(fields)) !== null) {
      links.push({ id: `${state}-${fm[1]}`, url: fm[2] });
    }
  }
}

fs.writeFileSync(process.argv[3] || 'links.json', JSON.stringify(links, null, 2));
console.log('Total links found:', links.length);
