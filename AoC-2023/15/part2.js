const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim()
  .split(",");

let boxes = [...Array(256)].map((x) => []);

const hash = (label) =>
  label.split("").reduce((sum, letter) => {
    sum += letter.charCodeAt(0);
    sum *= 17;
    sum %= 256;
    return sum;
  }, 0);

for (let i of input) {
  const m = i.match(/^([^=^-]+)(=|-)(\d*)$/);
  const [_, label, operation, focal] = m;
  const box = hash(label);

  if (operation == "-") {
    let idx = boxes[box].findIndex((l) => l.label == label);
    if (idx >= 0) boxes[box].splice(idx, 1);
  }
  if (operation == "=") {
    let idx = boxes[box].findIndex((l) => l.label == label);

    if (idx >= 0) {
      boxes[box][idx].focal = parseInt(focal);
    } else {
      boxes[box].push({ label, focal: parseInt(focal) });
    }
  }
}

let result = boxes.reduce((sum, box, boxidx) => {
  return (
    sum +
    box
      .map((l, idx) => {
        let value = (boxidx + 1) * (idx + 1) * l.focal;
        console.log(
          `${l.label}: ${boxidx + 1} (box ${boxidx}) * ${
            idx + 1
          } (${idx}th slot) * ${l.focal} (focal length) = ${value}`
        );
        return value;
      })
      .reduce((acc, curr) => acc + curr, 0)
  );
}, 0);

console.log({ result });
