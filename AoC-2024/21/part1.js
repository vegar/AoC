const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim()
  .split("\n");
//.map((l) => l.split(""))|;

const NUMERIC = {
  0: { x: 1, y: 3 },
  A: { x: 2, y: 3 },
  1: { x: 0, y: 2 },
  2: { x: 1, y: 2 },
  3: { x: 2, y: 2 },
  4: { x: 0, y: 1 },
  5: { x: 1, y: 1 },
  6: { x: 2, y: 1 },
  7: { x: 0, y: 0 },
  8: { x: 1, y: 0 },
  9: { x: 2, y: 0 },
};

const ARROW = {
  "^": { x: 1, y: 0 },
  A: { x: 2, y: 0 },
  "<": { x: 0, y: 1 },
  v: { x: 1, y: 1 },
  ">": { x: 2, y: 1 },
};

const movement = {
  "^": { x: 0, y: -1 },
  v: { x: 0, y: 1 },
  "<": { x: -1, y: 0 },
  ">": { x: 1, y: 0 },
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

const findPath = (pad, from, to) => {
  if (from == to) return ["A"];

  const allPaths = [];
  const seen = new Map();
  const queue = new PriorityQueue();
  queue.enqueue({ x: pad[from].x, y: pad[from].y, path: "" }, 0);
  while (!queue.isEmpty()) {
    const { item, priority: length } = queue.get();

    // We've reached destination.
    if (pad[to].x == item.x && pad[to].y == item.y) {
      allPaths.push(item.path + "A");
      continue;
    }

    // We've been her in a shorter path
    if (
      seen.has(`${item.x}:${item.y}`) &&
      seen.get(`${item.x}:${item.y}`) < length
    )
      continue;

    // Record that we've been at this button
    seen.set(`${item.x}:${item.y}`, length);

    Object.keys(movement)
      // skip movements to gaps
      .filter((m) => {
        const newPos = {
          x: item.x + movement[m].x,
          y: item.y + movement[m].y,
        };

        const button = Object.entries(pad).find(
          ([_, b]) => b.x == newPos.x && b.y == newPos.y
        );

        return button;
      })
      // test all valid directions
      .forEach((m) => {
        const newPos = {
          x: item.x + movement[m].x,
          y: item.y + movement[m].y,
        };

        const newPath = item.path + m;
        queue.enqueue(
          { x: newPos.x, y: newPos.y, path: newPath },
          newPath.length
        );
      });
  }
  return allPaths;
};

const keysPressed = (pad, code, robot, cache) => {
  const key = `${code}.${robot}`;
  if (cache.has(key)) return cache.get(key);

  let pos = "A";
  let length = 0;
  let selectedPath = "";
  for (let i = 0; i < code.length; i++) {
    const moves = findPath(pad, pos, code[i]);
    if (robot == 0) {
      length += moves[0].length;
      selectedPath += moves[0];
    } else {
      const options = moves.map((m) => {
        const { length: y, selectedPath: z } = keysPressed(
          ARROW,
          m,
          robot - 1,
          cache
        );
        return { length: y, selectedPath: z };
      });

      const min = options.sort((a, b) => a.length - b.length)[0];
      length += min.length;
      selectedPath += min.selectedPath;
    }

    pos = code[i];
  }
  return { length, selectedPath };
};

let result = input.reduce((sum, code) => {
  const l = keysPressed(NUMERIC, code, 2, new Map());
  const x = parseInt(code.substring(0, 3));
  console.log(`${l.length} * ${x}`);
  return sum + l.length * x;
}, 0);
console.log({ result });
