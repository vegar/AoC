import chalk from 'chalk';
import { readFileSync } from 'fs';
import path from 'path';

/*  timing */
import { hrtime } from 'process';
const startTimer = hrtime.bigint();
/*  timing */


function isDigit(c) {
  return c.match(/\d/);
}

function findNumberToLeft(str) {
  let pos = str.length -1;
  let digits = '';
  while (pos >= 0) {
    if (isDigit(str[pos])) digits = str[pos] + digits;
    else if (digits != '') return {
      start: pos+1,
      end: pos+1 + digits.length,
      digits: parseInt(digits)
    };

    pos--;
  }
}

function findNumberToRight(str) {
  let pos = 0;
  let digits = '';
  while (pos < str.length) {
    if (isDigit(str[pos])) digits = digits + str[pos];
    else if (digits != '') return {
      start: pos  - digits.length,
      end: pos,
      digits: parseInt(digits)
    }

    pos++
  }
}

function findPointToExplode(str) {
  let pos = 0;
  let level = 0;
  while (pos < str.length) {
    if (str[pos] == '[') {
      level++;
      if (level > 4) {
        const start = pos;
        const end = str.indexOf(']', start) + 1

        return {start, end};
      }
    }
    if (str[pos] == ']') level--


    pos++
  }

  return null;
}

function explode(str, start, end) {

  let pair = str.substring(start+1, end-1).split(',').map(n => parseInt(n));

  let startStr = str.substring(0, start);
  let endStr = str.substring(end);

  //find number to left
  const left = findNumberToLeft(startStr)
  const right = findNumberToRight(endStr);

  if (left) {
    startStr = startStr.substring(0, left.start) + (left.digits + pair[0]) + startStr.substring(left.end);
  }

  if (right) {
    endStr = endStr.substring(0, right.start) + (right.digits + pair[1]) + endStr.substring(right.end);
  }

  const newStr =  `${startStr}0${endStr}`;

  return newStr;
}

function findDigitToSplit(str) {
  const m = str.match(/(\d{2,})/);
  if (m)  {
    return {
      start: m.index,
      end: m.index + m.length,
    }
  }
}

function split(str, start, end) {

  const startStr = str.substring(0, start);
  const endStr = str.substring(end);
  const digits = parseInt(str.substring(start, end));

  const newStr = startStr + `[${Math.floor(digits/2)},${Math.ceil(digits/2)}]` + endStr;

    return newStr;
}

function reduce(str)  {
  let newStr = str;
  while (true) {
    const f = findPointToExplode(newStr);
    if (f) {
      newStr = explode(newStr, f.start, f.end);
      continue;
    }

    const d = findDigitToSplit(newStr);
    if (d) {
      newStr = split(newStr, d.start, d.end);
      continue;
    }

    if (!f && !d) break;
  }

  return newStr;
}


function add(str1, str2) {
  return reduce(`[${str1},${str2}]`)
}

function parser(input, start = 1, parent = null) {
  let pos = start;
  let str = ''
  let pair = {
    left: null,
    right: null,
    parent
  }

  while (pos < input.length) {
    let currChar = input[pos]

    // starting a new pair
    if (currChar == '[') {
      let [newP, newPos] = parser(input, ++pos, pair);
      str = newP;
      pos = newPos;
    }
    // ending a pair
    else if (currChar == ']')
    {
      const n = parseInt(str);
      pair.right = isNaN(n) ? str : n;
      str = '';
      return [pair, ++pos]
    }
    // split left/right
    else if (currChar == ',') {
      const n = parseInt(str);
      pair.left = isNaN(n) ? str : n;
      str = ''
      pos++
    }
    // content of pair
    else {
      str += currChar;
      pos++
    }
  }

  return str;
}


function magnitude(str) {
  if (typeof str == 'number') return str;
  if (typeof str == 'string') {
    const [root, _] = parser(str);
    return magnitude(root);
  }

  return 3 * magnitude(str.left) + 2 * magnitude(str.right);
}


const input = readFileSync(path.join(path.resolve(), 'input.txt'), 'utf8')
  .trim()
  .split(/\r?\n/)


let largerSum = 0;

for (let index = 0; index < input.length-1; index++) {
  const first = input[index];
  for (let next = index; next < input.length; next++) {
    const second = input[next];

    let m = magnitude(add(first, second));
    if (m > largerSum) largerSum = m;

    let m2 = magnitude(add(second, first));
    if (m2 > largerSum) largerSum = m2;
  }
}


let result = largerSum;
console.log({ result })


/*  timing */
const endTimer = hrtime.bigint();
console.log(chalk.green("Done in %dms"), parseFloat((endTimer - startTimer) / BigInt(10000)) / 100)
/*  timing */
