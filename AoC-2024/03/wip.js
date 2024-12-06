const input = require('fs')
  .readFileSync(require('path').join(__dirname, 'input.txt'), 'utf8')
  .trim()

const regexp = /do\(\)|don't\(\)|mul\((\d{1,3}),(\d{1,3})\)/g;

const matches = [...input.matchAll(regexp)];


let d = true;
let sum = 0;
for (const match of matches) {
  console.log(`${match[0]} - sum = ${sum}`);
  if (match[0] == 'do()') { d = true }
  else if (match[0] == "don't()") { d = false }
  else if (d) {
    sum += (parseInt(match[1]) * parseInt(match[2]));
  }
}


let result = sum;
console.log({ result })
