const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim()
  .split("\n")
  .map((line) => line.split(""));

const markers = input.reduce((markers, currLine, y) => {
  markers.push(
    ...currLine.reduce((m, c, x) => {
      if (c != "." && c != "#") m.push([c, x, y]);
      return m;
    }, [])
  );
  return markers;
}, []);

const draw = (map, seen, path) => {
  for (let y = 0; y < map.length; y++) {
    let row = "";
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] == "#") row += "█";
      else if (map[y][x].match(/\d/)) row += map[y][x];
      else if (path.find(([xx, yy]) => (x == xx) & (y == yy))) row += "0";
      else if (seen.has(`${x}:${y}`)) row += ".";
      else row += " ";
    }

    console.log(row);
  }
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

function findPath2(from, to, map) {
  let queue = new PriorityQueue();
  let queuedToVisit = new Map();
  let seen = new Set();
  let minPath = [];
  let minSeen = Infinity;

  queue.enqueue([from[0], from[1], 0, []], 0);
  queuedToVisit.set(`${from[0]}:${from[1]}`, 0);

  while (!queue.isEmpty()) {
    let [x, y, steps, path] = queue.dequeue();
    let key = `${x}:${y}`;

    if (seen.has(key)) continue;
    seen.add(key);

    if (x === to[0] && y === to[1]) {
      if (steps < minSeen) {
        minSeen = steps;
        minPath = path;
      }
      continue;
    }

    let neighbors = [
      [x + 1, y],
      [x - 1, y],
      [x, y + 1],
      [x, y - 1],
    ];

    for (let [nx, ny] of neighbors) {
      if (nx < 0 || ny < 0 || nx >= map[0].length || ny >= map.length) continue;
      if (map[ny][nx] === "#") continue;

      let newSteps = steps + 1;
      let newKey = `${nx}:${ny}`;

      if (!queuedToVisit.has(newKey) || queuedToVisit.get(newKey) > newSteps) {
        queuedToVisit.set(newKey, newSteps);
        queue.enqueue(
          [nx, ny, newSteps, [...path, [nx, ny]]],
          newSteps + Math.abs(nx - to[0]) + Math.abs(ny - to[1])
        );
      }
    }
  }

  //draw(map, seen, minPath);
  return [minSeen, minPath];
}

const findPath = (from, to, map) => {
  let queue = new PriorityQueue();
  queue.enqueue([...from, 0, []], 1);
  let seen = new Map();
  let minSeen = Infinity;
  let minPath = [];
  let queuedToVisit = new Map();
  while (!queue.isEmpty()) {
    let item = queue.get().item;
    let [x, y, steps, path] = item;

    // Nådd målet?
    if (x == to[0] && y == to[1]) {
      if (steps < minSeen) {
        minSeen == steps;
        minPath = path;
      }
      continue;
    }

    // Vært her før?
    if ((seen.get(`${x}:${y}`) || Infinity) < steps) {
      continue;
    }

    // breadcrumb
    seen.set(`${x}:${y}`, steps);

    // hvor videre?
    if (x + 1 < map[y].length - 1 && map[y][x + 1] != "#")
      if (queuedToVisit.get(`${x + 1}:${y}`) || Infinity < steps + 1);
      else {
        let heuristic = Math.abs(x + 1 - to[0]) + Math.abs(y - to[1]);
        queuedToVisit.set(`${x + 1}:${y}`, steps + 1);
        queue.enqueue(
          [x + 1, y, steps + 1, [...path, [x + 1, y]]],
          steps + 1 + heuristic
        );
      }
    if (x - 1 > -1 && map[y][x - 1] != "#")
      if (queuedToVisit.get(`${x - 1}:${y}`) || Infinity < steps + 1);
      else {
        let heuristic = Math.abs(x - 1 - to[0]) + Math.abs(y - to[1]);
        queuedToVisit.set(`${x - 1}:${y}`, steps + 1);
        queue.enqueue(
          [x - 1, y, steps + 1, [...path, [x - 1, y]]],
          steps + 1 + heuristic
        );
      }
    if (y - 1 > -1 && map[y - 1][x] != "#")
      if (queuedToVisit.get(`${x}:${y - 1}`) || Infinity < steps + 1);
      else {
        let heuristic = Math.abs(x - to[0]) + Math.abs(y - 1 - to[1]);
        queuedToVisit.set(`${x}:${y - 1}`, steps + 1);
        queue.enqueue(
          [x, y - 1, steps + 1, [...path, [x, y - 1]]],
          steps + 1 + heuristic
        );
      }
    if (y + 1 < map.length - 1 && map[y + 1][x] != "#")
      if (queuedToVisit.get(`${x}:${y + 1}`) || Infinity < steps + 1);
      else {
        let heuristic = Math.abs(x - to[0]) + Math.abs(y + 1 - to[1]);
        queuedToVisit.set(`${x}:${y + 1}`, steps + 1);
        queue.enqueue(
          [x, y + 1, steps + 1, [...path, [x, y + 1]]],
          steps + 1 + heuristic
        );
      }
  }

  //draw(map, seen, minPath);
  return [minPath.length, minPath];
};

let graph = new Map();
for (let i = 0; i < markers.length; i++) {
  for (let j = i + 1; j < markers.length; j++) {
    let [fra, x, y] = markers[i];
    let [til, dx, dy] = markers[j];

    let [steps, path] = findPath([x, y], [dx, dy], input);
    graph.set(`${fra}→${til}`, [steps, path]);
    graph.set(`${til}→${fra}`, [steps, path]);
  }
}

function permute(arr) {
  let minSteps = Infinity;
  let order = [];

  function permuteHelper(arr, m = []) {
    if (arr.length === 0) {
      let steps = 0;
      m.reduce((prev, curr) => {
        let [s, path] = graph.get(`${prev}→${curr}`);
        steps += s;
        return curr;
      }, 0);
      let [back, _] = graph.get(`${m.at(-1)[0]}→0`);
      steps += back;
      if (steps < minSteps) {
        minSteps = steps;
        order = m;
      }
    } else {
      for (let i = 0; i < arr.length; i++) {
        let curr = arr.slice();
        let next = curr.splice(i, 1);
        permuteHelper(curr.slice(), m.concat(next));
      }
    }
  }

  permuteHelper(arr);
  return [minSteps, order];
}

[...graph.keys()]
  .sort((a, b) => a.localeCompare(b))
  .forEach((k) => console.log(k));

let nodes = ["1", "2", "3", "4", "5", "6", "7"];
let [shortest, order] = permute(nodes, graph);

let path = [];
order.reduce((prev, curr) => {
  let [s, p] = graph.get(`${prev}→${curr}`);
  path.push(...p);
  return curr;
}, 0);

draw(input, new Map(), path);

let result = shortest;
console.log({ result });

//630 to high
