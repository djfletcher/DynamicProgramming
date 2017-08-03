// // Source: https://www.hackerrank.com/challenges/ctci-coin-change
// function makeChange(target, coins) {
//   let combos = [1];
//   for (let i = 0; i < target; i++) { combos.push(0); }
//   coins.forEach(coin => {
//     for (let amt = 1; amt <= target; amt++) {
//       if (coin <= amt) {
//         combos[amt] += combos[amt - coin];
//       }
//     }
//   });
//   return combos[target];
// }
//
// // console.log(makeChange(10, [6, 2, 3, 5]) === 5);
//
//
//
// // Square sub matrix
// function maxSubSize(matrix) {
//   if (matrix.length === 0) { return 0; }
//   // create memo of same dimensions as matrix
//   let memo = generateMemo(matrix.length, matrix[0].length);
//   for (let row = 0; row < matrix.length; row++) {
//     for (let col = 0; col < matrix[0].length; col++) {
//       if (row === 0 || col === 0) {
//         memo[row][col] = matrix[row][col];
//       } else if (matrix[row][col] === 0) {
//         memo[row][col] = 0;
//       } else {
//         memo[row][col] = 1 + Math.min(memo[row - 1][col], memo[row - 1][col - 1], memo[row][col - 1]);
//       }
//     }
//   }
//
//   return matrixMax(memo);
// }
//
// function generateMemo(numRows, numCols) {
//   let memo = [];
//   for (let i = 0; i < numRows; i++) {
//     let row = [];
//     for (let j = 0; j < numCols; j++) {
//       row.push(0);
//     }
//     memo.push(row);
//   }
//   return memo;
// }
//
// function matrixMax(matrix) {
//   let max = 0;
//   matrix.forEach(row => {
//     row.forEach(count => {
//       if (count > max) { max = count; }
//     });
//   });
//
//   return max;
// }


// let test1 = [
//   [1, 0, 1, 0, 1, 0],
//   [1, 0, 1, 1, 1, 1],
//   [0, 1, 1, 1, 1, 1],
//   [0, 0, 1, 1, 1, 1],
//   [1, 1, 1, 1, 1, 1]
// ];
//
// let test2 = [
//   [1, 0, 1, 0, 1, 0],
//   [1, 0, 1, 1, 1, 0],
//   [0, 1, 1, 1, 1, 1],
//   [0, 0, 1, 1, 1, 1],
//   [1, 1, 1, 1, 0, 1]
// ];
//
// let test3 = [
//   [1, 0, 1, 0, 1, 0],
//   [1, 0, 1, 1, 1, 0],
//   [0, 1, 1, 1, 1, 1],
// ];
//
// let test4 = [];
//
// let test5 = [
//   [0, 1, 1],
//   [0, 0, 1],
//   [0, 1, 1],
// ];
//
// console.log(maxSubSize(test1) === 4);
// console.log(maxSubSize(test2) === 3);
// console.log(maxSubSize(test3) === 2);
// console.log(maxSubSize(test4) === 0);
// console.log(maxSubSize(test5) === 1);


// Print spiral
function printSpiral(matrix) {
  let top, right, bottom, left, result;
  top = 0;
  right = matrix[0].length - 1;
  bottom = matrix.length - 1;
  left = 0;
  result = [];

  while (result.length < matrix.length * matrix[0].length) {
    if (right < left) { break; }
    for (let col = left; col <= right; col++) {
      result.push(matrix[top][col]);
    }
    top += 1;

    if (bottom < top) { break; }
    for (let row = top; row <= bottom; row++) {
      result.push(matrix[row][right]);
    }
    right -= 1;

    if (right < left) { break; }
    for (let col = right; col >= left; col--) {
      result.push(matrix[bottom][col]);
    }
    bottom -= 1;

    if (bottom < top) { break; }
    for (let row = bottom; row >= top; row--) {
      result.push(matrix[row][left]);
    }
    left += 1;
  }

  return result;
}

// let test1 = [
//  [ 1, 2, 3 ],
//  [ 4, 5, 6 ],
//  [ 7, 8, 9 ]
// ];
//
// let test2 = [
//   [1,  2,  3,  4,  5,  6],
//   [7,  8,  9,  10, 11, 12],
//   [13, 14, 15, 16, 17, 18]
// ];
//
// let test3 = [
//   [ 1, 2, 3, 4 ],
//   [ 5, 6, 7, 8 ],
//   [ 9, 10, 11, 12 ],
//   [ 13, 14, 15, 16 ]
// ];
//
// console.log(printSpiral(test1)); // => [1, 2, 3, 6, 9, 8, 7, 4, 5]
// console.log(printSpiral(test2)); // => [1, 2, 3, 4, 5, 6, 12, 18, 17, 16, 15, 14, 13, 7, 8, 9, 10, 11]
// console.log(printSpiral(test3)); // => [1, 2, 3, 4, 8, 12, 16, 15, 14, 13, 9, 5, 6, 7, 11, 10]






