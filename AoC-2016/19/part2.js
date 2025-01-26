const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim();

let sample = false;

let count = sample ? 5 : parseInt(input);

const solve = (count) => {
  let elfs = Array(count)
    .fill(1)
    .map((e, idx) => [e, idx + 1]);

  let i = 0;
  while (elfs.length > 1) {
    let elf = i % elfs.length;
    let opposite = (elf + Math.floor(elfs.length / 2)) % elfs.length;
    elfs.splice(opposite, 1);
    i++;

    //console.log(elfs.length);
  }
  return elfs[0][1];
};

const solve2 = (count) => {
  let p = Math.floor(Math.log(count) / Math.log(3));
  let b = Math.pow(3, p);
  if (b == count) return count;
  if (count - b <= b) return count - b;
  return 2 * count - 3 * b;
};

let result = solve2(count);
console.log({ result });
