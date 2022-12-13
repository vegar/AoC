const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim()
  .split(/\r?\n\r?\n/)
  .map((pair) => {
    const [left, right] = pair.split(/\r?\n/).map((l) => split(l, 0)[0]);
    return { left, right };
  });

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

correctOrder(input[1].left, input[1].right);

function correctOrder(left, right) {
  console.log(`Compare ${left} vs ${right}`);
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
        console.log(
          ` - Ran out of items... ${left.length} vs ${
            right.length
          }. Items are in ${p ? "right" : "wrong"} order`
        );
      }
      return p;
    }

    let p = correctOrder(left[idx], right[idx]);
    if (p == 0) {
      idx++;
    } else {
      console.log(
        ` - ${left[idx]} and ${right[idx]} is in ${
          p > 0 ? "right" : "wrong"
        } order`
      );
      return p;
    }
  }

  return true;
}

let result = input
  .reduce((acc, curr, idx) => {
    const { left, right } = curr;

    console.log(`== Pair ${idx + 1} ==`);
    if (correctOrder(left, right) > 0) {
      acc.push(idx + 1);
      console.log(`== Pair ${idx + 1} is in correct order ==`);
    } else {
      console.log(`== Pair ${idx + 1} is in wrong order ==`);
    }
    return acc;
  }, [])
  .reduce((acc, curr) => acc + curr);

console.log({ result });
