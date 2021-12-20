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
  .map(l => {
    const [_, start] = l.split(': ');
    return start;
  })
  .map(s => parseInt(s));

let die = 0;
let rolls = 0;
function roll() {

  let m = [];
  for(let i = 0; i < 3; i++) {
    rolls++;
    if (die == 100) die = 0;
    m.push(++die);
  }
  return m;
}

const positions = [...input];
const points = [0,0];
let turn = 0;
while (points[0] < 1000 && points[1] < 1000) {
  let moves = roll();
  moves.forEach(move => {
    let m = move % 10;
    while (m > 0) {
      positions[turn] += 1;
      if (positions[turn] == 11) positions[turn] = 1;
      m--;
    }
  });

  points[turn] += positions[turn];

  console.log(`Player ${turn+1} rolls ${chalk.yellow(moves.join('+'))} and moves to space ${chalk.yellow(positions[turn])} for a total score of ${chalk.yellow(points[turn])}`)

  turn = turn == 0 ? 1 : 0;
}

console.log('Positions: ', positions)
console.log('Points', points)
console.log('Turn: ', turn)




let result = points[turn] * rolls;
console.log({ result })


/*  timing */
const end = hrtime.bigint();
console.log(chalk.green("Done in %dms"), parseFloat((end - start) / BigInt(10000)) / 100)
/*  timing */
