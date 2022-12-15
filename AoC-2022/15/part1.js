const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim()
  .split(/\r?\n/)
  .map((line) => [...line.matchAll(/-?\d+/g)].map((m) => parseInt(m[0])));

const YY = 2000000;
const YYCovered = input.reduce((acc, curr) => {
  const [sensorx, sensory, beaconx, beacony] = curr;
  const dist = Math.abs(beaconx - sensorx) + Math.abs(beacony - sensory);
  const distToYY = Math.abs(YY - sensory);
  const deltaDist = dist - distToYY;
  const spots = [];
  if (deltaDist >= 0) {
    for (let x = sensorx - deltaDist; x <= sensorx + deltaDist; x++) {
      if (beacony == YY && beaconx == x);
      else spots.push(x);
    }
  }
  spots.forEach((x) => acc.add(x));
  return acc;
}, new Set());

let result = YYCovered.size;
console.log({ result });
