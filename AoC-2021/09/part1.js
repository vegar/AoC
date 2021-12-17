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

const lowPoints = []
for (y = 0; y < input.length; y++)
  for (x = 0; x < input[y].length;  x++)
  {
    if (adjacent(x,y).every(a => a > input[y][x])) {
      lowPoints.push(input[y][x] + 1)
      console.log(`Is ${input[y][x]} lower than all of [${adjacent(x,y).join(',')}] ?  Yes!`)

    } else {
      console.log(`Is ${input[y][x]} lower than all of [${adjacent(x,y).join(',')}] ?  No!`)

    };
  }


let result = lowPoints.reduce((acc, curr) => acc + curr);
console.log({ result })
