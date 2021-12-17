const input = require('fs')
  .readFileSync(require('path').join(__dirname, 'input.txt'), 'utf8')
  .trim()
  .split(/\r?\n/);

const result = input
  .map(line => {
    return line.substring(line.indexOf('|')).trim().split(' ')
  })
  .reduce((acc, curr) => {
    return acc + curr.filter(s => s.length == 3 || s.length == 2 || s.length == 4 || s.length == 7).length
  }, 0)

console.log({ result })
