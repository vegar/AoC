const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim();

const lines = input.split("\n").map((line) => {
  const [springs, records] = line.split(" ");

  return {
    springs: `${springs}?${springs}?${springs}?${springs}?${springs}`,
    records: `${records},${records},${records},${records},${records}`
      .split(",")
      .map((x) => parseInt(x)),
  };
});

// ref. https://www.youtube.com/watch?v=g3Ms5e7Jdqo

const cache = new Map();
const match = (springs, records) => {
  if (springs == "") return records.length ? 0 : 1;
  if (!records.length) return springs.includes("#") ? 0 : 1;

  let result = 0;

  if (springs[0] == "." || springs[0] == "?")
    result += match(springs.slice(1), records);

  const key = `${springs}|${records.join(",")}`;

  if (cache.has(key)) {
    return cache.get(key);
  }

  if (springs[0] == "#" || springs[0] == "?") {
    if (
      records[0] <= springs.length &&
      !springs.slice(0, records[0]).includes(".") &&
      (records[0] == springs.length || springs.at(records[0]) != "#")
    ) {
      result += match(springs.slice(records[0] + 1), records.slice(1));
    }
  }

  cache.set(key, result);

  return result;
};

let result = lines.reduce((count, line) => {
  console.group(`${line.springs}`);
  try {
    let r = match(line.springs, line.records);
    console.log(`found ${r}`);
    return count + r;
  } finally {
    console.groupEnd();
  }
}, 0);
console.log({ result });
