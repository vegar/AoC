import { PriorityQueue } from "./priqueue.js";

//                                 1 1 1 1 1
//             0 1 2 3 4 5 6 7 8 9 0 1 2 3 4
const start = [0,0,0,0,0,0,0,1,2,4,3,2,1,4,3]
const end   = [0,0,0,0,0,0,0,1,1,2,2,3,3,4,4]

//              0     1           2          3           4          5      6
const cord = [[0,0],[1,0],      [3,0],     [5,0],      [7,0],     [9,0],[10,0],
//                          7     8     9    10    11    12    13    14
                          [2,1],[2,2],[4,1],[4,2],[6,1],[6,2],[8,1],[8,2]
]

const cost = [,1,10,100,1000];

const caves = [[], [7,8], [9,10], [11,12], [13,14]]
const hallway = [0,1,2,3,4,5,6]
const isHome = (state, pos) => {
    const creature = state[pos];
    const cave = caves[creature];
    const posInCave = cave.indexOf(pos);
    // return false if not in right cave
    if (posInCave < 0) return false;

    // return true if in cave and as far down as possible
    return cave.slice(posInCave).every(c => c == creature);
}

const homePos = (state, pos) => {
    const creature = state[pos];
    const cave = caves[creature];
    // if cave contains foreign creature, ther is no home position to go for.
    if (cave.some(c => c != creature)) return;

    // return deepest free spot in cave
    let i = -1;
    while (state[cave[i+1]] == 0) i++;
    return cave[i];
}

const dist = (from, to) => {
    let [x1,y1] = cord[from];
    let [x2,y2] = cord[to];
    let xdist = Math.abs(x1 - x2);
    if (y1 == 0 && y2 == 0) return xdist;
    let ydist = Math.abs(y1 - y2);
    if (ydist == 0) return xdist + y1 + y2;
    return xdist + ydist;
}

const isOpenPath = (state, from, to) => {
    let [x1, y1] = cord[from];
    let [x2, y2] = cord[to];

    const path = [];
    let xdist = x2 - x1;
    let x = x1;
    while (x != x2) {
        x += Math.sign(xdist);
        path.push([x,0]);
    }
    let ydist = y2 - y1;
    if (ydist != 0 || y1 != 0) {
        let y = y1;
        while (y != 0) {
            y--;
            path.push([x1,y]);
        }
        while (y != y2) {
            y++;
            path.push([x2, y])
        }
    }

    return path;
}

const makeKey = (state) => state.join(',');
const isEnd = (state) => makeKey(state) == makeKey(end);

const costs = new Map();
const queue = new PriorityQueue((i => i.cost));
let minimumCost = Infinity;


while (!queue.isEmpty()) {
    const { state, currentCost } = queue.pop();
    const key = makeKey(state);

    // if @ end, record minimum cost
    if (isEnd(state)) {
        minimumCost = Math.min(minimumCost, currentCost);
        continue;
    }

    // if seen state before at lower cost, ...
    if (costs.has(key)) {
        const prevCost = costs.get(key);
        if (prevCost < currentCost) continue;
    }

    // can any move to their home ?
    const moveHome = state.filter((i, idx) => {
        // empty space, nothing to move
        if (i == 0) return;
        // we're already home...
        if (isHome(state, idx)) return;
        // find home pos
        let h = homePos(state, idx);
        if (!h) return;

    });



}


console.log(isOpenPath(start, 8,0))
