import chalk from 'chalk';
import { readFileSync } from 'fs';
import path from 'path';

/*  timing */
import { hrtime } from 'process';
const startTime = hrtime.bigint();
/*  timing */


const input = readFileSync(path.join(path.resolve(), 'test.txt'), 'utf8')
  .trim()
  .split(/\r?\n/)

const memory = {
  stdIn: [],
  w: undefined,
  x: undefined,
  y: undefined,
  z: undefined,
}

const operations = {
  inp: (memory, a, _) => {
    const [input, ...stdIn] = memory.stdIn;
    return {...memory, [a]: input, stdIn };
  },
  add: (memory, a, b) => {
    const x = memory[a] ?? 0;
    const y = Number.isNaN(parseInt(b)) ? memory[b] : parseInt(b);
    return {...memory, [a]: x + y};
  },
  mul: (memory, a, b) => {
    const x = memory[a] ?? 0;
    const y = Number.isNaN(parseInt(b)) ? memory[b] : parseInt(b);
    return {...memory, [a]: x * y};
   },
  div: (memory, a, b) => {
    const x = memory[a] ?? 0;
    const y = Number.isNaN(parseInt(b)) ? memory[b] : parseInt(b);
    return {...memory, [a]: Math.floor(x / y)};
  },
  mod: (memory, a, b) => {
    const x = memory[a] ?? 0;
    const y = Number.isNaN(parseInt(b)) ? memory[b] : parseInt(b);
    return {...memory, [a]: x % y};
  },
  eql: (memory, a, b) => {
    const x = memory[a] ?? 0;
    const y = Number.isNaN(parseInt(b)) ? memory[b] : parseInt(b);
    return {...memory, [a]: x == y ? 1 : 0};
  }
}

let DEBUG = false;

const execute = (program, memory) => {
  if (Array.isArray(program)) {
    return program.reduce((acc, curr) => execute(curr, acc), memory)
  }

  let [op, a, b] = program.split(' ');
  const newMemory = operations[op](memory, a, b);

  if (DEBUG)  {
    console.log(program.padEnd(10, ' '), '|'
      , `w:${memory.w != newMemory.w ? chalk.red(newMemory.w) : newMemory.w}`
      , `x:${memory.x != newMemory.x ? chalk.red(newMemory.x) : newMemory.x}`
      , `y:${memory.y != newMemory.y ? chalk.red(newMemory.y) : newMemory.y}`
      , `z:${memory.z != newMemory.z ? chalk.red(newMemory.z) : newMemory.z}`
      , memory.stdIn
    )
  }

  return newMemory;
}

function execute2(idx, w, z) {
  switch (idx) {
    case 0:
      return w + 1;

    default:
      break;
  }
}

for (var ii = 1; ii < 10; ii++)
for (var i = 9; i < 10; i++) {
  let result = execute(input, {stdIn: [ii, i], w:0, x:0, y:0, z:0})

  console.log(chalk.red(`For input ${ii},${i}, w = ${result.w}, x = ${result.x}, y = ${result.y}, z = ${result.z}`))
}





// const start = 11111111111111;
// const end   = 99999999999999;

// const valid = [];
// let highest = 0;

// for (let x = end; x > start; x--) {
//   let s = x.toString();
//   if (s.indexOf('0') >= 0) continue;
//   if (s.endsWith('111111')) console.log(`Testing ${x}`)

//   let result = execute(input, {stdIn: s.split('').map(x => parseInt(x)), w: 0, x: 0, z: 0, y: 0})

//   if (result.z == 0) {
//     console.log(chalk.green(`VALID! ${x}`));
//     valid.push(s);
//   }

// }

// const result = valid[0];
// console.log({ result })


/*  timing */
const endTime = hrtime.bigint();
console.log(chalk.green("Done in %dms"), parseFloat((endTime - startTime) / BigInt(10000)) / 100)
/*  timing */
