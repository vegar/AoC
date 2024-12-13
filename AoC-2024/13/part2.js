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
        x: 10000000000000 + price[0],
        y: 10000000000000 + price[1],
      },
    };
  });

const findprice = (machine) => {
  let a = Math.floor(
    (machine.price.x * machine.b.y - machine.price.y * machine.b.x) /
      (machine.b.y * machine.a.x - machine.b.x * machine.a.y)
  );
  let b = Math.floor(
    (machine.price.x * machine.a.y - machine.price.y * machine.a.x) /
      (machine.a.y * machine.b.x - machine.b.y * machine.a.x)
  );

  let x = machine.a.x * a + machine.b.x * b;
  let y = machine.a.y * a + machine.b.y * b;
  if (x == machine.price.x && y == machine.price.y) return a * 3 + b;
  return 0;
};

findprice(input[0]);

let result = input.reduce((sum, curr) => sum + findprice(curr), 0);
console.log({ result });
