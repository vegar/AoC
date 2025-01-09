let input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim();

const crypto = require("crypto");

const key = (idx) => {
  let k = crypto.createHash("md5").update(`${input}${idx}`).digest("hex");
  for (let x = 0; x < 2016; x++)
    k = crypto.createHash("md5").update(k).digest("hex");

  return k;
};

let potentialKey = new Map();
let keys = new Map();
let idx = 1;
while (keys.size < 64) {
  let k = key(idx);

  for (let pidx of potentialKey.keys()) {
    if (pidx > idx - 1000) {
      let [kk, mk] = potentialKey.get(pidx);

      if (k.indexOf(mk) >= 0 && keys.size < 64) {
        keys.set(pidx, kk);

        potentialKey.delete(pidx);
      }
    }
  }

  let m = k.match(/([\w\d])\1\1/);
  if (m) {
    potentialKey.set(idx, [k, m[0].padEnd(5, m[1])]);
  }

  idx++;
}

console.log(keys);
let result = Math.max(...keys.keys());
console.log({ result });

// 35408 too high
