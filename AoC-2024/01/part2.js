const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim();

let { list1, list2 } = input
  .split("\n")
  .map((line) => line.split(/\s+/))
  .reduce(
    (lists, current) => {
      lists.list1.push(parseInt(current[0]));
      lists.list2.push(parseInt(current[1]));
      return lists;
    },
    { list1: [], list2: [] }
  );

let count = list2.reduce((acc, curr) => {
  acc[curr] = (acc[curr] ?? 0) + 1;
  return acc;
}, {});

const result = list1
  .map((v, idx) => {
    console.log(`${v} * ${count["" + v]} = ${v * count[v]}`);
    return v * (count[v] ?? 0);
  })
  .reduce((sum, curr) => {
    return sum + curr;
  }, 0);

console.log({ result });
