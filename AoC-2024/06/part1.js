const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim();

const map = input.split("\n").map((l) => l.split(""));

let pos = undefined;
let y = 0;
while (y < map.length && !pos) {
  let x = 0;
  while (x < map[y].length && !pos) {
    if (map[y][x] == "^") pos = { x, y };
    x++;
  }
  y++;
}

let dir = { dx: 0, dy: -1 };
const turn = ({ dx, dy }) =>
  dx == 1
    ? { dx: 0, dy: 1 }
    : dx == -1
      ? { dx: 0, dy: -1 }
      : dy == 1
        ? { dx: -1, dy: 0 }
        : { dx: 1, dy: 0 };

const dirToStr = ({ dx, dy }) =>
  dx == 0 ? (dy == 1 ? "v" : "^") : dx == 1 ? ">" : "<";

const move = ({ pos: { x, y }, dir: { dx, dy } }) => {
  if (!escaped({ x: x + dx, y: y + dy }) && map[y + dy][x + dx] == "#")
    return { pos: { x, y }, dir: turn(dir) };
  return { pos: { x: x + dx, y: y + dy }, dir };
};
const id = ({ x, y }) => `${x}:${y}`;

const escaped = ({ x, y }) => {
  try {
    return x < 0 || y < 0 || y >= map.length || x >= map[y].length;
  } catch (error) {
    console.log(`Trouble at ${id({ x, y })}`);
  }
};

const visited = new Set();
visited.add(id(pos));

while (!escaped(pos)) {
  visited.add(id(pos));
  ({ pos, dir } = move({ pos, dir }));
}

let result = visited.size;
console.log({ result });
