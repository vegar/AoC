const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim();

function transpose(matrix) {
  const result = [];
  for (let x = 0; x < matrix[0].length; x++) {
    let col = [];
    for (let y = 0; y < matrix.length; y++) col.push(matrix[y][x]);
    result.push(col.join(""));
  }
  return result;
}

const map = transpose(input.split("\n").map((line) => line.split("")));

console.log(map);

const countWeight = (col) => {
  let result = 0;
  let weight = col.length;
  let idx = 0;
  while (idx < col.length) {
    if (col[idx] == "O") {
      result += weight;
      idx++;
      weight--;
    } else if (col[idx] == ".") {
      idx++;
    } else if (col[idx] == "#") {
      weight = col.length - idx - 1;
      idx++;
    }
  }
  return result;
};

let result = map.reduce((weight, column) => {
  return weight + countWeight(column);
}, 0);
console.log({ result });
