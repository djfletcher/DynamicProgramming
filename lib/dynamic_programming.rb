require 'byebug'

# Dynamic Programming practice
# NB: you can, if you want, define helper functions to create the necessary caches as instance variables in the constructor.
# You may find it helpful to delegate the dynamic programming work itself to a helper method so that you can
# then clean out the caches you use.  You can also change the inputs to include a cache that you pass from call to call.

class DPProblems
  def initialize
    # Use this to create any instance variables you may need
  end

  # Takes in a positive integer n and returns the nth Fibonacci number
  # Should run in O(n) time
  def fibonacci(n, cache = [1, 1])
    return 0 if n == 0
    return cache[0] if n == 1
    return cache[1] if n == 2
    cache[n - 1] ||= fibonacci(n - 1, cache)
    cache[n - 2] ||= fibonacci(n - 2, cache)
    cache[n - 1] + cache[n - 2]
  end

  # Make Change: write a function that takes in an amount and a set of coins.  Return the minimum number of coins
  # needed to make change for the given amount.  You may assume you have an unlimited supply of each type of coin.
  # If it's not possible to make change for a given amount, return nil.  You may assume that the coin array is sorted
  # and in ascending order.
  def make_change(amt, coins, coin_cache = { 0 => 0 })
    return coin_cache[amt] if coin_cache[amt] && coin_cache[amt] < Float::INFINITY
    return coin_cache[amt] = 1 if coins.any? { |coin| coin == amt }
    coin_cache[amt] = Float::INFINITY

    coins.each do |coin|
      next if coin > amt
      possible_min = make_change(amt - coin, coins, coin_cache) + 1
      coin_cache[amt] = possible_min if possible_min < coin_cache[amt]
    end

    coin_cache[amt]
  end

  # Knapsack Problem: write a function that takes in an array of weights, an array of values, and a weight capacity
  # and returns the maximum value possible given the weight constraint.  For example: if weights = [1, 2, 3],
  # values = [10, 4, 8], and capacity = 3, your function should return 10 + 4 = 14, as the best possible set of items
  # to include are items 0 and 1, whose values are 10 and 4 respectively.  Duplicates are not allowed -- that is, you
  # can only include a particular item once.
  def knapsack(weights, values, capacity)
  end

  # Stair Climber: a frog climbs a set of stairs.  It can jump 1 step, 2 steps, or 3 steps at a time.
  # Write a function that returns all the possible ways the frog can get from the bottom step to step n.
  # For example, with 3 steps, your function should return [[1, 1, 1], [1, 2], [2, 1], [3]].
  # NB: this is similar to, but not the same as, make_change.  Try implementing this using the opposite
  # DP technique that you used in make_change -- bottom up if you used top down and vice versa.
  def stair_climb(n, hops = [1, 2, 3], routes = { 0 => [[]] })
    return routes[n] if routes[n]

    hops.each do |hop|
      next if hop > n
      new_hops = stair_climb(n - hop, hops, routes).map { |r| r.dup << hop }
      if routes[n]
        routes[n] += new_hops
      else
        routes[n] = new_hops
      end
    end

    routes[n]
  end

  # String Distance: given two strings, str1 and str2, calculate the minimum number of operations to change str1 into
  # str2.  Allowed operations are deleting a character ("abc" -> "ac", e.g.), inserting a character ("abc" -> "abac", e.g.),
  # and changing a single character into another ("abc" -> "abz", e.g.).
  def str_distance(str1, str2, cache = {})
    return 0 if str1 == str2

    cache[str2] ||= Float::INFINITY
    longer = str1.length > str2.length ? str1 : str2

    longer.length.times do |i|
      next if str1[i] == str2[i]
      if str1.length < str2.length
        altered = str2[0...i].to_s + str2[i + 1..-1].to_s
      elsif str1.length == str2.length
        altered = str2[0...i].to_s + str1[i].to_s + str2[i + 1..-1].to_s
      else
        altered = str2[0...i].to_s + str1[i].to_s * 2 + str2[i + 1..-1].to_s
      end
      possible_min = str_distance(str1, altered, cache) + 1
      cache[str2] = possible_min if possible_min < cache[str2]
    end

    cache[str2]
  end


  # Maze Traversal: write a function that takes in a maze (represented as a 2D matrix) and a starting
  # position (represented as a 2-dimensional array) and returns the minimum number of steps needed to reach the edge of the maze (including the start).
  # Empty spots in the maze are represented with ' ', walls with 'x'. For example, if the maze input is:
  #            [['x', 'x', 'x', 'x'],
  #             ['x', ' ', ' ', 'x'],
  #             ['x', 'x', ' ', 'x']]
  # and the start is [1, 1], then the shortest escape route is [[1, 1], [1, 2], [2, 2]] and thus your function should return 3.
  DIRECTIONS = ['n', 's', 'e', 'w']
  DELTAS = {
    'n' => [-1, 0],
    's' => [1, 0],
    'e' => [0, 1],
    'w' => [0, -1]
  }

  def maze_escape(maze, start, cache = {})
    if start.any? { |pos| pos == 0 } || start[0] == maze.length - 1 ||
       start[1] == maze[0].length - 1
      return cache[start] = 1
    end
    return cache[start] if cache[start]

    cache[start] = Float::INFINITY

    DIRECTIONS.each do |dir|
      d = DELTAS[dir]
      next_square = [d[0] + start[0], d[1] + start[1]]
      if valid?(next_square, maze)
        possible_dist = maze_escape(maze, next_square, cache) + 1
        cache[start] = possible_dist if possible_dist < cache[start]
      end
    end

    cache[start]
  end

  def valid?(square, maze)
    if square.any? { |pos| pos < 0 } || square[0] >= maze.length ||
       square[1] >= maze[0].length || maze[square[0]][square[1]] == 'x'
      return false
    end

    true
  end
end
