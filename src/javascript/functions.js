let count = -1;

const deepCopy = (obj) => {
  if (typeof obj !== "object" || !obj) return obj;

  const clone = Array.isArray(obj) ? [] : {};
  for (let key in obj) {
    clone[key] = deepCopy(obj[key]);
  }

  return clone;
};

const delayedMoves = async ( queue, ms, callback, data, setData, Knight, url ) => {
  while (queue.length) {
    const item = queue.shift();
    if (Array.isArray(item[0])) {
      const [move, animation] = item;
      callback(count, data, setData, Knight, url, ...move, animation);
    } else {
      callback(count, data, setData, Knight, url, item);
    }
    await new Promise((resolve) => setTimeout(resolve, ms));
    count++;
    console.log(count)
  }
};

const handle = (count, data, setData, Knight, url, move, animation = null) => {
  // data = Array.from({ length: 8 }, () =>
  //   Array.from({ length: 8 }, () => {})
  // );
  const [prevX, prevY] = findCoords(Knight, data);
  const [x, y] = move;
  data[prevX][prevY] = count;
  data[x][y] = <Knight imgUrl={url} animation={animation} />;
  setData(deepCopy(data));
};

const getMovesArray = (arr) => {
  return arr.map((item) => {
    if (typeof item[1] === "string") {
      return item[0];
    }
    return item;
  });
};

const findCoords = (Knight, arr) => {
  for (let i = 0; i < arr.length; i++) {
    const row = arr[i];
    for (let j = 0; j < row.length; j++) {
      const cell = row[j];
      if (cell && cell.type === Knight) {
        return [i, j];
      }
    }
  }
  return null; // If Knight is not found in the array
};

const getReadablePos = (arr) => {
  const rows = { 0: 8, 1: 7, 2: 6, 3: 5, 4: 4, 5: 3, 6: 2, 7: 1 };
  const columns = {
    0: "a",
    1: "b",
    2: "c",
    3: "d",
    4: "e",
    5: "f",
    6: "g",
    7: "h",
  };
  return [columns[arr[1]], rows[arr[0]]].join("").toLocaleUpperCase();
};

const itemExists = (item, arr) => {
  return arr.some((row) => row.some((cell) => cell && cell.type === item));
};

export {
  deepCopy,
  delayedMoves,
  getMovesArray,
  itemExists,
  getReadablePos,
  handle,
};
