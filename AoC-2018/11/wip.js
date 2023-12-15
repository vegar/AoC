const input = require('fs')
  .readFileSync(require('path').join(__dirname, 'input.txt'), 'utf8')
  .trim()

let serial = parseInt(input);

let maxPower = { x: 0, y: 0, power: 0, size: 0 }

let key = (x, y, size) => `${x},${y},${size}`;

const powerLevel = (x, y) => {
  let rack = x + 10;
  let power = (((rack * y) + serial) * rack);
  return ((Math.floor(power / 100)) % 10) - 5;
}

const powerLevelArea = (x, y, size) => {
  let level = 0;
  for (let dx = 0; dx < size; dx++) {
    for (let dy = 0; dy < size; dy++) {
      level += powerLevel(x + dx, y + dy);
    }
  }
  return level;
}

for (let x = 0; x < 300 - 2; x++) {
  for (let y = 0; y < 300 - 2; y++) {
    for (let size = 1; size < Math.min(300 - x, 300 - y); size++) {
      power = powerLevelArea(x, y, size)
      if (power > maxPower.power) {
        maxPower = { x, y, power, size }
      }
    }
  }
}


let result = key(maxPower.x, maxPower.y, maxPower.size);
console.log({ result })
