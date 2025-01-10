const sample = false;

const input = require('fs')
  .readFileSync(require('path').join(__dirname, `input${sample ? "-sample" : ""}.txt`), 'utf8')
  .trim()
  .split('\n')
  .map(line => {
    let [id, positions, time, start] = Array.from(line.matchAll(/(\d+)/g), m => parseInt(m[0]))
    return { id, positions, time, start }
  })

input.push({ id: input.length + 1, positions: 11, start: 0 })

let idx = 0;

while (true) {
  if (input.every(slot => (slot.start + idx + slot.id) % slot.positions == 0)) break;
  idx++
}

let result = idx;
console.log({ result })
