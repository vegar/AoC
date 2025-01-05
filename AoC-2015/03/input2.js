const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim();

let sx = 0;
let sy = 0;
let rx = 0;
let ry = 0;
let positions = new Set();
positions.add("0,0");
input.split("").forEach((d, i) => {
  if (i % 2 == 0) {
    switch (d) {
      case "^":
        sy -= 1;
        break;
      case "<":
        sx -= 1;
        break;
      case ">":
        sx += 1;
        break;
      case "v":
        sy += 1;
        break;
    }

    positions.add(`${sx},${sy}`);
  } else {
    switch (d) {
      case "^":
        ry -= 1;
        break;
      case "<":
        rx -= 1;
        break;
      case ">":
        rx += 1;
        break;
      case "v":
        ry += 1;
        break;
    }

    positions.add(`${rx},${ry}`);
  }
});

let result = positions.size;
console.log({ result });
