export class PriorityQueue {
    #queue;
    #priorityFunc
    constructor(priorityFunc) {
        this.#priorityFunc = priorityFunc;
        this.#queue = [];
    }

    enqueue(item) {


        let idx = this.#queue.findIndex((i) => this.#priorityFunc(i) >= this.#priorityFunc(item));
        if (idx == -1) this.#queue.push(item);
        else this.#queue.splice(idx, 0, item);
    }

    head() {
        return this.#queue[0];
    }
    tail() {
        return this.#queue[this.#queue.length - 1];
    }

    get() {
        return this.#queue.shift();
    }

    isEmpty() {
        return this.#queue.length == 0;
    }

    toString() {
        return this.#queue.map(
            (v, idx) => `${idx}: ${v.toString()} (pri:${this.priorityFunc(v)})`
        );
    }
  }
