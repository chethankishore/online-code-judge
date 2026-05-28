const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Problem = require('../models/Problem');

dotenv.config();

// -------------------- Helper Functions --------------------
function normalizeInput(rawInput) {
  if (rawInput === undefined || rawInput === null) return '\n';
  const str = String(rawInput);
  return str.trim() === '' ? '\n' : str;
}

function normalizeExpected(expected) {
  if (!expected || expected.trim() === '') return ' ';
  // Convert boolean-like strings to lowercase for consistency
  const lower = expected.trim().toLowerCase();
  if (lower === 'true') return 'true';
  if (lower === 'false') return 'false';
  return expected;
}

function getCategory(tags) {
  if (!tags || tags.length === 0) return 'Others';
  const tagString = tags.join(' ').toLowerCase();
  if (tagString.includes('array')) return 'Arrays';
  if (tagString.includes('string')) return 'Strings';
  if (tagString.includes('stack')) return 'Stack';
  if (tagString.includes('dynamic') || tagString.includes('dp')) return 'Dynamic Programming';
  if (tagString.includes('math')) return 'Math';
  if (tagString.includes('graph')) return 'Graphs';
  if (tagString.includes('tree')) return 'Trees';
  if (tagString.includes('backtracking')) return 'Backtracking';
  if (tagString.includes('greedy')) return 'Greedy';
  if (tagString.includes('queue')) return 'Queue';
  if (tagString.includes('heap')) return 'Heap';
  return 'Others';
}

