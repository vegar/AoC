const input = require('fs')
  .readFileSync(require('path').join(__dirname, 'input.txt'), 'utf8')
  .trim()

  let result = 0
  input.split(/\r?\n/).map(l => parseFloat(l)).reduce((p, c) => {
    if (c > p) result++
    return c
  })

console.log({ result })
