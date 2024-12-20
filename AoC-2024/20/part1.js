const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim();

const map = input.split("\n").map((l) => l.split(""));

let start = {
  x: -1,
  y: -1,
};

let end = {
  x: -1,
  y: -1,
};

for (let y = 0; y < map.length; y++)
  for (let x = 0; x < map.length; x++) {
    if (map[y][x] == "S") {
      start = { y, x };
    }
    if (map[y][x] == "E") end = { y, x };
  }

const key = (x, y) => `${x}:${y}`;
const coord = (key) => {
  const [x, y] = key.split(":");
  return { x: parseInt(x), y: parseInt(y) };
};

class PriorityQueue {
  #queue;
  constructor() {
    this.#queue = [];
  }

  enqueue(item, priority) {
    let idx = this.#queue.findIndex((i) => i.priority >= priority);
    if (idx == -1) this.#queue.push({ item, priority });
    else this.#queue.splice(idx, 0, { item, priority });
  }

  head() {
    return this.#queue[0].item;
  }
  tail() {
    return this.#queue[this.#queue.length - 1].item;
  }

  get() {
    return this.#queue.shift();
  }

  isEmpty() {
    return this.#queue.length == 0;
  }

  toString() {
    return this.#queue.map(
      (v, idx) => `${idx}: ${v.item.toString()} (pri:${v.priority})`
    );
  }
}

const turn = (x, y) => [
  { x: x + 1, y },
  { x: x - 1, y },
  { x, y: y + 1 },
  { x, y: y - 1 },
];

const search = () => {
  const queue = new PriorityQueue();
  queue.enqueue(
    { k: key(start.x, start.y, 0), path: [{ x: start.x, y: start.y }] },
    0
  );
  var seen = new Map();
  while (!queue.isEmpty()) {
    let { item, priority: cost } = queue.get();
    let k = coord(item.k);
    if (k.x == end.x && k.y == end.y) {
      return item.path;
    }

    // Hvis vi har vært her før til lavere kost - ikke sjekk mer
    if (seen.has(item.k) && seen.get(item.k) < cost) continue;
    seen.set(item.k, cost);

    turn(k.x, k.y).forEach(({ x, y }) => {
      const out =
        y == 0 || y == map.length - 1 || x == 0 || x == map[y].length - 1;

      if (out) return;

      const isWall = map[y][x] == "#";
      if (!isWall)
        queue.enqueue(
          {
            k: key(x, y),
            path: [...item.path, { x, y }],
          },
          cost + 1
        );
    });
  }

  return [];
};

const path = search();
const saves = [];
console.log(path);
for (let s = 0; s < path.length - 1; s++) {
  for (let e = s + 1; e < path.length; e++) {
    const start = path[s];
    const end = path[e];
    const xdiff = Math.abs(start.x - end.x);
    const ydiff = Math.abs(start.y - end.y);

    if (xdiff == 0 || ydiff == 0) {
      if (xdiff + ydiff <= 2) {
        const save = e - s - (xdiff + ydiff);
        if (save >= 100) saves.push({ from: start, to: end, save: save });
      }
    }
  }
}

let result = saves.length;
console.log({ result });
