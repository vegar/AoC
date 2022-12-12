const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim()
  .split(/\r?\n/);

const map = input.reduce((acc, curr) => {
  acc.push(curr.split(""));
  return acc;
}, []);

function find(what, map) {
  for (y = 0; y < map.length; y++)
    for (x = 0; x < map[0].length; x++) {
      if (map[y][x] == what) {
        return { x, y };
      }
    }
}

const start = find("S", map);
const end = find("E", map);

const elevation = (x, y) => {
  return map[y][x] == "S"
    ? 0
    : map[y][x] == "E"
    ? 25
    : map[y][x].charCodeAt(0) - "a".charCodeAt(0);
};

function makeGraph(map) {
  const graph = new Map();

  graph.set("start", {
    id: "start",
    cost: 0,
    x: -1,
    y: -1,
    edges: [`${start.y}:${start.x}`],
  });

  graph.set("end", {
    id: "end",
    cost: 0,
    x: map.length,
    y: map.length,
    edges: [],
  });

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[0].length; x++) {
      const id = `${y}:${x}`;

      const el = elevation(x, y);
      const edges = [];
      if (y == end.y && x == end.x) {
        edges.push("end");
      } else {
        if (y > 0 && elevation(x, y - 1) <= el + 1) edges.push(`${y - 1}:${x}`);
        if (x > 0 && elevation(x - 1, y) <= el + 1) edges.push(`${y}:${x - 1}`);
        if (y < map.length - 1 && elevation(x, y + 1) <= el + 1)
          edges.push(`${y + 1}:${x}`);
        if (x < map[0].length - 1 && elevation(x + 1, y) <= el + 1)
          edges.push(`${y}:${x + 1}`);
      }
      graph.set(id, {
        id,
        cost: 1,
        x,
        y,
        edges,
      });
    }
  }
  return graph;
}

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
    return this.#queue.shift().item;
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

const graph = makeGraph(map);

const potentialStart = [];
for (let y = 0; y < map.length; y++) {
  for (let x = 0; x < map[0].length; x++) {
    if (map[y][x] == "a" || map[y][x] == "S") potentialStart.push(`${y}:${x}`);
  }
}
console.log(potentialStart);

let minCost = 1000000;

for (let i = 0; i < potentialStart.length; i++) {
  const r = a_star(graph, potentialStart[i], `${end.y}:${end.x}`);
  const cost = r.costSoFar[`${end.y}:${end.x}`];
  if (cost < minCost) minCost = cost;
}

let result = minCost;
console.log({ result });
