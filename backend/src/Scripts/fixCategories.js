const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const mongoose = require('mongoose');
const Problem = require('../models/Problem');

async function fixCategories() {
  try {
    const uri = process.env.MONGODB_URI || process.env.MONGO_URI;
    console.log('Connecting to:', uri ? 'URI found' : 'URI NOT FOUND - check .env');
    
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');

    const problems = await Problem.find({});
    console.log(`Found ${problems.length} problems`);

    for (const problem of problems) {
      const tags = problem.tags?.map(t => t.toLowerCase()) || [];
      const title = problem.title?.toLowerCase() || '';
      let category = problem.category || 'Others';

      // Skip if already properly categorized
      if (category && category !== 'Others') {
        console.log(`SKIP: "${problem.title}" already has category: ${category}`);
        continue;
      }

      // Match by tags first
      if (tags.some(t => t.includes('array') || t.includes('sliding window') || t.includes('two pointer'))) {
        category = 'Arrays';
      } else if (tags.some(t => t.includes('string') || t.includes('substring') || t.includes('palindrome'))) {
        category = 'Strings';
      } else if (tags.some(t => t.includes('stack'))) {
        category = 'Stack';
      } else if (tags.some(t => t.includes('math') || t.includes('number'))) {
        category = 'Math';
      } else if (tags.some(t => t.includes('dp') || t.includes('dynamic programming'))) {
        category = 'DP';
      } else if (tags.some(t => t.includes('recursion') || t.includes('recursive'))) {
        category = 'Recursion';
      } else if (tags.some(t => t.includes('hash') || t.includes('map'))) {
        category = 'Hash Table';
      } else if (tags.some(t => t.includes('tree') || t.includes('bst') || t.includes('binary tree'))) {
        category = 'Trees';
      } else if (tags.some(t => t.includes('graph') || t.includes('bfs') || t.includes('dfs'))) {
        category = 'Graphs';
      } else if (tags.some(t => t.includes('greedy'))) {
        category = 'Greedy';
      } else if (tags.some(t => t.includes('backtrack'))) {
        category = 'Backtracking';
      }
      // Fallback: match by title keywords
      else if (title.includes('array') || title.includes('subarray') || title.includes('sum')) {
        category = 'Arrays';
      } else if (title.includes('string') || title.includes('palindrome') || title.includes('anagram') || title.includes('reverse')) {
        category = 'Strings';
      } else if (title.includes('stack') || title.includes('parenthes') || title.includes('bracket')) {
        category = 'Stack';
      } else if (title.includes('math') || title.includes('number') || title.includes('digit') || title.includes('prime') || title.includes('fibonacci')) {
        category = 'Math';
      } else if (title.includes('dp') || title.includes('dynamic') || title.includes('knapsack') || title.includes('coin')) {
        category = 'DP';
      } else if (title.includes('recursion') || title.includes('factorial') || title.includes('power')) {
        category = 'Recursion';
      }

      await Problem.updateOne({ _id: problem._id }, { $set: { category } });
      console.log(`UPDATED: "${problem.title}" → ${category} (tags: [${problem.tags?.join(', ')}])`);
    }

    console.log('\n✅ Done! All problems updated.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

fixCategories();