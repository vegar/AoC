const input = require('fs')
  .readFileSync(require('path').join(__dirname, 'input.txt'), 'utf8')
  .trim()

const key = (y, x) => y * 100000000 + x;

const initialMap = input.split('\n').map(row => row.split(''));
const infected = initialMap.reduce((infected, row, y) => {

  for (let x = 0; x < row.length; x++) {
    if (row[x] == '#') {
      infected.add(key(y, x));
    }
  }

  return infected;
}, new Set())

let carrier = {
  x: (initialMap[0].length - 1) / 2,
  y: (initialMap.length - 1) / 2,
  direction: { x: 0, y: -1 }
}

const turnRight = (carrier) => {
  const newX = carrier.direction.x == 0 ? carrier.direction.y * -1 : 0;
  const newY = carrier.direction.y == 0 ? carrier.direction.x : 0;
  return { ...carrier, direction: { x: newX, y: newY } }
}

const turnLeft = (carrier) => {
  const newX = carrier.direction.x == 0 ? carrier.direction.y : 0;
  const newY = carrier.direction.y == 0 ? carrier.direction.x * -1 : 0;
  return { ...carrier, direction: { x: newX, y: newY } }
}

const move = (carrier) => ({ ...carrier, x: carrier.x + carrier.direction.x, y: carrier.y + carrier.direction.y })

const burst = (infected, carrier) => {
  let didInfect = false;
  const currentPos = key(carrier.y, carrier.x);
  const isCurrentInfected = infected.has(currentPos);
  carrier = isCurrentInfected ? turnRight(carrier) : turnLeft(carrier);

  if (isCurrentInfected) infected.delete(currentPos)
  else {
    infected.add(currentPos);
    didInfect = true;
  }

  carrier = move(carrier);

  return [infected, carrier, didInfect];
}

let rounds = 10000;
let infections = 0;
while (rounds > 0) {
  let didInfect = false;
  [_, carrier, didInfect] = burst(infected, carrier)
  infections += didInfect ? 1 : 0;
  rounds--;
}

let result = infections;
console.log({ result })
