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

const closingTag = {
  '(': ')',
  '[': ']',
  '{': '}',
  '<': '>'
}

const points = {
  ')': 1,
  ']': 2,
  '}': 3,
  '>': 4,
}

const score = [];
input.forEach((l, idx) => {
  let s = [];
  let corrupt = false;
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
          corrupt = true;
          break;
        }
        break;
    }
  }
  if (!corrupt) {
    lineScore = 0;
    while (s.length > 0) {
      lineScore *= 5;
      let missingClosingTag = closingTag[s.pop()];
      lineScore += points[missingClosingTag];
    }
    score.push(lineScore);
  }
});

score.sort((a,b) => a-b);

let result = score[(score.length-1) / 2]
console.log({ result })