// -------------------- Problems Array (55 total) --------------------
const problems = [
  // ========== EASY (20 problems) ==========
  {
    title: 'Two Sum',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers that add up to target.',
    difficulty: 'Easy',
    tags: ['Array', 'Hash Table'],
    constraints: '2 <= nums.length <= 10^4\n-10^9 <= nums[i] <= 10^9',
    sampleInput: '2 7 11 15\n9',
    sampleOutput: '[0, 1]',
    explanation: 'nums[0] + nums[1] = 9',
    points: 100,
    starterCode: {
      python: `nums = list(map(int, input().split()))
target = int(input())
def twoSum(nums, target):
    # Write your code here
    pass
print(twoSum(nums, target))`,
      javascript: `const nums = readline().split(' ').map(Number);
const target = Number(readline());
function twoSum(nums, target) {
    // Write your code here
}
console.log(twoSum(nums, target));`
    },
    testCases: [
      { id: 'tc1', input: '2 7 11 15\n9', expected: '[0, 1]' },
      { id: 'tc2', input: '3 2 4\n6', expected: '[1, 2]' },
      { id: 'tc3', input: '3 3\n6', expected: '[0, 1]' },
      { id: 'tc4', input: '1 2 3 4 5\n9', expected: '[3, 4]' },
      { id: 'tc5', input: '0 4 3 0\n0', expected: '[0, 3]' }
    ]
  },
  {
    title: 'Reverse String',
    description: 'Write a function that reverses a string.',
    difficulty: 'Easy',
    tags: ['String', 'Two Pointers'],
    constraints: '1 <= s.length <= 10^5',
    sampleInput: 'hello',
    sampleOutput: 'olleh',
    explanation: 'Reversed string of "hello" is "olleh".',
    points: 100,
    starterCode: {
      python: `s = input()
def reverseString(s):
    # Write your code here
    pass
print(reverseString(s))`,
      javascript: `const s = readline();
function reverseString(s) {
    // Write your code here
}
console.log(reverseString(s));`
    },
    testCases: [
      { id: 'tc1', input: 'hello', expected: 'olleh' },
      { id: 'tc2', input: 'world', expected: 'dlrow' },
      { id: 'tc3', input: 'a', expected: 'a' },
      { id: 'tc4', input: 'racecar', expected: 'racecar' },
      { id: 'tc5', input: '12345', expected: '54321' }
    ]
  },
  {
    title: 'Valid Parentheses',
    description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    difficulty: 'Easy',
    tags: ['Stack', 'String'],
    constraints: '1 <= s.length <= 10^4',
    sampleInput: '()[]{}',
    sampleOutput: 'true',
    explanation: 'All brackets are properly closed and nested.',
    points: 100,
    starterCode: {
      python: `s = input()
def isValid(s):
    # Write your code here
    pass
print(isValid(s))`,
      javascript: `const s = readline();
function isValid(s) {
    // Write your code here
}
console.log(isValid(s));`
    },
    testCases: [
      { id: 'tc1', input: '()[]{}', expected: 'true' },
      { id: 'tc2', input: '([{}])', expected: 'true' },
      { id: 'tc3', input: '(]', expected: 'false' },
      { id: 'tc4', input: '([)]', expected: 'false' },
      { id: 'tc5', input: '((()))', expected: 'true' },
      { id: 'tc6', input: '({[)}]', expected: 'false' }
    ]
  },
  {
    title: 'Best Time to Buy and Sell Stock',
    description: 'Find the maximum profit you can achieve from buying and selling one share of stock.',
    difficulty: 'Easy',
    tags: ['Array', 'Dynamic Programming'],
    constraints: '1 <= prices.length <= 10^5',
    sampleInput: '7 1 5 3 6 4',
    sampleOutput: '5',
    explanation: 'Buy at 1, sell at 6 for profit 5.',
    points: 100,
    starterCode: {
      python: `prices = list(map(int, input().split()))
def maxProfit(prices):
    # Write your code here
    pass
print(maxProfit(prices))`,
      javascript: `const prices = readline().split(' ').map(Number);
function maxProfit(prices) {
    // Write your code here
}
console.log(maxProfit(prices));`
    },
    testCases: [
      { id: 'tc1', input: '7 1 5 3 6 4', expected: '5' },
      { id: 'tc2', input: '7 6 4 3 1', expected: '0' },
      { id: 'tc3', input: '1 2 3 4 5', expected: '4' },
      { id: 'tc4', input: '3 2 6 5 0 3', expected: '4' },
      { id: 'tc5', input: '2 4 1', expected: '2' }
    ]
  },
  {
    title: 'Palindrome Number',
    description: 'Determine whether an integer is a palindrome.',
    difficulty: 'Easy',
    tags: ['Math', 'String'],
    constraints: '-2^31 <= x <= 2^31 - 1',
    sampleInput: '121',
    sampleOutput: 'true',
    explanation: '121 reads the same backward.',
    points: 100,
    starterCode: {
      python: `x = int(input())
def isPalindrome(x):
    # Write your code here
    pass
print(isPalindrome(x))`,
      javascript: `const x = parseInt(readline());
function isPalindrome(x) {
    // Write your code here
}
console.log(isPalindrome(x));`
    },
    testCases: [
      { id: 'tc1', input: '121', expected: 'true' },
      { id: 'tc2', input: '-121', expected: 'false' },
      { id: 'tc3', input: '10', expected: 'false' },
      { id: 'tc4', input: '0', expected: 'true' },
      { id: 'tc5', input: '12321', expected: 'true' }
    ]
  },
  {
    title: 'Fibonacci Number',
    description: 'Compute the nth Fibonacci number.',
    difficulty: 'Easy',
    tags: ['Recursion', 'DP', 'Math'],
    constraints: '0 <= n <= 30',
    sampleInput: '6',
    sampleOutput: '8',
    explanation: 'Fibonacci: 0,1,1,2,3,5,8 → F(6)=8.',
    points: 100,
    starterCode: {
      python: `n = int(input())
def fib(n):
    # Write your code here
    pass
print(fib(n))`,
      javascript: `const n = parseInt(readline());
function fib(n) {
    // Write your code here
}
console.log(fib(n));`
    },
    testCases: [
      { id: 'tc1', input: '0', expected: '0' },
      { id: 'tc2', input: '1', expected: '1' },
      { id: 'tc3', input: '6', expected: '8' },
      { id: 'tc4', input: '10', expected: '55' },
      { id: 'tc5', input: '20', expected: '6765' }
    ]
  },
  {
    title: 'Contains Duplicate',
    description: 'Return true if any value appears at least twice, else false.',
    difficulty: 'Easy',
    tags: ['Array', 'Hash Table'],
    constraints: '1 <= nums.length <= 10^5',
    sampleInput: '1 2 3 1',
    sampleOutput: 'true',
    explanation: '1 appears twice.',
    points: 100,
    starterCode: {
      python: `nums = list(map(int, input().split()))
def containsDuplicate(nums):
    # Write your code here
    pass
print(containsDuplicate(nums))`,
      javascript: `const nums = readline().split(' ').map(Number);
function containsDuplicate(nums) {
    // Write your code here
}
console.log(containsDuplicate(nums));`
    },
    testCases: [
      { id: 'tc1', input: '1 2 3 1', expected: 'true' },
      { id: 'tc2', input: '1 2 3 4', expected: 'false' },
      { id: 'tc3', input: '1 1 1 3 3 4 3 2 4 2', expected: 'true' },
      { id: 'tc4', input: '1', expected: 'false' },
      { id: 'tc5', input: '0 0', expected: 'true' }
    ]
  },
  {
    title: 'Climbing Stairs',
    description: 'Count distinct ways to climb n steps (1 or 2 steps at a time).',
    difficulty: 'Easy',
    tags: ['DP', 'Math'],
    constraints: '1 <= n <= 45',
    sampleInput: '3',
    sampleOutput: '3',
    explanation: '1+1+1, 1+2, 2+1 → 3 ways.',
    points: 100,
    starterCode: {
      python: `n = int(input())
def climbStairs(n):
    # Write your code here
    pass
print(climbStairs(n))`,
      javascript: `const n = parseInt(readline());
function climbStairs(n) {
    // Write your code here
}
console.log(climbStairs(n));`
    },
    testCases: [
      { id: 'tc1', input: '2', expected: '2' },
      { id: 'tc2', input: '3', expected: '3' },
      { id: 'tc3', input: '4', expected: '5' },
      { id: 'tc4', input: '5', expected: '8' },
      { id: 'tc5', input: '10', expected: '89' }
    ]
  },
  {
    title: 'Missing Number',
    description: 'Given an array containing n distinct numbers from 0..n, find the missing one.',
    difficulty: 'Easy',
    tags: ['Array', 'Math', 'Bit Manipulation'],
    constraints: '1 <= n <= 10^4',
    sampleInput: '3 0 1',
    sampleOutput: '2',
    explanation: 'The missing number is 2.',
    points: 100,
    starterCode: {
      python: `nums = list(map(int, input().split()))
def missingNumber(nums):
    # Write your code here
    pass
print(missingNumber(nums))`,
      javascript: `const nums = readline().split(' ').map(Number);
function missingNumber(nums) {
    // Write your code here
}
console.log(missingNumber(nums));`
    },
    testCases: [
      { id: 'tc1', input: '3 0 1', expected: '2' },
      { id: 'tc2', input: '0 1', expected: '2' },
      { id: 'tc3', input: '9 6 4 2 3 5 7 0 1', expected: '8' },
      { id: 'tc4', input: '0', expected: '1' },
      { id: 'tc5', input: '1', expected: '0' }
    ]
  },
  {
    title: 'Majority Element',
    description: 'Find the element that appears more than ⌊ n/2 ⌋ times.',
    difficulty: 'Easy',
    tags: ['Array', 'Hash Table', 'Divide and Conquer'],
    constraints: '1 <= n <= 5*10^4',
    sampleInput: '3 2 3',
    sampleOutput: '3',
    explanation: '3 appears twice > 3/2.',
    points: 100,
    starterCode: {
      python: `nums = list(map(int, input().split()))
def majorityElement(nums):
    # Write your code here
    pass
print(majorityElement(nums))`,
      javascript: `const nums = readline().split(' ').map(Number);
function majorityElement(nums) {
    // Write your code here
}
console.log(majorityElement(nums));`
    },
    testCases: [
      { id: 'tc1', input: '3 2 3', expected: '3' },
      { id: 'tc2', input: '2 2 1 1 1 2 2', expected: '2' },
      { id: 'tc3', input: '1', expected: '1' },
      { id: 'tc4', input: '6 5 5', expected: '5' },
      { id: 'tc5', input: '10 10 10 5 10', expected: '10' }
    ]
  },
  {
    title: 'Fizz Buzz',
    description: 'Return list of strings from 1 to n, with Fizz/Buzz/FizzBuzz rules.',
    difficulty: 'Easy',
    tags: ['Math', 'String'],
    constraints: '1 <= n <= 10^4',
    sampleInput: '15',
    sampleOutput: '1,2,Fizz,4,Buzz,Fizz,7,8,Fizz,Buzz,11,Fizz,13,14,FizzBuzz',
    explanation: 'Standard FizzBuzz.',
    points: 100,
    starterCode: {
      python: `n = int(input())
def fizzBuzz(n):
    # Write your code here
    pass
print(fizzBuzz(n))`,
      javascript: `const n = parseInt(readline());
function fizzBuzz(n) {
    // Write your code here
}
console.log(fizzBuzz(n));`
    },
    testCases: [
      { id: 'tc1', input: '3', expected: '1,2,Fizz' },
      { id: 'tc2', input: '5', expected: '1,2,Fizz,4,Buzz' },
      { id: 'tc3', input: '15', expected: '1,2,Fizz,4,Buzz,Fizz,7,8,Fizz,Buzz,11,Fizz,13,14,FizzBuzz' }
    ]
  },
  {
    title: 'Move Zeroes',
    description: 'Move all zeros to the end while preserving relative order of non-zero elements.',
    difficulty: 'Easy',
    tags: ['Array', 'Two Pointers'],
    constraints: '1 <= nums.length <= 10^4',
    sampleInput: '0 1 0 3 12',
    sampleOutput: '1 3 12 0 0',
    explanation: 'Zeros moved to the end.',
    points: 100,
    starterCode: {
      python: `nums = list(map(int, input().split()))
def moveZeroes(nums):
    # Write your code here
    pass
print(' '.join(map(str, nums)))`,
      javascript: `const nums = readline().split(' ').map(Number);
function moveZeroes(nums) {
    // Write your code here
}
console.log(nums.join(' '));`
    },
    testCases: [
      { id: 'tc1', input: '0 1 0 3 12', expected: '1 3 12 0 0' },
      { id: 'tc2', input: '0', expected: '0' },
      { id: 'tc3', input: '1 2 3', expected: '1 2 3' },
      { id: 'tc4', input: '0 0 1', expected: '1 0 0' },
      { id: 'tc5', input: '4 2 4 0 0 3 0 5', expected: '4 2 4 3 5 0 0 0' }
    ]
  },
  {
    title: 'Maximum Subarray',
    description: 'Find the contiguous subarray (containing at least one number) with the largest sum and return its sum.',
    difficulty: 'Easy',
    tags: ['Array', 'Dynamic Programming', 'Divide and Conquer'],
    constraints: '1 <= nums.length <= 10^5\n-10^4 <= nums[i] <= 10^4',
    sampleInput: '-2 1 -3 4 -1 2 1 -5 4',
    sampleOutput: '6',
    explanation: 'Subarray [4,-1,2,1] has the largest sum = 6.',
    points: 100,
    starterCode: {
      python: `nums = list(map(int, input().split()))
def maxSubArray(nums):
    # Write your code here
    pass
print(maxSubArray(nums))`,
      javascript: `const nums = readline().split(' ').map(Number);
function maxSubArray(nums) {
    // Write your code here
}
console.log(maxSubArray(nums));`
    },
    testCases: [
      { id: 'tc1', input: '-2 1 -3 4 -1 2 1 -5 4', expected: '6' },
      { id: 'tc2', input: '1', expected: '1' },
      { id: 'tc3', input: '5 4 -1 7 8', expected: '23' },
      { id: 'tc4', input: '-1', expected: '-1' },
      { id: 'tc5', input: '-2 -1', expected: '-1' }
    ]
  },
  {
    title: 'Single Number',
    description: 'Every element appears twice except for one. Find that single one. Your solution must run in O(n) time and O(1) space.',
    difficulty: 'Easy',
    tags: ['Array', 'Bit Manipulation'],
    constraints: '1 <= nums.length <= 3*10^4\nEach element appears twice except for one.',
    sampleInput: '2 2 1',
    sampleOutput: '1',
    explanation: '1 appears only once; XOR of all elements cancels pairs.',
    points: 100,
    starterCode: {
      python: `nums = list(map(int, input().split()))
def singleNumber(nums):
    # Write your code here
    pass
print(singleNumber(nums))`,
      javascript: `const nums = readline().split(' ').map(Number);
function singleNumber(nums) {
    // Write your code here
}
console.log(singleNumber(nums));`
    },
    testCases: [
      { id: 'tc1', input: '2 2 1', expected: '1' },
      { id: 'tc2', input: '4 1 2 1 2', expected: '4' },
      { id: 'tc3', input: '1', expected: '1' },
      { id: 'tc4', input: '0 1 0', expected: '1' },
      { id: 'tc5', input: '7 3 5 3 7', expected: '5' }
    ]
  },
  {
    title: 'Reverse Linked List',
    description: 'Given a singly linked list represented as a space-separated sequence of values, reverse it and print the values.',
    difficulty: 'Easy',
    tags: ['Linked List', 'Recursion'],
    constraints: '0 <= n <= 5000\n-5000 <= Node.val <= 5000',
    sampleInput: '1 2 3 4 5',
    sampleOutput: '5 4 3 2 1',
    explanation: 'Reversed list: 5 → 4 → 3 → 2 → 1.',
    points: 100,
    starterCode: {
      python: `vals = list(map(int, input().split()))
def reverseList(vals):
    # Write your code here
    pass
print(' '.join(map(str, reverseList(vals))))`,
      javascript: `const vals = readline().split(' ').map(Number);
function reverseList(vals) {
    // Write your code here
}
console.log(reverseList(vals).join(' '));`
    },
    testCases: [
      { id: 'tc1', input: '1 2 3 4 5', expected: '5 4 3 2 1' },
      { id: 'tc2', input: '1 2', expected: '2 1' },
      { id: 'tc3', input: '1', expected: '1' },
      { id: 'tc4', input: '3 6 9 12', expected: '12 9 6 3' },
      { id: 'tc5', input: '10 20 30', expected: '30 20 10' }
    ]
  },
  {
    title: 'Binary Search',
    description: 'Given a sorted array of distinct integers and a target, return the index of the target or -1 if not found. Must run in O(log n) time.',
    difficulty: 'Easy',
    tags: ['Array', 'Binary Search'],
    constraints: '1 <= nums.length <= 10^4\nAll values are distinct and sorted ascending.',
    sampleInput: '-1 0 3 5 9 12\n9',
    sampleOutput: '4',
    explanation: '9 is at index 4.',
    points: 100,
    starterCode: {
      python: `nums = list(map(int, input().split()))
target = int(input())
def search(nums, target):
    # Write your code here
    pass
print(search(nums, target))`,
      javascript: `const nums = readline().split(' ').map(Number);
const target = parseInt(readline());
function search(nums, target) {
    // Write your code here
}
console.log(search(nums, target));`
    },
    testCases: [
      { id: 'tc1', input: '-1 0 3 5 9 12\n9', expected: '4' },
      { id: 'tc2', input: '-1 0 3 5 9 12\n2', expected: '-1' },
      { id: 'tc3', input: '5\n5', expected: '0' },
      { id: 'tc4', input: '1 3 5 7 9\n1', expected: '0' },
      { id: 'tc5', input: '1 3 5 7 9\n9', expected: '4' }
    ]
  },
  {
    title: 'Power of Two',
    description: 'Given an integer n, return true if it is a power of two, otherwise return false.',
    difficulty: 'Easy',
    tags: ['Math', 'Bit Manipulation', 'Recursion'],
    constraints: '-2^31 <= n <= 2^31 - 1',
    sampleInput: '16',
    sampleOutput: 'true',
    explanation: '16 = 2^4, so it is a power of two.',
    points: 100,
    starterCode: {
      python: `n = int(input())
def isPowerOfTwo(n):
    # Write your code here
    pass
print(isPowerOfTwo(n))`,
      javascript: `const n = parseInt(readline());
function isPowerOfTwo(n) {
    // Write your code here
}
console.log(isPowerOfTwo(n));`
    },
    testCases: [
      { id: 'tc1', input: '1', expected: 'true' },
      { id: 'tc2', input: '16', expected: 'true' },
      { id: 'tc3', input: '3', expected: 'false' },
      { id: 'tc4', input: '0', expected: 'false' },
      { id: 'tc5', input: '64', expected: 'true' }
    ]
  },
  {
    title: 'Is Subsequence',
    description: 'Given strings s and t, return true if s is a subsequence of t.',
    difficulty: 'Easy',
    tags: ['String', 'Two Pointers', 'Dynamic Programming'],
    constraints: '0 <= s.length <= 100\n0 <= t.length <= 10^4',
    sampleInput: 'abc\nahbgdc',
    sampleOutput: 'true',
    explanation: '"abc" can be found in "ahbgdc" in order.',
    points: 100,
    starterCode: {
      python: `s = input()
t = input()
def isSubsequence(s, t):
    # Write your code here
    pass
print(isSubsequence(s, t))`,
      javascript: `const s = readline();
const t = readline();
function isSubsequence(s, t) {
    // Write your code here
}
console.log(isSubsequence(s, t));`
    },
    testCases: [
      { id: 'tc1', input: 'abc\nahbgdc', expected: 'true' },
      { id: 'tc2', input: 'axc\nahbgdc', expected: 'false' },
      { id: 'tc3', input: '\nahbgdc', expected: 'true' },
      { id: 'tc4', input: 'ace\nabcde', expected: 'true' },
      { id: 'tc5', input: 'aec\nabcde', expected: 'false' }
    ]
  },
  {
    title: 'Counting Bits',
    description: 'Given an integer n, return an array of length n+1 where ans[i] is the number of 1s in the binary representation of i.',
    difficulty: 'Easy',
    tags: ['Dynamic Programming', 'Bit Manipulation'],
    constraints: '0 <= n <= 10^5',
    sampleInput: '5',
    sampleOutput: '0 1 1 2 1 2',
    explanation: 'Binary of 0..5: 0,1,1,10,1,101 → 1-count: 0,1,1,2,1,2.',
    points: 100,
    starterCode: {
      python: `n = int(input())
def countBits(n):
    # Write your code here
    pass
print(' '.join(map(str, countBits(n))))`,
      javascript: `const n = parseInt(readline());
function countBits(n) {
    // Write your code here
}
console.log(countBits(n).join(' '));`
    },
    testCases: [
      { id: 'tc1', input: '2', expected: '0 1 1' },
      { id: 'tc2', input: '5', expected: '0 1 1 2 1 2' },
      { id: 'tc3', input: '0', expected: '0' },
      { id: 'tc4', input: '7', expected: '0 1 1 2 1 2 2 3' },
      { id: 'tc5', input: '4', expected: '0 1 1 2 1' }
    ]
  },
  {
    title: 'Valid Palindrome',
    description: 'Given a string s, return true if it is a palindrome, ignoring non-alphanumeric characters and case.',
    difficulty: 'Easy',
    tags: ['String', 'Two Pointers'],
    constraints: '1 <= s.length <= 2*10^5',
    sampleInput: 'A man, a plan, a canal: Panama',
    sampleOutput: 'true',
    explanation: 'After cleaning, "amanaplanacanalpanama" is a palindrome.',
    points: 100,
    starterCode: {
      python: `s = input()
def isPalindrome(s):
    # Write your code here
    pass
print(isPalindrome(s))`,
      javascript: `const s = readline();
function isPalindrome(s) {
    // Write your code here
}
console.log(isPalindrome(s));`
    },
    testCases: [
      { id: 'tc1', input: 'A man, a plan, a canal: Panama', expected: 'true' },
      { id: 'tc2', input: 'race a car', expected: 'false' },
      { id: 'tc3', input: ' ', expected: 'true' },
      { id: 'tc4', input: 'ab_a', expected: 'true' },
      { id: 'tc5', input: '0P', expected: 'false' }
    ]
  },

  // ========== MEDIUM (20 problems) ==========
  {
    title: 'Longest Substring Without Repeating Characters',
    description: 'Find length of longest substring without repeating characters.',
    difficulty: 'Medium',
    tags: ['Hash Table', 'String', 'Sliding Window'],
    constraints: '0 <= s.length <= 5*10^4',
    sampleInput: 'abcabcbb',
    sampleOutput: '3',
    explanation: 'Answer is "abc" length 3.',
    points: 200,
    starterCode: {
      python: `s = input()
def lengthOfLongestSubstring(s):
    # Write your code here
    pass
print(lengthOfLongestSubstring(s))`,
      javascript: `const s = readline();
function lengthOfLongestSubstring(s) {
    // Write your code here
}
console.log(lengthOfLongestSubstring(s));`
    },
    testCases: [
      { id: 'tc1', input: 'abcabcbb', expected: '3' },
      { id: 'tc2', input: 'bbbbb', expected: '1' },
      { id: 'tc3', input: 'pwwkew', expected: '3' },
      { id: 'tc4', input: '\n', expected: '0' },
      { id: 'tc5', input: 'au', expected: '2' }
    ]
  },
  {
    title: 'Container With Most Water',
    description: 'Find two lines that together with x-axis form a container holding the most water.',
    difficulty: 'Medium',
    tags: ['Array', 'Two Pointers', 'Greedy'],
    constraints: '2 <= height.length <= 10^5',
    sampleInput: '1 8 6 2 5 4 8 3 7',
    sampleOutput: '49',
    explanation: 'Maximum area = 49.',
    points: 200,
    starterCode: {
      python: `height = list(map(int, input().split()))
def maxArea(height):
    # Write your code here
    pass
print(maxArea(height))`,
      javascript: `const height = readline().split(' ').map(Number);
function maxArea(height) {
    // Write your code here
}
console.log(maxArea(height));`
    },
    testCases: [
      { id: 'tc1', input: '1 8 6 2 5 4 8 3 7', expected: '49' },
      { id: 'tc2', input: '1 1', expected: '1' },
      { id: 'tc3', input: '4 3 2 1 4', expected: '16' },
      { id: 'tc4', input: '1 2 1', expected: '2' },
      { id: 'tc5', input: '2 3 4 5 18 17 6', expected: '17' }
    ]
  },
  {
    title: '3Sum',
    description: 'Find all unique triplets that sum to zero.',
    difficulty: 'Medium',
    tags: ['Array', 'Two Pointers', 'Sorting'],
    constraints: '3 <= nums.length <= 3000',
    sampleInput: '-1 0 1 2 -1 -4',
    sampleOutput: '[[-1,-1,2],[-1,0,1]]',
    explanation: 'Triplets that sum to zero.',
    points: 200,
    starterCode: {
      python: `nums = list(map(int, input().split()))
def threeSum(nums):
    # Write your code here
    pass
print(threeSum(nums))`,
      javascript: `const nums = readline().split(' ').map(Number);
function threeSum(nums) {
    // Write your code here
}
console.log(threeSum(nums));`
    },
    testCases: [
      { id: 'tc1', input: '-1 0 1 2 -1 -4', expected: '[[-1,-1,2],[-1,0,1]]' },
      { id: 'tc2', input: '0 0 0', expected: '[[0,0,0]]' },
      { id: 'tc3', input: '0 1 1', expected: '[]' },
      { id: 'tc4', input: '-2 0 1 1 2', expected: '[[-2,0,2],[-2,1,1]]' }
    ]
  },
  {
    title: 'Group Anagrams',
    description: 'Group the given list of strings into anagrams.',
    difficulty: 'Medium',
    tags: ['Hash Table', 'String', 'Sorting'],
    constraints: '1 <= strs.length <= 10^4',
    sampleInput: 'eat tea tan ate nat bat',
    sampleOutput: '[[bat],[nat,tan],[ate,eat,tea]]',
    explanation: 'Anagrams grouped.',
    points: 200,
    starterCode: {
      python: `strs = input().split()
def groupAnagrams(strs):
    # Write your code here
    pass
print(groupAnagrams(strs))`,
      javascript: `const strs = readline().split(' ');
function groupAnagrams(strs) {
    // Write your code here
}
console.log(groupAnagrams(strs));`
    },
    testCases: [
      { id: 'tc1', input: 'eat tea tan ate nat bat', expected: '[[bat],[nat,tan],[ate,eat,tea]]' },
      { id: 'tc2', input: '\n', expected: '[[]]' },
      { id: 'tc3', input: 'a', expected: '[[a]]' }
    ]
  },
  {
    title: 'Product of Array Except Self',
    description: 'Return an array output[i] = product of all elements except nums[i].',
    difficulty: 'Medium',
    tags: ['Array', 'Prefix Sum'],
    constraints: '2 <= nums.length <= 10^5',
    sampleInput: '1 2 3 4',
    sampleOutput: '24 12 8 6',
    explanation: 'Products: 2*3*4=24, 1*3*4=12, etc.',
    points: 200,
    starterCode: {
      python: `nums = list(map(int, input().split()))
def productExceptSelf(nums):
    # Write your code here
    pass
print(' '.join(map(str, productExceptSelf(nums))))`,
      javascript: `const nums = readline().split(' ').map(Number);
function productExceptSelf(nums) {
    // Write your code here
}
console.log(productExceptSelf(nums).join(' '));`
    },
    testCases: [
      { id: 'tc1', input: '1 2 3 4', expected: '24 12 8 6' },
      { id: 'tc2', input: '-1 1 0 -3 3', expected: '0 0 9 0 0' }
    ]
  },
  {
    title: 'Spiral Matrix',
    description: 'Return all elements of the matrix in spiral order.',
    difficulty: 'Medium',
    tags: ['Array', 'Matrix', 'Simulation'],
    constraints: '1 <= m,n <= 10',
    sampleInput: '3 3\n1 2 3\n4 5 6\n7 8 9',
    sampleOutput: '1 2 3 6 9 8 7 4 5',
    explanation: 'Spiral traversal.',
    points: 200,
    starterCode: {
      python: `rows, cols = map(int, input().split())
matrix = []
for _ in range(rows):
    matrix.append(list(map(int, input().split())))
def spiralOrder(matrix):
    # Write your code here
    pass
print(' '.join(map(str, spiralOrder(matrix))))`,
      javascript: `const [rows, cols] = readline().split(' ').map(Number);
const matrix = [];
for (let i = 0; i < rows; i++) {
    matrix.push(readline().split(' ').map(Number));
}
function spiralOrder(matrix) {
    // Write your code here
}
console.log(spiralOrder(matrix).join(' '));`
    },
    testCases: [
      { id: 'tc1', input: '3 3\n1 2 3\n4 5 6\n7 8 9', expected: '1 2 3 6 9 8 7 4 5' },
      { id: 'tc2', input: '1 3\n1 2 3', expected: '1 2 3' },
      { id: 'tc3', input: '3 1\n1\n2\n3', expected: '1 2 3' }
    ]
  },
  {
    title: 'Rotate Image',
    description: 'Rotate the n x n matrix by 90 degrees clockwise in-place.',
    difficulty: 'Medium',
    tags: ['Array', 'Matrix'],
    constraints: '1 <= n <= 20',
    sampleInput: '3\n1 2 3\n4 5 6\n7 8 9',
    sampleOutput: '7 4 1\n8 5 2\n9 6 3',
    explanation: '90-degree rotation.',
    points: 200,
    starterCode: {
      python: `n = int(input())
matrix = []
for _ in range(n):
    matrix.append(list(map(int, input().split())))
def rotate(matrix):
    # Write your code here
    pass
rotate(matrix)
for row in matrix:
    print(' '.join(map(str, row)))`,
      javascript: `const n = parseInt(readline());
const matrix = [];
for (let i = 0; i < n; i++) {
    matrix.push(readline().split(' ').map(Number));
}
function rotate(matrix) {
    // Write your code here
}
rotate(matrix);
for (let row of matrix) {
    console.log(row.join(' '));
}`
    },
    testCases: [
      { id: 'tc1', input: '3\n1 2 3\n4 5 6\n7 8 9', expected: '7 4 1\n8 5 2\n9 6 3' },
      { id: 'tc2', input: '2\n1 2\n3 4', expected: '3 1\n4 2' }
    ]
  },
  {
    title: 'Word Search',
    description: 'Given a 2D board and a word, find if the word exists.',
    difficulty: 'Medium',
    tags: ['Array', 'Backtracking'],
    constraints: '1 <= m,n <= 6',
    sampleInput: '3 4\nA B C E\nS F C S\nA D E E\nABCCED',
    sampleOutput: 'true',
    explanation: 'Word "ABCCED" exists.',
    points: 200,
    starterCode: {
      python: `rows, cols = map(int, input().split())
board = []
for _ in range(rows):
    board.append(input().split())
word = input()
def exist(board, word):
    # Write your code here
    pass
print(exist(board, word))`,
      javascript: `const [rows, cols] = readline().split(' ').map(Number);
const board = [];
for (let i = 0; i < rows; i++) {
    board.push(readline().split(' '));
}
const word = readline();
function exist(board, word) {
    // Write your code here
}
console.log(exist(board, word));`
    },
    testCases: [
      { id: 'tc1', input: '3 4\nA B C E\nS F C S\nA D E E\nABCCED', expected: 'true' },
      { id: 'tc2', input: '1 1\nA\nA', expected: 'true' },
      { id: 'tc3', input: '2 2\nA B\nC D\nABCD', expected: 'false' }
    ]
  },
  {
    title: 'Course Schedule',
    description: 'Determine if you can finish all courses given prerequisites.',
    difficulty: 'Medium',
    tags: ['Graph', 'Topological Sort', 'BFS', 'DFS'],
    constraints: '1 <= numCourses <= 2000',
    sampleInput: '2\n1 0',
    sampleOutput: 'true',
    explanation: 'Possible to finish.',
    points: 200,
    starterCode: {
      python: `numCourses = int(input())
prerequisites = []
while True:
    try:
        line = input()
        if not line: break
        a,b = map(int, line.split())
        prerequisites.append([a,b])
    except:
        break
def canFinish(numCourses, prerequisites):
    # Write your code here
    pass
print(canFinish(numCourses, prerequisites))`,
      javascript: `const numCourses = parseInt(readline());
const prerequisites = [];
let line;
while ((line = readline()) && line !== '') {
    const [a, b] = line.split(' ').map(Number);
    prerequisites.push([a, b]);
}
function canFinish(numCourses, prerequisites) {
    // Write your code here
}
console.log(canFinish(numCourses, prerequisites));`
    },
    testCases: [
      { id: 'tc1', input: '2\n1 0', expected: 'true' },
      { id: 'tc2', input: '2\n1 0\n0 1', expected: 'false' },
      { id: 'tc3', input: '4\n1 0\n2 1\n3 2', expected: 'true' }
    ]
  },
  {
    title: 'Merge Intervals',
    description: 'Given a list of intervals, merge all overlapping intervals.',
    difficulty: 'Medium',
    tags: ['Array', 'Sorting'],
    constraints: '1 <= intervals.length <= 10^4\nintervals[i].length == 2\n0 <= start <= end <= 10^4',
    sampleInput: '4\n1 3\n2 6\n8 10\n15 18',
    sampleOutput: '1 6\n8 10\n15 18',
    explanation: 'Intervals [1,3] and [2,6] overlap and merge to [1,6].',
    points: 200,
    starterCode: {
      python: `n = int(input())
intervals = []
for _ in range(n):
    a, b = map(int, input().split())
    intervals.append([a, b])
def merge(intervals):
    # Write your code here
    pass
for iv in merge(intervals):
    print(iv[0], iv[1])`,
      javascript: `const n = parseInt(readline());
const intervals = [];
for (let i = 0; i < n; i++) {
    intervals.push(readline().split(' ').map(Number));
}
function merge(intervals) {
    // Write your code here
}
merge(intervals).forEach(iv => console.log(iv[0] + ' ' + iv[1]));`
    },
    testCases: [
      { id: 'tc1', input: '4\n1 3\n2 6\n8 10\n15 18', expected: '1 6\n8 10\n15 18' },
      { id: 'tc2', input: '2\n1 4\n4 5', expected: '1 5' },
      { id: 'tc3', input: '3\n1 4\n0 2\n3 5', expected: '0 5' },
      { id: 'tc4', input: '1\n1 1', expected: '1 1' }
    ]
  },
  {
    title: 'Jump Game',
    description: 'Given an array of non-negative integers, determine if you can reach the last index starting from index 0. Each element represents your maximum jump length.',
    difficulty: 'Medium',
    tags: ['Array', 'Greedy', 'Dynamic Programming'],
    constraints: '1 <= nums.length <= 10^4\n0 <= nums[i] <= 10^5',
    sampleInput: '2 3 1 1 4',
    sampleOutput: 'true',
    explanation: 'Jump 1 step from index 0 to 1, then 3 steps to the last index.',
    points: 200,
    starterCode: {
      python: `nums = list(map(int, input().split()))
def canJump(nums):
    # Write your code here
    pass
print(canJump(nums))`,
      javascript: `const nums = readline().split(' ').map(Number);
function canJump(nums) {
    // Write your code here
}
console.log(canJump(nums));`
    },
    testCases: [
      { id: 'tc1', input: '2 3 1 1 4', expected: 'true' },
      { id: 'tc2', input: '3 2 1 0 4', expected: 'false' },
      { id: 'tc3', input: '0', expected: 'true' },
      { id: 'tc4', input: '1 0', expected: 'true' },
      { id: 'tc5', input: '2 0 0', expected: 'true' }
    ]
  },
  {
    title: 'Unique Paths',
    description: 'A robot starts at top-left corner of an m x n grid and wants to reach the bottom-right corner. Count all unique paths moving only down or right.',
    difficulty: 'Medium',
    tags: ['Math', 'Dynamic Programming', 'Combinatorics'],
    constraints: '1 <= m, n <= 100',
    sampleInput: '3 7',
    sampleOutput: '28',
    explanation: 'There are 28 unique paths for a 3x7 grid.',
    points: 200,
    starterCode: {
      python: `m, n = map(int, input().split())
def uniquePaths(m, n):
    # Write your code here
    pass
print(uniquePaths(m, n))`,
      javascript: `const [m, n] = readline().split(' ').map(Number);
function uniquePaths(m, n) {
    // Write your code here
}
console.log(uniquePaths(m, n));`
    },
    testCases: [
      { id: 'tc1', input: '3 7', expected: '28' },
      { id: 'tc2', input: '3 2', expected: '3' },
      { id: 'tc3', input: '1 1', expected: '1' },
      { id: 'tc4', input: '5 5', expected: '70' },
      { id: 'tc5', input: '10 10', expected: '48620' }
    ]
  },
  {
    title: 'Number of Islands',
    description: "Given a 2D grid of '1's (land) and '0's (water), count the number of islands (connected groups of 1s).",
    difficulty: 'Medium',
    tags: ['Array', 'DFS', 'BFS', 'Union Find', 'Matrix'],
    constraints: '1 <= m, n <= 300',
    sampleInput: '4 5\n1 1 1 1 0\n1 1 0 1 0\n1 1 0 0 0\n0 0 0 0 0',
    sampleOutput: '1',
    explanation: 'All 1s are connected, forming a single island.',
    points: 200,
    starterCode: {
      python: `rows, cols = map(int, input().split())
grid = []
for _ in range(rows):
    grid.append(list(map(int, input().split())))
def numIslands(grid):
    # Write your code here
    pass
print(numIslands(grid))`,
      javascript: `const [rows, cols] = readline().split(' ').map(Number);
const grid = [];
for (let i = 0; i < rows; i++) {
    grid.push(readline().split(' ').map(Number));
}
function numIslands(grid) {
    // Write your code here
}
console.log(numIslands(grid));`
    },
    testCases: [
      { id: 'tc1', input: '4 5\n1 1 1 1 0\n1 1 0 1 0\n1 1 0 0 0\n0 0 0 0 0', expected: '1' },
      { id: 'tc2', input: '4 5\n1 1 0 0 0\n1 1 0 0 0\n0 0 1 0 0\n0 0 0 1 1', expected: '3' },
      { id: 'tc3', input: '1 1\n1', expected: '1' },
      { id: 'tc4', input: '1 1\n0', expected: '0' },
      { id: 'tc5', input: '2 2\n1 0\n0 1', expected: '2' }
    ]
  },
  {
    title: 'Search in Rotated Sorted Array',
    description: 'Search for a target in a rotated sorted array. Return its index or -1.',
    difficulty: 'Medium',
    tags: ['Array', 'Binary Search'],
    constraints: '1 <= nums.length <= 5000\nAll values are unique.',
    sampleInput: '4 5 6 7 0 1 2\n0',
    sampleOutput: '4',
    explanation: '0 is at index 4 in the rotated array.',
    points: 200,
    starterCode: {
      python: `nums = list(map(int, input().split()))
target = int(input())
def search(nums, target):
    # Write your code here
    pass
print(search(nums, target))`,
      javascript: `const nums = readline().split(' ').map(Number);
const target = parseInt(readline());
function search(nums, target) {
    // Write your code here
}
console.log(search(nums, target));`
    },
    testCases: [
      { id: 'tc1', input: '4 5 6 7 0 1 2\n0', expected: '4' },
      { id: 'tc2', input: '4 5 6 7 0 1 2\n3', expected: '-1' },
      { id: 'tc3', input: '1\n0', expected: '-1' },
      { id: 'tc4', input: '1\n1', expected: '0' },
      { id: 'tc5', input: '3 1\n1', expected: '1' }
    ]
  },
  {
    title: 'Find Minimum in Rotated Sorted Array',
    description: 'Find the minimum element in a rotated sorted array of unique elements.',
    difficulty: 'Medium',
    tags: ['Array', 'Binary Search'],
    constraints: '1 <= nums.length <= 5000\nAll values are unique.',
    sampleInput: '3 4 5 1 2',
    sampleOutput: '1',
    explanation: 'The minimum element is 1.',
    points: 200,
    starterCode: {
      python: `nums = list(map(int, input().split()))
def findMin(nums):
    # Write your code here
    pass
print(findMin(nums))`,
      javascript: `const nums = readline().split(' ').map(Number);
function findMin(nums) {
    // Write your code here
}
console.log(findMin(nums));`
    },
    testCases: [
      { id: 'tc1', input: '3 4 5 1 2', expected: '1' },
      { id: 'tc2', input: '4 5 6 7 0 1 2', expected: '0' },
      { id: 'tc3', input: '11 13 15 17', expected: '11' },
      { id: 'tc4', input: '1', expected: '1' },
      { id: 'tc5', input: '2 1', expected: '1' }
    ]
  },
  {
    title: 'Kth Largest Element in an Array',
    description: 'Find the kth largest element in an unsorted array.',
    difficulty: 'Medium',
    tags: ['Array', 'Divide and Conquer', 'Sorting', 'Heap', 'Quickselect'],
    constraints: '1 <= k <= nums.length <= 10^4',
    sampleInput: '3 2 1 5 6 4\n2',
    sampleOutput: '5',
    explanation: 'The 2nd largest element is 5.',
    points: 200,
    starterCode: {
      python: `nums = list(map(int, input().split()))
k = int(input())
def findKthLargest(nums, k):
    # Write your code here
    pass
print(findKthLargest(nums, k))`,
      javascript: `const nums = readline().split(' ').map(Number);
const k = parseInt(readline());
function findKthLargest(nums, k) {
    // Write your code here
}
console.log(findKthLargest(nums, k));`
    },
    testCases: [
      { id: 'tc1', input: '3 2 1 5 6 4\n2', expected: '5' },
      { id: 'tc2', input: '3 2 3 1 2 4 5 5 6\n4', expected: '4' },
      { id: 'tc3', input: '1\n1', expected: '1' },
      { id: 'tc4', input: '7 6 5 4 3 2 1\n1', expected: '7' },
      { id: 'tc5', input: '10 4 3 8 2\n3', expected: '4' }
    ]
  },
  {
    title: 'Coin Change',
    description: 'Given coin denominations and a total amount, find the fewest number of coins needed to make up that amount. Return -1 if not possible.',
    difficulty: 'Medium',
    tags: ['Array', 'Dynamic Programming', 'Breadth-First Search'],
    constraints: '1 <= coins.length <= 12\n1 <= coins[i] <= 2^31 - 1\n0 <= amount <= 10^4',
    sampleInput: '1 5 6 9\n11',
    sampleOutput: '2',
    explanation: '5 + 6 = 11 using 2 coins.',
    points: 200,
    starterCode: {
      python: `coins = list(map(int, input().split()))
amount = int(input())
def coinChange(coins, amount):
    # Write your code here
    pass
print(coinChange(coins, amount))`,
      javascript: `const coins = readline().split(' ').map(Number);
const amount = parseInt(readline());
function coinChange(coins, amount) {
    // Write your code here
}
console.log(coinChange(coins, amount));`
    },
    testCases: [
      { id: 'tc1', input: '1 5 6 9\n11', expected: '2' },
      { id: 'tc2', input: '1 2 5\n11', expected: '3' },
      { id: 'tc3', input: '2\n3', expected: '-1' },
      { id: 'tc4', input: '1\n0', expected: '0' },
      { id: 'tc5', input: '1 2 5\n100', expected: '20' }
    ]
  },
  {
    title: 'Letter Combinations of a Phone Number',
    description: 'Given a string containing digits 2-9, return all possible letter combinations the number could represent. Output letters in sorted lexicographic order separated by spaces.',
    difficulty: 'Medium',
    tags: ['Hash Table', 'String', 'Backtracking'],
    constraints: '0 <= digits.length <= 4\ndigits[i] is in [2,9]',
    sampleInput: '23',
    sampleOutput: 'ad ae af bd be bf cd ce cf',
    explanation: '2→abc 3→def → all combinations sorted.',
    points: 200,
    starterCode: {
      python: `digits = input().strip()
def letterCombinations(digits):
    # Write your code here
    # Return sorted list of combinations
    pass
result = letterCombinations(digits)
if result:
    print(' '.join(sorted(result)))
else:
    print('')`,
      javascript: `const digits = readline().trim();
function letterCombinations(digits) {
    // Write your code here
    // Return sorted array of combinations
}
const result = letterCombinations(digits);
if (result && result.length > 0) {
    console.log(result.sort().join(' '));
} else {
    console.log('');
}`
    },
    testCases: [
      { id: 'tc1', input: '23', expected: 'ad ae af bd be bf cd ce cf' },
      { id: 'tc2', input: '2', expected: 'a b c' },
      { id: 'tc3', input: '9', expected: 'w x y z' },
      { id: 'tc4', input: '79', expected: 'pw px py pz qw qx qy qz rw rx ry rz sw sx sy sz' }
    ]
  },
  {
    title: 'Longest Palindromic Substring',
    description: 'Given a string s, return the longest palindromic substring.',
    difficulty: 'Medium',
    tags: ['String', 'Dynamic Programming'],
    constraints: '1 <= s.length <= 1000',
    sampleInput: 'cbbd',
    sampleOutput: 'bb',
    explanation: '"bb" is the longest palindromic substring.',
    points: 200,
    starterCode: {
      python: `s = input()
def longestPalindrome(s):
    # Write your code here
    pass
print(longestPalindrome(s))`,
      javascript: `const s = readline();
function longestPalindrome(s) {
    // Write your code here
}
console.log(longestPalindrome(s));`
    },
    testCases: [
      { id: 'tc1', input: 'cbbd', expected: 'bb' },
      { id: 'tc2', input: 'a', expected: 'a' },
      { id: 'tc3', input: 'racecar', expected: 'racecar' },
      { id: 'tc4', input: 'abacaba', expected: 'abacaba' },
      { id: 'tc5', input: 'xyzyx', expected: 'xyzyx' }
    ]
  },

  // ========== HARD (15 problems) ==========
  {
    title: 'Median of Two Sorted Arrays',
    description: 'Find median of two sorted arrays in O(log(min(n,m))).',
    difficulty: 'Hard',
    tags: ['Array', 'Binary Search', 'Divide and Conquer'],
    constraints: '1 <= n,m <= 1000',
    sampleInput: '1 3\n2',
    sampleOutput: '2.0',
    explanation: 'Combined [1,2,3] median = 2.',
    points: 300,
    starterCode: {
      python: `nums1 = list(map(int, input().split()))
nums2 = list(map(int, input().split()))
def findMedianSortedArrays(nums1, nums2):
    # Write your code here
    pass
print(findMedianSortedArrays(nums1, nums2))`,
      javascript: `const nums1 = readline().split(' ').map(Number);
const nums2 = readline().split(' ').map(Number);
function findMedianSortedArrays(nums1, nums2) {
    // Write your code here
}
console.log(findMedianSortedArrays(nums1, nums2));`
    },
    testCases: [
      { id: 'tc1', input: '1 3\n2', expected: '2.0' },
      { id: 'tc2', input: '1 2\n3 4', expected: '2.5' },
      { id: 'tc3', input: '0 0\n0 0', expected: '0.0' }
    ]
  },
  {
    title: 'Trapping Rain Water',
    description: 'Compute how much water can be trapped after rain.',
    difficulty: 'Hard',
    tags: ['Array', 'Two Pointers', 'Stack'],
    constraints: '1 <= n <= 2*10^4',
    sampleInput: '0 1 0 2 1 0 1 3 2 1 2 1',
    sampleOutput: '6',
    explanation: 'Total trapped water = 6.',
    points: 300,
    starterCode: {
      python: `height = list(map(int, input().split()))
def trap(height):
    # Write your code here
    pass
print(trap(height))`,
      javascript: `const height = readline().split(' ').map(Number);
function trap(height) {
    // Write your code here
}
console.log(trap(height));`
    },
    testCases: [
      { id: 'tc1', input: '0 1 0 2 1 0 1 3 2 1 2 1', expected: '6' },
      { id: 'tc2', input: '4 2 0 3 2 5', expected: '9' },
      { id: 'tc3', input: '2 0 2', expected: '2' }
    ]
  },
  {
    title: 'N-Queens',
    description: 'Place N queens on an N×N board such that no two attack each other. Return all distinct solutions.',
    difficulty: 'Hard',
    tags: ['Backtracking'],
    constraints: '1 <= n <= 9',
    sampleInput: '4',
    sampleOutput: '[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]',
    explanation: 'Two solutions for 4-Queens.',
    points: 300,
    starterCode: {
      python: `n = int(input())
def solveNQueens(n):
    # Write your code here
    pass
print(solveNQueens(n))`,
      javascript: `const n = parseInt(readline());
function solveNQueens(n) {
    // Write your code here
}
console.log(solveNQueens(n));`
    },
    testCases: [
      { id: 'tc1', input: '4', expected: '[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]' },
      { id: 'tc2', input: '1', expected: '[["Q"]]' }
    ]
  },
  {
    title: 'Word Ladder',
    description: 'Find shortest transformation sequence length from beginWord to endWord.',
    difficulty: 'Hard',
    tags: ['BFS', 'Hash Table', 'String'],
    constraints: '1 <= wordList length <= 5000',
    sampleInput: 'hit\ncog\nhot dot dog lot log cog',
    sampleOutput: '5',
    explanation: 'hit → hot → dot → dog → cog (5 steps).',
    points: 300,
    starterCode: {
      python: `beginWord = input()
endWord = input()
wordList = input().split()
def ladderLength(beginWord, endWord, wordList):
    # Write your code here
    pass
print(ladderLength(beginWord, endWord, wordList))`,
      javascript: `const beginWord = readline();
const endWord = readline();
const wordList = readline().split(' ');
function ladderLength(beginWord, endWord, wordList) {
    // Write your code here
}
console.log(ladderLength(beginWord, endWord, wordList));`
    },
    testCases: [
      { id: 'tc1', input: 'hit\ncog\nhot dot dog lot log cog', expected: '5' },
      { id: 'tc2', input: 'a\nc\nb c', expected: '2' }
    ]
  },
  {
    title: 'Longest Valid Parentheses',
    description: 'Find the length of the longest valid parentheses substring.',
    difficulty: 'Hard',
    tags: ['String', 'Stack', 'DP'],
    constraints: '1 <= s.length <= 3*10^4',
    sampleInput: '(()',
    sampleOutput: '2',
    explanation: 'Valid substring "()" length 2.',
    points: 300,
    starterCode: {
      python: `s = input()
def longestValidParentheses(s):
    # Write your code here
    pass
print(longestValidParentheses(s))`,
      javascript: `const s = readline();
function longestValidParentheses(s) {
    // Write your code here
}
console.log(longestValidParentheses(s));`
    },
    testCases: [
      { id: 'tc1', input: '(()', expected: '2' },
      { id: 'tc2', input: ')()())', expected: '4' },
      { id: 'tc3', input: '\n', expected: '0' }
    ]
  },
  {
    title: 'Sliding Window Maximum',
    description: 'Return the max element in each sliding window of size k.',
    difficulty: 'Hard',
    tags: ['Array', 'Sliding Window', 'Deque'],
    constraints: '1 <= nums.length <= 10^5',
    sampleInput: '1 3 -1 -3 5 3 6 7\n3',
    sampleOutput: '3 3 5 5 6 7',
    explanation: 'Maximums of each window.',
    points: 300,
    starterCode: {
      python: `nums = list(map(int, input().split()))
k = int(input())
def maxSlidingWindow(nums, k):
    # Write your code here
    pass
print(' '.join(map(str, maxSlidingWindow(nums, k))))`,
      javascript: `const nums = readline().split(' ').map(Number);
const k = parseInt(readline());
function maxSlidingWindow(nums, k) {
    // Write your code here
}
console.log(maxSlidingWindow(nums, k).join(' '));`
    },
    testCases: [
      { id: 'tc1', input: '1 3 -1 -3 5 3 6 7\n3', expected: '3 3 5 5 6 7' },
      { id: 'tc2', input: '1\n1', expected: '1' }
    ]
  },
  {
    title: 'Merge k Sorted Lists',
    description: 'Merge k sorted linked lists into one sorted list.',
    difficulty: 'Hard',
    tags: ['Linked List', 'Divide and Conquer', 'Heap'],
    constraints: '1 <= k <= 10^4',
    sampleInput: '1 4 5\n1 3 4\n2 6',
    sampleOutput: '1 1 2 3 4 4 5 6',
    explanation: 'Merge three lists.',
    points: 300,
    starterCode: {
      python: `lists = []
while True:
    try:
        line = input()
        if not line: break
        lists.append(list(map(int, line.split())))
    except:
        break
def mergeKLists(lists):
    # Write your code here
    pass
print(' '.join(map(str, mergeKLists(lists))))`,
      javascript: `const lists = [];
let line;
while ((line = readline()) && line !== '') {
    lists.push(line.split(' ').map(Number));
}
function mergeKLists(lists) {
    // Write your code here
}
console.log(mergeKLists(lists).join(' '));`
    },
    testCases: [
      { id: 'tc1', input: '1 4 5\n1 3 4\n2 6', expected: '1 1 2 3 4 4 5 6' }
    ]
  },
  {
    title: 'Edit Distance',
    description: 'Given two strings word1 and word2, return the minimum number of operations (insert, delete, replace) to convert word1 to word2.',
    difficulty: 'Hard',
    tags: ['String', 'Dynamic Programming'],
    constraints: '0 <= word1.length, word2.length <= 500',
    sampleInput: 'horse\nros',
    sampleOutput: '3',
    explanation: 'horse → rorse → rose → ros (3 operations).',
    points: 300,
    starterCode: {
      python: `word1 = input()
word2 = input()
def minDistance(word1, word2):
    # Write your code here
    pass
print(minDistance(word1, word2))`,
      javascript: `const word1 = readline();
const word2 = readline();
function minDistance(word1, word2) {
    // Write your code here
}
console.log(minDistance(word1, word2));`
    },
    testCases: [
      { id: 'tc1', input: 'horse\nros', expected: '3' },
      { id: 'tc2', input: 'intention\nexecution', expected: '5' },
      { id: 'tc3', input: 'abc\nabc', expected: '0' },
      { id: 'tc4', input: '\nabc', expected: '3' },
      { id: 'tc5', input: 'abc\n', expected: '3' }
    ]
  },
  {
    title: 'Largest Rectangle in Histogram',
    description: 'Find the area of the largest rectangle that can be formed in a histogram.',
    difficulty: 'Hard',
    tags: ['Array', 'Stack', 'Monotonic Stack'],
    constraints: '1 <= heights.length <= 10^5\n0 <= heights[i] <= 10^4',
    sampleInput: '2 1 5 6 2 3',
    sampleOutput: '10',
    explanation: 'The largest rectangle has area = 10 (heights 5 and 6 with width 2).',
    points: 300,
    starterCode: {
      python: `heights = list(map(int, input().split()))
def largestRectangleArea(heights):
    # Write your code here
    pass
print(largestRectangleArea(heights))`,
      javascript: `const heights = readline().split(' ').map(Number);
function largestRectangleArea(heights) {
    // Write your code here
}
console.log(largestRectangleArea(heights));`
    },
    testCases: [
      { id: 'tc1', input: '2 1 5 6 2 3', expected: '10' },
      { id: 'tc2', input: '2 4', expected: '4' },
      { id: 'tc3', input: '1', expected: '1' },
      { id: 'tc4', input: '0', expected: '0' },
      { id: 'tc5', input: '6 2 5 4 5 1 6', expected: '12' }
    ]
  },
  {
    title: 'First Missing Positive',
    description: 'Given an unsorted integer array, find the smallest missing positive integer. Must run in O(n) time and O(1) space.',
    difficulty: 'Hard',
    tags: ['Array', 'Hash Table'],
    constraints: '1 <= nums.length <= 10^5\n-2^31 <= nums[i] <= 2^31 - 1',
    sampleInput: '1 2 0',
    sampleOutput: '3',
    explanation: 'The smallest missing positive is 3.',
    points: 300,
    starterCode: {
      python: `nums = list(map(int, input().split()))
def firstMissingPositive(nums):
    # Write your code here
    pass
print(firstMissingPositive(nums))`,
      javascript: `const nums = readline().split(' ').map(Number);
function firstMissingPositive(nums) {
    // Write your code here
}
console.log(firstMissingPositive(nums));`
    },
    testCases: [
      { id: 'tc1', input: '1 2 0', expected: '3' },
      { id: 'tc2', input: '3 4 -1 1', expected: '2' },
      { id: 'tc3', input: '7 8 9 11 12', expected: '1' },
      { id: 'tc4', input: '1', expected: '2' },
      { id: 'tc5', input: '1 2 3 4 5', expected: '6' }
    ]
  },
  {
    title: 'Word Break',
    description: 'Given a string s and a dictionary of words, return true if s can be segmented into a space-separated sequence of dictionary words.',
    difficulty: 'Hard',
    tags: ['Hash Table', 'String', 'Dynamic Programming', 'Trie', 'Memoization'],
    constraints: '1 <= s.length <= 300\n1 <= wordDict.length <= 1000',
    sampleInput: 'leetcode\nleet code',
    sampleOutput: 'true',
    explanation: '"leetcode" = "leet" + "code".',
    points: 300,
    starterCode: {
      python: `s = input()
wordDict = input().split()
def wordBreak(s, wordDict):
    # Write your code here
    pass
print(wordBreak(s, wordDict))`,
      javascript: `const s = readline();
const wordDict = readline().split(' ');
function wordBreak(s, wordDict) {
    // Write your code here
}
console.log(wordBreak(s, wordDict));`
    },
    testCases: [
      { id: 'tc1', input: 'leetcode\nleet code', expected: 'true' },
      { id: 'tc2', input: 'applepenapple\napple pen', expected: 'true' },
      { id: 'tc3', input: 'catsandog\ncats dog sand and cat', expected: 'false' },
      { id: 'tc4', input: 'a\na', expected: 'true' },
      { id: 'tc5', input: 'cars\ncar ca rs', expected: 'true' }
    ]
  },
  {
    title: 'Regular Expression Matching',
    description: "Implement regular expression matching with support for '.' (any character) and '*' (zero or more of preceding element).",
    difficulty: 'Hard',
    tags: ['String', 'Dynamic Programming', 'Recursion'],
    constraints: '1 <= s.length <= 20\n1 <= p.length <= 30\ns contains only lowercase letters\np contains only lowercase letters, . and *',
    sampleInput: 'aa\na*',
    sampleOutput: 'true',
    explanation: '"a*" matches zero or more a characters, matching "aa".',
    points: 300,
    starterCode: {
      python: `s = input()
p = input()
def isMatch(s, p):
    # Write your code here
    pass
print(isMatch(s, p))`,
      javascript: `const s = readline();
const p = readline();
function isMatch(s, p) {
    // Write your code here
}
console.log(isMatch(s, p));`
    },
    testCases: [
      { id: 'tc1', input: 'aa\na*', expected: 'true' },
      { id: 'tc2', input: 'aa\na', expected: 'false' },
      { id: 'tc3', input: 'ab\n.*', expected: 'true' },
      { id: 'tc4', input: 'aab\nc*a*b', expected: 'true' },
      { id: 'tc5', input: 'mississippi\nmis*is*p*.', expected: 'false' }
    ]
  },
  {
    title: 'Maximum Rectangle in Binary Matrix',
    description: 'Given a binary matrix (rows x cols, values 0 or 1), find the largest rectangle containing only 1s and return its area.',
    difficulty: 'Hard',
    tags: ['Array', 'Dynamic Programming', 'Stack', 'Matrix', 'Monotonic Stack'],
    constraints: '1 <= rows, cols <= 200',
    sampleInput: '4 5\n1 0 1 0 0\n1 0 1 1 1\n1 1 1 1 1\n1 0 0 1 0',
    sampleOutput: '6',
    explanation: 'The largest rectangle of all 1s has area 6.',
    points: 300,
    starterCode: {
      python: `rows, cols = map(int, input().split())
matrix = []
for _ in range(rows):
    matrix.append(list(map(int, input().split())))
def maximalRectangle(matrix):
    # Write your code here
    pass
print(maximalRectangle(matrix))`,
      javascript: `const [rows, cols] = readline().split(' ').map(Number);
const matrix = [];
for (let i = 0; i < rows; i++) {
    matrix.push(readline().split(' ').map(Number));
}
function maximalRectangle(matrix) {
    // Write your code here
}
console.log(maximalRectangle(matrix));`
    },
    testCases: [
      { id: 'tc1', input: '4 5\n1 0 1 0 0\n1 0 1 1 1\n1 1 1 1 1\n1 0 0 1 0', expected: '6' },
      { id: 'tc2', input: '1 1\n0', expected: '0' },
      { id: 'tc3', input: '1 1\n1', expected: '1' },
      { id: 'tc4', input: '2 2\n1 1\n1 1', expected: '4' },
      { id: 'tc5', input: '3 3\n1 1 1\n1 1 1\n1 1 1', expected: '9' }
    ]
  },
  {
    title: 'Sudoku Solver',
    description: 'Solve a Sudoku puzzle by filling in empty cells (represented as 0). Print the solved 9x9 grid.',
    difficulty: 'Hard',
    tags: ['Array', 'Backtracking', 'Matrix'],
    constraints: 'The given board has a unique solution.',
    sampleInput: '5 3 0 0 7 0 0 0 0\n6 0 0 1 9 5 0 0 0\n0 9 8 0 0 0 0 6 0\n8 0 0 0 6 0 0 0 3\n4 0 0 8 0 3 0 0 1\n7 0 0 0 2 0 0 0 6\n0 6 0 0 0 0 2 8 0\n0 0 0 4 1 9 0 0 5\n0 0 0 0 8 0 0 7 9',
    sampleOutput: '5 3 4 6 7 8 9 1 2\n6 7 2 1 9 5 3 4 8\n1 9 8 3 4 2 5 6 7\n8 5 9 7 6 1 4 2 3\n4 2 6 8 5 3 7 9 1\n7 1 3 9 2 4 8 5 6\n9 6 1 5 3 7 2 8 4\n2 8 7 4 1 9 6 3 5\n3 4 5 2 8 6 1 7 9',
    explanation: 'Classic Sudoku solved via backtracking.',
    points: 300,
    starterCode: {
      python: `board = []
for _ in range(9):
    board.append(list(map(int, input().split())))
def solveSudoku(board):
    # Write your code here
    pass
solveSudoku(board)
for row in board:
    print(' '.join(map(str, row)))`,
      javascript: `const board = [];
for (let i = 0; i < 9; i++) {
    board.push(readline().split(' ').map(Number));
}
function solveSudoku(board) {
    // Write your code here
}
solveSudoku(board);
for (let row of board) {
    console.log(row.join(' '));
}`
    },
    testCases: [
      {
        id: 'tc1',
        input: '5 3 0 0 7 0 0 0 0\n6 0 0 1 9 5 0 0 0\n0 9 8 0 0 0 0 6 0\n8 0 0 0 6 0 0 0 3\n4 0 0 8 0 3 0 0 1\n7 0 0 0 2 0 0 0 6\n0 6 0 0 0 0 2 8 0\n0 0 0 4 1 9 0 0 5\n0 0 0 0 8 0 0 7 9',
        expected: '5 3 4 6 7 8 9 1 2\n6 7 2 1 9 5 3 4 8\n1 9 8 3 4 2 5 6 7\n8 5 9 7 6 1 4 2 3\n4 2 6 8 5 3 7 9 1\n7 1 3 9 2 4 8 5 6\n9 6 1 5 3 7 2 8 4\n2 8 7 4 1 9 6 3 5\n3 4 5 2 8 6 1 7 9'
      }
    ]
  }
];

