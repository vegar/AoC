const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim();

const patterns = input.split("\n\n").map((p) => p.split("\n"));

const logPattern = (pattern) => {
  for (line of pattern) console.log('   ' + line);
}

function transpose(matrix) {
  const result = [];
  for (let x = 0; x < matrix[0].length; x++) {
    let col = [];
    for (let y = 0; y < matrix.length; y++)
      col.push(matrix[y][x]);
    result.push(col.join(''));
  }
  return result;
}

const equal = (grid1, grid2) => {
  let diff = 0;
  for (let y = 0; y < Math.min(grid1.length, grid2.length); y++) {
    for (let x = 0; x < grid1[y].length; x++)
      if (grid1[y][x] != grid2[y][x]) diff++;
  }
  return diff;
}

const findHorizontalReflection = (pattern) => {
  for (let r = 1; r < pattern.length; r++) {
    let above = pattern.slice(0, r).reverse();
    let below = pattern.slice(r);

    if (equal(above, below) == 1) return r;
  }
  return 0;
};

const findVerticalReflection = (pattern) => {
  const rows = transpose(pattern);
  return findHorizontalReflection(rows);
};

let result = patterns.reduce((acc, pattern, idx) => {
  console.log(`Checking pattern ${idx + 1}:`)
  console.log(`--------------------------`)
  const horz = findHorizontalReflection(pattern);
  const vert = findVerticalReflection(pattern);
  return (
    acc + vert +
    (100 * horz)
  );
}, 0);
console.log({ result });
