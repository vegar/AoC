const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim();

const reports = input.split("\n").filter((report) => {
  const numbers = report.split(" ").map((r) => parseInt(r));

  if (numbers[0] == numbers[1]) return false;

  let idx = 1;
  let sign = Math.sign(numbers[0] - numbers[1]);
  while (idx < numbers.length) {
    if (Math.sign(numbers[idx - 1] - numbers[idx]) != sign) return false;
    if (
      Math.abs(numbers[idx - 1] - numbers[idx]) > 3 ||
      numbers[idx - 1] == numbers[idx]
    ) {
      return false;
    }
    idx++;
  }
  console.log(`checking ${numbers}  - ${sign}`);
  console.log("   Looks good!");
  return true;
});

let result = reports.length;
console.log({ result });
