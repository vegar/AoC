const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim();

const withOut = (list, idx) => {
  return list.filter((_, i) => i != idx);
};

const check = (report) => {
  if (report[0] == report[1]) return false;

  let idx = 1;
  let sign = Math.sign(report[0] - report[1]);
  while (idx < report.length) {
    if (Math.sign(report[idx - 1] - report[idx]) != sign) return false;
    if (
      Math.abs(report[idx - 1] - report[idx]) > 3 ||
      report[idx - 1] == report[idx]
    ) {
      return false;
    }
    idx++;
  }
  return true;
};
const reports = input.split("\n").filter((report) => {
  const numbers = report.split(" ").map((r) => parseInt(r));
  if (check(numbers)) return true;
  let idx = 0;
  while (idx < numbers.length) {
    if (check(withOut(numbers, idx))) return true;
    idx++;
  }

  return false;
});

let result = reports.length;
console.log({ result });
