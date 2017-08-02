// Source: https://www.hackerrank.com/challenges/ctci-coin-change
function makeChange(target, coins) {
  let combos = [1];
  for (let i = 0; i < target; i++) { combos.push(0); }
  coins.forEach(coin => {
    for (let amt = 1; amt <= target; amt++) {
      if (coin <= amt) {
        combos[amt] += combos[amt - coin];
      }
    }
  });
  return combos[target];
}

// console.log(makeChange(10, [6, 2, 3, 5]) === 5);



// Square sub matrix
function maxSubSize(matrix) {
  if (matrix.length === 0) { return 0; }
  // create memo of same dimensions as matrix
  let memo = generateMemo(matrix.length, matrix[0].length);
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[0].length; col++) {
      if (row === 0 || col === 0) {
        memo[row][col] = matrix[row][col];
      } else if (matrix[row][col] === 0) {
        memo[row][col] = 0;
      } else {
        memo[row][col] = 1 + Math.min(memo[row - 1][col], memo[row - 1][col - 1], memo[row][col - 1]);
      }
    }
  }

  return matrixMax(memo);
}

function generateMemo(numRows, numCols) {
  let memo = [];
  for (let i = 0; i < numRows; i++) {
    let row = [];
    for (let j = 0; j < numCols; j++) {
      row.push(0);
    }
    memo.push(row);
  }
  return memo;
}

function matrixMax(matrix) {
  let max = 0;
  matrix.forEach(row => {
    row.forEach(count => {
      if (count > max) { max = count; }
    });
  });

  return max;
}


let test1 = [
  [1, 0, 1, 0, 1, 0],
  [1, 0, 1, 1, 1, 1],
  [0, 1, 1, 1, 1, 1],
  [0, 0, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1]
];

let test2 = [
  [1, 0, 1, 0, 1, 0],
  [1, 0, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 1],
  [0, 0, 1, 1, 1, 1],
  [1, 1, 1, 1, 0, 1]
];

let test3 = [
  [1, 0, 1, 0, 1, 0],
  [1, 0, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 1],
];

let test4 = [];

let test5 = [
  [0, 1, 1],
  [0, 0, 1],
  [0, 1, 1],
];

console.log(maxSubSize(test1) === 4);
console.log(maxSubSize(test2) === 3);
console.log(maxSubSize(test3) === 2);
console.log(maxSubSize(test4) === 0);
console.log(maxSubSize(test5) === 1);
