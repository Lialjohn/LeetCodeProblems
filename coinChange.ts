// https://leetcode.com/problems/coin-change/

// You are given coins of different denominations and a total amount of money amount. Write a function to compute the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.

// You may assume that you have an infinite number of each kind of coin.

// -------------------------------------------------------------------

// since we want the fewest coins, it makes sense to focus on the largest coins first. Problem is there's nothing in the problem description to indicate that the coin array is sorted, so I have to assume not.
// there can only ever be 12 coins at most though, so I can sort it without a big difference in time, woo.
// there are cases where I wouldn't want to remove the maximum number of larger coins from the amount though. Ex If I have two coins 10 and 15 with a total of 50, removing 45 would make it impossible to reach a total. I'd have to limit it to 2 15s and 2 10s.
// actually this reminds me a bit of the backpack problem. DP time!?
// dp would mean I have to find the minimum number of coins fitting into 1 and working my way up one by one, using previous sums, until I got to amount. 
// I'll create an array that's amount long and run through it for each coin. I'll start at the coin value amount because before then I'd just be adding zeroes. If I start at amount zero which will always have a minCoins value of zero, then I'll have 0 + 1 for dp[coin amount]. Then, as I move through each subsequent amount, I can calculate a minCoins value for each one by incrementing from dp[index - coin amount]. If that index has a value in it that's not a filler number, then I'll have a new valid number of coins to place in dp[index]. If it's smaller than the previous, that is.
// not all indices will be filled, just the ones that are multiples of the coin amounts. so I'll be able to tell if a combo is possible or not by the final index of dp. If it has the filler number (either Infinity or max amount + 1) then no combo of coins was able to fit into it.


const coinChange = (coins: number[], amount: number): number => {
    // fill dp array with number that cannot possibly win in a Math.min battle. In this case, you can't have more coins in an amount than the amount, so amount + 1 is an impossible number of coins.
    const dp = Array(amount + 1).fill(amount + 1)
    dp[0] = 0
    for (const coin of coins) {
        // j = amount in dp
        for (let j = coin; j < dp.length; j++) {
            dp[j] = Math.min(dp[j], dp[j - coin] + 1)
        }
    }
    // if have gone through all possible combos and dp[amount] is still a filler number, a combo is not possible so return -1
    if (dp[amount] !== amount + 1) return dp[amount]
    else return -1
}

console.log(coinChange([1,2,5], 11)) // 3
console.log(coinChange([2], 3)) // -1
console.log(coinChange([1], 0)) // 0
console.log(coinChange([1], 2)) // 2