const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim();

const key = (x, y) => `${x}:${y}`;

const map = input.split("\n").map((line) => line.split(""));
const galaxies = [];
const seenY = new Set();
const seenX = new Set();
for (let y = 0; y < map.length; y++)
  for (let x = 0; x < map.length; x++) {
    if (map[y][x] == "#") {
      seenY.add(y);
      seenX.add(x);
      galaxies.push({ x, y });
    }
  }

let result = 0;
for (let g = 0; g < galaxies.length; g++) {
  for (let n = g + 1; n < galaxies.length; n++) {
    const [x1, x2] = [
      Math.min(galaxies[g].x, galaxies[n].x),
      Math.max(galaxies[g].x, galaxies[n].x),
    ];
    const [y1, y2] = [
      Math.min(galaxies[g].y, galaxies[n].y),
      Math.max(galaxies[g].y, galaxies[n].y),
    ];
    let steps = -1;
    for (let y = y1; y < y2; y++) {
      steps += seenY.has(y) ? 1 : 1000000;
    }
    for (let x = x1; x <= x2; x++) {
      steps += seenX.has(x) ? 1 : 1000000;
    }

    result += steps;
  }
}

console.log({ result });
