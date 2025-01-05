const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim();

let x = 0;
let y = 0;
let positions = new Set();
positions.add("0,0");
input.split("").forEach((d) => {
  switch (d) {
    case "^":
      y -= 1;
      break;
    case "<":
      x -= 1;
      break;
    case ">":
      x += 1;
      break;
    case "v":
      y += 1;
      break;
  }

  positions.add(`${x},${y}`);
});

let result = positions.size;
console.log({ result });
