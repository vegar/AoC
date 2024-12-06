const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input-sample.txt"), "utf8")
  .trim();

const map = input.split("\n").map((l) => l.split(""));

const findStart = () => {
  let startPos = undefined;
  let y = 0;
  while (y < map.length && !startPos) {
    let x = 0;
    while (x < map[y].length && !startPos) {
      if (map[y][x] == "^") startPos = { x, y };
      x++;
    }
    y++;
  }

  let dir = { dx: 0, dy: -1 };

  return { pos: startPos, dir };
};

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

const obstacleInFront = (pos, dir) =>
  map[pos.y + dir.dy][pos.x + dir.dx] == "#";

const move = (pos, dir) => {
  if (
    !escaped({ x: pos.x + dir.dx, y: pos.y + dir.dy }) &&
    obstacleInFront(pos, dir)
  ) {
    do {
      dir = turn(dir);
    } while (obstacleInFront(pos, dir))
    return { pos: { x: pos.x + dir.dx, y: pos.y + dir.dy }, dir };
  }
  return { pos: { x: pos.x + dir.dx, y: pos.y + dir.dy }, dir };
};

const posToStr = ({ x, y }, dir) => {
  return `${x}:${y}${dir ? ':' + dirToStr(dir) : ""}`;
};

const escaped = ({ x, y }) => {
  try {
    return x < 0 || y < 0 || y >= map.length || x >= map[y].length;
  } catch (error) {
    console.log(`Trouble at ${posToStr({ x, y })}`);
  }
};

const addVisited = (pos, dir, map) => {
  const i = posToStr(pos);
  if (!map.has(i)) map.set(i, new Set());
  map.get(i).add(dirToStr(dir));
};

const hasVisited = (pos, dir, map) => {
  const i = posToStr(pos);
  return map.has(i) && map.get(i).has(dirToStr(dir));
};

const idToPos = (id) => id.split(':').map(l => parseInt(l));

const obstacles = new Set();

const traverse = (pos, dir) => {
  const visited = new Map();
  while (!escaped(pos)) {
    if (hasVisited(pos, dir, visited)) {
      console.log(visited)
      return null
    };

    addVisited(pos, dir, visited);
    ({ pos, dir } = move(pos, dir));
  }
  return visited;
};


let start = findStart();
let visited = traverse(start.pos, start.dir);

for (const [id] of visited) {

  let [x, y] = idToPos(id);
  map[y][x] = '#';
  let r = traverse(start.pos, start.dir);
  if (r == null) {
    obstacles.add(id)
  }
  map[y][x] = '.';
}

let result = obstacles.size;

// Rett svar = 1831
console.log({ result });