const key = (x, y) => `${x}:${y}`;

const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim()
  .split("\n")
  .map((l) => {
    let [x, y] = l.split(",");
    return key(x, y);
  });

// const map = Array(71);
// for (let y = 0; y < map.length; y++) {
//   map[y] = Array(71);
//   for (let x = 0; x < map[y].length; x++)
//     map[y][x] = bytes.has(key(x, y)) ? "█" : ".";
// }

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

const start = {
  x: 0,
  y: 0,
};

const end = {
  x: 70,
  y: 70,
};

const turns = (x, y, bytes) => {
  return [
    [x - 1, y],
    [x + 1, y],
    [x, y - 1],
    [x, y + 1],
  ]
    .filter(([x, y]) => x >= 0 && x < end.x + 1 && y >= 0 && y < end.y + 1)
    .map(([x, y]) => key(x, y))
    .filter((k) => !bytes.has(k));
};

const coord = (key) => key.split(":").map((x) => parseInt(x));

const search = (time) => {
  const bytes = new Set(input.slice(0, time));

  const queue = new PriorityQueue();
  queue.enqueue({ key: key(start.x, start.y), steps: 0 }, 0);
  var seen = new Map();
  while (!queue.isEmpty()) {
    let { item, priority } = queue.get();
    let [kx, ky] = coord(item.key);

    if (kx == end.x && ky == end.y) return item.steps;

    // Hvis vi har vært her før til lavere kost - ikke sjekk mer
    if (seen.has(item.key) && seen.get(item.key) <= item.steps) continue;
    seen.set(item.key, item.steps);

    const next = turns(kx, ky, bytes);
    for (let nk of next) {
      let nkc = coord(nk);
      queue.enqueue(
        { key: nk, steps: item.steps + 1 },
        priority + 1 + (end.x - nkc[0])
      );
    }
  }
  return -1;
};

function a_star(graph, start, end) {
  const open = new PriorityQueue();
  open.enqueue(start);
  const cameFrom = { start: null };
  const costSoFar = { start: 0 };

  while (!open.isEmpty()) {
    let current = open.get();
    if (current == end) break;

    try {
      graph.get(current).edges.forEach((next) => {
        let newCost = (costSoFar[current] ?? 0) + graph.get(next).cost;
        if (!costSoFar[next] || newCost < costSoFar[next]) {
          costSoFar[next] = newCost;
          let priority = newCost + (graph.get(end).x - graph.get(next).x);
          open.enqueue(next, priority);
          cameFrom[next] = current;
        }
      });
    } catch (error) {
      console.error(`Error ${error} - current: ${current}`);
    }
  }

  return {
    cameFrom,
    costSoFar,
  };
}

let t = 2979;
while (search(t) >= 0) {
  t++;
  console.log(t);
}

let result = input[t - 1];

// 1199 too high
console.log({ result });
