const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim();

const map = input.split("\n").map((l) => l.split(""));

const key = (x, y, dir) => `${x}:${y}:${dir}`;
const coord = (key) => {
  const [x, y, dir] = key.split(":");
  return { x: parseInt(x), y: parseInt(y), dir };
};

const start = {
  x: 1,
  y: map.length - 2,
};

const end = {
  x: map[1].length - 2,
  y: 1,
};

const direction = {
  dx: 0,
  dy: -1,
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

const dir = {
  E: { dx: 1, dy: 0 },
  W: { dx: -1, dy: 0 },
  N: { dx: 0, dy: -1 },
  S: { dx: 0, dy: 1 },
};

const turn = (dir) => {
  return dir == "E"
    ? ["N", "S"]
    : dir == "W"
    ? ["S", "N"]
    : dir == "N"
    ? ["W", "E"]
    : dir == "S"
    ? ["E", "W"]
    : [];
};

const search = () => {
  const queue = new PriorityQueue();
  queue.enqueue(key(start.x, start.y, "E"), 0);
  var seen = new Map();
  while (!queue.isEmpty()) {
    let { item, priority: cost } = queue.get();
    let k = coord(item);
    if (k.x == end.x && k.y == end.y) return cost;

    // Hvis vi har vært her før til lavere kost - ikke sjekk mer
    if (seen.has(item) && seen.get(item) < cost) continue;
    seen.set(item, cost);

    const forward = { x: k.x + dir[k.dir].dx, y: k.y + dir[k.dir].dy };
    if (map[forward.y][forward.x] != "#")
      queue.enqueue(key(forward.x, forward.y, k.dir), cost + 1);
    turn(k.dir).forEach((newDir) => {
      queue.enqueue(key(k.x, k.y, newDir), cost + 1000);
    });
  }
  return 0;
};

let result = search();
console.log({ result });
