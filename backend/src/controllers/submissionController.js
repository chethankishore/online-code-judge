// // // const axios = require('axios');
// // // const Submission = require('../models/Submission');
// // // const Problem = require('../models/Problem'); // ← THIS WAS MISSING

// // // const JUDGE_URL = 'https://3rufpmzmk3a3adnihyesjnetse0qutkm.lambda-url.ap-south-1.on.aws/';

// // // // Helper function to normalize output (remove all whitespace)
// // // const normalizeOutput = (output) => {
// // //   if (!output) return '';
// // //   return String(output).replace(/\s/g, '');
// // // };

// // // // Helper function to format input (convert brackets to spaces)
// // // const formatInput = (input) => {
// // //   if (!input) return '';
// // //   if (typeof input !== 'string') return String(input);
  
// // //   if (input.includes('[') || input.includes(',') || input.includes(']')) {
// // //     let formatted = input
// // //       .replace(/[\[\]]/g, '')
// // //       .replace(/,/g, ' ')
// // //       .replace(/\s+/g, ' ')
// // //       .trim();
    
// // //     const lines = formatted.split('\n');
// // //     return lines.join('\n');
// // //   }
// // //   return input;
// // // };

// // // // Helper function to fix Lambda response
// // // const fixLambdaResponse = (lambdaResponse) => {
// // //   if (!lambdaResponse.results || !Array.isArray(lambdaResponse.results)) {
// // //     return lambdaResponse;
// // //   }
  
// // //   const fixedResults = lambdaResponse.results.map(result => {
// // //     const normalizedActual = normalizeOutput(result.actual);
// // //     const normalizedExpected = normalizeOutput(result.expected);
// // //     const passed = normalizedActual === normalizedExpected;
    
// // //     return {
// // //       ...result,
// // //       passed: passed,
// // //       verdict: passed ? 'Accepted' : (result.verdict === 'Accepted' ? 'Wrong Answer' : result.verdict)
// // //     };
// // //   });
  
// // //   const testsPassed = fixedResults.filter(r => r.passed === true).length;
// // //   const allPassed = testsPassed === fixedResults.length;
  
// // //   return {
// // //     ...lambdaResponse,
// // //     results: fixedResults,
// // //     testsPassed: testsPassed,
// // //     verdict: allPassed ? 'Accepted' : (lambdaResponse.verdict === 'Accepted' ? 'Wrong Answer' : lambdaResponse.verdict)
// // //   };
// // // };

// // // const runCode = async (req, res) => {
// // //   console.log('runCode hit, body:', JSON.stringify(req.body, null, 2));
// // //   try {
// // //     const { language, code, input, testCases } = req.body;

// // //     if (!language || !code) {
// // //       return res.status(400).json({ 
// // //         verdict: 'Error', 
// // //         error: 'Missing required fields: language and code are required' 
// // //       });
// // //     }

// // //     const formattedTestCases = (testCases || []).map(tc => ({
// // //       ...tc,
// // //       input: formatInput(tc.input),
// // //     }));

// // //     const payload = {
// // //       language,
// // //       code,
// // //       input: input || '',
// // //       testCases: formattedTestCases,
// // //       jobId: `job-${Date.now()}`,
// // //     };

// // //     console.log('Sending to Lambda:', JSON.stringify(payload, null, 2));

// // //     const response = await axios.post(JUDGE_URL, payload, {
// // //       headers: { 'Content-Type': 'application/json' },
// // //       timeout: 30000,
// // //     });
    
// // //     console.log('Raw Lambda response:', JSON.stringify(response.data));
    
// // //     const fixedResponse = fixLambdaResponse(response.data);
    
// // //     console.log('Fixed response:', JSON.stringify(fixedResponse));

// // //     res.json(fixedResponse);
    
// // //   } catch (error) {
// // //     console.error('Judge Error:', error.message);
    
