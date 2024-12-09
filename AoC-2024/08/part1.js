const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim();

const map = input.split("\n").map((l) => l.split(""));
const antinode = new Set();
const antennas = new Map();

const key = (x, y) => `${x}:${y}`;

for (let y = 0; y < map.length; y++)
  for (let x = 0; x < map[y].length; x++) {
    const antenna = map[y][x];
    if (antenna.match(/\d|[a-zA-Z]/)) {
      if (!antennas.has(antenna)) antennas.set(antenna, []);
      antennas.get(antenna).push({ x, y });
    }
  }

const outOfBounds = (x, y) => {
  return x < 0 || y < 0 || y >= map.length || x >= map[0].length;
};

const getAntinodes = (antenna, antennas) => {
  const result = new Set();
  for (const a of antennas) {
    let dx = a.x - antenna.x;
    let dy = a.y - antenna.y;

    const first = { x: antenna.x - dx, y: antenna.y - dy };
    if (!outOfBounds(first.x, first.y)) result.add(key(first.x, first.y));
    const second = { x: a.x + dx, y: a.y + dy };
    if (!outOfBounds(second.x, second.y)) result.add(key(second.x, second.y));
    console.log(key(dx, dy), result);
  }
  return result;
};

for (const [antenna, positions] of antennas) {
  console.log(antenna);
  for (let aidx = 0; aidx < positions.length; aidx++) {
    const a = getAntinodes(positions[aidx], positions.slice(aidx + 1));
    for (let k of a) antinode.add(k);
  }
}

let result = antinode.size;
console.log({ result });
