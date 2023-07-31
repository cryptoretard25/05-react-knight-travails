const { log } = console;

class Board {
  constructor(size) {
    this.board = new Map();
    this.size = size;
  }

  addVertices() {
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        this.board.set(JSON.stringify([i, j], []));
      }
    }
  }

  addEdges() {
    for (let [pos] of this.board) {
      const [row, col] = JSON.parse(pos);
      //log(row, col);
      const moves = [
        [row + 1, col + 2, "move-right-down"], //+
        [row + 2, col + 1, "move-down-right"], //move-up-right
        [row + 2, col - 1, "move-down-left"],
        [row + 1, col - 2, "move-left-down"], //+
        [row - 1, col - 2, "move-left-up"], // +
        [row - 2, col - 1, "move-up-left"], // +
        [row - 2, col + 1, "move-up-right"], //move-down-right
        [row - 1, col + 2, "move-right-up"],
      ].filter((move) => {
        return move[0] >= 0 && move[0] < 8 && move[1] >= 0 && move[1] < 8;
      });
      this.board.set(pos, moves);
    }
  }
}

export default class _Knight {
  constructor(size) {
    this.board = new Board(size);
    this.board.addVertices();
    this.board.addEdges();
  }

  knightMoves(start, end) {
    const count = { [JSON.stringify(start)]: 0 };
    const queue = [{ current: start, path: [start] }];
    const visited = new Set();

    while (queue.length) {
      const { current, path } = queue.shift();
      const currStr = JSON.stringify(current);
      const endStr = JSON.stringify(end);
      if (currStr === endStr) return path;
      // return `You made it in ${count[endStr]} moves! Here's your path:\n${path
      //   .map((item) => JSON.stringify(item))
      //   .join("\n")}`;
      const moves = this.board.board.get(currStr);
      for (let item of moves) {
        const move = [item[0], item[1]];
        if (!visited.has(move)) {
          queue.push({ current: move, path: [...path, [[move], item[2]]] });
          count[JSON.stringify(move)] = count[currStr] + 1;
          visited.add(move);
        }
      }
    }
    return null;
  }
}


// console.log(_getMovesArray(movesQueue))

// _delayedMoves(movesQueue, 4000, console.log);
