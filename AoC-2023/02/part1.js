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
    return { id, ...cubes };
  })
  .filter(
    (game) =>
      game.green <= maxCubes.green &&
      game.blue <= maxCubes.blue &&
      game.red <= maxCubes.red
  )
  .reduce((acc, game) => acc + parseInt(game.id), 0);

console.log({ result });
