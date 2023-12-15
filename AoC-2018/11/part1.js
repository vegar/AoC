const input = require('fs')
  .readFileSync(require('path').join(__dirname, 'input.txt'), 'utf8')
  .trim()

let serial = parseInt(input);

let powerMap = new Map();

let maxPower = { x: 0, y: 0, power: 0 }

let key = (x, y) => `${x},${y}`;

const powerLevel = (x, y) => {
  let rack = x + 10;
  let power = (((rack * y) + serial) * rack);
  return ((Math.floor(power / 100)) % 10) - 5;
}

for (x = 0; x < 300 - 2; x++) {
  for (y = 0; y < 300 - 2; y++) {
    let power = powerLevel(x, y)
      + powerLevel(x + 1, y)
      + powerLevel(x + 2, y)
      + powerLevel(x, y + 1)
      + powerLevel(x + 1, y + 1)
      + powerLevel(x + 2, y + 1)
      + powerLevel(x, y + 2)
      + powerLevel(x + 1, y + 2)
      + powerLevel(x + 2, y + 2);

    if (power > maxPower.power) {
      maxPower = { x, y, power }
    }
  }
}


let result = key(maxPower.x, maxPower.y);
console.log({ result })
