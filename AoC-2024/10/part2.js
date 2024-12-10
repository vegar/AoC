const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim();

const map = input.split("\n").map((l) => l.split("").map((d) => parseInt(d)));

const key = (x, y) => `${x}:${y}`;
const cord = (k) => k.split(":").map((l) => parseInt(l));

const findEdges = function* (x, y) {
  const value = map[y][x];
  if (map?.[y]?.[x - 1] == value + 1) yield key(x - 1, y);
  if (map?.[y]?.[x + 1] == value + 1) yield key(x + 1, y);
  if (map?.[y - 1]?.[x] == value + 1) yield key(x, y - 1);
  if (map?.[y + 1]?.[x] == value + 1) yield key(x, y + 1);
};

const edges = new Map();
const start = [];
const end = new Set();

for (let y = 0; y < map.length; y++) {
  for (let x = 0; x < map[y].length; x++) {
    const k = key(x, y);
    if (!edges.has(k)) edges.set(k, []);
    for (const e of findEdges(x, y)) {
      edges.get(k).push(e);
    }
    if (map[y][x] == 0) {
      start.push(k);
    }
    if (map[y][x] == 9) {
      end.add(k);
    }
  }
}

console.log(start);

const traverse = (k) => {
  if (end.has(k)) return [k];

  return edges.get(k).flatMap((n) => traverse(n));
};

let result = start.reduce((sum, curr) => {
  const found = traverse(curr);
  console.log(found.length);
  return sum + found.length;
}, 0);
console.log({ result });