// -------------------- Normalise test cases --------------------
for (const problem of problems) {
  if (problem.testCases) {
    problem.testCases.forEach(tc => {
      tc.input = normalizeInput(tc.input);
      tc.expected = normalizeExpected(tc.expected);
    });
  }
}

// -------------------- Enrich problems with category and order --------------------
const enrichedProblems = problems.map((problem, idx) => ({
  ...problem,
  category: getCategory(problem.tags),
  order: idx + 1,
}));

// -------------------- Seeding logic --------------------
const seedDatabase = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;
    if (!mongoURI) {
      console.error('❌ MONGODB_URI not found in .env');
      process.exit(1);
    }
    console.log('📡 Connecting to MongoDB...');
    await mongoose.connect(mongoURI);
    console.log('✅ Connected to MongoDB');

    const deleted = await Problem.deleteMany({});
    console.log(`🗑️ Deleted ${deleted.deletedCount} existing problems`);

    const inserted = await Problem.insertMany(enrichedProblems);
    console.log(`✅ Seeded ${inserted.length} problems`);

    const easyCount = enrichedProblems.filter(p => p.difficulty === 'Easy').length;
    const mediumCount = enrichedProblems.filter(p => p.difficulty === 'Medium').length;
    const hardCount = enrichedProblems.filter(p => p.difficulty === 'Hard').length;
    console.log(`📊 Easy: ${easyCount}, Medium: ${mediumCount}, Hard: ${hardCount}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error.message);
    process.exit(1);
  }
};

// Optional: delete all problems if --delete flag is used
if (process.argv[2] === '--delete') {
  (async () => {
    try {
      const mongoURI = process.env.MONGODB_URI;
      if (!mongoURI) throw new Error('MONGODB_URI not found');
      await mongoose.connect(mongoURI);
      await Problem.deleteMany({});
      console.log('✅ All problems deleted');
      process.exit(0);
    } catch (err) {
      console.error('❌ Delete error:', err.message);
      process.exit(1);
    }
  })();
} else {
  seedDatabase();
}
// // const mongoose = require('mongoose');
// // const dotenv = require('dotenv');
// // const Problem = require('../models/Problem');

// // dotenv.config();

// // // Helper to ensure test case input is always a non‑empty string
// // function normalizeInput(rawInput) {
// //   if (rawInput === undefined || rawInput === null) return '\n';
// //   const str = String(rawInput);
// //   return str.trim() === '' ? '\n' : str;
// // }

// // const problems = [
// //   // -------------------- EASY (12) --------------------
// //   {
// //     title: 'Two Sum',
// //     description: 'Given an array of integers nums and an integer target, return indices of the two numbers that add up to target.',
// //     difficulty: 'Easy',
// //     tags: ['Array', 'Hash Table'],
// //     constraints: '2 <= nums.length <= 10^4\n-10^9 <= nums[i] <= 10^9',
// //     sampleInput: '2 7 11 15\n9',
// //     sampleOutput: '[0, 1]',
// //     explanation: 'nums[0] + nums[1] = 9',
// //     points: 100,
// //     order: 1,
// //     starterCode: {
// //       python: `nums = list(map(int, input().split()))
// // target = int(input())

// // def twoSum(nums, target):
// //     # Write your code here
// //     pass

// // print(twoSum(nums, target))`,
// //       javascript: `const nums = readline().split(' ').map(Number);
// // const target = Number(readline());

// // function twoSum(nums, target) {
// //     // Write your code here
// // }

// // console.log(twoSum(nums, target));`
// //     },
// //     testCases: [
// //       { id: 'tc1', input: '2 7 11 15\n9', expected: '[0, 1]' },
// //       { id: 'tc2', input: '3 2 4\n6', expected: '[1, 2]' },
// //       { id: 'tc3', input: '3 3\n6', expected: '[0, 1]' },
// //       { id: 'tc4', input: '1 2 3 4 5\n9', expected: '[3, 4]' },
// //       { id: 'tc5', input: '0 4 3 0\n0', expected: '[0, 3]' }
// //     ]
// //   },
// //   {
// //     title: 'Reverse String',
// //     description: 'Write a function that reverses a string.',
// //     difficulty: 'Easy',
// //     tags: ['String', 'Two Pointers'],
// //     constraints: '1 <= s.length <= 10^5',
// //     sampleInput: 'hello',
// //     sampleOutput: 'olleh',
// //     explanation: 'Reversed string of "hello" is "olleh".',
// //     points: 100,
// //     order: 2,
// //     starterCode: {
// //       python: `s = input()

// // def reverseString(s):
// //     # Write your code here
// //     pass

// // print(reverseString(s))`,
// //       javascript: `const s = readline();

// // function reverseString(s) {
// //     // Write your code here
// // }

// // console.log(reverseString(s));`
// //     },
// //     testCases: [
// //       { id: 'tc1', input: 'hello', expected: 'olleh' },
// //       { id: 'tc2', input: 'world', expected: 'dlrow' },
// //       { id: 'tc3', input: 'a', expected: 'a' },
// //       { id: 'tc4', input: 'racecar', expected: 'racecar' },
// //       { id: 'tc5', input: '12345', expected: '54321' }
// //     ]
// //   },
// //   {
// //     title: 'Valid Parentheses',
// //     description: 'Given a string s containing just the characters \'(\', \')\', \'{\', \'}\', \'[\' and \']\', determine if the input string is valid.',
// //     difficulty: 'Easy',
// //     tags: ['Stack', 'String'],
// //     constraints: '1 <= s.length <= 10^4',
// //     sampleInput: '()[]{}',
// //     sampleOutput: 'true',
// //     explanation: 'All brackets are properly closed and nested.',
// //     points: 100,
// //     order: 3,
// //     starterCode: {
// //       python: `s = input()

// // def isValid(s):
// //     # Write your code here
// //     pass

// // print(isValid(s))`,
// //       javascript: `const s = readline();

// // function isValid(s) {
// //     // Write your code here
// // }

// // console.log(isValid(s));`
// //     },
// //     testCases: [
// //       { id: 'tc1', input: '()[]{}', expected: 'True' },
// //       { id: 'tc2', input: '([{}])', expected: 'True' },
// //       { id: 'tc3', input: '(]', expected: 'False' },
// //       { id: 'tc4', input: '([)]', expected: 'False' },
// //       { id: 'tc5', input: '((()))', expected: 'True' },
// //       { id: 'tc6', input: '({[)}]', expected: 'False' }
// //     ]
// //   },
// //   {
// //     title: 'Best Time to Buy and Sell Stock',
// //     description: 'Find the maximum profit you can achieve from buying and selling one share of stock.',
// //     difficulty: 'Easy',
// //     tags: ['Array', 'Dynamic Programming'],
// //     constraints: '1 <= prices.length <= 10^5',
// //     sampleInput: '7 1 5 3 6 4',
// //     sampleOutput: '5',
// //     explanation: 'Buy at 1, sell at 6 for profit 5.',
// //     points: 100,
// //     order: 4,
// //     starterCode: {
// //       python: `prices = list(map(int, input().split()))

// // def maxProfit(prices):
// //     # Write your code here
// //     pass

// // print(maxProfit(prices))`,
// //       javascript: `const prices = readline().split(' ').map(Number);

// // function maxProfit(prices) {
// //     // Write your code here
// // }

// // console.log(maxProfit(prices));`
// //     },
// //     testCases: [
// //       { id: 'tc1', input: '7 1 5 3 6 4', expected: '5' },
// //       { id: 'tc2', input: '7 6 4 3 1', expected: '0' },
// //       { id: 'tc3', input: '1 2 3 4 5', expected: '4' },
// //       { id: 'tc4', input: '3 2 6 5 0 3', expected: '4' },
// //       { id: 'tc5', input: '2 4 1', expected: '2' }
// //     ]
// //   },
// //   {
// //     title: 'Palindrome Number',
// //     description: 'Determine whether an integer is a palindrome.',
// //     difficulty: 'Easy',
// //     tags: ['Math', 'String'],
// //     constraints: '-2^31 <= x <= 2^31 - 1',
// //     sampleInput: '121',
// //     sampleOutput: 'true',
// //     explanation: '121 reads the same backward.',
// //     points: 100,
// //     order: 5,
// //     starterCode: {
// //       python: `x = int(input())

// // def isPalindrome(x):
// //     # Write your code here
// //     pass

// // print(isPalindrome(x))`,
// //       javascript: `const x = parseInt(readline());

// // function isPalindrome(x) {
// //     // Write your code here
// // }

// // console.log(isPalindrome(x));`
// //     },
// //     testCases: [
// //       { id: 'tc1', input: '121', expected: 'True' },
// //       { id: 'tc2', input: '-121', expected: 'False' },
// //       { id: 'tc3', input: '10', expected: 'False' },
// //       { id: 'tc4', input: '0', expected: 'True' },
// //       { id: 'tc5', input: '12321', expected: 'True' }
// //     ]
// //   },
// //   {
// //     title: 'Fibonacci Number',
// //     description: 'Compute the nth Fibonacci number.',
// //     difficulty: 'Easy',
// //     tags: ['Recursion', 'DP', 'Math'],
// //     constraints: '0 <= n <= 30',
// //     sampleInput: '6',
// //     sampleOutput: '8',
// //     explanation: 'Fibonacci: 0,1,1,2,3,5,8 → F(6)=8.',
// //     points: 100,
// //     order: 6,
// //     starterCode: {
// //       python: `n = int(input())

// // def fib(n):
// //     # Write your code here
// //     pass

// // print(fib(n))`,
// //       javascript: `const n = parseInt(readline());

// // function fib(n) {
// //     // Write your code here
// // }

// // console.log(fib(n));`
// //     },
// //     testCases: [
// //       { id: 'tc1', input: '0', expected: '0' },
// //       { id: 'tc2', input: '1', expected: '1' },
// //       { id: 'tc3', input: '6', expected: '8' },
// //       { id: 'tc4', input: '10', expected: '55' },
// //       { id: 'tc5', input: '20', expected: '6765' }
// //     ]
// //   },
// //   {
// //     title: 'Contains Duplicate',
// //     description: 'Return true if any value appears at least twice, else false.',
// //     difficulty: 'Easy',
// //     tags: ['Array', 'Hash Table'],
// //     constraints: '1 <= nums.length <= 10^5',
// //     sampleInput: '1 2 3 1',
// //     sampleOutput: 'true',
// //     explanation: '1 appears twice.',
// //     points: 100,
// //     order: 7,
// //     starterCode: {
// //       python: `nums = list(map(int, input().split()))

// // def containsDuplicate(nums):
// //     # Write your code here
// //     pass

// // print(containsDuplicate(nums))`,
// //       javascript: `const nums = readline().split(' ').map(Number);

// // function containsDuplicate(nums) {
// //     // Write your code here
// // }

// // console.log(containsDuplicate(nums));`
// //     },
// //     testCases: [
// //       { id: 'tc1', input: '1 2 3 1', expected: 'True' },
// //       { id: 'tc2', input: '1 2 3 4', expected: 'False' },
// //       { id: 'tc3', input: '1 1 1 3 3 4 3 2 4 2', expected: 'True' },
// //       { id: 'tc4', input: '1', expected: 'False' },
// //       { id: 'tc5', input: '0 0', expected: 'True' }
// //     ]
// //   },
// //   {
// //     title: 'Climbing Stairs',
// //     description: 'Count distinct ways to climb n steps (1 or 2 steps at a time).',
// //     difficulty: 'Easy',
// //     tags: ['DP', 'Math'],
// //     constraints: '1 <= n <= 45',
// //     sampleInput: '3',
// //     sampleOutput: '3',
// //     explanation: '1+1+1, 1+2, 2+1 → 3 ways.',
// //     points: 100,
// //     order: 8,
// //     starterCode: {
// //       python: `n = int(input())

// // def climbStairs(n):
// //     # Write your code here
// //     pass

// // print(climbStairs(n))`,
// //       javascript: `const n = parseInt(readline());

// // function climbStairs(n) {
// //     // Write your code here
// // }

// // console.log(climbStairs(n));`
// //     },
// //     testCases: [
// //       { id: 'tc1', input: '2', expected: '2' },
// //       { id: 'tc2', input: '3', expected: '3' },
// //       { id: 'tc3', input: '4', expected: '5' },
// //       { id: 'tc4', input: '5', expected: '8' },
// //       { id: 'tc5', input: '10', expected: '89' }
// //     ]
// //   },
// //   {
// //     title: 'Missing Number',
// //     description: 'Given an array containing n distinct numbers from 0..n, find the missing one.',
// //     difficulty: 'Easy',
// //     tags: ['Array', 'Math', 'Bit Manipulation'],
// //     constraints: '1 <= n <= 10^4',
// //     sampleInput: '3 0 1',
// //     sampleOutput: '2',
// //     explanation: 'The missing number is 2.',
// //     points: 100,
// //     order: 9,
// //     starterCode: {
// //       python: `nums = list(map(int, input().split()))

// // def missingNumber(nums):
// //     # Write your code here
// //     pass

// // print(missingNumber(nums))`,
// //       javascript: `const nums = readline().split(' ').map(Number);

// // function missingNumber(nums) {
// //     // Write your code here
// // }

// // console.log(missingNumber(nums));`
// //     },
// //     testCases: [
// //       { id: 'tc1', input: '3 0 1', expected: '2' },
// //       { id: 'tc2', input: '0 1', expected: '2' },
// //       { id: 'tc3', input: '9 6 4 2 3 5 7 0 1', expected: '8' },
// //       { id: 'tc4', input: '0', expected: '1' },
// //       { id: 'tc5', input: '1', expected: '0' }
// //     ]
// //   },
// //   {
// //     title: 'Majority Element',
// //     description: 'Find the element that appears more than ⌊ n/2 ⌋ times.',
// //     difficulty: 'Easy',
// //     tags: ['Array', 'Hash Table', 'Divide and Conquer'],
// //     constraints: '1 <= n <= 5*10^4',
// //     sampleInput: '3 2 3',
// //     sampleOutput: '3',
// //     explanation: '3 appears twice > 3/2.',
// //     points: 100,
// //     order: 10,
// //     starterCode: {
// //       python: `nums = list(map(int, input().split()))

// // def majorityElement(nums):
// //     # Write your code here
// //     pass

// // print(majorityElement(nums))`,
// //       javascript: `const nums = readline().split(' ').map(Number);

// // function majorityElement(nums) {
// //     // Write your code here
// // }

// // console.log(majorityElement(nums));`
// //     },
// //     testCases: [
// //       { id: 'tc1', input: '3 2 3', expected: '3' },
// //       { id: 'tc2', input: '2 2 1 1 1 2 2', expected: '2' },
// //       { id: 'tc3', input: '1', expected: '1' },
// //       { id: 'tc4', input: '6 5 5', expected: '5' },
// //       { id: 'tc5', input: '10 10 10 5 10', expected: '10' }
// //     ]
// //   },
// //   {
// //     title: 'Fizz Buzz',
// //     description: 'Return list of strings from 1 to n, with Fizz/Buzz/FizzBuzz rules.',
// //     difficulty: 'Easy',
// //     tags: ['Math', 'String'],
// //     constraints: '1 <= n <= 10^4',
// //     sampleInput: '15',
// //     sampleOutput: '1,2,Fizz,4,Buzz,Fizz,7,8,Fizz,Buzz,11,Fizz,13,14,FizzBuzz',
// //     explanation: 'Standard FizzBuzz.',
// //     points: 100,
// //     order: 11,
// //     starterCode: {
// //       python: `n = int(input())

// // def fizzBuzz(n):
// //     # Write your code here
// //     pass

// // print(fizzBuzz(n))`,
// //       javascript: `const n = parseInt(readline());

// // function fizzBuzz(n) {
// //     // Write your code here
// // }

// // console.log(fizzBuzz(n));`
// //     },
// //     testCases: [
// //       { id: 'tc1', input: '3', expected: '1,2,Fizz' },
// //       { id: 'tc2', input: '5', expected: '1,2,Fizz,4,Buzz' },
// //       { id: 'tc3', input: '15', expected: '1,2,Fizz,4,Buzz,Fizz,7,8,Fizz,Buzz,11,Fizz,13,14,FizzBuzz' }
// //     ]
// //   },
// //   {
// //     title: 'Move Zeroes',
// //     description: 'Move all zeros to the end while preserving relative order of non-zero elements.',
// //     difficulty: 'Easy',
// //     tags: ['Array', 'Two Pointers'],
// //     constraints: '1 <= nums.length <= 10^4',
// //     sampleInput: '0 1 0 3 12',
// //     sampleOutput: '1 3 12 0 0',
// //     explanation: 'Zeros moved to the end.',
// //     points: 100,
// //     order: 12,
// //     starterCode: {
// //       python: `nums = list(map(int, input().split()))

// // def moveZeroes(nums):
// //     # Write your code here
// //     pass

// // print(' '.join(map(str, nums)))`,
// //       javascript: `const nums = readline().split(' ').map(Number);

// // function moveZeroes(nums) {
// //     // Write your code here
// // }

// // console.log(nums.join(' '));`
// //     },
// //     testCases: [
// //       { id: 'tc1', input: '0 1 0 3 12', expected: '1 3 12 0 0' },
// //       { id: 'tc2', input: '0', expected: '0' },
// //       { id: 'tc3', input: '1 2 3', expected: '1 2 3' },
// //       { id: 'tc4', input: '0 0 1', expected: '1 0 0' },
// //       { id: 'tc5', input: '4 2 4 0 0 3 0 5', expected: '4 2 4 3 5 0 0 0' }
// //     ]
// //   },

// //   // -------------------- MEDIUM (10) --------------------
// //   {
// //     title: 'Longest Substring Without Repeating Characters',
// //     description: 'Find length of longest substring without repeating characters.',
// //     difficulty: 'Medium',
// //     tags: ['Hash Table', 'String', 'Sliding Window'],
// //     constraints: '0 <= s.length <= 5*10^4',
// //     sampleInput: 'abcabcbb',
// //     sampleOutput: '3',
// //     explanation: 'Answer is "abc" length 3.',
// //     points: 200,
// //     order: 13,
// //     starterCode: {
// //       python: `s = input()

// // def lengthOfLongestSubstring(s):
// //     # Write your code here
// //     pass

// // print(lengthOfLongestSubstring(s))`,
// //       javascript: `const s = readline();

// // function lengthOfLongestSubstring(s) {
// //     // Write your code here
// // }

// // console.log(lengthOfLongestSubstring(s));`
// //     },
// //     testCases: [
// //       { id: 'tc1', input: 'abcabcbb', expected: '3' },
// //       { id: 'tc2', input: 'bbbbb', expected: '1' },
// //       { id: 'tc3', input: 'pwwkew', expected: '3' },
// //       { id: 'tc4', input: '\n', expected: '0' },
// //       { id: 'tc5', input: 'au', expected: '2' }
// //     ]
// //   },
// //   {
// //     title: 'Container With Most Water',
// //     description: 'Find two lines that together with x-axis form a container holding the most water.',
// //     difficulty: 'Medium',
// //     tags: ['Array', 'Two Pointers', 'Greedy'],
// //     constraints: '2 <= height.length <= 10^5',
// //     sampleInput: '1 8 6 2 5 4 8 3 7',
// //     sampleOutput: '49',
// //     explanation: 'Maximum area = 49.',
// //     points: 200,
// //     order: 14,
// //     starterCode: {
// //       python: `height = list(map(int, input().split()))

// // def maxArea(height):
// //     # Write your code here
// //     pass

// // print(maxArea(height))`,
// //       javascript: `const height = readline().split(' ').map(Number);

// // function maxArea(height) {
// //     // Write your code here
// // }

// // console.log(maxArea(height));`
// //     },
// //     testCases: [
// //       { id: 'tc1', input: '1 8 6 2 5 4 8 3 7', expected: '49' },
// //       { id: 'tc2', input: '1 1', expected: '1' },
// //       { id: 'tc3', input: '4 3 2 1 4', expected: '16' },
// //       { id: 'tc4', input: '1 2 1', expected: '2' },
// //       { id: 'tc5', input: '2 3 4 5 18 17 6', expected: '17' }
// //     ]
// //   },
// //   {
// //     title: '3Sum',
// //     description: 'Find all unique triplets that sum to zero.',
// //     difficulty: 'Medium',
// //     tags: ['Array', 'Two Pointers', 'Sorting'],
// //     constraints: '3 <= nums.length <= 3000',
// //     sampleInput: '-1 0 1 2 -1 -4',
// //     sampleOutput: '[[-1,-1,2],[-1,0,1]]',
// //     explanation: 'Triplets that sum to zero.',
// //     points: 200,
// //     order: 15,
// //     starterCode: {
// //       python: `nums = list(map(int, input().split()))

// // def threeSum(nums):
// //     # Write your code here
// //     pass

// // print(threeSum(nums))`,
// //       javascript: `const nums = readline().split(' ').map(Number);

// // function threeSum(nums) {
// //     // Write your code here
// // }

// // console.log(threeSum(nums));`
// //     },
// //     testCases: [
// //       { id: 'tc1', input: '-1 0 1 2 -1 -4', expected: '[[-1,-1,2],[-1,0,1]]' },
// //       { id: 'tc2', input: '0 0 0', expected: '[[0,0,0]]' },
// //       { id: 'tc3', input: '0 1 1', expected: '[]' },
// //       { id: 'tc4', input: '-2 0 1 1 2', expected: '[[-2,0,2],[-2,1,1]]' }
// //     ]
// //   },
// //   {
// //     title: 'Group Anagrams',
// //     description: 'Group the given list of strings into anagrams.',
// //     difficulty: 'Medium',
// //     tags: ['Hash Table', 'String', 'Sorting'],
// //     constraints: '1 <= strs.length <= 10^4',
// //     sampleInput: 'eat tea tan ate nat bat',
// //     sampleOutput: '[[bat],[nat,tan],[ate,eat,tea]]',
// //     explanation: 'Anagrams grouped.',
// //     points: 200,
// //     order: 16,
// //     starterCode: {
// //       python: `strs = input().split()

// // def groupAnagrams(strs):
// //     # Write your code here
// //     pass

// // print(groupAnagrams(strs))`,
// //       javascript: `const strs = readline().split(' ');

// // function groupAnagrams(strs) {
// //     // Write your code here
// // }

// // console.log(groupAnagrams(strs));`
// //     },
// //     testCases: [
// //       { id: 'tc1', input: 'eat tea tan ate nat bat', expected: '[[bat],[nat,tan],[ate,eat,tea]]' },
// //       { id: 'tc2', input: '\n', expected: '[[]]' },
// //       { id: 'tc3', input: 'a', expected: '[[a]]' }
// //     ]
// //   },
// //   {
// //     title: 'Product of Array Except Self',
// //     description: 'Return an array output[i] = product of all elements except nums[i].',
// //     difficulty: 'Medium',
// //     tags: ['Array', 'Prefix Sum'],
// //     constraints: '2 <= nums.length <= 10^5',
// //     sampleInput: '1 2 3 4',
// //     sampleOutput: '24 12 8 6',
// //     explanation: 'Products: 2*3*4=24, 1*3*4=12, etc.',
// //     points: 200,
// //     order: 17,
// //     starterCode: {
// //       python: `nums = list(map(int, input().split()))

// // def productExceptSelf(nums):
// //     # Write your code here
// //     pass

// // print(' '.join(map(str, productExceptSelf(nums))))`,
// //       javascript: `const nums = readline().split(' ').map(Number);

// // function productExceptSelf(nums) {
// //     // Write your code here
// // }

// // console.log(productExceptSelf(nums).join(' '));`
// //     },
// //     testCases: [
// //       { id: 'tc1', input: '1 2 3 4', expected: '24 12 8 6' },
// //       { id: 'tc2', input: '-1 1 0 -3 3', expected: '0 0 9 0 0' }
// //     ]
// //   },
// //   {
// //     title: 'Spiral Matrix',
// //     description: 'Return all elements of the matrix in spiral order.',
// //     difficulty: 'Medium',
// //     tags: ['Array', 'Matrix', 'Simulation'],
// //     constraints: '1 <= m,n <= 10',
// //     sampleInput: '3 3\n1 2 3\n4 5 6\n7 8 9',
// //     sampleOutput: '1 2 3 6 9 8 7 4 5',
// //     explanation: 'Spiral traversal.',
// //     points: 200,
// //     order: 18,
// //     starterCode: {
// //       python: `rows, cols = map(int, input().split())
// // matrix = []
// // for _ in range(rows):
// //     matrix.append(list(map(int, input().split())))

// // def spiralOrder(matrix):
// //     # Write your code here
// //     pass

// // print(' '.join(map(str, spiralOrder(matrix))))`,
// //       javascript: `const [rows, cols] = readline().split(' ').map(Number);
// // const matrix = [];
// // for (let i = 0; i < rows; i++) {
// //     matrix.push(readline().split(' ').map(Number));
// // }

// // function spiralOrder(matrix) {
// //     // Write your code here
// // }

// // console.log(spiralOrder(matrix).join(' '));`
// //     },
// //     testCases: [
// //       { id: 'tc1', input: '3 3\n1 2 3\n4 5 6\n7 8 9', expected: '1 2 3 6 9 8 7 4 5' },
// //       { id: 'tc2', input: '1 3\n1 2 3', expected: '1 2 3' },
// //       { id: 'tc3', input: '3 1\n1\n2\n3', expected: '1 2 3' }
// //     ]
// //   },
// //   {
// //     title: 'Rotate Image',
// //     description: 'Rotate the n x n matrix by 90 degrees clockwise in‑place.',
// //     difficulty: 'Medium',
// //     tags: ['Array', 'Matrix'],
// //     constraints: '1 <= n <= 20',
// //     sampleInput: '3\n1 2 3\n4 5 6\n7 8 9',
// //     sampleOutput: '7 4 1\n8 5 2\n9 6 3',
// //     explanation: '90‑degree rotation.',
// //     points: 200,
// //     order: 19,
// //     starterCode: {
// //       python: `n = int(input())
// // matrix = []
// // for _ in range(n):
// //     matrix.append(list(map(int, input().split())))

// // def rotate(matrix):
// //     # Write your code here
// //     pass

// // rotate(matrix)
// // for row in matrix:
// //     print(' '.join(map(str, row)))`,
// //       javascript: `const n = parseInt(readline());
// // const matrix = [];
// // for (let i = 0; i < n; i++) {
// //     matrix.push(readline().split(' ').map(Number));
// // }

// // function rotate(matrix) {
// //     // Write your code here
// // }

// // rotate(matrix);
// // for (let row of matrix) {
// //     console.log(row.join(' '));
// // }`
// //     },
// //     testCases: [
// //       { id: 'tc1', input: '3\n1 2 3\n4 5 6\n7 8 9', expected: '7 4 1\n8 5 2\n9 6 3' },
// //       { id: 'tc2', input: '2\n1 2\n3 4', expected: '3 1\n4 2' }
// //     ]
// //   },
// //   {
// //     title: 'Word Search',
// //     description: 'Given a 2D board and a word, find if the word exists.',
// //     difficulty: 'Medium',
// //     tags: ['Array', 'Backtracking'],
// //     constraints: '1 <= m,n <= 6',
// //     sampleInput: '3 4\nA B C E\nS F C S\nA D E E\nABCCED',
// //     sampleOutput: 'true',
// //     explanation: 'Word "ABCCED" exists.',
// //     points: 200,
// //     order: 20,
// //     starterCode: {
// //       python: `rows, cols = map(int, input().split())
// // board = []
// // for _ in range(rows):
// //     board.append(input().split())
// // word = input()

// // def exist(board, word):
// //     # Write your code here
// //     pass

// // print(exist(board, word))`,
// //       javascript: `const [rows, cols] = readline().split(' ').map(Number);
// // const board = [];
// // for (let i = 0; i < rows; i++) {
// //     board.push(readline().split(' '));
// // }
// // const word = readline();

// // function exist(board, word) {
// //     // Write your code here
// // }

// // console.log(exist(board, word));`
// //     },
// //     testCases: [
// //       { id: 'tc1', input: '3 4\nA B C E\nS F C S\nA D E E\nABCCED', expected: 'True' },
// //       { id: 'tc2', input: '1 1\nA\nA', expected: 'True' },
// //       { id: 'tc3', input: '2 2\nA B\nC D\nABCD', expected: 'False' }
// //     ]
// //   },
// //   {
// //     title: 'Course Schedule',
// //     description: 'Determine if you can finish all courses given prerequisites.',
// //     difficulty: 'Medium',
// //     tags: ['Graph', 'Topological Sort', 'BFS', 'DFS'],
// //     constraints: '1 <= numCourses <= 2000',
// //     sampleInput: '2\n1 0',
// //     sampleOutput: 'true',
// //     explanation: 'Possible to finish.',
// //     points: 200,
// //     order: 21,
// //     starterCode: {
// //       python: `numCourses = int(input())
// // prerequisites = []
// // while True:
// //     try:
// //         line = input()
// //         if not line: break
// //         a,b = map(int, line.split())
// //         prerequisites.append([a,b])
// //     except:
// //         break

// // def canFinish(numCourses, prerequisites):
// //     # Write your code here
// //     pass

// // print(canFinish(numCourses, prerequisites))`,
// //       javascript: `const numCourses = parseInt(readline());
// // const prerequisites = [];
// // let line;
// // while ((line = readline()) && line !== '') {
// //     const [a, b] = line.split(' ').map(Number);
// //     prerequisites.push([a, b]);
// // }

// // function canFinish(numCourses, prerequisites) {
// //     // Write your code here
// // }

// // console.log(canFinish(numCourses, prerequisites));`
// //     },
// //     testCases: [
// //       { id: 'tc1', input: '2\n1 0', expected: 'True' },
// //       { id: 'tc2', input: '2\n1 0\n0 1', expected: 'False' },
// //       { id: 'tc3', input: '4\n1 0\n2 1\n3 2', expected: 'True' }
// //     ]
// //   },

// //   // -------------------- HARD (8) --------------------
// //   {
// //     title: 'Median of Two Sorted Arrays',
// //     description: 'Find median of two sorted arrays in O(log(min(n,m))).',
// //     difficulty: 'Hard',
// //     tags: ['Array', 'Binary Search', 'Divide and Conquer'],
// //     constraints: '1 <= n,m <= 1000',
// //     sampleInput: '1 3\n2',
// //     sampleOutput: '2.0',
// //     explanation: 'Combined [1,2,3] median = 2.',
// //     points: 300,
// //     order: 22,
// //     starterCode: {
// //       python: `nums1 = list(map(int, input().split()))
// // nums2 = list(map(int, input().split()))

// // def findMedianSortedArrays(nums1, nums2):
// //     # Write your code here
// //     pass

// // print(findMedianSortedArrays(nums1, nums2))`,
// //       javascript: `const nums1 = readline().split(' ').map(Number);
// // const nums2 = readline().split(' ').map(Number);

// // function findMedianSortedArrays(nums1, nums2) {
// //     // Write your code here
// // }

// // console.log(findMedianSortedArrays(nums1, nums2));`
// //     },
// //     testCases: [
// //       { id: 'tc1', input: '1 3\n2', expected: '2.0' },
// //       { id: 'tc2', input: '1 2\n3 4', expected: '2.5' },
// //       { id: 'tc3', input: '0 0\n0 0', expected: '0.0' }
// //     ]
// //   },
// //   {
// //     title: 'Trapping Rain Water',
// //     description: 'Compute how much water can be trapped after rain.',
// //     difficulty: 'Hard',
// //     tags: ['Array', 'Two Pointers', 'Stack'],
// //     constraints: '1 <= n <= 2*10^4',
// //     sampleInput: '0 1 0 2 1 0 1 3 2 1 2 1',
// //     sampleOutput: '6',
// //     explanation: 'Total trapped water = 6.',
// //     points: 300,
// //     order: 23,
// //     starterCode: {
// //       python: `height = list(map(int, input().split()))

// // def trap(height):
// //     # Write your code here
// //     pass

// // print(trap(height))`,
// //       javascript: `const height = readline().split(' ').map(Number);

// // function trap(height) {
// //     // Write your code here
// // }

// // console.log(trap(height));`
// //     },
// //     testCases: [
// //       { id: 'tc1', input: '0 1 0 2 1 0 1 3 2 1 2 1', expected: '6' },
// //       { id: 'tc2', input: '4 2 0 3 2 5', expected: '9' },
// //       { id: 'tc3', input: '2 0 2', expected: '2' }
// //     ]
// //   },
// //   {
// //     title: 'N-Queens',
// //     description: 'Place N queens on an N×N board such that no two attack each other. Return all distinct solutions.',
// //     difficulty: 'Hard',
// //     tags: ['Backtracking'],
// //     constraints: '1 <= n <= 9',
// //     sampleInput: '4',
// //     sampleOutput: '[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]',
// //     explanation: 'Two solutions for 4‑Queens.',
// //     points: 300,
// //     order: 24,
// //     starterCode: {
// //       python: `n = int(input())

// // def solveNQueens(n):
// //     # Write your code here
// //     pass

// // print(solveNQueens(n))`,
// //       javascript: `const n = parseInt(readline());

// // function solveNQueens(n) {
// //     // Write your code here
// // }

// // console.log(solveNQueens(n));`
// //     },
// //     testCases: [
// //       { id: 'tc1', input: '4', expected: '[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]' },
// //       { id: 'tc2', input: '1', expected: '[["Q"]]' }
// //     ]
// //   },
// //   {
// //     title: 'Word Ladder',
// //     description: 'Find shortest transformation sequence length from beginWord to endWord.',
// //     difficulty: 'Hard',
// //     tags: ['BFS', 'Hash Table', 'String'],
// //     constraints: '1 <= wordList length <= 5000',
// //     sampleInput: 'hit\ncog\nhot dot dog lot log cog',
// //     sampleOutput: '5',
// //     explanation: 'hit → hot → dot → dog → cog (5 steps).',
// //     points: 300,
// //     order: 25,
// //     starterCode: {
// //       python: `beginWord = input()
// // endWord = input()
// // wordList = input().split()

// // def ladderLength(beginWord, endWord, wordList):
// //     # Write your code here
// //     pass

// // print(ladderLength(beginWord, endWord, wordList))`,
// //       javascript: `const beginWord = readline();
// // const endWord = readline();
// // const wordList = readline().split(' ');

// // function ladderLength(beginWord, endWord, wordList) {
// //     // Write your code here
// // }

// // console.log(ladderLength(beginWord, endWord, wordList));`
// //     },
// //     testCases: [
// //       { id: 'tc1', input: 'hit\ncog\nhot dot dog lot log cog', expected: '5' },
// //       { id: 'tc2', input: 'a\nc\nb c', expected: '2' }
// //     ]
// //   },
// //   {
// //     title: 'Longest Valid Parentheses',
// //     description: 'Find the length of the longest valid parentheses substring.',
// //     difficulty: 'Hard',
// //     tags: ['String', 'Stack', 'DP'],
// //     constraints: '1 <= s.length <= 3*10^4',
// //     sampleInput: '(()',
// //     sampleOutput: '2',
// //     explanation: 'Valid substring "()" length 2.',
// //     points: 300,
// //     order: 26,
// //     starterCode: {
// //       python: `s = input()

// // def longestValidParentheses(s):
// //     # Write your code here
// //     pass

// // print(longestValidParentheses(s))`,
// //       javascript: `const s = readline();

// // function longestValidParentheses(s) {
// //     // Write your code here
// // }

// // console.log(longestValidParentheses(s));`
// //     },
// //     testCases: [
// //       { id: 'tc1', input: '(()', expected: '2' },
// //       { id: 'tc2', input: ')()())', expected: '4' },
// //       { id: 'tc3', input: '\n', expected: '0' }
// //     ]
// //   },
// //   {
// //     title: 'Sliding Window Maximum',
// //     description: 'Return the max element in each sliding window of size k.',
// //     difficulty: 'Hard',
// //     tags: ['Array', 'Sliding Window', 'Deque'],
// //     constraints: '1 <= nums.length <= 10^5',
// //     sampleInput: '1 3 -1 -3 5 3 6 7\n3',
// //     sampleOutput: '3 3 5 5 6 7',
// //     explanation: 'Maximums of each window.',
// //     points: 300,
// //     order: 27,
// //     starterCode: {
// //       python: `nums = list(map(int, input().split()))
// // k = int(input())

// // def maxSlidingWindow(nums, k):
// //     # Write your code here
// //     pass

// // print(' '.join(map(str, maxSlidingWindow(nums, k))))`,
// //       javascript: `const nums = readline().split(' ').map(Number);
// // const k = parseInt(readline());

// // function maxSlidingWindow(nums, k) {
// //     // Write your code here
// // }

// // console.log(maxSlidingWindow(nums, k).join(' '));`
// //     },
// //     testCases: [
// //       { id: 'tc1', input: '1 3 -1 -3 5 3 6 7\n3', expected: '3 3 5 5 6 7' },
// //       { id: 'tc2', input: '1\n1', expected: '1' }
// //     ]
// //   },
// //   {
// //     title: 'Merge k Sorted Lists',
// //     description: 'Merge k sorted linked lists into one sorted list.',
// //     difficulty: 'Hard',
// //     tags: ['Linked List', 'Divide and Conquer', 'Heap'],
// //     constraints: '1 <= k <= 10^4',
// //     sampleInput: '1 4 5\n1 3 4\n2 6',
// //     sampleOutput: '1 1 2 3 4 4 5 6',
// //     explanation: 'Merge three lists.',
// //     points: 300,
// //     order: 28,
// //     starterCode: {
// //       python: `lists = []
// // while True:
// //     try:
// //         line = input()
// //         if not line: break
// //         lists.append(list(map(int, line.split())))
// //     except:
// //         break

// // def mergeKLists(lists):
// //     # Write your code here
// //     pass

// // print(' '.join(map(str, mergeKLists(lists))))`,
// //       javascript: `const lists = [];
// // let line;
// // while ((line = readline()) && line !== '') {
// //     lists.push(line.split(' ').map(Number));
// // }

// // function mergeKLists(lists) {
// //     // Write your code here
// // }

// // console.log(mergeKLists(lists).join(' '));`
// //     },
// //     testCases: [
// //       { id: 'tc1', input: '1 4 5\n1 3 4\n2 6', expected: '1 1 2 3 4 4 5 6' }
// //       // Removed the empty test case which caused validation error
// //     ]
// //   }
// // ];

// // // Normalize all test case inputs (ensure non-empty)
// // for (const problem of problems) {
// //   if (problem.testCases) {
// //     problem.testCases.forEach(tc => {
// //       tc.input = normalizeInput(tc.input);
// //       // Expected must not be empty; if empty, set to a single space (unlikely to affect judge)
// //       if (!tc.expected || tc.expected.trim() === '') {
// //         tc.expected = ' ';
// //       }
// //     });
// //   }
// // }

// // const seedDatabase = async () => {
// //   try {
// //     const mongoURI = process.env.MONGODB_URI;
// //     if (!mongoURI) {
// //       console.error('❌ MONGODB_URI not found');
// //       process.exit(1);
// //     }

// //     console.log('📡 Connecting to MongoDB...');
// //     await mongoose.connect(mongoURI);
// //     console.log('✅ Connected to MongoDB');

// //     // Clear existing problems
// //     const deleted = await Problem.deleteMany({});
// //     console.log(`🗑️ Deleted ${deleted.deletedCount} existing problems`);

// //     let inserted = 0;
// //     for (const problem of problems) {
// //       problem.order = problems.indexOf(problem) + 1;
// //       await Problem.create(problem);
// //       inserted++;
// //       console.log(`   ➕ Added: ${problem.title} (${problem.difficulty})`);
// //     }

// //     console.log(`\n✅ Seeded ${inserted} problems`);
// //     const easy = problems.filter(p => p.difficulty === 'Easy').length;
// //     const med = problems.filter(p => p.difficulty === 'Medium').length;
// //     const hard = problems.filter(p => p.difficulty === 'Hard').length;
// //     console.log(`📊 Easy: ${easy}, Medium: ${med}, Hard: ${hard}`);

// //     process.exit(0);
// //   } catch (error) {
// //     console.error('❌ Seed error:', error.message);
// //     process.exit(1);
// //   }
// // };

// // seedDatabase();
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const Problem = require('../models/Problem');
// dotenv.config();

// function normalizeInput(rawInput) {
//   if (rawInput === undefined || rawInput === null) return '\n';
//   const str = String(rawInput);
//   return str.trim() === '' ? '\n' : str;
// }


// const problems = [
//   // ================================================================
//   // EASY (20 problems)
//   // ================================================================
//   {
//     title: 'Two Sum',
//     description: 'Given an array of integers nums and an integer target, return indices of the two numbers that add up to target.',
//     difficulty: 'Easy',
//     tags: ['Array', 'Hash Table'],
//     constraints: '2 <= nums.length <= 10^4\n-10^9 <= nums[i] <= 10^9',
//     sampleInput: '2 7 11 15\n9',
//     sampleOutput: '[0, 1]',
//     explanation: 'nums[0] + nums[1] = 9',
//     points: 100,
//     starterCode: {
//       python: `nums = list(map(int, input().split()))
// target = int(input())
// def twoSum(nums, target):
//     # Write your code here
//     pass
// print(twoSum(nums, target))`,
//       javascript: `const nums = readline().split(' ').map(Number);
// const target = Number(readline());
// function twoSum(nums, target) {
//     // Write your code here
// }
// console.log(twoSum(nums, target));`
//     },
//     testCases: [
//       { id: 'tc1', input: '2 7 11 15\n9', expected: '[0, 1]' },
//       { id: 'tc2', input: '3 2 4\n6', expected: '[1, 2]' },
//       { id: 'tc3', input: '3 3\n6', expected: '[0, 1]' },
//       { id: 'tc4', input: '1 2 3 4 5\n9', expected: '[3, 4]' },
//       { id: 'tc5', input: '0 4 3 0\n0', expected: '[0, 3]' }
//     ]
//   },
//   {
//     title: 'Reverse String',
//     description: 'Write a function that reverses a string.',
//     difficulty: 'Easy',
//     tags: ['String', 'Two Pointers'],
//     constraints: '1 <= s.length <= 10^5',
//     sampleInput: 'hello',
//     sampleOutput: 'olleh',
//     explanation: 'Reversed string of "hello" is "olleh".',
//     points: 100,
//     starterCode: {
//       python: `s = input()
// def reverseString(s):
//     # Write your code here
//     pass
// print(reverseString(s))`,
//       javascript: `const s = readline();
// function reverseString(s) {
//     // Write your code here
// }
// console.log(reverseString(s));`
//     },
//     testCases: [
//       { id: 'tc1', input: 'hello', expected: 'olleh' },
//       { id: 'tc2', input: 'world', expected: 'dlrow' },
//       { id: 'tc3', input: 'a', expected: 'a' },
//       { id: 'tc4', input: 'racecar', expected: 'racecar' },
//       { id: 'tc5', input: '12345', expected: '54321' }
//     ]
//   },
//   {
//     title: 'Valid Parentheses',
//     description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
//     difficulty: 'Easy',
//     tags: ['Stack', 'String'],
//     constraints: '1 <= s.length <= 10^4',
//     sampleInput: '()[]{}',
//     sampleOutput: 'True',
//     explanation: 'All brackets are properly closed and nested.',
//     points: 100,
//     starterCode: {
//       python: `s = input()
// def isValid(s):
//     # Write your code here
//     pass
// print(isValid(s))`,
//       javascript: `const s = readline();
// function isValid(s) {
//     // Write your code here
// }
// console.log(isValid(s));`
//     },
//     testCases: [
//       { id: 'tc1', input: '()[]{}', expected: 'True' },
//       { id: 'tc2', input: '([{}])', expected: 'True' },
//       { id: 'tc3', input: '(]', expected: 'False' },
//       { id: 'tc4', input: '([)]', expected: 'False' },
//       { id: 'tc5', input: '((()))', expected: 'True' },
//       { id: 'tc6', input: '({[)}]', expected: 'False' }
//     ]
//   },
//   {
//     title: 'Best Time to Buy and Sell Stock',
//     description: 'Find the maximum profit you can achieve from buying and selling one share of stock.',
//     difficulty: 'Easy',
//     tags: ['Array', 'Dynamic Programming'],
//     constraints: '1 <= prices.length <= 10^5',
//     sampleInput: '7 1 5 3 6 4',
//     sampleOutput: '5',
//     explanation: 'Buy at 1, sell at 6 for profit 5.',
//     points: 100,
//     starterCode: {
//       python: `prices = list(map(int, input().split()))
// def maxProfit(prices):
//     # Write your code here
//     pass
// print(maxProfit(prices))`,
//       javascript: `const prices = readline().split(' ').map(Number);
// function maxProfit(prices) {
//     // Write your code here
// }
// console.log(maxProfit(prices));`
//     },
//     testCases: [
//       { id: 'tc1', input: '7 1 5 3 6 4', expected: '5' },
//       { id: 'tc2', input: '7 6 4 3 1', expected: '0' },
//       { id: 'tc3', input: '1 2 3 4 5', expected: '4' },
//       { id: 'tc4', input: '3 2 6 5 0 3', expected: '4' },
//       { id: 'tc5', input: '2 4 1', expected: '2' }
//     ]
//   },
//   {
//     title: 'Palindrome Number',
//     description: 'Determine whether an integer is a palindrome.',
//     difficulty: 'Easy',
//     tags: ['Math', 'String'],
//     constraints: '-2^31 <= x <= 2^31 - 1',
//     sampleInput: '121',
//     sampleOutput: 'True',
//     explanation: '121 reads the same backward.',
//     points: 100,
//     starterCode: {
//       python: `x = int(input())
// def isPalindrome(x):
//     # Write your code here
//     pass
// print(isPalindrome(x))`,
//       javascript: `const x = parseInt(readline());
// function isPalindrome(x) {
//     // Write your code here
// }
// console.log(isPalindrome(x));`
//     },
//     testCases: [
//       { id: 'tc1', input: '121', expected: 'True' },
//       { id: 'tc2', input: '-121', expected: 'False' },
//       { id: 'tc3', input: '10', expected: 'False' },
//       { id: 'tc4', input: '0', expected: 'True' },
//       { id: 'tc5', input: '12321', expected: 'True' }
//     ]
//   },
//   {
//     title: 'Fibonacci Number',
//     description: 'Compute the nth Fibonacci number.',
//     difficulty: 'Easy',
//     tags: ['Recursion', 'DP', 'Math'],
//     constraints: '0 <= n <= 30',
//     sampleInput: '6',
//     sampleOutput: '8',
//     explanation: 'Fibonacci: 0,1,1,2,3,5,8 → F(6)=8.',
//     points: 100,
//     starterCode: {
//       python: `n = int(input())
// def fib(n):
//     # Write your code here
//     pass
// print(fib(n))`,
//       javascript: `const n = parseInt(readline());
// function fib(n) {
//     // Write your code here
// }
// console.log(fib(n));`
//     },
//     testCases: [
//       { id: 'tc1', input: '0', expected: '0' },
//       { id: 'tc2', input: '1', expected: '1' },
//       { id: 'tc3', input: '6', expected: '8' },
//       { id: 'tc4', input: '10', expected: '55' },
//       { id: 'tc5', input: '20', expected: '6765' }
//     ]
//   },
//   {
//     title: 'Contains Duplicate',
//     description: 'Return true if any value appears at least twice, else false.',
//     difficulty: 'Easy',
//     tags: ['Array', 'Hash Table'],
//     constraints: '1 <= nums.length <= 10^5',
//     sampleInput: '1 2 3 1',
//     sampleOutput: 'True',
//     explanation: '1 appears twice.',
//     points: 100,
//     starterCode: {
//       python: `nums = list(map(int, input().split()))
// def containsDuplicate(nums):
//     # Write your code here
//     pass
// print(containsDuplicate(nums))`,
//       javascript: `const nums = readline().split(' ').map(Number);
// function containsDuplicate(nums) {
//     // Write your code here
// }
// console.log(containsDuplicate(nums));`
//     },
//     testCases: [
//       { id: 'tc1', input: '1 2 3 1', expected: 'True' },
//       { id: 'tc2', input: '1 2 3 4', expected: 'False' },
//       { id: 'tc3', input: '1 1 1 3 3 4 3 2 4 2', expected: 'True' },
//       { id: 'tc4', input: '1', expected: 'False' },
//       { id: 'tc5', input: '0 0', expected: 'True' }
//     ]
//   },
//   {
//     title: 'Climbing Stairs',
//     description: 'Count distinct ways to climb n steps (1 or 2 steps at a time).',
//     difficulty: 'Easy',
//     tags: ['DP', 'Math'],
//     constraints: '1 <= n <= 45',
//     sampleInput: '3',
//     sampleOutput: '3',
//     explanation: '1+1+1, 1+2, 2+1 → 3 ways.',
//     points: 100,
//     starterCode: {
//       python: `n = int(input())
// def climbStairs(n):
//     # Write your code here
//     pass
// print(climbStairs(n))`,
//       javascript: `const n = parseInt(readline());
// function climbStairs(n) {
//     // Write your code here
// }
// console.log(climbStairs(n));`
//     },
//     testCases: [
//       { id: 'tc1', input: '2', expected: '2' },
//       { id: 'tc2', input: '3', expected: '3' },
//       { id: 'tc3', input: '4', expected: '5' },
//       { id: 'tc4', input: '5', expected: '8' },
//       { id: 'tc5', input: '10', expected: '89' }
//     ]
//   },
//   {
//     title: 'Missing Number',
//     description: 'Given an array containing n distinct numbers from 0..n, find the missing one.',
//     difficulty: 'Easy',
//     tags: ['Array', 'Math', 'Bit Manipulation'],
//     constraints: '1 <= n <= 10^4',
//     sampleInput: '3 0 1',
//     sampleOutput: '2',
//     explanation: 'The missing number is 2.',
//     points: 100,
//     starterCode: {
//       python: `nums = list(map(int, input().split()))
// def missingNumber(nums):
//     # Write your code here
//     pass
// print(missingNumber(nums))`,
//       javascript: `const nums = readline().split(' ').map(Number);
// function missingNumber(nums) {
//     // Write your code here
// }
// console.log(missingNumber(nums));`
//     },
//     testCases: [
//       { id: 'tc1', input: '3 0 1', expected: '2' },
//       { id: 'tc2', input: '0 1', expected: '2' },
//       { id: 'tc3', input: '9 6 4 2 3 5 7 0 1', expected: '8' },
//       { id: 'tc4', input: '0', expected: '1' },
//       { id: 'tc5', input: '1', expected: '0' }
//     ]
//   },
//   {
//     title: 'Majority Element',
//     description: 'Find the element that appears more than ⌊ n/2 ⌋ times.',
//     difficulty: 'Easy',
//     tags: ['Array', 'Hash Table', 'Divide and Conquer'],
//     constraints: '1 <= n <= 5*10^4',
//     sampleInput: '3 2 3',
//     sampleOutput: '3',
//     explanation: '3 appears twice > 3/2.',
//     points: 100,
//     starterCode: {
//       python: `nums = list(map(int, input().split()))
// def majorityElement(nums):
//     # Write your code here
//     pass
// print(majorityElement(nums))`,
//       javascript: `const nums = readline().split(' ').map(Number);
// function majorityElement(nums) {
//     // Write your code here
// }
// console.log(majorityElement(nums));`
//     },
//     testCases: [
//       { id: 'tc1', input: '3 2 3', expected: '3' },
//       { id: 'tc2', input: '2 2 1 1 1 2 2', expected: '2' },
//       { id: 'tc3', input: '1', expected: '1' },
//       { id: 'tc4', input: '6 5 5', expected: '5' },
//       { id: 'tc5', input: '10 10 10 5 10', expected: '10' }
//     ]
//   },
//   {
//     title: 'Fizz Buzz',
//     description: 'Return list of strings from 1 to n, with Fizz/Buzz/FizzBuzz rules.',
//     difficulty: 'Easy',
//     tags: ['Math', 'String'],
//     constraints: '1 <= n <= 10^4',
//     sampleInput: '15',
//     sampleOutput: '1,2,Fizz,4,Buzz,Fizz,7,8,Fizz,Buzz,11,Fizz,13,14,FizzBuzz',
//     explanation: 'Standard FizzBuzz.',
//     points: 100,
//     starterCode: {
//       python: `n = int(input())
// def fizzBuzz(n):
//     # Write your code here
//     pass
// print(fizzBuzz(n))`,
//       javascript: `const n = parseInt(readline());
// function fizzBuzz(n) {
//     // Write your code here
// }
// console.log(fizzBuzz(n));`
//     },
//     testCases: [
//       { id: 'tc1', input: '3', expected: '1,2,Fizz' },
//       { id: 'tc2', input: '5', expected: '1,2,Fizz,4,Buzz' },
//       { id: 'tc3', input: '15', expected: '1,2,Fizz,4,Buzz,Fizz,7,8,Fizz,Buzz,11,Fizz,13,14,FizzBuzz' }
//     ]
//   },
//   {
//     title: 'Move Zeroes',
//     description: 'Move all zeros to the end while preserving relative order of non-zero elements.',
//     difficulty: 'Easy',
//     tags: ['Array', 'Two Pointers'],
//     constraints: '1 <= nums.length <= 10^4',
//     sampleInput: '0 1 0 3 12',
//     sampleOutput: '1 3 12 0 0',
//     explanation: 'Zeros moved to the end.',
//     points: 100,
//     starterCode: {
//       python: `nums = list(map(int, input().split()))
// def moveZeroes(nums):
//     # Write your code here
//     pass
// print(' '.join(map(str, nums)))`,
//       javascript: `const nums = readline().split(' ').map(Number);
// function moveZeroes(nums) {
//     // Write your code here
// }
// console.log(nums.join(' '));`
//     },
//     testCases: [
//       { id: 'tc1', input: '0 1 0 3 12', expected: '1 3 12 0 0' },
//       { id: 'tc2', input: '0', expected: '0' },
//       { id: 'tc3', input: '1 2 3', expected: '1 2 3' },
//       { id: 'tc4', input: '0 0 1', expected: '1 0 0' },
//       { id: 'tc5', input: '4 2 4 0 0 3 0 5', expected: '4 2 4 3 5 0 0 0' }
//     ]
//   },
//   // ---- NEW EASY ----
//   {
//     title: 'Maximum Subarray',
//     description: 'Find the contiguous subarray (containing at least one number) with the largest sum and return its sum.',
//     difficulty: 'Easy',
//     tags: ['Array', 'Dynamic Programming', 'Divide and Conquer'],
//     constraints: '1 <= nums.length <= 10^5\n-10^4 <= nums[i] <= 10^4',
//     sampleInput: '-2 1 -3 4 -1 2 1 -5 4',
//     sampleOutput: '6',
//     explanation: 'Subarray [4,-1,2,1] has the largest sum = 6.',
//     points: 100,
//     starterCode: {
//       python: `nums = list(map(int, input().split()))
// def maxSubArray(nums):
//     # Write your code here
//     pass
// print(maxSubArray(nums))`,
//       javascript: `const nums = readline().split(' ').map(Number);
// function maxSubArray(nums) {
//     // Write your code here
// }
// console.log(maxSubArray(nums));`
//     },
//     testCases: [
//       { id: 'tc1', input: '-2 1 -3 4 -1 2 1 -5 4', expected: '6' },
//       { id: 'tc2', input: '1', expected: '1' },
//       { id: 'tc3', input: '5 4 -1 7 8', expected: '23' },
//       { id: 'tc4', input: '-1', expected: '-1' },
//       { id: 'tc5', input: '-2 -1', expected: '-1' }
//     ]
//   },
//   {
//     title: 'Single Number',
//     description: 'Every element appears twice except for one. Find that single one. Your solution must run in O(n) time and O(1) space.',
//     difficulty: 'Easy',
//     tags: ['Array', 'Bit Manipulation'],
//     constraints: '1 <= nums.length <= 3*10^4\nEach element appears twice except for one.',
//     sampleInput: '2 2 1',
//     sampleOutput: '1',
//     explanation: '1 appears only once; XOR of all elements cancels pairs.',
//     points: 100,
//     starterCode: {
//       python: `nums = list(map(int, input().split()))
// def singleNumber(nums):
//     # Write your code here
//     pass
// print(singleNumber(nums))`,
//       javascript: `const nums = readline().split(' ').map(Number);
// function singleNumber(nums) {
//     // Write your code here
// }
// console.log(singleNumber(nums));`
//     },
//     testCases: [
//       { id: 'tc1', input: '2 2 1', expected: '1' },
//       { id: 'tc2', input: '4 1 2 1 2', expected: '4' },
//       { id: 'tc3', input: '1', expected: '1' },
//       { id: 'tc4', input: '0 1 0', expected: '1' },
//       { id: 'tc5', input: '7 3 5 3 7', expected: '5' }
//     ]
//   },
//   {
//     title: 'Reverse Linked List',
//     description: 'Given a singly linked list represented as a space-separated sequence of values, reverse it and print the values.',
//     difficulty: 'Easy',
//     tags: ['Linked List', 'Recursion'],
//     constraints: '0 <= n <= 5000\n-5000 <= Node.val <= 5000',
//     sampleInput: '1 2 3 4 5',
//     sampleOutput: '5 4 3 2 1',
//     explanation: 'Reversed list: 5 → 4 → 3 → 2 → 1.',
//     points: 100,
//     starterCode: {
//       python: `vals = list(map(int, input().split()))
// def reverseList(vals):
//     # Write your code here
//     pass
// print(' '.join(map(str, reverseList(vals))))`,
//       javascript: `const vals = readline().split(' ').map(Number);
// function reverseList(vals) {
//     // Write your code here
// }
// console.log(reverseList(vals).join(' '));`
//     },
//     testCases: [
//       { id: 'tc1', input: '1 2 3 4 5', expected: '5 4 3 2 1' },
//       { id: 'tc2', input: '1 2', expected: '2 1' },
//       { id: 'tc3', input: '1', expected: '1' },
//       { id: 'tc4', input: '3 6 9 12', expected: '12 9 6 3' },
//       { id: 'tc5', input: '10 20 30', expected: '30 20 10' }
//     ]
//   },
//   {
//     title: 'Binary Search',
//     description: 'Given a sorted array of distinct integers and a target, return the index of the target or -1 if not found. Must run in O(log n) time.',
//     difficulty: 'Easy',
//     tags: ['Array', 'Binary Search'],
//     constraints: '1 <= nums.length <= 10^4\nAll values are distinct and sorted ascending.',
//     sampleInput: '-1 0 3 5 9 12\n9',
//     sampleOutput: '4',
//     explanation: '9 is at index 4.',
//     points: 100,
//     starterCode: {
//       python: `nums = list(map(int, input().split()))
// target = int(input())
// def search(nums, target):
//     # Write your code here
//     pass
// print(search(nums, target))`,
//       javascript: `const nums = readline().split(' ').map(Number);
// const target = parseInt(readline());
// function search(nums, target) {
//     // Write your code here
// }
// console.log(search(nums, target));`
//     },
//     testCases: [
//       { id: 'tc1', input: '-1 0 3 5 9 12\n9', expected: '4' },
//       { id: 'tc2', input: '-1 0 3 5 9 12\n2', expected: '-1' },
//       { id: 'tc3', input: '5\n5', expected: '0' },
//       { id: 'tc4', input: '1 3 5 7 9\n1', expected: '0' },
//       { id: 'tc5', input: '1 3 5 7 9\n9', expected: '4' }
//     ]
//   },
//   {
//     title: 'Power of Two',
//     description: 'Given an integer n, return true if it is a power of two, otherwise return false.',
//     difficulty: 'Easy',
//     tags: ['Math', 'Bit Manipulation', 'Recursion'],
//     constraints: '-2^31 <= n <= 2^31 - 1',
//     sampleInput: '16',
//     sampleOutput: 'True',
//     explanation: '16 = 2^4, so it is a power of two.',
//     points: 100,
//     starterCode: {
//       python: `n = int(input())
// def isPowerOfTwo(n):
//     # Write your code here
//     pass
// print(isPowerOfTwo(n))`,
//       javascript: `const n = parseInt(readline());
// function isPowerOfTwo(n) {
//     // Write your code here
// }
// console.log(isPowerOfTwo(n));`
//     },
//     testCases: [
//       { id: 'tc1', input: '1', expected: 'True' },
//       { id: 'tc2', input: '16', expected: 'True' },
//       { id: 'tc3', input: '3', expected: 'False' },
//       { id: 'tc4', input: '0', expected: 'False' },
//       { id: 'tc5', input: '64', expected: 'True' }
//     ]
//   },
//   {
//     title: 'Is Subsequence',
//     description: 'Given strings s and t, return true if s is a subsequence of t.',
//     difficulty: 'Easy',
//     tags: ['String', 'Two Pointers', 'Dynamic Programming'],
//     constraints: '0 <= s.length <= 100\n0 <= t.length <= 10^4',
//     sampleInput: 'abc\nahbgdc',
//     sampleOutput: 'True',
//     explanation: '"abc" can be found in "ahbgdc" in order.',
//     points: 100,
//     starterCode: {
//       python: `s = input()
// t = input()
// def isSubsequence(s, t):
//     # Write your code here
//     pass
// print(isSubsequence(s, t))`,
//       javascript: `const s = readline();
// const t = readline();
// function isSubsequence(s, t) {
//     // Write your code here
// }
// console.log(isSubsequence(s, t));`
//     },
//     testCases: [
//       { id: 'tc1', input: 'abc\nahbgdc', expected: 'True' },
//       { id: 'tc2', input: 'axc\nahbgdc', expected: 'False' },
//       { id: 'tc3', input: '\nahbgdc', expected: 'True' },
//       { id: 'tc4', input: 'ace\nabcde', expected: 'True' },
//       { id: 'tc5', input: 'aec\nabcde', expected: 'False' }
//     ]
//   },
//   {
//     title: 'Counting Bits',
//     description: 'Given an integer n, return an array of length n+1 where ans[i] is the number of 1s in the binary representation of i.',
//     difficulty: 'Easy',
//     tags: ['Dynamic Programming', 'Bit Manipulation'],
//     constraints: '0 <= n <= 10^5',
//     sampleInput: '5',
//     sampleOutput: '0 1 1 2 1 2',
//     explanation: 'Binary of 0..5: 0,1,1,10,1,101 → 1-count: 0,1,1,2,1,2.',
//     points: 100,
//     starterCode: {
//       python: `n = int(input())
// def countBits(n):
//     # Write your code here
//     pass
// print(' '.join(map(str, countBits(n))))`,
//       javascript: `const n = parseInt(readline());
// function countBits(n) {
//     // Write your code here
// }
// console.log(countBits(n).join(' '));`
//     },
//     testCases: [
//       { id: 'tc1', input: '2', expected: '0 1 1' },
//       { id: 'tc2', input: '5', expected: '0 1 1 2 1 2' },
//       { id: 'tc3', input: '0', expected: '0' },
//       { id: 'tc4', input: '7', expected: '0 1 1 2 1 2 2 3' },
//       { id: 'tc5', input: '4', expected: '0 1 1 2 1' }
//     ]
//   },
//   // ================================================================
//   // MEDIUM (20 problems)
//   // ================================================================
//   {
//     title: 'Longest Substring Without Repeating Characters',
//     description: 'Find length of longest substring without repeating characters.',
//     difficulty: 'Medium',
//     tags: ['Hash Table', 'String', 'Sliding Window'],
//     constraints: '0 <= s.length <= 5*10^4',
//     sampleInput: 'abcabcbb',
//     sampleOutput: '3',
//     explanation: 'Answer is "abc" length 3.',
//     points: 200,
//     starterCode: {
//       python: `s = input()
// def lengthOfLongestSubstring(s):
//     # Write your code here
//     pass
// print(lengthOfLongestSubstring(s))`,
//       javascript: `const s = readline();
// function lengthOfLongestSubstring(s) {
//     // Write your code here
// }
// console.log(lengthOfLongestSubstring(s));`
//     },
//     testCases: [
//       { id: 'tc1', input: 'abcabcbb', expected: '3' },
//       { id: 'tc2', input: 'bbbbb', expected: '1' },
//       { id: 'tc3', input: 'pwwkew', expected: '3' },
//       { id: 'tc4', input: '\n', expected: '0' },
//       { id: 'tc5', input: 'au', expected: '2' }
//     ]
//   },
//   {
//     title: 'Container With Most Water',
//     description: 'Find two lines that together with x-axis form a container holding the most water.',
//     difficulty: 'Medium',
//     tags: ['Array', 'Two Pointers', 'Greedy'],
//     constraints: '2 <= height.length <= 10^5',
//     sampleInput: '1 8 6 2 5 4 8 3 7',
//     sampleOutput: '49',
//     explanation: 'Maximum area = 49.',
//     points: 200,
//     starterCode: {
//       python: `height = list(map(int, input().split()))
// def maxArea(height):
//     # Write your code here
//     pass
// print(maxArea(height))`,
//       javascript: `const height = readline().split(' ').map(Number);
// function maxArea(height) {
//     // Write your code here
// }
// console.log(maxArea(height));`
//     },
//     testCases: [
//       { id: 'tc1', input: '1 8 6 2 5 4 8 3 7', expected: '49' },
//       { id: 'tc2', input: '1 1', expected: '1' },
//       { id: 'tc3', input: '4 3 2 1 4', expected: '16' },
//       { id: 'tc4', input: '1 2 1', expected: '2' },
//       { id: 'tc5', input: '2 3 4 5 18 17 6', expected: '17' }
//     ]
//   },
//   {
//     title: '3Sum',
//     description: 'Find all unique triplets that sum to zero.',
//     difficulty: 'Medium',
//     tags: ['Array', 'Two Pointers', 'Sorting'],
//     constraints: '3 <= nums.length <= 3000',
//     sampleInput: '-1 0 1 2 -1 -4',
//     sampleOutput: '[[-1,-1,2],[-1,0,1]]',
//     explanation: 'Triplets that sum to zero.',
//     points: 200,
//     starterCode: {
//       python: `nums = list(map(int, input().split()))
// def threeSum(nums):
//     # Write your code here
//     pass
// print(threeSum(nums))`,
//       javascript: `const nums = readline().split(' ').map(Number);
// function threeSum(nums) {
//     // Write your code here
// }
// console.log(threeSum(nums));`
//     },
//     testCases: [
//       { id: 'tc1', input: '-1 0 1 2 -1 -4', expected: '[[-1,-1,2],[-1,0,1]]' },
//       { id: 'tc2', input: '0 0 0', expected: '[[0,0,0]]' },
//       { id: 'tc3', input: '0 1 1', expected: '[]' },
//       { id: 'tc4', input: '-2 0 1 1 2', expected: '[[-2,0,2],[-2,1,1]]' }
//     ]
//   },
//   {
//     title: 'Group Anagrams',
//     description: 'Group the given list of strings into anagrams.',
//     difficulty: 'Medium',
//     tags: ['Hash Table', 'String', 'Sorting'],
//     constraints: '1 <= strs.length <= 10^4',
//     sampleInput: 'eat tea tan ate nat bat',
//     sampleOutput: '[[bat],[nat,tan],[ate,eat,tea]]',
//     explanation: 'Anagrams grouped.',
//     points: 200,
//     starterCode: {
//       python: `strs = input().split()
// def groupAnagrams(strs):
//     # Write your code here
//     pass
// print(groupAnagrams(strs))`,
//       javascript: `const strs = readline().split(' ');
// function groupAnagrams(strs) {
//     // Write your code here
// }
// console.log(groupAnagrams(strs));`
//     },
//     testCases: [
//       { id: 'tc1', input: 'eat tea tan ate nat bat', expected: '[[bat],[nat,tan],[ate,eat,tea]]' },
//       { id: 'tc2', input: '\n', expected: '[[]]' },
//       { id: 'tc3', input: 'a', expected: '[[a]]' }
//     ]
//   },
//   {
//     title: 'Product of Array Except Self',
//     description: 'Return an array output[i] = product of all elements except nums[i].',
//     difficulty: 'Medium',
//     tags: ['Array', 'Prefix Sum'],
//     constraints: '2 <= nums.length <= 10^5',
//     sampleInput: '1 2 3 4',
//     sampleOutput: '24 12 8 6',
//     explanation: 'Products: 2*3*4=24, 1*3*4=12, etc.',
//     points: 200,
//     starterCode: {
//       python: `nums = list(map(int, input().split()))
// def productExceptSelf(nums):
//     # Write your code here
//     pass
// print(' '.join(map(str, productExceptSelf(nums))))`,
//       javascript: `const nums = readline().split(' ').map(Number);
// function productExceptSelf(nums) {
//     // Write your code here
// }
// console.log(productExceptSelf(nums).join(' '));`
//     },
//     testCases: [
//       { id: 'tc1', input: '1 2 3 4', expected: '24 12 8 6' },
//       { id: 'tc2', input: '-1 1 0 -3 3', expected: '0 0 9 0 0' }
//     ]
//   },
//   {
//     title: 'Spiral Matrix',
//     description: 'Return all elements of the matrix in spiral order.',
//     difficulty: 'Medium',
//     tags: ['Array', 'Matrix', 'Simulation'],
//     constraints: '1 <= m,n <= 10',
//     sampleInput: '3 3\n1 2 3\n4 5 6\n7 8 9',
//     sampleOutput: '1 2 3 6 9 8 7 4 5',
//     explanation: 'Spiral traversal.',
//     points: 200,
//     starterCode: {
//       python: `rows, cols = map(int, input().split())
// matrix = []
// for _ in range(rows):
//     matrix.append(list(map(int, input().split())))
// def spiralOrder(matrix):
//     # Write your code here
//     pass
// print(' '.join(map(str, spiralOrder(matrix))))`,
//       javascript: `const [rows, cols] = readline().split(' ').map(Number);
// const matrix = [];
// for (let i = 0; i < rows; i++) {
//     matrix.push(readline().split(' ').map(Number));
// }
// function spiralOrder(matrix) {
//     // Write your code here
// }
// console.log(spiralOrder(matrix).join(' '));`
//     },
//     testCases: [
//       { id: 'tc1', input: '3 3\n1 2 3\n4 5 6\n7 8 9', expected: '1 2 3 6 9 8 7 4 5' },
//       { id: 'tc2', input: '1 3\n1 2 3', expected: '1 2 3' },
//       { id: 'tc3', input: '3 1\n1\n2\n3', expected: '1 2 3' }
//     ]
//   },
//   {
//     title: 'Rotate Image',
//     description: 'Rotate the n x n matrix by 90 degrees clockwise in-place.',
//     difficulty: 'Medium',
//     tags: ['Array', 'Matrix'],
//     constraints: '1 <= n <= 20',
//     sampleInput: '3\n1 2 3\n4 5 6\n7 8 9',
//     sampleOutput: '7 4 1\n8 5 2\n9 6 3',
//     explanation: '90-degree rotation.',
//     points: 200,
//     starterCode: {
//       python: `n = int(input())
// matrix = []
// for _ in range(n):
//     matrix.append(list(map(int, input().split())))
// def rotate(matrix):
//     # Write your code here
//     pass
// rotate(matrix)
// for row in matrix:
//     print(' '.join(map(str, row)))`,
//       javascript: `const n = parseInt(readline());
// const matrix = [];
// for (let i = 0; i < n; i++) {
//     matrix.push(readline().split(' ').map(Number));
// }
// function rotate(matrix) {
//     // Write your code here
// }
// rotate(matrix);
// for (let row of matrix) {
//     console.log(row.join(' '));
// }`
//     },
//     testCases: [
//       { id: 'tc1', input: '3\n1 2 3\n4 5 6\n7 8 9', expected: '7 4 1\n8 5 2\n9 6 3' },
//       { id: 'tc2', input: '2\n1 2\n3 4', expected: '3 1\n4 2' }
//     ]
//   },
//   {
//     title: 'Word Search',
//     description: 'Given a 2D board and a word, find if the word exists.',
//     difficulty: 'Medium',
//     tags: ['Array', 'Backtracking'],
//     constraints: '1 <= m,n <= 6',
//     sampleInput: '3 4\nA B C E\nS F C S\nA D E E\nABCCED',
//     sampleOutput: 'True',
//     explanation: 'Word "ABCCED" exists.',
//     points: 200,
//     starterCode: {
//       python: `rows, cols = map(int, input().split())
// board = []
// for _ in range(rows):
//     board.append(input().split())
// word = input()
// def exist(board, word):
//     # Write your code here
//     pass
// print(exist(board, word))`,
//       javascript: `const [rows, cols] = readline().split(' ').map(Number);
// const board = [];
// for (let i = 0; i < rows; i++) {
//     board.push(readline().split(' '));
// }
// const word = readline();
// function exist(board, word) {
//     // Write your code here
// }
// console.log(exist(board, word));`
//     },
//     testCases: [
//       { id: 'tc1', input: '3 4\nA B C E\nS F C S\nA D E E\nABCCED', expected: 'True' },
//       { id: 'tc2', input: '1 1\nA\nA', expected: 'True' },
//       { id: 'tc3', input: '2 2\nA B\nC D\nABCD', expected: 'False' }
//     ]
//   },
//   {
//     title: 'Course Schedule',
//     description: 'Determine if you can finish all courses given prerequisites.',
//     difficulty: 'Medium',
//     tags: ['Graph', 'Topological Sort', 'BFS', 'DFS'],
//     constraints: '1 <= numCourses <= 2000',
//     sampleInput: '2\n1 0',
//     sampleOutput: 'True',
//     explanation: 'Possible to finish.',
//     points: 200,
//     starterCode: {
//       python: `numCourses = int(input())
// prerequisites = []
// while True:
//     try:
//         line = input()
//         if not line: break
//         a,b = map(int, line.split())
//         prerequisites.append([a,b])
//     except:
//         break
// def canFinish(numCourses, prerequisites):
//     # Write your code here
//     pass
// print(canFinish(numCourses, prerequisites))`,
//       javascript: `const numCourses = parseInt(readline());
// const prerequisites = [];
// let line;
// while ((line = readline()) && line !== '') {
//     const [a, b] = line.split(' ').map(Number);
//     prerequisites.push([a, b]);
// }
// function canFinish(numCourses, prerequisites) {
//     // Write your code here
// }
// console.log(canFinish(numCourses, prerequisites));`
//     },
//     testCases: [
//       { id: 'tc1', input: '2\n1 0', expected: 'True' },
//       { id: 'tc2', input: '2\n1 0\n0 1', expected: 'False' },
//       { id: 'tc3', input: '4\n1 0\n2 1\n3 2', expected: 'True' }
//     ]
//   },
//   // ---- NEW MEDIUM ----
//   {
//     title: 'Merge Intervals',
//     description: 'Given a list of intervals, merge all overlapping intervals.',
//     difficulty: 'Medium',
//     tags: ['Array', 'Sorting'],
//     constraints: '1 <= intervals.length <= 10^4\nintervals[i].length == 2\n0 <= start <= end <= 10^4',
//     sampleInput: '4\n1 3\n2 6\n8 10\n15 18',
//     sampleOutput: '1 6\n8 10\n15 18',
//     explanation: 'Intervals [1,3] and [2,6] overlap and merge to [1,6].',
//     points: 200,
//     starterCode: {
//       python: `n = int(input())
// intervals = []
// for _ in range(n):
//     a, b = map(int, input().split())
//     intervals.append([a, b])
// def merge(intervals):
//     # Write your code here
//     pass
// for iv in merge(intervals):
//     print(iv[0], iv[1])`,
//       javascript: `const n = parseInt(readline());
// const intervals = [];
// for (let i = 0; i < n; i++) {
//     intervals.push(readline().split(' ').map(Number));
// }
// function merge(intervals) {
//     // Write your code here
// }
// merge(intervals).forEach(iv => console.log(iv[0] + ' ' + iv[1]));`
//     },
//     testCases: [
//       { id: 'tc1', input: '4\n1 3\n2 6\n8 10\n15 18', expected: '1 6\n8 10\n15 18' },
//       { id: 'tc2', input: '2\n1 4\n4 5', expected: '1 5' },
//       { id: 'tc3', input: '3\n1 4\n0 2\n3 5', expected: '0 5' },
//       { id: 'tc4', input: '1\n1 1', expected: '1 1' }
//     ]
//   },
//   {
//     title: 'Jump Game',
//     description: 'Given an array of non-negative integers, determine if you can reach the last index starting from index 0. Each element represents your maximum jump length.',
//     difficulty: 'Medium',
//     tags: ['Array', 'Greedy', 'Dynamic Programming'],
//     constraints: '1 <= nums.length <= 10^4\n0 <= nums[i] <= 10^5',
//     sampleInput: '2 3 1 1 4',
//     sampleOutput: 'True',
//     explanation: 'Jump 1 step from index 0 to 1, then 3 steps to the last index.',
//     points: 200,
//     starterCode: {
//       python: `nums = list(map(int, input().split()))
// def canJump(nums):
//     # Write your code here
//     pass
// print(canJump(nums))`,
//       javascript: `const nums = readline().split(' ').map(Number);
// function canJump(nums) {
//     // Write your code here
// }
// console.log(canJump(nums));`
//     },
//     testCases: [
//       { id: 'tc1', input: '2 3 1 1 4', expected: 'True' },
//       { id: 'tc2', input: '3 2 1 0 4', expected: 'False' },
//       { id: 'tc3', input: '0', expected: 'True' },
//       { id: 'tc4', input: '1 0', expected: 'True' },
//       { id: 'tc5', input: '2 0 0', expected: 'True' }
//     ]
//   },
//   {
//     title: 'Unique Paths',
//     description: 'A robot starts at top-left corner of an m x n grid and wants to reach the bottom-right corner. Count all unique paths moving only down or right.',
//     difficulty: 'Medium',
//     tags: ['Math', 'Dynamic Programming', 'Combinatorics'],
//     constraints: '1 <= m, n <= 100',
//     sampleInput: '3 7',
//     sampleOutput: '28',
//     explanation: 'There are 28 unique paths for a 3x7 grid.',
//     points: 200,
//     starterCode: {
//       python: `m, n = map(int, input().split())
// def uniquePaths(m, n):
//     # Write your code here
//     pass
// print(uniquePaths(m, n))`,
//       javascript: `const [m, n] = readline().split(' ').map(Number);
// function uniquePaths(m, n) {
//     // Write your code here
// }
// console.log(uniquePaths(m, n));`
//     },
//     testCases: [
//       { id: 'tc1', input: '3 7', expected: '28' },
//       { id: 'tc2', input: '3 2', expected: '3' },
//       { id: 'tc3', input: '1 1', expected: '1' },
//       { id: 'tc4', input: '5 5', expected: '70' },
//       { id: 'tc5', input: '10 10', expected: '48620' }
//     ]
//   },
//   {
//     title: 'Number of Islands',
//     description: "Given a 2D grid of '1's (land) and '0's (water), count the number of islands (connected groups of 1s).",
//     difficulty: 'Medium',
//     tags: ['Array', 'DFS', 'BFS', 'Union Find', 'Matrix'],
//     constraints: '1 <= m, n <= 300',
//     sampleInput: '4 5\n1 1 1 1 0\n1 1 0 1 0\n1 1 0 0 0\n0 0 0 0 0',
//     sampleOutput: '1',
//     explanation: 'All 1s are connected, forming a single island.',
//     points: 200,
//     starterCode: {
//       python: `rows, cols = map(int, input().split())
// grid = []
// for _ in range(rows):
//     grid.append(list(map(int, input().split())))
// def numIslands(grid):
//     # Write your code here
//     pass
// print(numIslands(grid))`,
//       javascript: `const [rows, cols] = readline().split(' ').map(Number);
// const grid = [];
// for (let i = 0; i < rows; i++) {
//     grid.push(readline().split(' ').map(Number));
// }
// function numIslands(grid) {
//     // Write your code here
// }
// console.log(numIslands(grid));`
//     },
//     testCases: [
//       { id: 'tc1', input: '4 5\n1 1 1 1 0\n1 1 0 1 0\n1 1 0 0 0\n0 0 0 0 0', expected: '1' },
//       { id: 'tc2', input: '4 5\n1 1 0 0 0\n1 1 0 0 0\n0 0 1 0 0\n0 0 0 1 1', expected: '3' },
//       { id: 'tc3', input: '1 1\n1', expected: '1' },
//       { id: 'tc4', input: '1 1\n0', expected: '0' },
//       { id: 'tc5', input: '2 2\n1 0\n0 1', expected: '2' }
//     ]
//   },
//   {
//     title: 'Search in Rotated Sorted Array',
//     description: 'Search for a target in a rotated sorted array. Return its index or -1.',
//     difficulty: 'Medium',
//     tags: ['Array', 'Binary Search'],
//     constraints: '1 <= nums.length <= 5000\nAll values are unique.',
//     sampleInput: '4 5 6 7 0 1 2\n0',
//     sampleOutput: '4',
//     explanation: '0 is at index 4 in the rotated array.',
//     points: 200,
//     starterCode: {
//       python: `nums = list(map(int, input().split()))
// target = int(input())
// def search(nums, target):
//     # Write your code here
//     pass
// print(search(nums, target))`,
//       javascript: `const nums = readline().split(' ').map(Number);
// const target = parseInt(readline());
// function search(nums, target) {
//     // Write your code here
// }
// console.log(search(nums, target));`
//     },
//     testCases: [
//       { id: 'tc1', input: '4 5 6 7 0 1 2\n0', expected: '4' },
//       { id: 'tc2', input: '4 5 6 7 0 1 2\n3', expected: '-1' },
//       { id: 'tc3', input: '1\n0', expected: '-1' },
//       { id: 'tc4', input: '1\n1', expected: '0' },
//       { id: 'tc5', input: '3 1\n1', expected: '1' }
//     ]
//   },
//   {
//     title: 'Find Minimum in Rotated Sorted Array',
//     description: 'Find the minimum element in a rotated sorted array of unique elements.',
//     difficulty: 'Medium',
//     tags: ['Array', 'Binary Search'],
//     constraints: '1 <= nums.length <= 5000\nAll values are unique.',
//     sampleInput: '3 4 5 1 2',
//     sampleOutput: '1',
//     explanation: 'The minimum element is 1.',
//     points: 200,
//     starterCode: {
//       python: `nums = list(map(int, input().split()))
// def findMin(nums):
//     # Write your code here
//     pass
// print(findMin(nums))`,
//       javascript: `const nums = readline().split(' ').map(Number);
// function findMin(nums) {
//     // Write your code here
// }
// console.log(findMin(nums));`
//     },
//     testCases: [
//       { id: 'tc1', input: '3 4 5 1 2', expected: '1' },
//       { id: 'tc2', input: '4 5 6 7 0 1 2', expected: '0' },
//       { id: 'tc3', input: '11 13 15 17', expected: '11' },
//       { id: 'tc4', input: '1', expected: '1' },
//       { id: 'tc5', input: '2 1', expected: '1' }
//     ]
//   },
//   {
//     title: 'Kth Largest Element in an Array',
//     description: 'Find the kth largest element in an unsorted array.',
//     difficulty: 'Medium',
//     tags: ['Array', 'Divide and Conquer', 'Sorting', 'Heap', 'Quickselect'],
//     constraints: '1 <= k <= nums.length <= 10^4',
//     sampleInput: '3 2 1 5 6 4\n2',
//     sampleOutput: '5',
//     explanation: 'The 2nd largest element is 5.',
//     points: 200,
//     starterCode: {
//       python: `nums = list(map(int, input().split()))
// k = int(input())
// def findKthLargest(nums, k):
//     # Write your code here
//     pass
// print(findKthLargest(nums, k))`,
//       javascript: `const nums = readline().split(' ').map(Number);
// const k = parseInt(readline());
// function findKthLargest(nums, k) {
//     // Write your code here
// }
// console.log(findKthLargest(nums, k));`
//     },
//     testCases: [
//       { id: 'tc1', input: '3 2 1 5 6 4\n2', expected: '5' },
//       { id: 'tc2', input: '3 2 3 1 2 4 5 5 6\n4', expected: '4' },
//       { id: 'tc3', input: '1\n1', expected: '1' },
//       { id: 'tc4', input: '7 6 5 4 3 2 1\n1', expected: '7' },
//       { id: 'tc5', input: '10 4 3 8 2\n3', expected: '4' }
//     ]
//   },
//   {
//     title: 'Coin Change',
//     description: 'Given coin denominations and a total amount, find the fewest number of coins needed to make up that amount. Return -1 if not possible.',
//     difficulty: 'Medium',
//     tags: ['Array', 'Dynamic Programming', 'Breadth-First Search'],
//     constraints: '1 <= coins.length <= 12\n1 <= coins[i] <= 2^31 - 1\n0 <= amount <= 10^4',
//     sampleInput: '1 5 6 9\n11',
//     sampleOutput: '2',
//     explanation: '5 + 6 = 11 using 2 coins.',
//     points: 200,
//     starterCode: {
//       python: `coins = list(map(int, input().split()))
// amount = int(input())
// def coinChange(coins, amount):
//     # Write your code here
//     pass
// print(coinChange(coins, amount))`,
//       javascript: `const coins = readline().split(' ').map(Number);
// const amount = parseInt(readline());
// function coinChange(coins, amount) {
//     // Write your code here
// }
// console.log(coinChange(coins, amount));`
//     },
//     testCases: [
//       { id: 'tc1', input: '1 5 6 9\n11', expected: '2' },
//       { id: 'tc2', input: '1 2 5\n11', expected: '3' },
//       { id: 'tc3', input: '2\n3', expected: '-1' },
//       { id: 'tc4', input: '1\n0', expected: '0' },
//       { id: 'tc5', input: '1 2 5\n100', expected: '20' }
//     ]
//   },
//   {
//     title: 'Letter Combinations of a Phone Number',
//     description: 'Given a string containing digits 2-9, return all possible letter combinations the number could represent. Output letters in sorted lexicographic order separated by spaces.',
//     difficulty: 'Medium',
//     tags: ['Hash Table', 'String', 'Backtracking'],
//     constraints: '0 <= digits.length <= 4\ndigits[i] is in [2,9]',
//     sampleInput: '23',
//     sampleOutput: 'ad ae af bd be bf cd ce cf',
//     explanation: '2→abc 3→def → all combinations sorted.',
//     points: 200,
//     starterCode: {
//       python: `digits = input().strip()
// def letterCombinations(digits):
//     # Write your code here
//     # Return sorted list of combinations
//     pass
// result = letterCombinations(digits)
// if result:
//     print(' '.join(sorted(result)))
// else:
//     print('')`,
//       javascript: `const digits = readline().trim();
// function letterCombinations(digits) {
//     // Write your code here
//     // Return sorted array of combinations
// }
// const result = letterCombinations(digits);
// if (result && result.length > 0) {
//     console.log(result.sort().join(' '));
// } else {
//     console.log('');
// }`
//     },
//     testCases: [
//       { id: 'tc1', input: '23', expected: 'ad ae af bd be bf cd ce cf' },
//       { id: 'tc2', input: '2', expected: 'a b c' },
//       { id: 'tc3', input: '9', expected: 'w x y z' },
//       { id: 'tc4', input: '79', expected: 'pw px py pz qw qx qy qz rw rx ry rz sw sx sy sz' }
//     ]
//   },
//   {
//     title: 'Longest Palindromic Substring',
//     description: 'Given a string s, return the longest palindromic substring.',
//     difficulty: 'Medium',
//     tags: ['String', 'Dynamic Programming'],
//     constraints: '1 <= s.length <= 1000',
//     sampleInput: 'cbbd',
//     sampleOutput: 'bb',
//     explanation: '"bb" is the longest palindromic substring.',
//     points: 200,
//     starterCode: {
//       python: `s = input()
// def longestPalindrome(s):
//     # Write your code here
//     pass
// print(longestPalindrome(s))`,
//       javascript: `const s = readline();
// function longestPalindrome(s) {
//     // Write your code here
// }
// console.log(longestPalindrome(s));`
//     },
//     testCases: [
//       { id: 'tc1', input: 'cbbd', expected: 'bb' },
//       { id: 'tc2', input: 'a', expected: 'a' },
//       { id: 'tc3', input: 'racecar', expected: 'racecar' },
//       { id: 'tc4', input: 'abacaba', expected: 'abacaba' },
//       { id: 'tc5', input: 'xyzyx', expected: 'xyzyx' }
//     ]
//   },
//   // ================================================================
//   // HARD (15 problems)
//   // ================================================================
//   {
//     title: 'Median of Two Sorted Arrays',
//     description: 'Find median of two sorted arrays in O(log(min(n,m))).',
//     difficulty: 'Hard',
//     tags: ['Array', 'Binary Search', 'Divide and Conquer'],
//     constraints: '1 <= n,m <= 1000',
//     sampleInput: '1 3\n2',
//     sampleOutput: '2.0',
//     explanation: 'Combined [1,2,3] median = 2.',
//     points: 300,
//     starterCode: {
//       python: `nums1 = list(map(int, input().split()))
// nums2 = list(map(int, input().split()))
// def findMedianSortedArrays(nums1, nums2):
//     # Write your code here
//     pass
// print(findMedianSortedArrays(nums1, nums2))`,
//       javascript: `const nums1 = readline().split(' ').map(Number);
// const nums2 = readline().split(' ').map(Number);
// function findMedianSortedArrays(nums1, nums2) {
//     // Write your code here
// }
// console.log(findMedianSortedArrays(nums1, nums2));`
//     },
//     testCases: [
//       { id: 'tc1', input: '1 3\n2', expected: '2.0' },
//       { id: 'tc2', input: '1 2\n3 4', expected: '2.5' },
//       { id: 'tc3', input: '0 0\n0 0', expected: '0.0' }
//     ]
//   },
//   {
//     title: 'Trapping Rain Water',
//     description: 'Compute how much water can be trapped after rain.',
//     difficulty: 'Hard',
//     tags: ['Array', 'Two Pointers', 'Stack'],
//     constraints: '1 <= n <= 2*10^4',
//     sampleInput: '0 1 0 2 1 0 1 3 2 1 2 1',
//     sampleOutput: '6',
//     explanation: 'Total trapped water = 6.',
//     points: 300,
//     starterCode: {
//       python: `height = list(map(int, input().split()))
// def trap(height):
//     # Write your code here
//     pass
// print(trap(height))`,
//       javascript: `const height = readline().split(' ').map(Number);
// function trap(height) {
//     // Write your code here
// }
// console.log(trap(height));`
//     },
//     testCases: [
//       { id: 'tc1', input: '0 1 0 2 1 0 1 3 2 1 2 1', expected: '6' },
//       { id: 'tc2', input: '4 2 0 3 2 5', expected: '9' },
//       { id: 'tc3', input: '2 0 2', expected: '2' }
//     ]
//   },
//   {
//     title: 'N-Queens',
//     description: 'Place N queens on an N×N board such that no two attack each other. Return all distinct solutions.',
//     difficulty: 'Hard',
//     tags: ['Backtracking'],
//     constraints: '1 <= n <= 9',
//     sampleInput: '4',
//     sampleOutput: '[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]',
//     explanation: 'Two solutions for 4-Queens.',
//     points: 300,
//     starterCode: {
//       python: `n = int(input())
// def solveNQueens(n):
//     # Write your code here
//     pass
// print(solveNQueens(n))`,
//       javascript: `const n = parseInt(readline());
// function solveNQueens(n) {
//     // Write your code here
// }
// console.log(solveNQueens(n));`
//     },
//     testCases: [
//       { id: 'tc1', input: '4', expected: '[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]' },
//       { id: 'tc2', input: '1', expected: '[["Q"]]' }
//     ]
//   },
//   {
//     title: 'Word Ladder',
//     description: 'Find shortest transformation sequence length from beginWord to endWord.',
//     difficulty: 'Hard',
//     tags: ['BFS', 'Hash Table', 'String'],
//     constraints: '1 <= wordList length <= 5000',
//     sampleInput: 'hit\ncog\nhot dot dog lot log cog',
//     sampleOutput: '5',
//     explanation: 'hit → hot → dot → dog → cog (5 steps).',
//     points: 300,
//     starterCode: {
//       python: `beginWord = input()
// endWord = input()
// wordList = input().split()
// def ladderLength(beginWord, endWord, wordList):
//     # Write your code here
//     pass
// print(ladderLength(beginWord, endWord, wordList))`,
//       javascript: `const beginWord = readline();
// const endWord = readline();
// const wordList = readline().split(' ');
// function ladderLength(beginWord, endWord, wordList) {
//     // Write your code here
// }
// console.log(ladderLength(beginWord, endWord, wordList));`
//     },
//     testCases: [
//       { id: 'tc1', input: 'hit\ncog\nhot dot dog lot log cog', expected: '5' },
//       { id: 'tc2', input: 'a\nc\nb c', expected: '2' }
//     ]
//   },
//   {
//     title: 'Longest Valid Parentheses',
//     description: 'Find the length of the longest valid parentheses substring.',
//     difficulty: 'Hard',
//     tags: ['String', 'Stack', 'DP'],
//     constraints: '1 <= s.length <= 3*10^4',
//     sampleInput: '(()',
//     sampleOutput: '2',
//     explanation: 'Valid substring "()" length 2.',
//     points: 300,
//     starterCode: {
//       python: `s = input()
// def longestValidParentheses(s):
//     # Write your code here
//     pass
// print(longestValidParentheses(s))`,
//       javascript: `const s = readline();
// function longestValidParentheses(s) {
//     // Write your code here
// }
// console.log(longestValidParentheses(s));`
//     },
//     testCases: [
//       { id: 'tc1', input: '(()', expected: '2' },
//       { id: 'tc2', input: ')()())', expected: '4' },
//       { id: 'tc3', input: '\n', expected: '0' }
//     ]
//   },
//   {
//     title: 'Sliding Window Maximum',
//     description: 'Return the max element in each sliding window of size k.',
//     difficulty: 'Hard',
//     tags: ['Array', 'Sliding Window', 'Deque'],
//     constraints: '1 <= nums.length <= 10^5',
//     sampleInput: '1 3 -1 -3 5 3 6 7\n3',
//     sampleOutput: '3 3 5 5 6 7',
//     explanation: 'Maximums of each window.',
//     points: 300,
//     starterCode: {
//       python: `nums = list(map(int, input().split()))
// k = int(input())
// def maxSlidingWindow(nums, k):
//     # Write your code here
//     pass
// print(' '.join(map(str, maxSlidingWindow(nums, k))))`,
//       javascript: `const nums = readline().split(' ').map(Number);
// const k = parseInt(readline());
// function maxSlidingWindow(nums, k) {
//     // Write your code here
// }
// console.log(maxSlidingWindow(nums, k).join(' '));`
//     },
//     testCases: [
//       { id: 'tc1', input: '1 3 -1 -3 5 3 6 7\n3', expected: '3 3 5 5 6 7' },
//       { id: 'tc2', input: '1\n1', expected: '1' }
//     ]
//   },
//   {
//     title: 'Merge k Sorted Lists',
//     description: 'Merge k sorted linked lists into one sorted list.',
//     difficulty: 'Hard',
//     tags: ['Linked List', 'Divide and Conquer', 'Heap'],
//     constraints: '1 <= k <= 10^4',
//     sampleInput: '1 4 5\n1 3 4\n2 6',
//     sampleOutput: '1 1 2 3 4 4 5 6',
//     explanation: 'Merge three lists.',
//     points: 300,
//     starterCode: {
//       python: `lists = []
// while True:
//     try:
//         line = input()
//         if not line: break
//         lists.append(list(map(int, line.split())))
//     except:
//         break
// def mergeKLists(lists):
//     # Write your code here
//     pass
// print(' '.join(map(str, mergeKLists(lists))))`,
//       javascript: `const lists = [];
// let line;
// while ((line = readline()) && line !== '') {
//     lists.push(line.split(' ').map(Number));
// }
// function mergeKLists(lists) {
//     // Write your code here
// }
// console.log(mergeKLists(lists).join(' '));`
//     },
//     testCases: [
//       { id: 'tc1', input: '1 4 5\n1 3 4\n2 6', expected: '1 1 2 3 4 4 5 6' }
//     ]
//   },
//   // ---- NEW HARD ----
//   {
//     title: 'Edit Distance',
//     description: 'Given two strings word1 and word2, return the minimum number of operations (insert, delete, replace) to convert word1 to word2.',
//     difficulty: 'Hard',
//     tags: ['String', 'Dynamic Programming'],
//     constraints: '0 <= word1.length, word2.length <= 500',
//     sampleInput: 'horse\nros',
//     sampleOutput: '3',
//     explanation: 'horse → rorse → rose → ros (3 operations).',
//     points: 300,
//     starterCode: {
//       python: `word1 = input()
// word2 = input()
// def minDistance(word1, word2):
//     # Write your code here
//     pass
// print(minDistance(word1, word2))`,
//       javascript: `const word1 = readline();
// const word2 = readline();
// function minDistance(word1, word2) {
//     // Write your code here
// }
// console.log(minDistance(word1, word2));`
//     },
//     testCases: [
//       { id: 'tc1', input: 'horse\nros', expected: '3' },
//       { id: 'tc2', input: 'intention\nexecution', expected: '5' },
//       { id: 'tc3', input: 'abc\nabc', expected: '0' },
//       { id: 'tc4', input: '\nabc', expected: '3' },
//       { id: 'tc5', input: 'abc\n', expected: '3' }
//     ]
//   },
//   {
//     title: 'Largest Rectangle in Histogram',
//     description: 'Find the area of the largest rectangle that can be formed in a histogram.',
//     difficulty: 'Hard',
//     tags: ['Array', 'Stack', 'Monotonic Stack'],
//     constraints: '1 <= heights.length <= 10^5\n0 <= heights[i] <= 10^4',
//     sampleInput: '2 1 5 6 2 3',
//     sampleOutput: '10',
//     explanation: 'The largest rectangle has area = 10 (heights 5 and 6 with width 2).',
//     points: 300,
//     starterCode: {
//       python: `heights = list(map(int, input().split()))
// def largestRectangleArea(heights):
//     # Write your code here
//     pass
// print(largestRectangleArea(heights))`,
//       javascript: `const heights = readline().split(' ').map(Number);
// function largestRectangleArea(heights) {
//     // Write your code here
// }
// console.log(largestRectangleArea(heights));`
//     },
//     testCases: [
//       { id: 'tc1', input: '2 1 5 6 2 3', expected: '10' },
//       { id: 'tc2', input: '2 4', expected: '4' },
//       { id: 'tc3', input: '1', expected: '1' },
//       { id: 'tc4', input: '0', expected: '0' },
//       { id: 'tc5', input: '6 2 5 4 5 1 6', expected: '12' }
//     ]
//   },
//   {
//     title: 'First Missing Positive',
//     description: 'Given an unsorted integer array, find the smallest missing positive integer. Must run in O(n) time and O(1) space.',
//     difficulty: 'Hard',
//     tags: ['Array', 'Hash Table'],
//     constraints: '1 <= nums.length <= 10^5\n-2^31 <= nums[i] <= 2^31 - 1',
//     sampleInput: '1 2 0',
//     sampleOutput: '3',
//     explanation: 'The smallest missing positive is 3.',
//     points: 300,
//     starterCode: {
//       python: `nums = list(map(int, input().split()))
// def firstMissingPositive(nums):
//     # Write your code here
//     pass
// print(firstMissingPositive(nums))`,
//       javascript: `const nums = readline().split(' ').map(Number);
// function firstMissingPositive(nums) {
//     // Write your code here
// }
// console.log(firstMissingPositive(nums));`
//     },
//     testCases: [
//       { id: 'tc1', input: '1 2 0', expected: '3' },
//       { id: 'tc2', input: '3 4 -1 1', expected: '2' },
//       { id: 'tc3', input: '7 8 9 11 12', expected: '1' },
//       { id: 'tc4', input: '1', expected: '2' },
//       { id: 'tc5', input: '1 2 3 4 5', expected: '6' }
//     ]
//   },
//   {
//     title: 'Word Break',
//     description: 'Given a string s and a dictionary of words, return true if s can be segmented into a space-separated sequence of dictionary words.',
//     difficulty: 'Hard',
//     tags: ['Hash Table', 'String', 'Dynamic Programming', 'Trie', 'Memoization'],
//     constraints: '1 <= s.length <= 300\n1 <= wordDict.length <= 1000',
//     sampleInput: 'leetcode\nleet code',
//     sampleOutput: 'True',
//     explanation: '"leetcode" = "leet" + "code".',
//     points: 300,
//     starterCode: {
//       python: `s = input()
// wordDict = input().split()
// def wordBreak(s, wordDict):
//     # Write your code here
//     pass
// print(wordBreak(s, wordDict))`,
//       javascript: `const s = readline();
// const wordDict = readline().split(' ');
// function wordBreak(s, wordDict) {
//     // Write your code here
// }
// console.log(wordBreak(s, wordDict));`
//     },
//     testCases: [
//       { id: 'tc1', input: 'leetcode\nleet code', expected: 'True' },
//       { id: 'tc2', input: 'applepenapple\napple pen', expected: 'True' },
//       { id: 'tc3', input: 'catsandog\ncats dog sand and cat', expected: 'False' },
//       { id: 'tc4', input: 'a\na', expected: 'True' },
//       { id: 'tc5', input: 'cars\ncar ca rs', expected: 'True' }
//     ]
//   },
//   {
//     title: 'Regular Expression Matching',
//     description: "Implement regular expression matching with support for '.' (any character) and '*' (zero or more of preceding element).",
//     difficulty: 'Hard',
//     tags: ['String', 'Dynamic Programming', 'Recursion'],
//     constraints: '1 <= s.length <= 20\n1 <= p.length <= 30\ns contains only lowercase letters\np contains only lowercase letters, . and *',
//     sampleInput: 'aa\na*',
//     sampleOutput: 'True',
//     explanation: '"a*" matches zero or more a characters, matching "aa".',
//     points: 300,
//     starterCode: {
//       python: `s = input()
// p = input()
// def isMatch(s, p):
//     # Write your code here
//     pass
// print(isMatch(s, p))`,
//       javascript: `const s = readline();
// const p = readline();
// function isMatch(s, p) {
//     // Write your code here
// }
// console.log(isMatch(s, p));`
//     },
//     testCases: [
//       { id: 'tc1', input: 'aa\na*', expected: 'True' },
//       { id: 'tc2', input: 'aa\na', expected: 'False' },
//       { id: 'tc3', input: 'ab\n.*', expected: 'True' },
//       { id: 'tc4', input: 'aab\nc*a*b', expected: 'True' },
//       { id: 'tc5', input: 'mississippi\nmis*is*p*.', expected: 'False' }
//     ]
//   },
//   {
//     title: 'Maximum Rectangle in Binary Matrix',
//     description: 'Given a binary matrix (rows x cols, values 0 or 1), find the largest rectangle containing only 1s and return its area.',
//     difficulty: 'Hard',
//     tags: ['Array', 'Dynamic Programming', 'Stack', 'Matrix', 'Monotonic Stack'],
//     constraints: '1 <= rows, cols <= 200',
//     sampleInput: '4 5\n1 0 1 0 0\n1 0 1 1 1\n1 1 1 1 1\n1 0 0 1 0',
//     sampleOutput: '6',
//     explanation: 'The largest rectangle of all 1s has area 6.',
//     points: 300,
//     starterCode: {
//       python: `rows, cols = map(int, input().split())
// matrix = []
// for _ in range(rows):
//     matrix.append(list(map(int, input().split())))
// def maximalRectangle(matrix):
//     # Write your code here
//     pass
// print(maximalRectangle(matrix))`,
//       javascript: `const [rows, cols] = readline().split(' ').map(Number);
// const matrix = [];
// for (let i = 0; i < rows; i++) {
//     matrix.push(readline().split(' ').map(Number));
// }
// function maximalRectangle(matrix) {
//     // Write your code here
// }
// console.log(maximalRectangle(matrix));`
//     },
//     testCases: [
//       { id: 'tc1', input: '4 5\n1 0 1 0 0\n1 0 1 1 1\n1 1 1 1 1\n1 0 0 1 0', expected: '6' },
//       { id: 'tc2', input: '1 1\n0', expected: '0' },
//       { id: 'tc3', input: '1 1\n1', expected: '1' },
//       { id: 'tc4', input: '2 2\n1 1\n1 1', expected: '4' },
//       { id: 'tc5', input: '3 3\n1 1 1\n1 1 1\n1 1 1', expected: '9' }
//     ]
//   },
//   {
//     title: 'Sudoku Solver',
//     description: 'Solve a Sudoku puzzle by filling in empty cells (represented as 0). Print the solved 9x9 grid.',
//     difficulty: 'Hard',
//     tags: ['Array', 'Backtracking', 'Matrix'],
//     constraints: 'The given board has a unique solution.',
//     sampleInput: '5 3 0 0 7 0 0 0 0\n6 0 0 1 9 5 0 0 0\n0 9 8 0 0 0 0 6 0\n8 0 0 0 6 0 0 0 3\n4 0 0 8 0 3 0 0 1\n7 0 0 0 2 0 0 0 6\n0 6 0 0 0 0 2 8 0\n0 0 0 4 1 9 0 0 5\n0 0 0 0 8 0 0 7 9',
//     sampleOutput: '5 3 4 6 7 8 9 1 2\n6 7 2 1 9 5 3 4 8\n1 9 8 3 4 2 5 6 7\n8 5 9 7 6 1 4 2 3\n4 2 6 8 5 3 7 9 1\n7 1 3 9 2 4 8 5 6\n9 6 1 5 3 7 2 8 4\n2 8 7 4 1 9 6 3 5\n3 4 5 2 8 6 1 7 9',
//     explanation: 'Classic Sudoku solved via backtracking.',
//     points: 300,
//     starterCode: {
//       python: `board = []
// for _ in range(9):
//     board.append(list(map(int, input().split())))
// def solveSudoku(board):
//     # Write your code here
//     pass
// solveSudoku(board)
// for row in board:
//     print(' '.join(map(str, row)))`,
//       javascript: `const board = [];
// for (let i = 0; i < 9; i++) {
//     board.push(readline().split(' ').map(Number));
// }
// function solveSudoku(board) {
//     // Write your code here
// }
// solveSudoku(board);
// for (let row of board) {
//     console.log(row.join(' '));
// }`
//     },
//     testCases: [
//       {
//         id: 'tc1',
//         input: '5 3 0 0 7 0 0 0 0\n6 0 0 1 9 5 0 0 0\n0 9 8 0 0 0 0 6 0\n8 0 0 0 6 0 0 0 3\n4 0 0 8 0 3 0 0 1\n7 0 0 0 2 0 0 0 6\n0 6 0 0 0 0 2 8 0\n0 0 0 4 1 9 0 0 5\n0 0 0 0 8 0 0 7 9',
//         expected: '5 3 4 6 7 8 9 1 2\n6 7 2 1 9 5 3 4 8\n1 9 8 3 4 2 5 6 7\n8 5 9 7 6 1 4 2 3\n4 2 6 8 5 3 7 9 1\n7 1 3 9 2 4 8 5 6\n9 6 1 5 3 7 2 8 4\n2 8 7 4 1 9 6 3 5\n3 4 5 2 8 6 1 7 9'
//       }
//     ]
//   }
// ];

// // Normalize all test case inputs
// for (const problem of problems) {
//   if (problem.testCases) {
//     problem.testCases.forEach(tc => {
//       tc.input = normalizeInput(tc.input);
//       if (!tc.expected || tc.expected.trim() === '') {
//         tc.expected = ' ';
//       }
//     });
//   }
// }

// const seedDatabase = async () => {
//   try {
//     const mongoURI = process.env.MONGODB_URI;
//     if (!mongoURI) {
//       console.error('❌ MONGODB_URI not found');
//       process.exit(1);
//     }
//     console.log('📡 Connecting to MongoDB...');
//     await mongoose.connect(mongoURI);
//     console.log('✅ Connected to MongoDB');

//     const deleted = await Problem.deleteMany({});
//     console.log(`🗑️  Deleted ${deleted.deletedCount} existing problems`);

//     let inserted = 0;
//     for (const problem of problems) {
//       problem.order = problems.indexOf(problem) + 1;
//       await Problem.create(problem);
//       inserted++;
//       console.log(`   ➕ Added: ${problem.title} (${problem.difficulty})`);
//     }

//     console.log(`\n✅ Seeded ${inserted} problems`);
//     const easy = problems.filter(p => p.difficulty === 'Easy').length;
//     const med  = problems.filter(p => p.difficulty === 'Medium').length;
//     const hard = problems.filter(p => p.difficulty === 'Hard').length;
//     console.log(`📊 Easy: ${easy}, Medium: ${med}, Hard: ${hard}`);
//     process.exit(0);
//   } catch (error) {
//     console.error('❌ Seed error:', error.message);
//     process.exit(1);
//   }
// };

// seedDatabase();