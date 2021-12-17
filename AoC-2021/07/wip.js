const input = require('fs')
  .readFileSync(require('path').join(__dirname, 'input.txt'), 'utf8')
  .trim()
  .split(',')
  .map(n => parseInt(n));


const min = Math.min(...input);
const max = Math.max(...input);

const fuelCost = [];

for (let target = 0; target <= 1990; target++) {
  fuelCost.push(input.reduce((acc, curr) => {
    let n = Math.abs(curr-target);

    return acc + (n*(n+1) / 2)
  }, 0));
}
let result = Math.min(...fuelCost);
console.log({ result })
