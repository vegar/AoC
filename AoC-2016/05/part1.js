const crypto = require("crypto");

const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim();

let test = crypto.createHash("md5").update(`abc3231929`).digest("hex");
console.log(test);

const password = [];
let i = 0;
while (password.length < 8) {
  let hash = crypto.createHash("md5").update(`${input}${++i}`).digest("hex");
  if (hash.startsWith("00000")) {
    password.push(hash[5]);
  }
}

let result = password.join("");
console.log({ result });
