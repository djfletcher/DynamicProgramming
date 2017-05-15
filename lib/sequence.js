// Find the longest increasing (noncontiguous) subsequence of an array
// [5, 2, 3, 4, 1] => 3
// [1, 3, 2, 4, 1, 5, 7, 3] => 5
// [4, 1, 5, 4, 2, 7, 5, 3, 5, 6] => 5


function longestSequence(seq) {
  let longestSequences = [];
  seq.forEach((currNum, currIdx) => {
    let longest = 0;
    seq.forEach((prevNum, prevIdx) => {
      if (currNum > prevNum) {
        longest = longestSequences[prevIdx];
      }
    });

    longestSequences.push(longest + 1);
  });

  return Math.max(...longestSequences);
}