// // //     if (error.code === 'ECONNABORTED') {
// // //       res.status(504).json({ 
// // //         verdict: 'Error', 
// // //         error: 'Execution timeout - code took too long to run' 
// // //       });
// // //     } else if (error.response) {
// // //       res.status(error.response.status || 500).json({ 
// // //         verdict: 'Error', 
// // //         error: error.response.data?.error || 'Judge service error' 
// // //       });
// // //     } else {
// // //       res.status(500).json({ 
// // //         verdict: 'Error', 
// // //         error: error.message || 'Internal server error' 
// // //       });
// // //     }
// // //   }
// // // };

// // // const saveSubmission = async (req, res) => {
// // //   try {
// // //     const { problemId, language, code, verdict, executionTime, testResults } = req.body;

// // //     if (!problemId || !language || !code) {
// // //       return res.status(400).json({ message: 'Missing required fields' });
// // //     }

// // //     const user = req.user;
// // //     const problem = await Problem.findById(problemId);
// // //     if (!problem) {
// // //       return res.status(404).json({ message: 'Problem not found' });
// // //     }

// // //     // Create submission record
// // //     const submission = await Submission.create({
// // //       userId: user._id,
// // //       problemId,
// // //       language,
// // //       code,
// // //       status: verdict,
// // //       executionTime: executionTime || 0,
// // //       memoryUsed: 0,
// // //       testResults: testResults || [],
// // //       submittedAt: new Date(),
// // //     });

// // //     // Check if already solved
// // //     const alreadySolved = user.solvedProblems.some(
// // //       sp => sp.problemId.toString() === problemId
// // //     );

// // //     if (verdict === 'Accepted' && !alreadySolved) {
// // //       // Award points
// // //       user.totalScore += problem.points;

// // //       // Add to solvedProblems
// // //       user.solvedProblems.push({
// // //         problemId: problem._id,
// // //         solvedAt: new Date(),
// // //       });

// // //       // Update stats counters
// // //       if (problem.difficulty === 'Easy') user.stats.easySolved += 1;
// // //       else if (problem.difficulty === 'Medium') user.stats.mediumSolved += 1;
// // //       else if (problem.difficulty === 'Hard') user.stats.hardSolved += 1;

// // //       user.stats.acceptedSubmissions += 1;

// // //       // Tier unlocking logic
// // //       const totalEasy = await Problem.countDocuments({ difficulty: 'Easy' });
// // //       const totalMedium = await Problem.countDocuments({ difficulty: 'Medium' });

// // //       if (user.stats.easySolved === totalEasy && !user.unlockedTiers.includes('Medium')) {
// // //         user.unlockedTiers.push('Medium');
// // //       }
// // //       if (user.stats.mediumSolved === totalMedium && !user.unlockedTiers.includes('Hard')) {
// // //         user.unlockedTiers.push('Hard');
// // //       }

// // //       await user.save();
// // //     } else {
// // //       // Even if not accepted, increase total submissions count
// // //       user.stats.totalSubmissions += 1;
// // //       await user.save();
// // //     }

// // //     res.status(201).json({
// // //       success: true,
// // //       message: 'Submission saved successfully',
// // //       submission: {
// // //         id: submission._id,
// // //         status: submission.status,
// // //         executionTime: submission.executionTime,
// // //         submittedAt: submission.submittedAt,
// // //       },
// // //     });
// // //   } catch (err) {
// // //     console.error('Save submission error:', err.message);
// // //     res.status(500).json({ message: err.message });
// // //   }
// // // };

// // // module.exports = { runCode, saveSubmission };
// // const axios = require('axios');
// // const Submission = require('../models/Submission');
// // const Problem = require('../models/Problem');

// // const JUDGE_URL = 'https://3rufpmzmk3a3adnihyesjnetse0qutkm.lambda-url.ap-south-1.on.aws/';

// // const normalizeOutput = (output) => {
// //   if (!output) return '';
// //   return String(output).replace(/\s/g, '');
// // };

