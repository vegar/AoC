const input = require('fs')
  .readFileSync(require('path').join(__dirname, 'input.txt'), 'utf8')
  .trim()
  .split(/\r?\n/)

  const bitcount = input
    .map(l => l.split('').map(b => parseFloat(b)))
    .reduce((prev, curr) => {
      curr.forEach((v, idx) => prev[idx] += v)
      return prev;
    }, [0,0,0,0,0,0,0,0,0,0,0,0])

    const half = input.length / 2

    console.log(half)

    const [gamma, epsilon] = bitcount.reduce((acc, curr, idx) => {
      if (curr > half) {
        acc[0] += '1'
        acc[1] += '0'
      } else {
        acc[0] += '0'
        acc[1] += '1'
      }

      return acc;
    }, ['', ''])

    let result = parseInt(gamma, 2) * parseInt(epsilon, 2)
console.log({ result })
