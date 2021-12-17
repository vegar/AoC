const input = require('fs')
  .readFileSync(require('path').join(__dirname, 'input.txt'), 'utf8')
  .trim()
  .split(/\r?\n/);

  const dots = input.slice(0, input.indexOf('')).map(l => l.split(',').map(d => parseInt(d)))
  const folds = input.slice(input.indexOf('')+1).map(l => l.match(/(?<dir>x|y)=(?<line>\d+)/).groups)

  console.log(dots)

const fold = (dir, line, [x,y]) => {
  let newx = x;
  let newy = y;
  if (dir == 'x' && x > line) newx = x - (x-line)*2;
  if (dir == 'y' && y > line) newy = y - (y-line)*2;
  return [newx,newy];
}

const newDots = dots.map(d => fold(folds[0].dir, folds[0].line, d))
const enddots = newDots.filter((c,idx,list) => list.findIndex((v) => v[0] == c[0] && v[1] == c[1]) == idx);

console.log(enddots)

let result = enddots.length
console.log({ result })
