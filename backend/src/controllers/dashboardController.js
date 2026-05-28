// // // controllers/dashboardController.js
// // const User = require('../models/User');
// // const Submission = require('../models/Submission');
// // const Problem = require('../models/Problem');

// // const getDashboardData = async (req, res) => {
// //   try {
// //     const userId = req.user._id;

// //     // User Data – include totalScore
// //     const user = await User.findById(userId).select(
// //       'username firstName lastName email solvedProblems unlockedTiers createdAt totalScore stats'
// //     );

// //     // Total Problems (no isActive filter)
// //     const totalProblems = await Problem.countDocuments();

// //     // Solved count
// //     const solvedCount = user.solvedProblems.length;

// //     // Difficulty-wise solved
// //     const solvedProblemIds = user.solvedProblems.map(sp => sp.problemId);
// //     const solvedProblems = await Problem.find({ _id: { $in: solvedProblemIds } }).select('difficulty');

// //     const difficultyStats = { Easy: 0, Medium: 0, Hard: 0 };
// //     solvedProblems.forEach(problem => {
// //       if (difficultyStats[problem.difficulty] !== undefined) {
// //         difficultyStats[problem.difficulty]++;
// //       }
// //     });

// //     // Submissions
// //     const totalSubmissions = await Submission.countDocuments({ userId });
// //     const acceptedSubmissions = await Submission.countDocuments({ userId, status: 'Accepted' });

// //     // Recent submissions
// //     const recentSubmissions = await Submission.find({ userId })
// //       .populate('problemId', 'title difficulty')
// //       .sort({ createdAt: -1 })
// //       .limit(10);

// //     // Acceptance rate
// //     const acceptanceRate = totalSubmissions > 0
// //       ? ((acceptedSubmissions / totalSubmissions) * 100).toFixed(1)
// //       : 0;

// //     // Rank (by solved problems count)
// //     const allUsers = await User.find().select('solvedProblems');
// //     const rankedUsers = allUsers
// //       .map(u => ({ userId: u._id.toString(), solvedCount: u.solvedProblems.length }))
// //       .sort((a, b) => b.solvedCount - a.solvedCount);
// //     const rank = rankedUsers.findIndex(u => u.userId === userId.toString()) + 1;

// //     // Activity heatmap
// //     const submissionsByDate = await Submission.aggregate([
// //       { $match: { userId: user._id } },
// //       {
// //         $group: {
// //           _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
// //           count: { $sum: 1 },
// //         },
// //       },
// //       { $sort: { _id: 1 } },
// //     ]);

// //     res.status(200).json({
// //       success: true,
// //       user: {
// //         username: user.username,
// //         firstName: user.firstName,
// //         lastName: user.lastName,
// //         email: user.email,
// //         joinedAt: user.createdAt,
// //         totalScore: user.totalScore || 0,
// //       },
// //       stats: {
// //         totalProblems,
// //         solvedProblems: solvedCount,
// //         totalSubmissions,
// //         acceptedSubmissions,
// //         acceptanceRate: `${acceptanceRate}%`,
// //         rank,
// //       },
// //       solvedByDifficulty: difficultyStats,
// //       unlockedTiers: user.unlockedTiers,
// //       recentSubmissions,
// //       activity: submissionsByDate,
// //     });
// //   } catch (error) {
// //     console.error('Dashboard error:', error);
// //     res.status(500).json({ success: false, message: 'Failed to load dashboard' });
// //   }
// // };

// // module.exports = { getDashboardData };
// // controllers/dashboardController.js
// const User = require('../models/User');
// const Submission = require('../models/Submission');
// const Problem = require('../models/Problem');

// const getDashboardData = async (req, res) => {
//   try {
//     const userId = req.user._id;

//     // User Data – include totalScore
//     const user = await User.findById(userId).select(
//       'username firstName lastName email solvedProblems unlockedTiers createdAt totalScore stats'
//     );

//     // Total Problems (no isActive filter)
//     const totalProblems = await Problem.countDocuments();

//     // Solved count
//     const solvedCount = user.solvedProblems.length;

//     // Difficulty-wise solved
//     const solvedProblemIds = user.solvedProblems.map(sp => sp.problemId);
//     const solvedProblems = await Problem.find({ _id: { $in: solvedProblemIds } }).select('difficulty');

//     const difficultyStats = { Easy: 0, Medium: 0, Hard: 0 };
//     solvedProblems.forEach(problem => {
//       if (difficultyStats[problem.difficulty] !== undefined) {
//         difficultyStats[problem.difficulty]++;
//       }
//     });

