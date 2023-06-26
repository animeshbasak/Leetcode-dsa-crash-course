
/*2. Sliding window */
// -> Subarrays
/*
Subarray is a contiguous section of the array,
A subarray can be defined by two indices, the start and end.For example, with [1, 2, 3, 4], the subarray[2, 3] has a starting index of
1 and an ending index of 2. Let's call the starting index the left bound and the ending index the right bound. Another name for subarray in this context is "window".

When should we use sliding window ?
--> First, the problem will either explicitly or implicitly define criteria that make a subarray "valid".There are 2 components regarding what makes a subarray valid:

-> A constraint metric.This is some attribute of a subarray.It could be the sum, the number of unique elements, the frequency of a specific element, or any other attribute.
-> A numeric restriction on the constraint metric.This is what the constraint metric should be for a subarray to be considered valid.
For example, let's say a problem declares a subarray is valid if it has a sum less than or equal to 10. The constraint metric here is the sum of the subarray,
and the numeric restriction is <= 10. A subarray is considered valid if its constraint metric conforms to the numeric restriction, i.e.the sum is less than or equal to 10

--> Second, the problem will ask you to find valid subarrays in some way.

->The most common task you will see is finding the best valid subarray. The problem will define what makes a subarray better than another.
For example, a problem might ask you to find the longest valid subarray.
->Another common task is finding the number of valid subarrays. We will take a look at this later in the article.

Whenever a problem description talks about subarrays, you should figure out if sliding window is a good option by analyzing the problem description.
If you can find the things mentioned above, then it's a good bet.

Here is a preview of some of the example problems that we will look at in this article, to help you better understand what sliding window problems look like:

Find the longest subarray with a sum less than or equal to k
Find the longest substring that has at most one "0"
Find the number of subarrays that have a product less than k
*/

// pseudo code
// function fn(nums, k):
//     left = 0
//     curr = 0
//     answer = 0
//     for (int right = 0; right < nums.length; right++):
//         curr += nums[right]
//         while (curr > k):
//             curr -= nums[left]
//             left++

//         answer = max(answer, right - left + 1)

//     return answer

// Example 1: Given an array of positive integers nums and an integer k, find the length of the longest subarray whose sum is less than or equal to k.
//  This is the problem we have been talking about above. We will now formally solve it.
// nums = [3, 1, 2, 7, 4, 2, 1, 1, 5] and k = 8.

// var findLength = function (nums, k) {
//   let left = 0, curr = 0, ans = 0;
//   for (let right = 0; right < nums.length - 1; right++) {
//     curr += nums[right];
//     if (curr > k) {
//       curr -= nums[left];
//       left++;
//     }
//     ans = Math.max(ans, right - left + 1);
//     console.log("left:", left, "val", nums[left], "right:", right, "val", nums[right])

//   }
//   return ans;
// }
// const val = findLength([3, 1, 2, 7, 4, 2, 1, 1, 5], 8)
// console.log('findLength', val)

// TC: O(n)

/*
Example 2: You are given a binary substring s (a string containing only "0" and "1"). 
You may choose up to one "0" and flip it to a "1". What is the length of the longest substring achievable that contains only "1"?
For example, given s = "1101100111", the answer is 5. If you perform the flip at index 2, the string becomes 1111100111.

Because the string can only contain "1" and "0", another way to look at this problem is "what is the longest substring that contains at most one "0"?". 
This makes it easy for us to solve with a sliding window where our condition is window.count("0") <= 1. 
We can use an integer curr that keeps track of how many "0" we currently have in our window.
*/

/*
var findLength = function (s) {
  let left = 0, curr = 0, ans = 0;
  for (let right = 0; right < s.length - 1; right++) {
    if (s[right] == "0") {
      curr++;
    }
    while (curr > 1) {
      if (s[left] == "0") {
        curr -= 1;
      }
      left++;
    }
    ans = Math.max(ans, right - left + 1);
  }
  return ans;
}

const val = findLength("1101100111")
console.log('findLength', val)

TC: O(n)
*/


/*
->Number of subarrays

Example 3: 713. Subarray Product Less Than K.

Given an array of positive integers nums and an integer k, 
return the number of subarrays where the product of all the elements in the subarray is strictly less than k.

For example, given the input nums = [10, 5, 2, 6], k = 100, the answer is 8. 
The subarrays with products less than k are:

[10], [5], [2], [6], [10, 5], [5, 2], [2, 6], [5, 2, 6]

solution:

var numSubarrayProductLessThanK = function (nums, k) {
  if (k <= 1) { //check if length is less than equal 0 return 0
    return 0;
  }
  let ans = 0, left = 0, curr = 1; //length is greater than 1 so curr 1
  for (let right = 0; right < nums.length; right++) {
    console.log("before", curr, nums[right])
    curr *= nums[right] // here we multiple subarray to find curr
    console.log("after", curr, nums[right])
    while (curr >= k) { // if curr is greater than k
      curr /= nums[left]; // we remove from left
      left++; // inc left
    }
    ans += right - left + 1; // find the length of subarray and add it to ans
  }
  return ans; //return ans

}

const val = numSubarrayProductLessThanK([10, 5, 2, 6], 100)
console.log('numSubarrayProductLessThanK', val)

*/

/*
-> Fixed window size
Example 4: Given an integer array nums and an integer k,
 find the sum of the subarray with the largest sum whose length is k.

var findBestSubarray = function (nums, k) {
  let curr = 0;
  for (let i = 0; i < k; i++) {
    curr += nums[i]; //sum of first window
  }
  let ans = curr;  // set our ans to this val
  for (let i = k; i < nums.length; i++) { //find rest of ans
    curr += nums[i] - nums[i - k]; //add next remove previous element
    ans = Math.max(ans, curr);
  }
  return ans;
}
const val = findBestSubarray([3, -1, 4, 12, -8, 5, 6], 4)
console.log('findBestSubarray', val)

TC:O(n) SC:O(1)

*/

