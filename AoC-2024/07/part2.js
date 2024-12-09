const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim()
  .split("\n")
  .map((l) => {
    let [target, numbers] = l.split(":");
    return {
      target: parseInt(target),
      numbers: numbers
        .trim()
        .split(" ")
        .map((n) => parseInt(n)),
    };
  });

const test = (target, sum, numbers) => {
  if (sum > target) return false;
  if (numbers.length == 0) return target == sum;

  return (
    test(target, sum * numbers[0], numbers.slice(1)) ||
    test(target, sum + numbers[0], numbers.slice(1)) ||
    test(target, parseInt([sum, numbers[0]].join("")), numbers.slice(1))
  );
};

const possible = input.filter((eq) => {
  return test(eq.target, eq.numbers[0], eq.numbers.slice(1));
});

console.log(possible);

let result = possible.reduce((sum, curr) => sum + curr.target, 0);
console.log({ result });
