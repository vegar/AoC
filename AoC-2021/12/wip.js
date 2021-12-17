const path = require('path/posix');

const input = require('fs')
  .readFileSync(require('path').join(__dirname, 'input.txt'), 'utf8')
  .trim()
  .split(/\r?\n/)


const map = new Map();

input.forEach(l => {
  const [from,to] = l.split('-');

  if (!map.has(from)) map.set(from, new Set());
  map.get(from).add(to);

  if (!map.has(to)) map.set(to, new Set());
  map.get(to).add(from);

})

const allPaths = [];

const queue = [{
  path: ['start'],
  visited: new Set(['start'])
}];

const isSmallCave = (cave) => cave.match(/^[a-z]+$/g);
const canVisit = (cave, path) => {
  if (cave == 'start') return false;
  // it's a large cave
  if (!isSmallCave(cave)) return true;

  // it's a small cave, but we haven't visited it yet
  if (!path.includes(cave)) return true;

  // it's a small cave, and we have visited it before.
  visitCount = path.filter(p => isSmallCave(p)).reduce((acc, curr) => {
    if (!acc.has(curr)) acc.set(curr, 1)
    else acc.set(curr, acc.get(curr) + 1)

    return acc;
  }, new Map())

  let twice = false;
  visitCount.forEach(v => { if (v > 1) twice = true })

  return !path.includes(cave) ||   !twice
}

while (queue.length > 0) {
  const {path } = queue.pop();
  const currentCave = path[path.length-1]
  if (currentCave ==  'end') {
    allPaths.push(path.join(','));
    continue;
  }

  map.get(currentCave).forEach(c => {
    if (canVisit(c, path)) {
        queue.push({
          path: [...path, c]
        })
      }
  })

}


console.log(allPaths)

let result = allPaths.length
console.log({ result })
