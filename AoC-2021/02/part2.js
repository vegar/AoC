const  op = {
  forward: (acc, u) => ({ forward: acc.forward + u, depth: acc.depth + (acc.aim * u), aim: acc.aim}),
  up: (acc, u) => ({ ...acc, aim: acc.aim - u}),
  down: (acc, u) => ({ ...acc, aim: acc.aim + u}),
}


const input = require('fs')
  .readFileSync(require('path').join(__dirname, 'input.txt'), 'utf8')
  .trim()
  .split(/\r?\n/)
  .map(l => {
    let [d, u] = l.split(' ');
    return { d, u: parseFloat(u)}
  })
  .reduce((acc, curr) => {
     return op[curr.d](acc, curr.u);
  }, { forward: 0, depth: 0, aim: 0})



let result = input.forward * input.depth
console.log({ result })