// // const formatInput = (input) => {
// //   if (!input) return '';
// //   if (typeof input !== 'string') return String(input);
// //   if (input.includes('[') || input.includes(',') || input.includes(']')) {
// //     let formatted = input
// //       .replace(/[\[\]]/g, '')
// //       .replace(/,/g, ' ')
// //       .replace(/\s+/g, ' ')
// //       .trim();
// //     return formatted.split('\n').join('\n');
// //   }
// //   return input;
// // };

// // const fixLambdaResponse = (lambdaResponse) => {
// //   if (!lambdaResponse.results || !Array.isArray(lambdaResponse.results)) {
// //     return lambdaResponse;
// //   }
// //   const fixedResults = lambdaResponse.results.map(result => {
// //     const normalizedActual = normalizeOutput(result.actual);
// //     const normalizedExpected = normalizeOutput(result.expected);
// //     const passed = normalizedActual === normalizedExpected;
// //     return {
// //       ...result,
// //       passed,
// //       verdict: passed ? 'Accepted' : (result.verdict === 'Accepted' ? 'Wrong Answer' : result.verdict)
// //     };
// //   });
// //   const testsPassed = fixedResults.filter(r => r.passed === true).length;
// //   const allPassed = testsPassed === fixedResults.length;
// //   return {
// //     ...lambdaResponse,
// //     results: fixedResults,
// //     testsPassed,
// //     verdict: allPassed ? 'Accepted' : (lambdaResponse.verdict === 'Accepted' ? 'Wrong Answer' : lambdaResponse.verdict)
// //   };
// // };

// // const runCode = async (req, res) => {
// //   console.log('runCode hit, body:', JSON.stringify(req.body, null, 2));
// //   try {
// //     const { language, code, input, testCases } = req.body;
// //     if (!language || !code) {
// //       return res.status(400).json({
// //         verdict: 'Error',
// //         error: 'Missing required fields: language and code are required'
// //       });
// //     }
// //     const formattedTestCases = (testCases || []).map(tc => ({
// //       ...tc,
// //       input: formatInput(tc.input),
// //     }));
// //     const payload = {
// //       language,
// //       code,
// //       input: input || '',
// //       testCases: formattedTestCases,
// //       jobId: `job-${Date.now()}`,
// //     };
// //     console.log('Sending to Lambda:', JSON.stringify(payload, null, 2));
// //     const response = await axios.post(JUDGE_URL, payload, {
// //       headers: { 'Content-Type': 'application/json' },
// //       timeout: 30000,
// //     });
// //     console.log('Raw Lambda response:', JSON.stringify(response.data));
// //     const fixedResponse = fixLambdaResponse(response.data);
// //     console.log('Fixed response:', JSON.stringify(fixedResponse));
// //     res.json(fixedResponse);
// //   } catch (error) {
// //     console.error('Judge Error:', error.message);
// //     if (error.code === 'ECONNABORTED') {
// //       res.status(504).json({ verdict: 'Error', error: 'Execution timeout - code took too long to run' });
// //     } else if (error.response) {
// //       res.status(error.response.status || 500).json({
// //         verdict: 'Error',
// //         error: error.response.data?.error || 'Judge service error'
// //       });
// //     } else {
// //       res.status(500).json({ verdict: 'Error', error: error.message || 'Internal server error' });
// //     }
// //   }
// // };

// // const saveSubmission = async (req, res) => {
// //   try {
// //     const { problemId, language, code, verdict, executionTime, testResults } = req.body;
// //     if (!problemId || !language || !code) {
// //       return res.status(400).json({ message: 'Missing required fields' });
// //     }
// //     const user = req.user;
// //     const problem = await Problem.findById(problemId);
// //     if (!problem) {
// //       return res.status(404).json({ message: 'Problem not found' });
// //     }

// //     const submission = await Submission.create({
// //       userId: user._id,
// //       problemId,
// //       language,
// //       code,
// //       status: verdict,
// //       executionTime: executionTime || 0,
// //       memoryUsed: 0,
// //       testResults: testResults || [],
// //       submittedAt: new Date(),
// //     });