function maxSubMatrix(matrix) {
  let memo = generateMemo(matrix);
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[0].length; col++) {
      if (row === 0 || col === 0) {
        memo[row][col] = matrix[row][col];
      } else if (matrix[row][col] === 0) {
        memo[row][col] = 0;
      } else {
        memo[row][col] = 1 + Math.min(
          memo[row - 1][col],
          memo[row - 1][col - 1],
          memo[row][col - 1]
        );
      }
    }
  }

  return maxVal(memo);
}

function generateMemo(matrix) {
  let memo = [];
  for (let i = 0; i < matrix.length; i++) {
    let row = [];
    for (let j = 0; j < matrix[0].length; j++) {
      row.push(0);
    }
    memo.push(row);
  }
  return memo;
}

function maxVal(matrix) {
  let max = 0;
  matrix.forEach(row => {
    row.forEach(val => {
      if (val > max) { max = val; }
    });
  });

  return max;
}

// let test1 = [
//   [1, 0, 1, 0, 1, 0],
//   [1, 0, 1, 1, 1, 1],
//   [0, 1, 1, 1, 1, 1],
//   [0, 0, 1, 1, 1, 1],
//   [1, 1, 1, 1, 1, 1]
// ];
//
// let test2 = [
//   [1, 0, 1, 0, 1, 0],
//   [1, 0, 1, 1, 1, 0],
//   [0, 1, 1, 1, 1, 1],
//   [0, 0, 1, 1, 1, 1],
//   [1, 1, 1, 1, 0, 1]
// ];
//
// let test3 = [
//   [1, 0, 1, 0, 1, 0],
//   [1, 0, 1, 1, 1, 0],
//   [0, 1, 1, 1, 1, 1],
// ];
//
// let test4 = [];
//
// let test5 = [
//   [0, 1, 1],
//   [0, 0, 1],
//   [0, 1, 1],
// ];
//
// console.log(maxSubMatrix(test1) === 4);
// console.log(maxSubMatrix(test2) === 3);
// console.log(maxSubMatrix(test3) === 2);
// console.log(maxSubMatrix(test4) === 0);
// console.log(maxSubMatrix(test5) === 1);




function printSpiral(matrix) {
  let top, right, bottom, left;
  top = 0;
  left = 0;
  right = matrix[0].length - 1;
  bottom = matrix.length - 1;
  let result = [];

  while (result.length < matrix.length * matrix[0].length) {
    // top
    if (bottom < top) { break; }
    for (let col = left; col <= right; col++) {
      result.push(matrix[top][col]);
    }
    top += 1;

    // right
    if (right < left) { break; }
    for (let row = top; row <= bottom; row++) {
      result.push(matrix[row][right]);
    }
    right -= 1;

    // bottom
    if (bottom < top) { break; }
    for (let col = right; col >= left; col--) {
      result.push(matrix[bottom][col]);
    }
    bottom -= 1;

    // left
    if (right < left) { break; }
    for (let row = bottom; row >= top; row--) {
      result.push(matrix[row][left]);
    }
    left += 1;
  }

  return result;
}



let test1 = [
 [ 1, 2, 3 ],
 [ 4, 5, 6 ],
 [ 7, 8, 9 ]
];

let test2 = [
  [1,  2,  3,  4,  5,  6],
  [7,  8,  9,  10, 11, 12],
  [13, 14, 15, 16, 17, 18]
];

let test3 = [
  [ 1, 2, 3, 4 ],
  [ 5, 6, 7, 8 ],
  [ 9, 10, 11, 12 ],
  [ 13, 14, 15, 16 ]
];

console.log(printSpiral(test1)); // => [1, 2, 3, 6, 9, 8, 7, 4, 5]
console.log(printSpiral(test2)); // => [1, 2, 3, 4, 5, 6, 12, 18, 17, 16, 15, 14, 13, 7, 8, 9, 10, 11]
console.log(printSpiral(test3)); // => [1, 2, 3, 4, 8, 12, 16, 15, 14, 13, 9, 5, 6, 7, 11, 10]