//     // Submissions
//     const totalSubmissions = await Submission.countDocuments({ userId });
//     const acceptedSubmissions = await Submission.countDocuments({ userId, status: 'Accepted' });

//     // Recent submissions
//     const recentSubmissions = await Submission.find({ userId })
//       .populate('problemId', 'title difficulty')
//       .sort({ createdAt: -1 })
//       .limit(10);

//     // Acceptance rate
//     const acceptanceRate = totalSubmissions > 0
//       ? ((acceptedSubmissions / totalSubmissions) * 100).toFixed(1)
//       : 0;

//     // Rank (by solved problems count)
//     const allUsers = await User.find().select('solvedProblems');
//     const rankedUsers = allUsers
//       .map(u => ({ userId: u._id.toString(), solvedCount: u.solvedProblems.length }))
//       .sort((a, b) => b.solvedCount - a.solvedCount);
//     const rank = rankedUsers.findIndex(u => u.userId === userId.toString()) + 1;

//     // Activity heatmap
//     const submissionsByDate = await Submission.aggregate([
//       { $match: { userId: user._id } },
//       {
//         $group: {
//           _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
//           count: { $sum: 1 },
//         },
//       },
//       { $sort: { _id: 1 } },
//     ]);

//     res.status(200).json({
//       success: true,
//       user: {
//         username: user.username,
//         firstName: user.firstName,
//         lastName: user.lastName,
//         email: user.email,
//         joinedAt: user.createdAt,
//         totalScore: user.totalScore || 0,
//       },
//       stats: {
//         totalProblems,
//         solvedProblems: solvedCount,
//         totalSubmissions,
//         acceptedSubmissions,
//         acceptanceRate: `${acceptanceRate}%`,
//         rank,
//       },
//       solvedByDifficulty: difficultyStats,
//       unlockedTiers: user.unlockedTiers,
//       recentSubmissions,
//       activity: submissionsByDate,
//     });
//   } catch (error) {
//     console.error('Dashboard error:', error);
//     res.status(500).json({ success: false, message: 'Failed to load dashboard' });
//   }
// };

// module.exports = { getDashboardData };
// src/controllers/dashboardController.js
const User = require('../models/User');
const Submission = require('../models/Submission');
const Problem = require('../models/Problem');

const getDashboardData = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId).select(
      'username firstName lastName email solvedProblems unlockedTiers createdAt totalScore stats'
    );

    const totalProblems = await Problem.countDocuments(); // no isActive filter

    const solvedCount = user.solvedProblems.length;

    const solvedProblemIds = user.solvedProblems.map(sp => sp.problemId);
    const solvedProblems = await Problem.find({ _id: { $in: solvedProblemIds } }).select('difficulty');

    const difficultyStats = { Easy: 0, Medium: 0, Hard: 0 };
    solvedProblems.forEach(problem => {
      if (difficultyStats[problem.difficulty] !== undefined) {
        difficultyStats[problem.difficulty]++;
      }
    });

    const totalSubmissions = await Submission.countDocuments({ userId });
    const acceptedSubmissions = await Submission.countDocuments({ userId, status: 'Accepted' });

    const recentSubmissions = await Submission.find({ userId })
      .populate('problemId', 'title difficulty')
      .sort({ createdAt: -1 })
      .limit(10);

    const acceptanceRate = totalSubmissions > 0
      ? ((acceptedSubmissions / totalSubmissions) * 100).toFixed(1)
      : 0;

    const allUsers = await User.find().select('solvedProblems');
    const rankedUsers = allUsers
      .map(u => ({ userId: u._id.toString(), solvedCount: u.solvedProblems.length }))
      .sort((a, b) => b.solvedCount - a.solvedCount);
    const rank = rankedUsers.findIndex(u => u.userId === userId.toString()) + 1;

    const submissionsByDate = await Submission.aggregate([
      { $match: { userId: user._id } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.status(200).json({
      success: true,
      user: {
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        joinedAt: user.createdAt,
        totalScore: user.totalScore || 0,
      },
      stats: {
        totalProblems,
        solvedProblems: solvedCount,
        totalSubmissions,
        acceptedSubmissions,
        acceptanceRate: `${acceptanceRate}%`,
        rank,
      },
      solvedByDifficulty: difficultyStats,
      unlockedTiers: user.unlockedTiers,
      recentSubmissions,
      activity: submissionsByDate,
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ success: false, message: 'Failed to load dashboard' });
  }
};

module.exports = { getDashboardData };