// //     const alreadySolved = user.solvedProblems.some(
// //       sp => sp.problemId.toString() === problemId
// //     );

// //     // FIX 1: always increment totalSubmissions regardless of verdict
// //     user.stats.totalSubmissions += 1;

// //     if (verdict === 'Accepted' && !alreadySolved) {
// //       user.totalScore += problem.points;
// //       user.solvedProblems.push({ problemId: problem._id, solvedAt: new Date() });

// //       if (problem.difficulty === 'Easy') user.stats.easySolved += 1;
// //       else if (problem.difficulty === 'Medium') user.stats.mediumSolved += 1;
// //       else if (problem.difficulty === 'Hard') user.stats.hardSolved += 1;

// //       user.stats.acceptedSubmissions += 1;

// //       // FIX 2: use >= so new problems added later don't break unlock
// //       const totalEasy = await Problem.countDocuments({ difficulty: 'Easy' });
// //       const totalMedium = await Problem.countDocuments({ difficulty: 'Medium' });

// //       if (user.stats.easySolved >= totalEasy && !user.unlockedTiers.includes('Medium')) {
// //         user.unlockedTiers.push('Medium');
// //       }
// //       if (user.stats.mediumSolved >= totalMedium && !user.unlockedTiers.includes('Hard')) {
// //         user.unlockedTiers.push('Hard');
// //       }
// //     }

// //     await user.save();

// //     res.status(201).json({
// //       success: true,
// //       message: 'Submission saved successfully',
// //       submission: {
// //         id: submission._id,
// //         status: submission.status,
// //         executionTime: submission.executionTime,
// //         submittedAt: submission.submittedAt,
// //       },
// //     });
// //   } catch (err) {
// //     console.error('Save submission error:', err.message);
// //     res.status(500).json({ message: err.message });
// //   }
// // };

// // // FIX 3: added getDashboard — populates problemId so title/difficulty are available
// // const getDashboard = async (req, res) => {
// //   try {
// //     const user = req.user;

// //     const totalSubmissions = user.stats.totalSubmissions;
// //     const acceptedSubmissions = user.stats.acceptedSubmissions;
// //     const acceptanceRate = totalSubmissions > 0
// //       ? ((acceptedSubmissions / totalSubmissions) * 100).toFixed(1) + '%'
// //       : '0%';

// //     // Rank: count users with a higher totalScore
// //     const User = require('../models/User');
// //     const rank = await User.countDocuments({ totalScore: { $gt: user.totalScore } }) + 1;

// //     // FIX 3: populate problemId to get title and difficulty
// //     const recentSubmissions = await Submission.find({ userId: user._id })
// //       .populate('problemId', 'title difficulty')
// //       .sort({ submittedAt: -1 })
// //       .limit(10);

// //     res.json({
// //       user: {
// //         firstName: user.firstName,
// //         username: user.username,
// //         totalScore: user.totalScore,
// //       },
// //       stats: {
// //         totalSubmissions,
// //         acceptedSubmissions,
// //         acceptanceRate,
// //         rank,
// //       },
// //       solvedByDifficulty: {
// //         Easy: user.stats.easySolved,
// //         Medium: user.stats.mediumSolved,
// //         Hard: user.stats.hardSolved,
// //       },
// //       unlockedTiers: user.unlockedTiers,
// //       recentSubmissions,
// //     });
// //   } catch (err) {
// //     console.error('Dashboard error:', err.message);
// //     res.status(500).json({ message: err.message });
// //   }
// // };

// // module.exports = { runCode, saveSubmission, getDashboard };
// const axios = require('axios');
// const Submission = require('../models/Submission');
// const Problem = require('../models/Problem');

// const JUDGE_URL = 'https://3rufpmzmk3a3adnihyesjnetse0qutkm.lambda-url.ap-south-1.on.aws/';

