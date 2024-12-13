const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim()
  .split("\n\n")
  .map((machine) => {
    let [A, B, price] = machine
      .split("\n")
      .map((l) => [...l.matchAll(/(\d+)/g)].map((m) => parseInt(m[0])));

    return {
      a: {
        x: A[0],
        y: A[1],
      },
      b: {
        x: B[0],
        y: B[1],
      },
      price: {
        x: price[0],
        y: price[1],
      },
    };
  });

const cost = {
  A: 3,
  B: 1,
};

const findprice = (machine) => {
  const match = [];
  for (let a = 0; a < 100; a++) {
    for (let b = 0; b < 100; b++) {
      let x = machine.a.x * a + machine.b.x * b;
      let y = machine.a.y * a + machine.b.y * b;
      if (x == machine.price.x && y == machine.price.y) {
        match.push(a * 3 + b);
      }
    }
  }
  return match.length > 0 ? Math.min(match) : 0;
};

findprice(input[0]);

let result = input.reduce((sum, curr) => sum + findprice(curr), 0);
console.log({ result });
