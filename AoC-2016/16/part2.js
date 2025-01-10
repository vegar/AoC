const input = require('fs')
  .readFileSync(require('path').join(__dirname, 'input.txt'), 'utf8')
  .trim()


const pad = (a) => {
  b = a.split('').reverse().map(c => c == '1' ? '0' : '1').join('');
  return `${a}0${b}`
}

const half = (str) => {
  let result = '';
  for (let x = 0; x < str.length; x += 2) {
    if (str[x] == str[x + 1]) result += '1';
    else result += '0';
  }
  return result;
}

const checksum = (a, length) => {
  while (a.length < length)
    a = pad(a)

  check = half(a.slice(0, length));
  while (check.length % 2 == 0)
    check = half(check);

  return check;
}


let result = checksum(input, 35651584)
console.log({ result })
