const input = require('fs')
  .readFileSync(require('path').join(__dirname, 'input.txt'), 'utf8')
  .trim()
  .split(/\r?\n/)


const octopies = input.map(line => line.split('').map(o => ({charge: parseInt(o), flashed: false})));

const adjencent = (x,y) => {
  const all = [
    {x: x-1, y: y-1},
    {x: x-1, y: y},
    {x: x-1, y: y+1},
    {x: x, y: y-1},
    {x: x, y: y+1},
    {x: x+1, y: y-1},
    {x: x+1, y: y},
    {x: x+1, y: y+1},
  ]

  return all.filter(({x,y}) => x >= 0 && x < octopies[0].length && y >= 0 && y < octopies.length)
}

const findReady = () => {
  const ready = [];
  for (let y = 0; y < octopies.length; y++) {
    for (let x = 0; x < octopies[y].length; x++) {
      if (octopies[y][x].charge > 9 && !octopies[y][x].flashed) {
        ready.push({x,y});
      };
    }
  }

  return ready;
}

const runRound = () => {

  // inc
  for (let y = 0; y < octopies.length; y++) {
    for (let x = 0; x < octopies[y].length; x++) {
      octopies[y][x].flashed = false;
      octopies[y][x].charge += 1;
    }
  }


  let flashQueue = findReady();
  while (flashQueue.length) {
    flashQueue.forEach(({x,y}) => {
      octopies[y][x].flashed = true;
      adjencent(x,y).forEach((a) => {
        octopies[a.y][a.x].charge += 1;
      })
    });

    flashQueue = findReady();
  }

  // reset
  let flashes = 0;
  for (let y = 0; y < octopies.length; y++) {
    for (let x = 0; x < octopies[y].length; x++) {
      if (octopies[y][x].flashed) {
        flashes++
        octopies[y][x] = {
          charge: 0,
          flashed: octopies[y][x].flashed
        };
      }
    }
  }

  return flashes;
}

const runRounds = () => {
  let flashCount = 0;
  let round = 0;
  while (flashCount != 100) {
    flashCount = runRound()
    round++
  }
  return round;
}

let result = runRounds();
console.log({ result })
