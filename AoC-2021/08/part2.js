const input = require('fs')
  .readFileSync(require('path').join(__dirname, 'input.txt'), 'utf8')
  .trim()
  .split(/\r?\n/);



const decode = ([signals, output]) => {
  const key = ['','','','','','','','','','']
  key[1] = signals.find(s => s.length == 2);
  key[4] = signals.find(s => s.length == 4);
  key[7] = signals.find(s => s.length == 3);
  key[8] = signals.find(s => s.length == 7);

  // length 6
  key[9] = signals.find(s => s.length == 6 && key[4].split('').every(c => s.includes(c)))
  key[0] = signals.find(s => s.length == 6 && s != key[9] && key[1].split('').every(c => s.includes(c)))
  key[6] = signals.find(s => s.length == 6 && s != key[0] && s != key[9])

  // length 5
  key[5] = signals.find(s => s.length == 5 && s.split('').every(c => key[6].includes(c)))
  key[3] = signals.find(s => s.length == 5 && s != key[5] && key[1].split('').every(c => s.includes(c)))
  key[2] = signals.find(s => s.length == 5 && s != key[5] && s != key[3])


  const result = output.reduce((acc, curr) => {
    const idx = key.indexOf(curr);
    if (idx < 0) {
      console.log(`could not find ${curr} in keys [${key.join(',')}]`)
    }
    return acc + idx.toString()
  }, '');
  return result;
};


const result = input
  .map(line => {
    const [signal, output] = line.split('|');
    return [
      signal.trim().split(' ').map(s => s.split('').sort().join('')),
      output.trim().split(' ').map(s => s.split('').sort().join(''))
    ];
  })
  .map(l => decode(l))
  .reduce((acc, curr) => acc + parseInt(curr),0)



console.log({ result })
