import chalk from 'chalk';
import { readFileSync } from 'fs';
import path from 'path';

/*  timing */
import { hrtime } from 'process';
const start = hrtime.bigint();
/*  timing */


let input = readFileSync(path.join(path.resolve(), 'input.txt'), 'utf8')
  .trim()
  .split(/\r?\n/)
  .map(l => l.split(''))

let initialMap = new Map();
let xSize = input[0].length;
let ySize = input.length;

function isFree(input, x, y) {
  return input[y % ySize][x % xSize] == '.';
}

function set(input, x, y, char) {
  input[y % ySize][x % xSize] = char;
}

function step(input) {

  let didMove = false;
  for (let i = 0; i < 2; i++)
  {
    let newInput = input.map(l => [...l]);
    for (let y = 0; y < ySize; y++)
    {
      for (let x = 0; x < xSize; x++)
      {
        const z = input[y][x];
        if (i == 0 && z == '>' && isFree(input, x+1,y))
        {
          didMove = true;
          set(newInput, x, y, '.')
          set(newInput, x+1, y, '>')
        }
        if (i == 1 && z == 'v' && isFree(input, x,y+1))
        {
          didMove = true;
          set(newInput, x, y, '.')
          set(newInput, x, y+1, 'v')
        }
      }
    }
    input = newInput;
  }
  return { input, didMove }
}

function print(input){
  console.log('-'.repeat(input[0].length))
  input.map(l => console.log(l.join('')))
}

let didMove = true;
let count = 0;
while (didMove) {
  let {input: i, didMove: m} = step(input);
  didMove = m;
  input = i;
  count++;
}


let result = count;
console.log({ result })


/*  timing */
const end = hrtime.bigint();
console.log(chalk.green("Done in %dms"), parseFloat((end - start) / BigInt(10000)) / 100)
/*  timing */
