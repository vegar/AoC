import chalk from 'chalk';
import { readFileSync } from 'fs';
import path from 'path';

/*  timing */
import { hrtime } from 'process';
const start = hrtime.bigint();
/*  timing */


const input = readFileSync(path.join(path.resolve(), 'input.txt'), 'utf8')
  .trim()
  .split(/\r?\n/)
  .map(l => l.split('').map(d => parseInt(d)))


const s = input[0][0]

function bottomUp(m) {
  const size = m.length;

  for (let c = size - 1; c >= 0; c--) {
      for (let r = size - 1; r >= 0; r--) {
          // bottom right corner...
          if (r == size - 1 && c == size - 1) continue;

          // last row, add from right
          if (r == size - 1) m[r][c] += m[r][c + 1];
          // last column, add from down
          else if (c == size - 1) m[r][c] += m[r + 1][c];
          // add from right or down - which ever is lower
          else m[r][c] += Math.min(m[r + 1][c], m[r][c + 1]);
      }
  }

  return m[0][0];
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
  open.enqueue(start, 0);
  const cameFrom = {
      start: null,
  };
  const costSoFar = {
      start: 0,
  };

  while (!open.isEmpty()) {
      let current = open.get();
      if (current == end) break;

      graph[current].edges.forEach((next) => {
          let newCost = (costSoFar[current] ?? 0) + graph[next].cost;
          if (!costSoFar[next] || newCost < costSoFar[next]) {
              costSoFar[next] = newCost;
              let priority = newCost + (graph[end].x - graph[next].x);
              open.enqueue(next, priority);
              cameFrom[next] = current;
          }
      });
  }

  return {
      cameFrom,
      costSoFar,
  };
}

function makeGraph(matrix) {
  const graph = {};

  // start

  graph.start = {
      id: "start",
      cost: 0,
      x: -1,
      y: -1,
      edges: ['0:0']
  };

  // end
  graph.end = {
      id: "end",
      cost: 0,
      x: matrix.length,
      y: matrix[0].length,
      edges: [],
  };

  for (let y = 0; y < matrix.length; y++)
      for (let x = 0; x < matrix[y].length; x++) {
          const id = `${y}:${x}`;
          graph[id] = {
              id,
              cost: matrix[y][x],
              x,
              y,
              edges: [],
          };

          if (x == matrix.length - 1 && y == matrix.length - 1) graph[id].edges.push("end");
          else {
            if (x < matrix.length - 1) graph[id].edges.push(`${y}:${x + 1}`);
            if (y < matrix.length - 1) graph[id].edges.push(`${y + 1}:${x}`);
            if (x > 0) graph[id].edges.push(`${y}:${x - 1}`);
            if (y > 0) graph[id].edges.push(`${y - 1}:${x}`);
          }
      }

  return graph;
}

const graph = makeGraph(input);
const p = a_star(graph, "start", "end")
let result = p.costSoFar["end"] - s

console.log({ result })


/*  timing */
const end = hrtime.bigint();
console.log(chalk.green("Done in %dms"), parseFloat((end - start) / BigInt(10000)) / 100)
/*  timing */
