const input = require('fs')
  .readFileSync(require('path').join(__dirname, 'input.txt'), 'utf8')
  .trim()
  .split(/\r?\n/)

const template = input.shift().split('');
input.shift();

const rules = input.reduce((map, curr) => {
  const [key, element] = curr.split(' -> ');
  map.set(key, element);
  return map;
}, new Map())

const insert = (template) => {
  const result = [];
  const last = template.reduce((prev, curr) => {
    result.push(prev);
    result.push(rules.get(prev + curr))
    return curr;
  })
  result.push(last);
  return result;
}

let t = template;
for (let index = 0; index < 10; index++) {
  t = insert(t)
}

const count = t.reduce((acc, curr) => {
  if (!acc.has(curr)) acc.set(curr, 1)
  else acc.set(curr, acc.get(curr) + 1)
  return acc;
}, new Map())

const sortedCount = [...count.entries()].sort((a, b) => a[1] - b[1]);


let result = sortedCount[sortedCount.length-1][1] - sortedCount[0][1]
console.log({ result })