// const normalizeOutput = (output) => {
//   if (!output) return '';
//   return String(output).replace(/\s/g, '');
// };

// const formatInput = (input) => {
//   if (!input) return '';
//   if (typeof input !== 'string') return String(input);
//   if (input.includes('[') || input.includes(',') || input.includes(']')) {
//     let formatted = input
//       .replace(/[\[\]]/g, '')
//       .replace(/,/g, ' ')
//       .replace(/\s+/g, ' ')
//       .trim();
//     return formatted.split('\n').join('\n');
//   }
//   return input;
// };

// const fixLambdaResponse = (lambdaResponse) => {
//   if (!lambdaResponse.results || !Array.isArray(lambdaResponse.results)) {
//     return lambdaResponse;
//   }
//   const fixedResults = lambdaResponse.results.map(result => {
//     const normalizedActual = normalizeOutput(result.actual);
//     const normalizedExpected = normalizeOutput(result.expected);
//     const passed = normalizedActual === normalizedExpected;
//     return {
//       ...result,
//       passed,
//       verdict: passed ? 'Accepted' : (result.verdict === 'Accepted' ? 'Wrong Answer' : result.verdict)
//     };
//   });
//   const testsPassed = fixedResults.filter(r => r.passed === true).length;
//   const allPassed = testsPassed === fixedResults.length;
//   return {
//     ...lambdaResponse,
//     results: fixedResults,
//     testsPassed,
//     verdict: allPassed ? 'Accepted' : (lambdaResponse.verdict === 'Accepted' ? 'Wrong Answer' : lambdaResponse.verdict)
//   };
// };

// const runCode = async (req, res) => {
//   // ... (unchanged, keep your existing implementation)
// };

// const saveSubmission = async (req, res) => {
//   // ... (unchanged, keep your existing implementation)
// };

// // ================= NEW: Get a single submission by ID =================
// const getSubmissionById = async (req, res) => {
//   try {
//     const submission = await Submission.findById(req.params.id)
//       .populate('problemId', 'title difficulty')
//       .populate('userId', 'username firstName lastName');
//     if (!submission) {
//       return res.status(404).json({ success: false, message: 'Submission not found' });
//     }
//     // Security: only the owner or an admin can view
//     if (submission.userId._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
//       return res.status(403).json({ success: false, message: 'Unauthorized' });
//     }
//     res.json({ success: true, submission });
//   } catch (err) {
//     console.error('Get submission error:', err);
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // ================= Dashboard endpoint (already in your file) =================
// const getDashboard = async (req, res) => {
//   try {
//     const user = req.user;
//     const totalSubmissions = user.stats.totalSubmissions;
//     const acceptedSubmissions = user.stats.acceptedSubmissions;
//     const acceptanceRate = totalSubmissions > 0
//       ? ((acceptedSubmissions / totalSubmissions) * 100).toFixed(1) + '%'
//       : '0%';
//     const User = require('../models/User');
//     const rank = await User.countDocuments({ totalScore: { $gt: user.totalScore } }) + 1;
//     const recentSubmissions = await Submission.find({ userId: user._id })
//       .populate('problemId', 'title difficulty')
//       .sort({ submittedAt: -1 })
//       .limit(10);
//     res.json({
//       user: {
//         firstName: user.firstName,
//         username: user.username,
//         totalScore: user.totalScore,
//       },
//       stats: {
//         totalSubmissions,
//         acceptedSubmissions,
//         acceptanceRate,
//         rank,
//       },
//       solvedByDifficulty: {
//         Easy: user.stats.easySolved,
//         Medium: user.stats.mediumSolved,
//         Hard: user.stats.hardSolved,
//       },
//       unlockedTiers: user.unlockedTiers,
//       recentSubmissions,
//     });
//   } catch (err) {
//     console.error('Dashboard error:', err.message);
//     res.status(500).json({ message: err.message });
//   }
// };

