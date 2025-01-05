const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim()
  .split("\n")
  .map((line) => line.split(""));

const draw = (grid) => {
  console.log("┌" + "-".repeat(grid[0].length / 2) + "┐");

  for (let y = 0; y < grid.length; y += 2) {
    let line = "│";
    for (let x = 0; x < grid[y].length; x += 2) {
      line += pixel(grid, x, y);
    }
    line += "│";
    console.log(line);
  }
  console.log("└" + "-".repeat(grid[0].length / 2) + "┘");
};

const pixels = {
  0: " ",
  1: "▘",
  2: "▝",
  3: "▀",
  4: "▖",
  5: "▌",
  6: "▞",
  7: "▛",
  8: "▗",
  9: "▚",
  10: "▐",
  11: "▜",
  12: "▄",
  13: "▙",
  14: "▟",
  15: "█",
};

const pixel = (grid, x, y) => {
  let a = grid[y][x] == "#" ? 1 : 0;
  let b = grid[y][x + 1] == "#" ? 1 : 0;
  let c = grid[y + 1][x] == "#" ? 1 : 0;
  let d = grid[y + 1][x + 1] == "#" ? 1 : 0;

  let p = a + (b << 1) + (c << 2) + (d << 3);
  return pixels[p];
};

const frame = (grid) => {
  return grid.map((line, y) =>
    line.map((l, x) => {
      if (x == 0 && y == 0) return "#";
      if (x == 0 && y == grid.length - 1) return "#";
      if (x == grid[0].length - 1 && y == 0) return "#";
      if (x == grid[y].length - 1 && y == grid.length - 1) return "#";

      let n = neighbors(grid, y, x);
      return grid[y][x] == "#"
        ? n == 2 || n == 3
          ? "#"
          : "."
        : n == 3
        ? "#"
        : ".";
    })
  );
};

const neighbors = (grid, y, x) => {
  let c = 0;
  for (
    let yy = Math.max(0, y - 1);
    yy <= Math.min(grid.length - 1, y + 1);
    yy++
  )
    for (
      let xx = Math.max(0, x - 1);
      xx <= Math.min(grid[yy].length - 1, x + 1);
      xx++
    ) {
      if (xx == x && yy == y) continue;
      c += grid[yy][xx] == "#" ? 1 : 0;
    }
  return c;
};

const count = (grid) =>
  grid.reduce(
    (sum, line) => sum + line.reduce((s, x) => s + (x == "#" ? 1 : 0), 0),
    0
  );

input[0][0] = "#";
input[input.length - 1][0] = "#";
input[0][input[0].length - 1] = "#";
input[input.length - 1][input[0].length - 1] = "#";

grid = input;
for (let t = 0; t < 100; t++) {
  grid = frame(grid);
}

draw(grid);

let result = count(grid);
console.log({ result });
