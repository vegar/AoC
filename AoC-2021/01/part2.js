const input = require('fs')
  .readFileSync(require('path').join(__dirname, 'input.txt'), 'utf8')
  .trim()

  input.split(/\r?\n/)
  .map(l => parseFloat(l))
  .reduce((agg, curr, idx, a) => {
      if (idx < 2) return agg;

      agg.push(a[idx] + a[idx-1] + a[idx-2])

      return agg;
    }, [])
    .reduce((p, c) => {
      if (c > p) result++
      return c
  })

console.log({ result })
