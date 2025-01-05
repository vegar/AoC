const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim();

const obj = JSON.parse(input);

const isComplex = (x) => typeof x === "object" && x !== null;

const search = (obj) => {
  if (Array.isArray(obj)) {
    return obj.reduce((acc, curr) => {
      if (Number.isInteger(curr)) return acc + curr;
      if (isComplex(curr)) return acc + search(curr);
      return acc;
    }, 0);
  }

  let r = 0;
  for (let val of Object.values(obj)) {
    if (val == "red") return 0;

    if (Number.isInteger(val)) r += val;
    else if (isComplex(val)) r += search(val);
  }
  return r;
};

let result = search(obj);
console.log({ result });
