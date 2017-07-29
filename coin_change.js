// // Source: https://www.hackerrank.com/challenges/ctci-coin-change
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

console.log(makeChange(10, [6, 2, 3, 5]) === 5);
