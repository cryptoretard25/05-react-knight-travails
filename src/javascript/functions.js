const deepCopy = (obj) => {
  if (typeof obj !== "object" || !obj) return obj;

  const clone = Array.isArray(obj) ? [] : {};
  for (let key in obj) {
    clone[key] = deepCopy(obj[key]);
  }

  return clone;
};

const delayedMoves = async (queue, ms, callback) => {
  while (queue.length) {
    const move = queue.shift();
    callback(move);
    await new Promise((resolve) => setTimeout(resolve, ms));
  }
};

const findCoords = (item, arr) => {
  for (let i = 0; i < arr.length; i++) {
    const cell = arr[i];
    const index = cell.findIndex((el) => el === item);
    if (index !== -1) return [i, index];
  }
};

const getReadablePos = (arr) =>{
  const rows = { 0:8, 1:7, 2:6, 3:5, 4:4, 5:3, 6:2, 7:1 }
  const columns = {0: 'a', 1: 'b', 2:'c', 3:'d', 4:'e', 5: 'f', 6: 'g', 7:'h'}
  return [columns[arr[1]], rows[arr[0]]].join('').toLocaleUpperCase()
}

const itemExists = (item, arr) => {
  return arr.some((row) => row.some((cell) => cell && cell.type === item));
};

export { deepCopy, delayedMoves, itemExists, getReadablePos };
