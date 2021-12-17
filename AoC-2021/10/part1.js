const input = require('fs')
  .readFileSync(require('path').join(__dirname, 'input.txt'), 'utf8')
  .trim()
  .split(/\r?\n/)

const openingTag = {
  ')': '(',
  ']': '[',
  '}': '{',
  '>': '<'
}

const points = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
}

const score = [];
input.forEach(l => {
  let s = [];
  for (let c of l.split('')) {
    switch (c) {
      case '(':
      case '[':
      case '{':
      case '<':
        s.push(c);
        break;
      case ')':
      case ']':
      case '}':
      case '>':
        let o = s.pop();
        if (o != openingTag[c])
        {
          score.push(points[c]);
        }
        break;
      default:
        console.log(`unexpected character: ${c}`)
    }
  }
});

let result = score.reduce((acc,curr) => acc+curr);
console.log({ result })
