const input = require('fs')
  .readFileSync(require('path').join(__dirname, 'input.txt'), 'utf8')
  .trim()
  .split(/\r?\n/)
  .map(l => l.split('').map(c => parseInt(c)))


const adjacent = (x,y) => {
  const r = [];

  if (y-1 >= 0) r.push(input[y-1][x])
  if (y+1 < input.length) r.push(input[y+1][x])
  if (x-1 >= 0) r.push(input[y][x-1])
  if (x+1 < input[y].length) r.push(input[y][x+1])

  return r;
}

const adjacentCoord = (x,y) => {
  const r = [];

  if (y-1 >= 0) r.push({x, y: y-1})
  if (y+1 < input.length) r.push({x, y: y+1})
  if (x-1 >= 0) r.push({x: x-1, y})
  if (x+1 < input[y].length) r.push({x: x+1, y})

  return r;
}

const lowPoints = []
for (y = 0; y < input.length; y++)
  for (x = 0; x < input[y].length;  x++)
  {
    if (adjacent(x,y).every(a => a > input[y][x])) {
      lowPoints.push({x,y})
    };
  }

lowPointsSize = [];

for (let lp of lowPoints) {
  let queue = [];
  queue.push(lp)
  let visited = new Set()
  size = 0;
  while (queue.length > 0) {
    let {x,y} = queue.pop();

    if (visited.has(`${x},${y}`)) continue;

    visited.add(`${x},${y}`)
    size++;

    adjacentCoord(x,y)
      .filter(p => !visited.has(`${p.x},${p.y}`) && input[p.y][p.x] < 9)
      .forEach(p => {
        queue.push(p)
      });
  }
  lowPointsSize.push(size);
}

console.log(lowPointsSize.sort((a,b) => a-b).slice(-3))

let result = lowPointsSize.sort((a,b) => a-b).slice(-3).reduce((acc, curr) => acc * curr)
console.log({ result })
