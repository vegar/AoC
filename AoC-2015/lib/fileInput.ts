import fs from 'fs';

export const readFile = filename => fs.readFileSync(filename).toString().trim();
export const lines = (buffer: string) => buffer.split(/\r?\n/);
export const linesAsNumbers = buffer => lines(buffer).map(s => parseFloat(s));
export const readFileLines = filename => lines(readFile(filename));
export const readFileLinesAsNumbers = filename => readFileLines(filename).map(s => parseFloat(s));
export const readFileAsNumbers = filename => readFile(filename).split(',').map(s => parseFloat(s));
