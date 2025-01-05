const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim();

const goal = parseInt(input);

const factors = (number) => {
  let j = number;
  let factors = [];
  if (number == 1) return [1];
  for (let i = 1; i < j; i++) {
    if (number % i == 0) {
      j = number / i;
      factors.push(i, j);
    }
  }

  return factors;
};

const presents = (house) => {
  return factors(house)
    .filter((factor) => factor * 50 >= house)
    .reduce((sum, curr) => sum + curr * 11, 0);
};

let house = 1;
while (true) {
  if (presents(house) >= goal) break;
  house++;

  if (house % 1000 == 0) console.log(`Checking house ${house}`);
}

let result = house;
console.log({ result });
