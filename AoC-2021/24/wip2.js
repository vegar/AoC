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

const js = {
    inp: (memory, a, _) => {
        return `${a} = input[${memory.idx++}]`;
      },
      add: (memory, a, b) => {
        const x = memory[a] ?? 0;
        const y = Number.isNaN(parseInt(b)) ? memory[b] : parseInt(b);
        return `${a} = ${a} + ${b}`
      },
      mul: (memory, a, b) => {
        const x = memory[a] ?? 0;
        const y = Number.isNaN(parseInt(b)) ? memory[b] : parseInt(b);
        if (b == '0') return `${a} = 0`
        return `${a} = ${a} * ${b}`
       },
      div: (memory, a, b) => {
        const x = memory[a] ?? 0;
        const y = Number.isNaN(parseInt(b)) ? memory[b] : parseInt(b);
        return `${a} = ${a} / ${b}`
      },
      mod: (memory, a, b) => {
        const x = memory[a] ?? 0;
        const y = Number.isNaN(parseInt(b)) ? memory[b] : parseInt(b);
        return `${a} = ${a} % ${b}`
      },
      eql: (memory, a, b) => {
        const x = memory[a] ?? 0;
        const y = Number.isNaN(parseInt(b)) ? memory[b] : parseInt(b);
        return `${a} = ${a} == ${b} ? 1 : 0`
      }
}


let m = {idx: 0}
let result = input.map(l => {
    let [op, a, b] = l.split(' ');
    console.log(js[op](m, a, b));
})

console.log({ result })


/*  timing */
const endTime = hrtime.bigint();
console.log(chalk.green("Done in %dms"), parseFloat((endTime - startTime) / BigInt(10000)) / 100)
/*  timing */
