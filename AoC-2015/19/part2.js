const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim();

let [r, start] = input.split("\n\n");
const replacements = r
  .split("\n")
  .map((line) => line.split(" => "))
  .sort((a, b) => b[1].length - a[1].length);

const make = (start, destination) => {
  let visited = new Set([start]);
  let queue = [{ string: start, count: 0 }];
  const stack = [];

  while (queue.length > 0) {
    let { string, count } = queue.shift();
    if (string == destination) return count;

    let c = replacements
      .filter(([from, to]) => string.indexOf(to) >= 0)
      .map(([from, to]) => ({
        string: string.replace(to, from),
        count: count + 1,
      }))
      .filter(({ string, count }) => !visited.has(string));

    let [next, ...rest] = c;
    if (!next) next = stack.pop();

    visited.add(next.string);
    queue.push(next);
  }
};

let result = make(start, "e");
console.log({ result });
