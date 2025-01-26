const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim();

let length = parseInt(input);
let recipes = [3, 7];
let elfs = [0, 1];

while (recipes.length < length + 10) {
  let prevFirst = recipes[elfs[0]];
  let prevSecond = recipes[elfs[1]];

  let mix = prevFirst + prevSecond;
  let first = Math.floor(mix / 10);
  let second = mix % 10;

  if (first != 0) recipes.push(first);
  recipes.push(second);
  elfs = [
    (elfs[0] + 1 + prevFirst) % recipes.length,
    (elfs[1] + 1 + prevSecond) % recipes.length,
  ];

  // console.log(
  //   recipes
  //     .map((c, i) => {
  //       if (i == elfs[0]) return `(${c})`;
  //       if (i == elfs[1]) return `[${c}]`;
  //       return ` ${c} `;
  //     })
  //     .join("")
  // );
}

let result = recipes.slice(length, length + 10).join("");
console.log({ result });
