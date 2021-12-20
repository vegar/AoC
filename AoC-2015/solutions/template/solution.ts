import { readFileLines } from "../../lib/fileInput";
import { fromHere, report as reportGen } from "../../util";

const report = reportGen(__filename);

export async function run(day: string) {
  const inputFile = fromHere(`solutions/${day}` + "/input.txt");

  const input = readFileLines(inputFile);

  await solveForFirstStar(input);
  await solveForSecondStar(input);
}

async function solveForFirstStar(input) {
  const solution = "UNSOLVED";
  //report("Input:", input);
  report("Solution 1:", solution);
}

async function solveForSecondStar(input) {
  const solution = "UNSOLVED";
  report("Solution 2:", solution);
}
