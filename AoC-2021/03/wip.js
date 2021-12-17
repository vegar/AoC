const input = require('fs')
  .readFileSync(require('path').join(__dirname, 'input.txt'), 'utf8')
  .trim()
  .split(/\r?\n/)

  .map(l => l.split('').map(b => parseFloat(b)))


  let oxygen = [...input]
  let idx = 0;
  while (oxygen.length > 1)
  {
    const mostCommonBit = oxygen.reduce((p, c) => p + c[idx], 0) >= oxygen.length/2 ? 1 : 0;
    oxygen = oxygen.filter(v => v[idx] == mostCommonBit )
    idx++
  }
  console.log(oxygen[0].join(''))


  let scrubber = [...input]
  idx = 0;
  while (scrubber.length > 1)
  {
    const mostCommonBit = scrubber.reduce((p, c) => p + c[idx], 0) >= scrubber.length/2 ? 0 : 1;
    scrubber = scrubber.filter(v => v[idx] == mostCommonBit )
    idx++
  }
  console.log(scrubber[0].join(''))

  result = parseInt(oxygen[0].join(''), 2) * parseInt(scrubber[0].join(''), 2)

console.log({ result })
