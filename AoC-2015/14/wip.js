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
      period: parseInt(length) + parseInt(rest),
      total: 0,
      points: 0,
    };
  });

for (let i = 0; i < 2503; i++) {
  let maxLength = 0;
  for (let r = 0; r < input.length; r++) {
    let rain = input[r];
    let t = i % rain.period;
    if (t < rain.length) rain.total += rain.speed;
    if (rain.total > maxLength) maxLength = rain.total;
  }

  for (let rein of input) {
    if (rein.total == maxLength) rein.points += 1;
  }
}

let result = Math.max(...input.map((r) => r.points));
console.log({ result });

// [
//   2640,
//   2496,
//   2540,
//   2592,
//   2655,
//   2460,
//   2493,
//   2484,
//   2516
// ];
