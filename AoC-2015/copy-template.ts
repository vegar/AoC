import path from "path";
import { make, find, read, write, run } from "promise-path";
import { report as reportGen, fromHere } from "./util";
import fetch from 'node-fetch';

const report = reportGen(__filename);

async function fetchAOCDInput(currentYear: number, currentDay: number) {
  const url = `https://adventofcode.com/${currentYear}/day/${currentDay}/input`;
  report(
    `Downloading data from ${url}`
  );
  try {
    if (!process.env.AOC_COOKIE)
      throw new Error(`Missing AOC_COOKIE environment variable`);

    const input = await fetch(url,    {
      method: 'GET',
      headers: {
         cookie: `session=${process.env.AOC_COOKIE};`
      }
    }).then(res => {
      if (res.status != 200)
        throw new Error(res.statusText);
      return res.text();
    });

    if(input)
       report(`Downloaded ${input.length} bytes of data.`);

    return input;
  } catch (ex) {
    report(`Could not fetch input for ${currentYear} / ${currentDay}`, ex);
  }
  return "PASTE YOUR INPUT HERE";
}

async function copyTemplate() {
  const newFolderName = process.argv[2];
  const templateFolderPath = "solutions/template";
  const targetFolderPath: string = fromHere(`solutions/${newFolderName}`);

  if (!newFolderName) {
    return await report(
      "No path specified to copy to.",
      "Please specify a folder name as an argument to this script.",
      "e.g. node copy-template day5"
    );
  }

  const existingFiles = await find(`${targetFolderPath}/*`);
  if (existingFiles.length > 0) {
    report("Existing files found:");
    console.log(existingFiles.map((n) => "  " + n).join("\n"));
    return report("Path", newFolderName, "already exists, doing nothing.");
  }

  report(
    "Creating:",
    `solutions/${newFolderName}`,
    "from template",
    templateFolderPath
  );

  const templateFiles = await find(fromHere(`${templateFolderPath}/*`));
  await make(fromHere(`solutions/${newFolderName}`));
  await Promise.all(
    templateFiles.map(async (filepath: string) => {
      const contents = await read(filepath);
      const filename = path.parse(filepath).base;
      const newFilePath = `solutions/${newFolderName}/${filename}`;
      report("Creating:", newFilePath);
      return write(fromHere(newFilePath), contents);
    })
  );

  report("Attemping to download puzzle input for this date");

  const currentPath = fromHere(path.sep);
  const currentFolder = (await currentPath).split(path.sep).reverse()[1];
  const currentYearString: string | undefined = currentFolder.split("-").pop();
  const currentDay: number = Number.parseInt(newFolderName.replace("day", ""));
  if (!currentYearString || !currentDay) {
    report(`Invalid year (${currentYearString}) / day (${currentDay})`);
    process.exit(1);
  }
  const currentYear: number = +currentYearString;
  report(
    `Based on the path, ${currentFolder} I think its: ${currentYearString}, and you're trying to solve: Day ${currentDay}`
  );

  if (+currentYear > 0 && currentDay > 0) {
    report(`Potentially valid year (${currentYear}) / day (${currentDay})`);
    try {
      const aocInputText = await fetchAOCDInput(+currentYear, currentDay);
      console.log("newfoldername", newFolderName);
      await write(
        fromHere(`solutions/${newFolderName}/input.txt`),
        aocInputText,
        "utf8"
      );
    } catch (ex) {
      console.error(ex);
    }
  } else {
    report(`Invalid year (${currentYear}) / day (${currentDay})`);
  }

  report("Done.");
}

module.exports = copyTemplate();
