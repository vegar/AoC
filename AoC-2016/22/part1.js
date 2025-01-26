const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim()
  .split("\n")
  .map((line) => {
    let [name, size, used, avail, use] = line.split(/\s+/);
    return {
      name,
      size: parseInt(size),
      used: parseInt(used),
      avail: parseInt(avail),
      use: parseInt(use),
    };
  });

let pair = [];
for (let i = 2; i < input.length; i++) {
  let A = input[i];
  console.log(A.name);
  for (let j = i + 1; j < input.length; j++) {
    let B = input[j];
    if (j == i) continue;
    if (A.used > 0 && A.used <= B.avail) pair.push([A, B]);
    if (B.used > 0 && B.used <= A.avail) pair.push([B, A]);
  }
}

let result = pair.length;
console.log({ result });

//981 to low
