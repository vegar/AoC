const input = require("fs")
  .readFileSync(require("path").join(__dirname, "input.txt"), "utf8")
  .trim()
  .split("");

const disk = input.reduce((disk, c, idx) => {
  if (idx % 2 == 0)
    disk.push({ free: false, id: Math.ceil(idx / 2), size: parseInt(c) });
  else disk.push({ free: true, size: parseInt(c) });
  return disk;
}, []);

const writeDisk = () => {
  console.log(
    disk
      .flatMap((f) =>
        f.free ? Array(f.size).fill(".") : Array(f.size).fill(f.id)
      )
      .join("")
  );
};

let last = disk.length - 1;
while (last > 0) {
  if (!disk[last].free && disk[last].moved != true) {
    let i = 0;
    while (i < last) {
      if (disk[i].free && disk[i].size >= disk[last].size) {
        let rest = disk[i].size - disk[last].size;
        if (rest == 0) {
          disk[i].free = false;
          disk[i].id = disk[last].id;
          disk[i].moved = true;
        } else {
          disk.splice(
            i,
            1,
            { ...disk[last], moved: true },
            { free: true, size: rest }
          );
          last++;
        }
        disk[last].free = true;
        break;
      }
      i++;
    }
  }
  last--;
}

const expanded = disk.flatMap((f) =>
  f.free ? Array(f.size).fill(".") : Array(f.size).fill(f.id)
);

const checksum = expanded.reduce(
  (sum, curr, idx) => (curr == "." ? sum : sum + curr * idx),
  0
);

let result = checksum;
console.log({ result });
