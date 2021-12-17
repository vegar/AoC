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


while (queue.length > 0) {
  const {path, visited} = queue.pop();
  const currentCave = path[path.length-1]
  if (currentCave ==  'end') {
    allPaths.push(path.join(','));
    continue;
  }

  console.log(`leaving ${currentCave}`)
  map.get(currentCave).forEach(c => {
    // small cave
    if (isSmallCave(c)) {
      if (!visited.has(c)) {
        queue.push({
          path: [...path, c],
          visited: new Set([...visited.keys(), c])
        })
      }
    // large cave
    } else {
      queue.push({
        path: [...path, c],
        visited: new Set([...visited.keys(), c])
      })
    }
  })

}


console.log(allPaths)

let result = allPaths.length
console.log({ result })
