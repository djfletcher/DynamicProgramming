// Find the longest increasing (noncontiguous) subsequence of an array
// [5, 2, 3, 4, 1] => 3
// [1, 3, 2, 4, 1, 5, 7, 3] => 5
// [4, 1, 5, 4, 2, 7, 5, 3, 5, 6] => 5


function longestIncreasingSubsequence(seq) {
  let memo = [];
  seq.forEach((currNum, currIdx) => {
    let longest = 0;
    seq.slice(0, currIdx).forEach((prevNum, prevIdx) => {
      if (currNum > prevNum && memo[prevIdx] > longest) {
        longest = memo[prevIdx];
      }
    });

    memo.push(longest + 1);
  });

  return Math.max(...memo);
}


function longestZigzaggingSubsequence(seq) {
  let memo = [];
  seq.forEach((currNum, currIdx) => {
    // separate counts for whether we came 'up' to this number or 'down' to it
    let up = 0;
    let down = 0;
    seq.slice(0, currIdx).forEach((prevNum, prevIdx) => {
      if (currNum > prevNum && memo[prevIdx].down > down) {
        down = memo[prevIdx].down;
      }
      if (currNum < prevNum && memo[prevIdx].up > up) {
        up = memo[prevIdx].up;
      }
    });

    memo.push({ up: up + 1, down: down + 1  });
  });

  let max = 2;
  memo.forEach(mem => {
    if (mem.up > max) { max = mem.up; }
    if (mem.down > max) { max = mem.down; }
  });
  
  return max;
}


// TESTS

console.log(longestIncreasingSubsequence([5, 2, 3, 4, 1]) === 3);
console.log(longestIncreasingSubsequence([1, 7, 3]) === 2);
console.log(longestIncreasingSubsequence([5, 1, 4, 0, 3]) === 2);
console.log(longestIncreasingSubsequence([1, 3, 2, 4, 1, 5, 7, 3]) === 5);
console.log(longestIncreasingSubsequence([4, 1, 5, 4, 2, 7, 5, 3, 5, 6]) === 5);

console.log(longestZigzaggingSubsequence([5, 2, 3, 4, 1]) === 4);
console.log(longestZigzaggingSubsequence([1, 7, 3]) === 3);
console.log(longestZigzaggingSubsequence([5, 1, 4, 0, 3]) === 5);
console.log(longestZigzaggingSubsequence([1, 3, 2, 4, 1, 5, 7, 3]) === 7);
console.log(longestZigzaggingSubsequence([0, 1, 5, 4, 2, 7, 5, 3, 5, 6]) === 6);
