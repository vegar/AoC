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

const findHorizontalReflection = (pattern) => {
  for (var line = 0; line < pattern.length; line++) {
    if (pattern[line] == pattern[line + 1]) {
      let dx = 1;
      let match = true;
      while (match) {
        if (line + dx + 1 > pattern.length - 1 || line - dx < 0) break;
        if (pattern[line - dx] != pattern[line + dx + 1]) {
          match = false;
          break;
        }
        dx++;
      }
      if (match) {
        console.log(`reflection at ${line}`)
        return line + 1;
      }
    }
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
