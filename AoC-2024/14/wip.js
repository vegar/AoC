const WIDE = 101;
const TALL = 103;

const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim()
  .split("\n")
  .map((l) => {
    const [x, y, dx, dy] = [...l.matchAll(/(-{0,1}\d+)/g)].map((m) =>
      parseInt(m[0])
    );
    return {
      x,
      y,
      dx,
      dy,
    };
  });

const simulate = (sec) => {
  const newPositions = new Set(
    input.map((c) => {
      let x = (c.x + c.dx * SEC) % WIDE;
      if (x < 0) x += WIDE;
      let y = (c.y + c.dy * SEC) % TALL;
      if (y < 0) y += TALL;
      return `${x}:${y}`;
    })
  );

  return newPositions.size == input.length;
};

const display = (SEC) => {
  console.log(`---------------- ${SEC} -----------------`);
  const newPositions = new Set(
    input.map((c) => {
      let x = (c.x + c.dx * SEC) % WIDE;
      if (x < 0) x += WIDE;
      let y = (c.y + c.dy * SEC) % TALL;
      if (y < 0) y += TALL;
      return `${x}:${y}`;
    })
  );
  for (let y = 0; y < TALL; y++) {
    let row = [];
    for (let x = 0; x < WIDE; x++) {
      if (newPositions.has(`${x}:${y}`)) row.push("#");
      else row.push(" ");
    }
    console.log(row.join(""));
  }
};

let SEC = 0;
while (true) {
  SEC += 1;
  if (simulate(SEC)) break;
}

display(SEC);

let result = SEC;
console.log({ result });
