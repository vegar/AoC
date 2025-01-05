var crypto = require("crypto");

const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim();

let n = 0;
while (true) {
  n++;
  const r = crypto.createHash("md5").update(`${input}${n}`).digest("hex");
  if (r.slice(0, 6) == "000000") break;
}

let result = n;
console.log({ result });
