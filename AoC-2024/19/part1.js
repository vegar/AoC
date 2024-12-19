const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim();

let [available, wanted] = input.split("\n\n");

available = available.split(", ");
wanted = wanted.split("\n");

const cache = new Map([["", 1]]);
//console.log(`Available: `, cache);
const test = (pattern, count) => {
  if (cache.has(pattern)) {
    return cache.get(pattern);
  }

  for (const towel of available) {
    if (pattern.startsWith(towel))
      count += test(pattern.slice(towel.length), 0);
  }

  cache.set(pattern, count);
  return count;
};

const count = wanted.map((p) => test(p, 0));

let result = count.filter((p) => p > 0).length;
console.log({ result });
