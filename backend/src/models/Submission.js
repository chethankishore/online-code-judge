const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  problemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Problem',
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
    enum: ['javascript', 'python', 'java', 'cpp', 'c'],
  },
  status: {
    type: String,
    enum: ['Pending', 'Running', 'Accepted', 'Wrong Answer', 'Time Limit Exceeded', 
           'Memory Limit Exceeded', 'Runtime Error', 'Compilation Error'],
    default: 'Pending',
  },
  executionTime: {
    type: Number,
    default: 0,
  },
  memoryUsed: {
    type: Number,
    default: 0,
  },
  testResults: [{
    testCaseId: mongoose.Schema.Types.ObjectId,
    passed: Boolean,
    output: String,
    expectedOutput: String,
    executionTime: Number,
  }],
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Submission', submissionSchema);