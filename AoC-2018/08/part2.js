const input = require('fs')
  .readFileSync(require('path').join(__dirname, 'input.txt'), 'utf8')
  .trim()

const entries = input.split('\n').at(0).split(' ').map(x => parseInt(x));

const parseNode = (entries, start) => {
  let s = start;
  let children = entries[s++];
  let metaCount = entries[s++];

  const childNodes = [];
  while (children-- > 0) {
    let child = parseNode(entries, s);
    childNodes.push(child)
    s += child.len;
  }

  const meta = entries.slice(s, s + metaCount);
  let value = childNodes.length
    ? meta.map(m => childNodes[m - 1]?.value ?? 0).reduce((acc, curr) => acc + curr, 0)
    : meta.reduce((acc, curr) => acc + curr, 0);

  s += meta.length;
  return { len: s - start, value };
}

let { len, value } = parseNode(entries, 0);

let result = value;
console.log({ result })
