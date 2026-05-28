// const User = require('../models/User');

// const getLeaderboard = async (req, res) => {
//   try {
//     const { sortBy = 'score', limit = 10 } = req.query;

//     let sortField = {};
//     if (sortBy === 'score') sortField = { totalScore: -1 };
//     else if (sortBy === 'solved') sortField = { 'stats.acceptedSubmissions': -1 };
//     else sortField = { totalScore: -1 };

//     const users = await User.find({ role: 'user' })
//       .select('username firstName lastName totalScore stats.solvedProblems stats.acceptedSubmissions')
//       .sort(sortField)
//       .limit(parseInt(limit));

//     const leaderboard = users.map((user, index) => ({
//       rank: index + 1,
//       username: user.username,
//       name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.username,
//       totalScore: user.totalScore || 0,
//       solvedProblems: user.stats?.solvedProblems?.length || 0,
//       acceptedSubmissions: user.stats?.acceptedSubmissions || 0,
//     }));

//     res.json({ success: true, leaderboard });
//   } catch (error) {
//     console.error('Leaderboard error:', error);
//     res.status(500).json({ success: false, message: 'Failed to fetch leaderboard' });
//   }
// };

// module.exports = { getLeaderboard };



const User = require('../models/User');

const getLeaderboard = async (req, res) => {
  try {
    const { sortBy = 'score', limit = 10 } = req.query;

    let sortField = {};
    if (sortBy === 'score') sortField = { totalScore: -1 };
    else if (sortBy === 'solved') sortField = { solvedProblems: -1 }; // sort by length of solvedProblems array
    else sortField = { totalScore: -1 };

    const users = await User.find({ role: 'user' })
      .select('username firstName lastName totalScore solvedProblems stats.acceptedSubmissions')
      .sort(sortField)
      .limit(parseInt(limit));

    const leaderboard = users.map((user, index) => ({
      rank: index + 1,
      username: user.username,
      name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.username,
      totalScore: user.totalScore || 0,
      solvedProblems: user.solvedProblems?.length || 0,
      acceptedSubmissions: user.stats?.acceptedSubmissions || 0,
    }));

    res.json({ success: true, leaderboard });
  } catch (error) {
    console.error('Leaderboard error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch leaderboard' });
  }
};

module.exports = { getLeaderboard };