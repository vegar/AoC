import { assert } from "console";
import { readFile, readFileLines } from "../../lib/fileInput";
import { fromHere, report as reportGen } from "../../util";

const report = reportGen(__filename);

export async function run(day: string) {
  const inputFile = fromHere(`solutions/${day}` + "/input.txt");

  const input = readFile(inputFile);

  await solveForFirstStar(input);
  await solveForSecondStar(input);
}

async function solveForFirstStar(input) {

  const solution =input.split('').reduce((etasje, tegn) => {
    if (tegn == '(')
      etasje = etasje + 1
    else if (tegn == ')')
      etasje = etasje - 1

    return etasje;
  }, 0).toString();

  //report("Input:", input);
  report("Solution 1:", solution);
  assert(solution == '280');
}

async function solveForSecondStar(input) {

  let position = 0;
  input.split('').reduce((etasje, tegn, index) => {
    if (tegn == '(')
      etasje = etasje + 1
    else if (tegn == ')')
      etasje = etasje - 1

    if (etasje < 0 && position == 0) {
      position = index + 1;
    }

    return etasje;
  }, 0);

  const solution = position.toString();

  report("Solution 2:", solution);
  assert(solution == '1797');
}
