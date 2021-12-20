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

const dist = (from, to) => {
    let [x1,y1] = cord[from];
    let [x2,y2] = cord[to];
    let xdist = Math.abs(x1 - x2);
    if (y1 == 0 && y2 == 0) return xdist;
    let ydist = Math.abs(y1 - y2);
    if (ydist == 0) return xdist + y1 + y2;
    return xdist + ydist;
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

    //


}
