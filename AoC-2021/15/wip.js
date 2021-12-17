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


const cost = (x,y) => {
  let x1 = x % input.length
  let y1 = y % input.length
  let dx = Math.floor((x) / input.length)
  let dy = Math.floor((y) / input.length)

  let c = (input[y1][x1] + dx + dy)
  while (c > 9) c -= 9;
  return c;
}

function makeGraph(matrix) {
  const graph = {};
  const size = matrix.length * 5;

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
      x: size,
      y: size,
      edges: [],
  };

  for (let y = 0; y < size; y++)
      for (let x = 0; x < size; x++) {
          const id = `${y}:${x}`;

          graph[id] = {
              id,
              cost: cost(x, y),
              x,
              y,
              edges: [],
          };

          if (x == size - 1 && y == size - 1) graph[id].edges.push("end");
          else {
            if (x < size - 1) graph[id].edges.push(`${y}:${x + 1}`);
            if (y < size - 1) graph[id].edges.push(`${y + 1}:${x}`);
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
