const  op = {
  forward: (acc, u) => ({ f: acc.f + u, d: acc.d}),
  up: (acc, u) => ({ f: acc.f, d: acc.d - u}),
  down: (acc, u) => ({ f: acc.f, d: acc.d + u}),
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
  }, { f: 0, d: 0})



let result = input.f * input.d
console.log({ result })
