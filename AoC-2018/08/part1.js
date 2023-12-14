const input = require('fs')
  .readFileSync(require('path').join(__dirname, 'input.txt'), 'utf8')
  .trim()

const entries = input.split('\n').at(0).split(' ').map(x => parseInt(x));

const parseNode = (entries, start, meta) => {
  let children = entries[start++];
  let metaCount = entries[start++];

  while (children-- > 0) {
    start = parseNode(entries, start, meta);
  }

  while (metaCount-- > 0) {
    meta.push(entries[start++])
  }

  return start;
}

let start = 0;
const meta = [];
_ = parseNode(entries, start, meta);

console.log(entries);

let result = meta.reduce((acc, curr) => acc + curr, 0);
console.log({ result })
