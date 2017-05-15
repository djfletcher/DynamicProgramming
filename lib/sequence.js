// Find the longest increasing (noncontiguous) subsequence of an array
// [5, 2, 3, 4, 1] => 3
// [1, 3, 2, 4, 1, 5, 7, 3] => 5
// [4, 1, 5, 4, 2, 7, 5, 3, 5, 6] => 5


function longestSequence(seq) {
  let longestSequences = [];
  seq.forEach((currNum, currIdx) => {
    let longest = 0;
    seq.slice(0, currIdx).forEach((prevNum, prevIdx) => {
      if (currNum > prevNum && longestSequences[prevIdx] > longest) {
        longest = longestSequences[prevIdx];
      }
    });

    longestSequences.push(longest + 1);
  });

  return Math.max(...longestSequences);
}


// TESTS

console.log(longestSequence([5, 2, 3, 4, 1]) === 3);
console.log(longestSequence([1, 7, 3]) === 2);
console.log(longestSequence([5, 1, 4, 0, 3]) === 2);
console.log(longestSequence([1, 3, 2, 4, 1, 5, 7, 3]) === 5);
console.log(longestSequence([4, 1, 5, 4, 2, 7, 5, 3, 5, 6]) === 5);
