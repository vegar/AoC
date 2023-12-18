const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim()
  .split("\n");

const [_, __, outline, minx, maxx, miny, maxy] = input.reduce(
  ([x, y, outline, minx, maxx, miny, maxy], current) => {
    let [_, dir, length, color] = current.match(/(\w) (\d+) (\(#[0-9a-f]+\))/);
    length = parseInt(length);

    for (let i = 0; i < length; i++) {
      x = dir == "R" ? x + 1 : dir == "L" ? x - 1 : x;
      y = dir == "U" ? y - 1 : dir == "D" ? y + 1 : y;

      outline.set(`${x}:${y}`, { x, y, color });
    }

    return [
      x,
      y,
      outline,
      Math.min(minx, x),
      Math.max(maxx, x),
      Math.min(miny, y),
      Math.max(maxy, y),
    ];
  },
  [0, 0, new Map(), 0, 0, 0, 0]
);

const map = Array(maxy - miny + 1)
  .fill("")
  .map((a) => Array(maxx - minx).fill("."));
[...outline.values()].forEach(({ x, y }) => (map[y - miny][x - minx] = "▓"));

const log = (map) =>
  map.forEach((line, idx) =>
    console.log(idx.toString().padStart(4, " "), " ", line.join(""))
  );

const isValid = (map, x, y, prevC) => {
  return (
    x >= 0 &&
    x <= map[0].length &&
    y >= 0 &&
    y < map.length &&
    map[y][x] == prevC
  );
};

const floodFill = (map, x, y) => {
  const queue = [{ x, y }];
  map[y][x] = "░";
  while (queue.length) {
    let { x, y } = queue.pop();
    if (isValid(map, x + 1, y, ".")) {
      map[y][x + 1] = "░";
      queue.push({ x: x + 1, y });
    }
    if (isValid(map, x - 1, y, ".")) {
      map[y][x - 1] = "░";
      queue.push({ x: x - 1, y });
    }
    if (isValid(map, x, y + 1, ".")) {
      map[y + 1][x] = "░";
      queue.push({ x, y: y + 1 });
    }
    if (isValid(map, x, y - 1, ".")) {
      map[y - 1][x] = "░";
      queue.push({ x, y: y - 1 });
    }
  }
};

floodFill(map, 2, 345);
log(map);

//console.log(sorted);
let result = map.reduce(
  (count, row) => count + row.filter((a) => a != ".").length,
  0
);
console.log({ result });
