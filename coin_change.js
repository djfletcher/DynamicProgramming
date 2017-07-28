// Source: https://www.hackerrank.com/challenges/ctci-coin-change

function makeChange(target, coins, memo = {}) {
  if (target in memo) {
    return memo[target];
  } else if (target < coins[0]) {
    memo[target] = 0;
    return 0;
  } else if (target === coins[0]) {
    memo[target] = 1;
    return 1;
  } else {
    memo[target] = 0;
    coins.forEach(coin => {
      let combos = makeChange(target - coin, coins, memo);
      if (combos > 0) {
        memo[target] += memo[target - coin] + 1;
      }
    });
    console.log(memo);
    return memo[target];
  }
}


console.log(makeChange(4, [1, 2, 3]));
