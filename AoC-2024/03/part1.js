const input = require('fs')
  .readFileSync(require('path').join(__dirname, 'input.txt'), 'utf8')
  .trim()

const regexp = /mul\((\d{1,3}),(\d{1,3})\)/g;

const matches = [...input.matchAll(regexp)];
;
let result = matches.map(m => parseInt(m[1]) * parseInt(m[2])).reduce((sum, curr) => sum + curr)
console.log({ result })
