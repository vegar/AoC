const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim();

let sample = false;

// let count = sample ? 5 : parseInt(input);
// let elfs = Array(count).fill(1);

// let i = 0;
// while (true) {
//   let elf = i % count;
//   if (elfs[i % count] > 0) {
//     let nextElf = (elf + 1) % count;
//     while (elfs[nextElf] == 0) nextElf = (nextElf + 1) % count;

//     elfs[elf] += elfs[nextElf];
//     elfs[nextElf] = 0;

//     if (elfs[elf] == count) break;
//   }
//   i++;
// }
// let result = //(i + 1) % count;

// The Josephus Problem

let bits = parseInt(input).toString(2);
let n = bits.substring(2) + bits[0];
let result = parseInt(n, 2);

console.log({ result });

// 1841611
