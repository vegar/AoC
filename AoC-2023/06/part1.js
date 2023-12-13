const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim();

const [times, distances] = input
  .split("\n")
  .map((line) => [...line.matchAll(/(\d+)/g)].map((m) => parseInt(m[1])));

console.log(times, distances);

let result = times.reduce((acc, time, idx) => {
  const target = distances[idx];
  let hold = 1;
  while ((time - hold) * hold <= target) hold++;
  const minHold = hold;
  hold = time - 1;
  while ((time - hold) * hold <= target) hold--;
  const maxHold = hold;

  console.log(
    `${time}:${target} => from ${minHold} to ${maxHold} = ${
      maxHold - minHold + 1
    }`
  );
  return acc * (maxHold - minHold + 1);
}, 1);
console.log({ result });
