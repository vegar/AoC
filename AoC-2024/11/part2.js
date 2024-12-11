const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim()
  .split(" ")
  .map((l) => parseInt(l));

const split = (n) => {
  let s = n.toString();
  return [
    parseInt(s.substring(0, s.length / 2)),
    parseInt(s.substring(s.length / 2)),
  ];
};

const cache = new Map();

const count = (n, times) => {
  if (cache.has(`${n}:${times}`)) return cache.get(`${n}:${times}`);

  let result;

  if (times == 0) result = 1;
  else if (n == 0) result = count(1, times - 1);
  else if (n.toString().length % 2 == 1) result = count(n * 2024, times - 1);
  else {
    let [l, r] = split(n);
    result = count(l, times - 1) + count(r, times - 1);
  }
  cache.set(`${n}:${times}`, result);

  return result;
};

let result = input.reduce((sum, curr) => sum + count(curr, 75), 0);
console.log({ result });
