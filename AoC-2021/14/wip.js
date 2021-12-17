import { hrtime } from 'process';
import chalk from 'chalk';
import { readFileSync } from 'fs';
import path from 'path';

const start = hrtime.bigint();

const input = readFileSync(path.join(path.resolve(), 'input.txt'), 'utf8')
  .trim()
  .split(/\r?\n/)

const template = input.shift().split('');
input.shift();

const rules = input.reduce((map, curr) => {
  const [key, element] = curr.split(' -> ');
  map.set(key, element);
  return map;
}, new Map())

let count = new Map();

const add = (A, map, value = 1) => map.set(A, (map.get(A) ?? 0) + value);
const mergeMap = (mapA, mapB) => {
  const newMap = new Map([...mapA.entries()])
  mapB.forEach((value, key) => add(key, newMap, value));
  return newMap;
}

const cache = new Map();

const maxDepth =41
const countPair = (A, B, depth) => {

  if (cache.has(`${A}${B}${depth}`)) return cache.get(`${A}${B}${depth}`)


  if (depth == maxDepth) {
    const c = new Map();
    add(A, c)
    return c;
  } else {
    const c = rules.get(A + B)
    const ac = countPair(A, c, depth + 1);
    cache.set(`${A}${c}${depth+1}`, ac);

    const cb = countPair(c, B, depth + 1)
    cache.set(`${c}${B}${depth+1}`, cb);

    return mergeMap(ac, cb)
  }
}

const last = template.reduce((prev, curr) => {
  const c = countPair(prev, curr, 1);
  count = mergeMap(count, c)
  return curr;
})

add(last, count)

const length = [...count.values()].reduce((acc, curr) => acc + curr)
const sortedCount = [...count.entries()].sort((a, b) => a[1] - b[1]);
let result = sortedCount[sortedCount.length-1][1] - sortedCount[0][1]

console.log({ result })

const end = hrtime.bigint();
console.log(chalk.green("Done in %dms"), parseFloat((end - start) / BigInt(10000)) / 100)
