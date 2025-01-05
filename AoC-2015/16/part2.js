const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim()
  .split("\n")
  .map((line, idx) => {
    let props = Array.from(line.matchAll(/(\w+): (\d+)/g), (m) => [
      m[1],
      parseInt(m[2]),
    ]);
    return { props, name: idx + 1 };
  });

const letter = {
  children: 3,
  cats: 7,
  samoyeds: 2,
  pomeranians: 3,
  akitas: 0,
  vizslas: 0,
  goldfish: 5,
  trees: 3,
  cars: 2,
  perfumes: 1,
};

let aunt = input.find((a) => {
  return a.props.every(([prop, value]) =>
    prop == "cats" || prop == "trees"
      ? letter[prop] < value
      : prop == "pomeranians" || prop == "goldfish"
      ? letter[prop] > value
      : letter[prop] == value
  );
});

let result = aunt.name;
console.log({ result });
