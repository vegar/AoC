const sample = false;

const input = require("fs")
  .readFileSync(
    require("path").join(__dirname, `input${sample ? "-sample" : ""}.txt`),
    "utf8"
  )
  .trim();

const isTrap = (a = ".", b, c = ".") => {
  if (a == "^" && b == "^" && c == ".") return true;
  if (a == "." && b == "^" && c == "^") return true;
  if (a == "^" && b == "." && c == ".") return true;
  if (a == "." && b == "." && c == "^") return true;
  return false;
};

const rows = sample ? 10 : 400000;

let prev = input;
let safe = input.replaceAll("^", "").length;
for (let i = 1; i < rows; i++) {
  let r = "";
  for (let x = 0; x < input.length; x++) {
    let trap = isTrap(prev[x - 1], prev[x], prev[x + 1]);
    r += trap ? "^" : ".";
    safe += trap ? 0 : 1;
  }

  prev = r;
}

let result = safe;
console.log({ result });
