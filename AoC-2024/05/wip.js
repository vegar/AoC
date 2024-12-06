const input = require('fs')
  .readFileSync(require('path').join(__dirname, 'input.txt'), 'utf8')
  .trim()


let [rules, updates] = input.split("\n\n")

rules = rules.split("\n").map(l => l.split('|')).reduce((m, r) => {
  if (!m.has(r[0])) m.set(r[0], new Set());

  m.get(r[0]).add(r[1])
  return m;
}, new Map())

const wrongUpdates = updates.split("\n").map(l => l.split(",")).filter(update => {
  const visited = new Set();
  const wrong = update.find((page, idx) => {
    const after = rules.get(page);
    if (after) {
      const errors = after.intersection(visited);
      if (errors.size > 0) {
        return true;
      }
    }
    visited.add(page);
    return false
  })

  return wrong;
}).map(update => update.sort((a, b) => {
  if (rules.has(a) && rules.get(a).has(b)) return -1;
  if (rules.has(b) && rules.get(b).has(a)) return 1;
  return 0;
}))



console.log(wrongUpdates)

let result = wrongUpdates.map(update => {
  const mid = Math.floor(update.length / 2);
  return update[mid]
}).reduce((sum, update) => sum + parseInt(update), 0);;

console.log({ result })
