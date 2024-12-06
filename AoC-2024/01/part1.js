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

list1.sort((a, b) => b - a);
list2.sort((a, b) => b - a);

console.log(list2);

const result = list1
  .map((v, idx) => {
    return Math.abs(v - list2[idx]);
  })
  .reduce((sum, curr) => {
    //console.log(`Sum: ${sum}, Curr: ${curr}`);
    return sum + curr;
  }, 0);

console.log({ result });
