const sample = false;

const input = require('fs')
  .readFileSync(require('path').join(__dirname, `input${sample ? "-sample" : ""}.txt`), 'utf8')
  .trim()
  .split('\n')
  .map(line => {
    let [id, positions, time, start] = Array.from(line.matchAll(/(\d+)/g), m => parseInt(m[0]))
    let earliestStart = ((positions - start - id) + positions) % positions
    return { id, positions, time, start, earliestStart }
  })


let idx = 0;

while (true) {
  if (input.every(slot => (slot.start + idx + slot.id) % slot.positions == 0)) break;
  idx++
}

let result = idx;
console.log({ result })
