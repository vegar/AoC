const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim();

const maxCubes = {
  red: 12,
  green: 13,
  blue: 14,
};
let result = input
  .split("\n")
  .map((line) => {
    const id = line.match(/Game (\d+):/)[1];
    const cubes = [...line.matchAll(/(\d+) (blue|red|green)/g)].reduce(
      (acc, curr) => {
        const [_, count, color] = curr;
        acc[color] = Math.max(parseInt(count), acc[color]);
        return acc;
      },
      { green: 0, blue: 0, red: 0 }
    );
    return cubes;
  })
  .map((game) => Object.values(game).reduce((acc, curr) => acc * curr, 1))
  .reduce((acc, curr) => acc + curr);

console.log({ result });
