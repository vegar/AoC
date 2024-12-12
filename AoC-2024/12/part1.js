const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim();

const map = input.split("\n").map((l) => l.split(""));
const visited = new Map();
const key = (x, y) => `${x}:${y}`;

const visit = (x, y) => {
  k = key(x, y);
  if (visited.has(k)) return [];
  visited.set(k);

  let r = map[y][x];
  let region = [k];
  if (map?.[y]?.[x + 1] == r) region.push(...visit(x + 1, y));
  if (map?.[y + 1]?.[x] == r) region.push(...visit(x, y + 1));
  if (map?.[y]?.[x - 1] == r) region.push(...visit(x - 1, y));
  if (map?.[y - 1]?.[x] == r) region.push(...visit(x, y - 1));

  return region;
};

const addMap = (map, key) => {
  const curr = map.get(key) ?? 0;
  map.set(key, curr + 1);
};

const perimeter = (region) => {
  const rSet = new Set(region);
  const edges = region.reduce((sum, r) => {
    const [x, y] = r.split(":").map((n) => parseInt(n));
    if (!rSet.has(key(x - 1, y))) sum++;
    if (!rSet.has(key(x + 1, y))) sum++;
    if (!rSet.has(key(x, y + 1))) sum++;
    if (!rSet.has(key(x, y - 1))) sum++;
    return sum;
  }, 0);

  return edges;
};

let cost = 0;
for (let y = 0; y < map.length; y++) {
  for (var x = 0; x < map[y].length; x++) {
    let r = visit(x, y);
    if (r.length > 0) {
      const per = perimeter(r);
      cost += per * r.length;
    }
  }
}

let result = cost;
console.log({ result });
