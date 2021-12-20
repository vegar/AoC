import chalk from 'chalk';
import { readFileSync } from 'fs';
import path, { parse } from 'path';

/*  timing */
import { hrtime } from 'process';
const start = hrtime.bigint();
/*  timing */

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

function logTree(root, level = 0, isRight = false) {
  if (typeof root == 'number')  {
    console.log(`${'│'.repeat(level-1)}${isRight ? '├' : '┕'}${root}`)
  }
    else {
    if (level > 0) console.log(`${level > 0 ? '│'.repeat(level-1) : ''}${isRight ? '├' : '┕'}*`)
    logTree(root.right, level + 1, true)
    logTree(root.left, level + 1, false)
  }
}

function numberToString(root) {
  if (root == null) return '';
  if (typeof root == 'number') return root.toString();
  return `[${numberToString(root.left)},${numberToString(root.right)}]`
}

function findPairToExplode(root, level = 1) {
  if (typeof root == 'number')
    return null;

  if (level > 4)
    return root;

  let node = findPairToExplode(root.left, level + 1) ?? findPairToExplode(root.right, level + 1);

  return node;
}

function findNodeToLeft(rr) {
  //move up til we find a left node...
  let current = rr;
  let parent = current.parent;
  while (parent != null) {
    if (parent.left != current) break;
    current = parent;
    parent = current.parent;
  }

  // if @ root, give up
  if (parent == null) return null;

  current = parent;
  if  (typeof current.left != 'number' ) {
  // step down to the left
    current = current.left;

    //move down til we find a right leaf..
    while (typeof current.right != 'number')
      current = current.right;
  }
  return current;
}

function findNodeToRight(rr) {
  //move up til we find a right node...
  let current = rr;
  let parent = current.parent;
  while (parent != null) {
    if (parent.right != current) break;
    current = parent;
    parent = current.parent;
  }

  // if @ root, give up
  if (parent == null) return null;

  current = parent;
  if  (typeof current.right != 'number') {
    // step down to the right
    current = current.right;

    //move down til we find a left leaf..
    while (typeof current.left != 'number')
      current = current.left;
  }

  return current;
}


function explode(node) {
  //add
  const left = findNodeToLeft(node);
  const right = findNodeToRight(node);

  if (left) {
    if (typeof left.right != 'number') left.left += node.left;
    else left.right += node.left;
  }
  if (right) {
    if (typeof right.left != 'number') right.right += node.right;
    else right.left  += node.right;
  }


  // replace self with 0
  if (node.parent.left == node) node.parent.left = 0
  if (node.parent.right == node) node.parent.right = 0
}

function split(node) {
  if (node.left > 9)
  {
    node.left = { parent: node, left: Math.floor(node.left / 2), right: Math.ceil(node.left / 2) }
  } else if (node.right > 9) {
    node.right = { parent: node, left: Math.floor(node.right / 2), right: Math.ceil(node.right / 2) }
  }
}

function findNodeToSplit(root) {
  if (typeof root == 'number') return null;
  if (root.left > 9 || root.right > 9) return root;

  return findNodeToSplit(root.left) ?? findNodeToSplit(root.right);
}

function reduce(root){
  console.log('Reducing: '.padEnd(17, ' '), numberToString(root))
  while (true) {
    let e = findPairToExplode(root);
    if (e != null) {
      explode(e);
      console.log('after explode:'.padEnd(17, ' '), numberToString(root))
      continue;
    }

    let s = findNodeToSplit(root);
    if (s != null) {
      split(s);
      console.log('after split:'.padEnd(17, ' '), numberToString(root))
    }
    if (e == null && s == null) return root;
  }
}

function add(pair1, pair2) {
  const newPair = {
    left: pair1,
    right: pair2,
    parent: null
  }

  pair1.parent = newPair;
  pair2.parent = newPair;
  reduce(newPair);

  return newPair;
}

// const file = path.join(path.resolve(), 'test.txt');
// const input = readFileSync(file, 'utf8')
//   .trim()
//   .split(/\r?\n/)

// const final = input
//   .map(l => parser(l)[0])
//   .reduce((acc, curr) => {
//     console.log(`   ${numberToString(acc)}]`)
//     console.log(` + ${numberToString(curr)}]`)
//     const newNumber = add(acc, curr);
//     console.log(` = ${numberToString(newNumber)}]`)
//     console.log('')

//     return newNumber;
//   });

const [str1, _] = parser('[[[[7,0],[7,7]],[[7,7],[7,8]]],[[[7,7],[8,8]],[[7,7],[8,7]]]]]')
const [str2, __] = parser('[7,[5,[[3,8],[1,4]]]]]')
const sum = add(str1, str2)


//= [[[[7,7],[7,8]],[[9,5],[8,7]]],[[[7,8],[0,8]],[[8,9],[9,0]]]]]

let result = 0
console.log({ result })


/*  timing */
const end = hrtime.bigint();
console.log(chalk.green("Done in %dms"), parseFloat((end - start) / BigInt(10000)) / 100)
/*  timing */
