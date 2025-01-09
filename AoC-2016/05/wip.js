const crypto = require("crypto");

let input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim();

const password = Array(8).fill("_");
let i = 0;
let l = 0;
while (l < 8) {
  let hash = crypto.createHash("md5").update(`${input}${++i}`).digest("hex");
  if (hash.startsWith("00000")) {
    let pos = parseInt(hash[5]);
    let char = hash[6];

    console.log(
      `Potential has: ${hash}, pos ${pos}, char ${char} - current pwd: ${password.join(
        ""
      )}`
    );
    if (pos > 8 || password[pos] != "_") continue;
    password[pos] = char;
    l++;
  }
}

let result = password.join("");
console.log({ result });
