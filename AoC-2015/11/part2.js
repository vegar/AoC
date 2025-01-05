const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim();

const z = "z".charCodeAt(0);
const a = "a".charCodeAt(0);
const i = "i".charCodeAt(0);
const o = "o".charCodeAt(0);
const l = "l".charCodeAt(0);

const inc = (password) => {
  const chars = password.split("").map((c) => c.charCodeAt(0));

  let i = chars.length - 1;
  while (i >= 0) {
    chars[i] += 1;
    if (chars[i] == i || chars[i] == o || chars[i] == l) chars[i] += 1;
    if (chars[i] <= z) break;
    chars[i] = a;
    i--;
  }

  return String.fromCharCode(...chars);
};

const isValid = (password) => {
  if (password.length != 8) return false;
  if (password != password.toLowerCase()) return false;

  let double = Array.from(password.matchAll(/(\w)\1/g), (m) => m[0]);
  if (double.length != 2) return false;

  for (let i = 0; i < password.length - 2; i++) {
    if (
      password.charCodeAt(i) == password.charCodeAt(i + 1) - 1 &&
      password.charCodeAt(i) == password.charCodeAt(i + 2) - 2
    )
      return true;
  }

  return false;
};

let p = inc("cqjxxyzz");
console.log(p);

while (!isValid(p)) {
  p = inc(p);
}

let result = p;
console.log({ result });
