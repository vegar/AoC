const input = require('fs')
  .readFileSync(require('path').join(__dirname, 'input.txt'), 'utf8')
  .trim()
  .split(/\r?\n/);

const lines = input.map(line => ({...line.match(/(?<x1>[0-9]+),(?<y1>[0-9]+) -> (?<x2>[0-9]+),(?<y2>[0-9]+)/).groups})) ;

const coordinates = {};

const lineToPoints = ({x1,y1,x2,y2}) => {
  var points = [];
  if (x1 == x2 || y1 == y2) {
    for (x = Math.min(x1,x2); x <= Math.max(x1,x2); x++)
      for (y = Math.min(y1,y2); y <= Math.max(y1,y2); y++)
        points.push(`${x},${y}`)
  } else {
    const dx = parseInt(x1) < parseInt(x2) ? 1 : -1;
    const dy = parseInt(y1) < parseInt(y2) ? 1 : -1;
    let y = parseInt(y1);
    let x = parseInt(x1);
    var p = [];
    while (x != parseInt(x2)+dx) {
      points.push(`${x},${y}`)
      p.push(`${x},${y}`)
      x += dx;
      y += dy;
    }
  }
  return points;
}


lines.forEach((l) => {
  lineToPoints(l).forEach(p => {
    if (!coordinates[p]) coordinates[p] = 0;

    coordinates[p] += 1;
  })
})

let result = Object.values(coordinates).filter(x => x > 1).length;


console.log({ result })
