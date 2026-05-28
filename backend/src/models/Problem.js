const mongoose = require('mongoose');

const testCaseSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  input: {
    type: String,
    required: true
  },
  expected: {
    type: String,
    required: true
  }
});

const problemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    required: true
  },
  tags: [{
    type: String
  }],
  category: {
  type: String,
  enum: ['Arrays', 'Strings', 'Hash Table', 'Dynamic Programming', 'Math', 'Trees', 'Graphs', 'Backtracking', 'Greedy', 'Stack', 'Queue', 'Heap', 'Others'],
  default: 'Others',
},
  constraints: {
    type: String
  },
  sampleInput: {
    type: String,
    required: true
  },
  sampleOutput: {
    type: String,
    required: true
  },
  explanation: {
    type: String
  },
  points: {
    type: Number,
    default: 100
  },
  order: {
    type: Number,
    default: 0
  },
  starterCode: {
    python: String,
    javascript: String,
    cpp: String,
    java: String
  },
  testCases: [testCaseSchema],
  solved: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Problem', problemSchema);