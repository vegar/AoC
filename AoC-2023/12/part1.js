const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim();

const lines = input.split("\n").map((line) => {
  const [springs, records] = line.split(" ");

  return {
    springs: springs.split(""),
    records: records.split(",").map((x) => parseInt(x)),
  };
});

const validateLine = (springs, records) => {
  let firstQ = springs.indexOf("?");
  if (firstQ >= 0) {
    const firstNew = [...springs];
    firstNew.splice(firstQ, 1, ".");
    const first = validateLine(firstNew, records);
    const secondNew = [...springs];
    secondNew.splice(firstQ, 1, "#");
    const second = validateLine(secondNew, records);
    return first + second;
  } else {
    let expected =
      "^\\.*" + records.map((c) => "".padEnd(c, "#")).join("\\.+") + "\\.*$";
    const match = springs.join("").match(expected) ? 1 : 0;
    // console.log(
    //   `Check ${springs.join("")}, ${records.join(
    //     ","
    //   )} with ${expected} => ${match}`
    // );
    return match;
  }
};

let result = lines.reduce((count, line) => {
  let matches = validateLine(line.springs, line.records);
  console.log(
    `Check ${line.springs.join("")}, ${line.records.join(",")}  => ${matches}`
  );
  return count + matches;
}, 0);
console.log({ result });