// module.exports = { runCode, saveSubmission, getSubmissionById, getDashboard };
// backend/src/controllers/submissionController.js
const axios = require('axios');
const Submission = require('../models/Submission');
const Problem = require('../models/Problem');

const JUDGE_URL = 'https://3rufpmzmk3a3adnihyesjnetse0qutkm.lambda-url.ap-south-1.on.aws/';

const normalizeOutput = (output) => {
  if (output === undefined || output === null) return '';

  return String(output)
    .trim()
    .replace(/\r/g, '')
    .replace(/\s+/g, ' ')
    .toLowerCase();
};


const formatInput = (input) => {
  if (!input) return '';
  if (typeof input !== 'string') return String(input);
  if (input.includes('[') || input.includes(',') || input.includes(']')) {
    let formatted = input
      .replace(/[\[\]]/g, '')
      .replace(/,/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    return formatted.split('\n').join('\n');
  }
  return input;
};

const fixLambdaResponse = (lambdaResponse) => {
  if (!lambdaResponse.results || !Array.isArray(lambdaResponse.results)) {
    return lambdaResponse;
  }

  const fixedResults = lambdaResponse.results.map(result => {

    const normalizedActual = String(result.actual || '')
      .trim()
      .replace(/\r/g, '')
      .replace(/\s+/g, ' ')
      .toLowerCase();

    const normalizedExpected = String(result.expected || '')
      .trim()
      .replace(/\r/g, '')
      .replace(/\s+/g, ' ')
      .toLowerCase();

    const passed = normalizedActual === normalizedExpected;

    return {
      ...result,
      passed,
      verdict: passed ? 'Accepted' : 'Wrong Answer'
    };
  });

  const testsPassed = fixedResults.filter(r => r.passed).length;

  return {
    ...lambdaResponse,
    results: fixedResults,
    testsPassed,
    totalTests: fixedResults.length,
    verdict:
      testsPassed === fixedResults.length
        ? 'Accepted'
        : 'Wrong Answer'
  };
};

// ================= RUN CODE =================
const runCode = async (req, res) => {
  console.log('🔥 runCode STARTED');
  console.log('runCode hit, body:', JSON.stringify(req.body, null, 2));
  try {
    const { language, code, input, testCases } = req.body;
    if (!language || !code) {
      return res.status(400).json({
        verdict: 'Error',
        error: 'Missing required fields: language and code are required'
      });
    }
    const formattedTestCases = (testCases || []).map(tc => ({
      ...tc,
      input: formatInput(tc.input),
    }));
    const payload = {
      language,
      code,
      input: input || '',
      testCases: formattedTestCases,
      jobId: `job-${Date.now()}`,
    };
    console.log('Sending to Lambda:', JSON.stringify(payload, null, 2));
    const response = await axios.post(JUDGE_URL, payload, {
      headers: { 'Content-Type': 'application/json' },
      timeout: 30000, // 30 seconds
    });
    console.log('Raw Lambda response:', JSON.stringify(response.data));
    const fixedResponse = fixLambdaResponse(response.data);
    console.log('Fixed response:', JSON.stringify(fixedResponse));
    res.json(fixedResponse);
  } catch (error) {
    console.error('Judge Error:', error.message);
    if (error.code === 'ECONNABORTED') {
      res.status(504).json({ verdict: 'Error', error: 'Execution timeout - code took too long to run' });
    } else if (error.response) {
      res.status(error.response.status || 500).json({
        verdict: 'Error',
        error: error.response.data?.error || 'Judge service error'
      });
    } else {
      res.status(500).json({ verdict: 'Error', error: error.message || 'Internal server error' });
    }
  }
};

// ================= SAVE SUBMISSION =================
const saveSubmission = async (req, res) => {
  try {
    const { problemId, language, code, verdict, executionTime, testResults } = req.body;
    if (!problemId || !language || !code) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const user = req.user;
    const problem = await Problem.findById(problemId);
    if (!problem) {
      return res.status(404).json({ message: 'Problem not found' });
    }

    const submission = await Submission.create({
      userId: user._id,
      problemId,
      language,
      code,
      status: verdict,
      executionTime: executionTime || 0,
      memoryUsed: 0,
      testResults: testResults || [],
      submittedAt: new Date(),
    });

    const alreadySolved = user.solvedProblems.some(sp => sp.problemId.toString() === problemId);

    // Always increment total submissions
    if (!user.stats) user.stats = { easySolved: 0, mediumSolved: 0, hardSolved: 0, totalSubmissions: 0, acceptedSubmissions: 0 };
    user.stats.totalSubmissions += 1;

    if (verdict === 'Accepted' && !alreadySolved) {
      user.totalScore += problem.points;
      user.solvedProblems.push({ problemId: problem._id, solvedAt: new Date() });

      if (problem.difficulty === 'Easy') user.stats.easySolved += 1;
      else if (problem.difficulty === 'Medium') user.stats.mediumSolved += 1;
      else if (problem.difficulty === 'Hard') user.stats.hardSolved += 1;

      user.stats.acceptedSubmissions += 1;

      // Tier unlocking
      const totalEasy = await Problem.countDocuments({ difficulty: 'Easy' });
      const totalMedium = await Problem.countDocuments({ difficulty: 'Medium' });

      if (user.stats.easySolved >= totalEasy && !user.unlockedTiers.includes('Medium')) {
        user.unlockedTiers.push('Medium');
      }
      if (user.stats.mediumSolved >= totalMedium && !user.unlockedTiers.includes('Hard')) {
        user.unlockedTiers.push('Hard');
      }
    }

    await user.save();

    res.status(201).json({
      success: true,
      message: 'Submission saved successfully',
      submission: {
        id: submission._id,
        status: submission.status,
        executionTime: submission.executionTime,
        submittedAt: submission.submittedAt,
      },
    });
  } catch (err) {
    console.error('Save submission error:', err.message);
    res.status(500).json({ message: err.message });
  }
};

// ================= GET SUBMISSION BY ID =================
const getSubmissionById = async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id)
      .populate('problemId', 'title difficulty')
      .populate('userId', 'username firstName lastName');
    if (!submission) {
      return res.status(404).json({ success: false, message: 'Submission not found' });
    }
    if (submission.userId._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }
    res.json({ success: true, submission });
  } catch (err) {
    console.error('Get submission error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ================= DASHBOARD =================
const getDashboard = async (req, res) => {
  try {
    const user = req.user;
    const totalSubmissions = user.stats?.totalSubmissions || 0;
    const acceptedSubmissions = user.stats?.acceptedSubmissions || 0;
    const acceptanceRate = totalSubmissions > 0
      ? ((acceptedSubmissions / totalSubmissions) * 100).toFixed(1) + '%'
      : '0%';
    const User = require('../models/User');
    const rank = await User.countDocuments({ totalScore: { $gt: user.totalScore || 0 } }) + 1;
    const recentSubmissions = await Submission.find({ userId: user._id })
      .populate('problemId', 'title difficulty')
      .sort({ submittedAt: -1 })
      .limit(10);
    res.json({
      user: {
        firstName: user.firstName,
        username: user.username,
        totalScore: user.totalScore || 0,
      },
      stats: {
        totalSubmissions,
        acceptedSubmissions,
        acceptanceRate,
        rank,
      },
      solvedByDifficulty: {
        Easy: user.stats?.easySolved || 0,
        Medium: user.stats?.mediumSolved || 0,
        Hard: user.stats?.hardSolved || 0,
      },
      unlockedTiers: user.unlockedTiers || ['Easy'],
      recentSubmissions,
    });
  } catch (err) {
    console.error('Dashboard error:', err.message);
    res.status(500).json({ message: err.message });
  }
};

module.exports = { runCode, saveSubmission, getSubmissionById, getDashboard };