import chalk from 'chalk';
import { readFileSync } from 'fs';
import path from 'path';

/*  timing */
import { hrtime } from 'process';
const startTime = hrtime.bigint();
/*  timing */


const input = readFileSync(path.join(path.resolve(), 'input.txt'), 'utf8')
  .trim()
  .split(/\r?\n/)
  .map(l => {
    const [_, start] = l.split(': ');
    return start;
  })
  .map(s => parseInt(s));

function add(curr, c) {
  let n = curr + c;
  if (n > 10) n -= 10;
  return n;
}

function chanceOfScore(position) {
  return [
    { position: add(position, 3), count: 1 },
    { position: add(position, 4), count: 3 },
    { position: add(position, 5), count: 6 },
    { position: add(position, 6), count: 7 },
    { position: add(position, 7), count: 6 },
    { position: add(position, 8), count: 3 },
    { position: add(position, 9), count: 1 }
  ]
}

const cache = new Map();

function simulate(p1, p2, s1, s2, m = 1) {
  const key = `${p1}-${p2}-${s1}-${s2}-${m}`;
  // if (cache.has(key)) {
  //   return cache.get(key);
  // }

  if (s1 >= 21) return [m, 0];
  if (s2 >= 21) return [0, m];

  const w = chanceOfScore(p1).reduce((acc, a) => {
    const p1n = a.position;
    const s1n = s1 + a.position;

    const u = simulate(p2, p1n, s2, s1n, m * a.count)
    acc[0] = acc[0] + u[1];
    acc[1] = acc[1] + u[0];
    return acc;
   }, [0,0])

  cache.set(key, w);

  return w;
}

let result = Math.max(...simulate(input[0], input[1], 0, 0, 1));

console.log({ result })


/*  timing */
const endTime = hrtime.bigint();
console.log(chalk.green("Done in %dms"), parseFloat((endTime - startTime) / BigInt(10000)) / 100)
/*  timing */


