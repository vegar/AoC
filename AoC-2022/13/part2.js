const { json } = require("stream/consumers");

let input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim()
  .split(/\r?\n/);

input = [...input, "[[2]]", "[[6]]"]
  .filter((l) => l != "")
  .map((line) => split(line, 0)[0]);

function split(line, idx) {
  const result = [];
  let currentNumber = "";
  while (idx < line.length) {
    if (line[idx] == "[") {
      const [arr, newIdx] = split(line, idx + 1);
      result.push(arr);
      idx = newIdx;
    } else if (line[idx] == "]") {
      if (currentNumber != "") {
        result.push(parseInt(currentNumber));
        currentNumber = "";
      }
      return [result, idx + 1];
    } else if (line[idx].match(/\d/)) {
      currentNumber += line[idx];
      idx++;
    } else if (line[idx] == ",") {
      if (currentNumber != "") {
        result.push(parseInt(currentNumber));
        currentNumber = "";
      }
      idx++;
    }
  }
  return result;
}

function correctOrder(left, right) {
  if (typeof left == "number" && typeof right == "number") {
    return left < right ? 1 : left > right ? -1 : 0;
  }

  if (typeof left == "number") {
    return correctOrder([left], right);
  }

  if (typeof right == "number") {
    return correctOrder(left, [right]);
  }

  // both arrays
  let idx = 0;
  while (true) {
    // ran out of numbers?
    if (idx >= left.length || idx >= right.length) {
      let p = correctOrder(left.length, right.length);

      if (p != 0) {
      }
      return p;
    }

    let p = correctOrder(left[idx], right[idx]);
    if (p == 0) {
      idx++;
    } else {
      return p;
    }
  }
}

input.sort(correctOrder).reverse();

let p1 = input.findIndex((a) => JSON.stringify(a) == "[[2]]");
let p2 = input.findIndex((a) => JSON.stringify(a) == "[[6]]");

console.log({ p1, p2 });

let result = (p1 + 1) * (p2 + 1);

console.log({ result });
