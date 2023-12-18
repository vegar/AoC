const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim();

const map = input
  .split("\n")
  .map((row) => row.split("").map((d) => parseInt(d)));

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

const key = (x, y, dx, dy, moves) => `${x}:${y}-${dx}:${dy}-${moves}`;

const outOfBounds = (r, c) =>
  r < 0 || r >= map.length || c < 0 || c >= map[0].length;

const equals = (array1, array2) =>
  array1.length == array2.length && array1.every((i, idx) => i == array2[idx]);

const seen = new Set();
const pq = new PriorityQueue();
pq.enqueue([0, 0, 0, 0, 0, 0]);

let result = 0;
while (!pq.isEmpty()) {
  let [hl, r, c, dr, dc, n] = pq.get();

  if (r == map.length - 1 && c == map[0].length - 1 && n >= 4) {
    result = hl;
    break;
  }

  if (seen.has(key(r, c, dr, dc, n))) continue;

  seen.add(key(r, c, dr, dc, n));

  if (n < 10 && !equals([dr, dc], [0, 0])) {
    let nr = r + dr;
    let nc = c + dc;
    if (!outOfBounds(nr, nc))
      pq.enqueue([hl + map[nr][nc], nr, nc, dr, dc, n + 1], hl + map[nr][nc]);
  }

  if (n >= 4 || equals([dr, dc], [0, 0]))
    for (let [ndr, ndc] of [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
    ]) {
      if (!equals([ndr, ndc], [dr, dc]) && !equals([ndr, ndc], [-dr, -dc])) {
        let nr = r + ndr;
        let nc = c + ndc;
        if (!outOfBounds(nr, nc))
          pq.enqueue([hl + map[nr][nc], nr, nc, ndr, ndc, 1], hl + map[nr][nc]);
      }
    }
}

console.log(seen);
console.log({ result });
