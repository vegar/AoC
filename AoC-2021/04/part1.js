const input = require('fs')
  .readFileSync(require('path').join(__dirname, 'input.txt'), 'utf8')
  .trim()
  .split(/\r?\n/);

const drawnNumber = input[0].split(',').map(n => parseFloat(n));
const drawnOrder = drawnNumber.reduce((acc, curr, idx) => {
  acc[curr] = idx;
  return acc;
}, new Array(99))


const allBoards = [];

const rows = input.slice(1)
  .filter(l => l.trim() != '')
  .map(l => l.trim().split(/\s+/).map(n => parseFloat(n)))

while (rows.length > 0)
   allBoards.push(rows.splice(0, 5));


const checkRow = (row) => Math.max(...row.map(n => drawnOrder[n]));
const checkCol = (board, idx) => Math.max(...board.map(r => drawnOrder[r[idx]]));

const bestRow = board => Math.min(...board.map(r => checkRow(r)));
const bestCol = board => {
  const col = []
  for (c = 0; c < board[0].length; c++)
    col.push(checkCol(board, c));
  return Math.min(...col);
};

const boardScore = (board) => Math.min(bestRow(board), bestCol(board));

const bestBoard = allBoards.reduce((acc, curr) => {
  const score = boardScore(curr);
  console.log(score);
  if (score < acc.score)
    return { score, board: curr }
  return acc;
}, {score: 99999, board: []})

const sumUnMarked = bestBoard.board.flat().filter(n => drawnOrder[n] > bestBoard.score).reduce((acc, curr) => acc + curr);
const lastDrawn = drawnNumber[bestBoard.score];

let result = sumUnMarked * lastDrawn;
console.log({ result })
