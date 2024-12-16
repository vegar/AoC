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
  let min = Infinity;
  let best = new Set();

  const queue = new PriorityQueue();
  queue.enqueue({ k: key(start.x, start.y, "E"), path: [] }, 0);
  var seen = new Map();
  while (!queue.isEmpty()) {
    let { item, priority: cost } = queue.get();
    let k = coord(item.k);
    if (k.x == end.x && k.y == end.y) {
      if (cost <= min) min = cost;
      else return best.size;
      item.path.forEach((k) => best.add(k));
    }

    // Hvis vi har vært her før til lavere kost - ikke sjekk mer
    if (seen.has(item.k) && seen.get(item.k) < cost) continue;
    seen.set(item.k, cost);

    const forward = { x: k.x + dir[k.dir].dx, y: k.y + dir[k.dir].dy };
    if (map[forward.y][forward.x] != "#")
      queue.enqueue(
        {
          k: key(forward.x, forward.y, k.dir),
          path: [...item.path, key(k.x, k.y)],
        },
        cost + 1
      );
    turn(k.dir).forEach((newDir) => {
      queue.enqueue({ k: key(k.x, k.y, newDir), path: item.path }, cost + 1000);
    });
  }
  return 0;
};

let result = search() + 1;
console.log({ result });
