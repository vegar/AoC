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

const map = {
  '1:1': 'H' ,
  '1:2': 'H' ,
  '1:3': 'E' ,
  '1:4': 'H' ,
  '1:5': 'E' ,
  '1:6': 'H' ,
  '1:7': 'E' ,
  '1:8': 'H' ,
  '1:9': 'E' ,
  '1:10': 'H' ,
  '1:11': 'H' ,
  '2:3': 'A' ,
  '3:3': 'A' ,
  '2:5': 'B' ,
  '3:5': 'B' ,
  '2:7': 'C' ,
  '3:7': 'C' ,
  '2:9': 'D' ,
  '3:9': 'D'
}

const energyUsage = {
  'A1': 1,
  'B1': 10,
  'C1': 100,
  'D1': 1000,
  'A2': 1,
  'B2': 10,
  'C2': 100,
  'D2': 1000,
}

const destination = (player) => player.charAt(0);

function isEndPosition(positions) {
  return Object.entries(positions).every(([p, pos]) => {
    return map[pos] == destination(p);
  })
}

function spotsBetween(pos1, pos2) {
  const spots = [];
  const [x1, y1] = pos1.split(':').map(c => parseInt(c))
  const [x2, y2] = pos2.split(':').map(c => parseInt(c))

  let y = y1;
  let x = x1;
  //up
  while (y > y2) {
    y--;
    spots.push(`${y}:${x}`)
  }
  //across
  while (x != x2) {
    x += Math.sign(x2-x1);
    spots.push(`${y}:${x}`)
  }
  //down
  while (y < y2) {
    y++;
    spots.push(`${y}:${x}`)
  }

  return spots;
}

function isValidMove(map, positions, player, newPosition) {
  // cannot move within hallway or within cave
  if (map[newPosition] == map[positions[player]]) return false;
  // cannot move to cave entrence
  if (map[newPosition] == 'E') return false;
  // cannot move into wrong cave
  if (map[newPosition] != 'H' && map[newPosition] != destination(player)) return false;
  // cannot jump player
  const path = spotsBetween(positions[player], newPosition);
  return Object.values(positions).every(p => !path.includes(p));
}

function cost(player, pos1, pos2) {
  const [x1, y1] = pos1.split(':').map(c => parseInt(c))
  const [x2, y2] = pos2.split(':').map(c => parseInt(c))

  return spotsBetween(pos1, pos2).length * energyUsage[player];
}

const END = { }

const START = {
  positions: {
    'B1': '2:3',
    'A1': '3:3',
    'C1': '2:5',
    'D1': '3:5',
    'B2': '2:7',
    'C2': '3:7',
    'D2': '2:9',
    'A2': '3:9',
  },
  cost: 0
}

function nextMoves(positions, currentCost) {
  if (isEndPosition(positions)) return END;

  // for each player...
  let moves = Object.keys(positions).reduce((acc, player) => {
    // for each valid move...

    const moves = Object.keys(map).filter(spot => isValidMove(map, positions, player, spot)).map(spot => {
      const newPosition = {...positions, [player]: spot};
      const newCost = currentCost + cost(player, positions[player], spot);
      return {
        positions: newPosition,
        cost: newCost,
        next: []
      }
    })
    return [...acc, ...moves].sort((a,b) => a.cost - b.cost)
  }, [])

  moves.forEach(m => m.next = nextMoves(m.positions, m.cost))
  return moves;
}

const queue = [];

START.next = nextMoves(START.positions, START.cost);

console.log(START);
let result = 0
console.log({ result })



/*  timing */
const end = hrtime.bigint();
console.log(chalk.green("Done in %dms"), parseFloat((end - start) / BigInt(10000)) / 100)
/*  timing */
