import chalk from 'chalk';
import { readFileSync } from 'fs';
import path from 'path';

/*  timing */
import { hrtime } from 'process';
const start = hrtime.bigint();
/*  timing */


const input = readFileSync(path.join(path.resolve(), 'input.txt'), 'utf8')
  .trim()

//const input = 'target area: x=20..30, y=-10..-5';

const [x1,x2,y1,y2] = input.match(/([-]?\d+)/g)
const target = {
  x1: Math.min(x1, x2),
  x2: Math.max(x1, x2),
  y1: Math.min(y1, y2),
  y2: Math.max(y1, y2),
}

console.log(target)

function inTarget(x, y, target) {

  return x >= target.x1 && x <= target.x2
      && y >= target.y1 && y <= target.y2
}

function simulate(velX, velY, target) {
  let trace = [];
  let currX = 0;
  let currY = 0;

  while (true) {
    currX += velX;
    currY += velY;
    velX -= velX > 0 ? 1 : -1;
    velY -= 1;

    if (currY < target.y1) break;

    trace.push({x: currX, y: currY})

    if (inTarget(currX, currY, target)) {
      return Math.max(...trace.map(c => c.y))    }
  }

  return null;
}

let  hit = {x: 0, y: 0, h: 0};
for (let x = -1000; x < 1000; x++) {
  for (let y = 0; y < 1000; y++) {
    const h = simulate(x,y,target);
    if (h && h > hit.h) {
      hit = {x, y, h}
    }

  }
}

let result = hit.h
console.log({ result })


/*  timing */
const end = hrtime.bigint();
console.log(chalk.green("Done in %dms"), parseFloat((end - start) / BigInt(10000)) / 100)
/*  timing */
