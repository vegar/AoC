import chalk from 'chalk';
import { readFileSync } from 'fs';
import path from 'path';

/*  timing */
import { hrtime } from 'process';
const start = hrtime.bigint();
/*  timing */


const input = readFileSync(path.join(path.resolve(), 'input.txt'), 'utf8')
  .trim()

// const input = 'target area: x=20..30, y=-10..-5';

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
    velX -= Math.sign(velX);
    velY -= 1;

    if (currY < target.y1) break;

    trace.push({x: currX, y: currY})

    if (inTarget(currX, currY, target)) {
      return {x: velX, y: velY, trace}
    }
  }

  return null;
}

let  hits = [];
for (let x = 0; x < 300; x++) {
  for (let y = -500; y < 500; y++) {
    const h = simulate(x,y,target);
    if (h) {
      hits.push({x,y})
    }

  }
}
console.log(hits)

//console.log(simulate(6,5,target))

let result = hits.length
console.log({ result })


/*  timing */
const end = hrtime.bigint();
console.log(chalk.green("Done in %dms"), parseFloat((end - start) / BigInt(10000)) / 100)
/*  timing */
