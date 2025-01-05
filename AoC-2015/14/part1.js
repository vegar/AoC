const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim()
  .split("\n")
  .map((line) => {
    let [_, name, speed, length, rest] = Array.from(
      line.match(/(\w+) .* (\d+) .* (\d+) .* (\d+)/)
    );

    return {
      name,
      speed: parseInt(speed),
      length: parseInt(length),
      rest: parseInt(rest),
    };
  });

let all = input.map((rein) => {
  let whole = Math.trunc(2503 / (rein.length + rein.rest));
  let rest = 2503 % (rein.length + rein.rest);

  let length =
    whole * rein.length * rein.speed + Math.min(rein.length, rest) * rein.speed;

  return length;
});

console.log(all);

let result = Math.max(...all);
console.log({ result });
