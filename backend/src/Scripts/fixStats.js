// const mongoose = require('mongoose');
// const path = require('path');

// // Require models using absolute paths from project root
// const User = require('../models/User');
// const Submission = require('../models/Submission');
// const Problem = require('../models/Problem');
// require('dotenv').config({ path: path.join(__dirname, '../../.env') });

// const fixStats = async () => {
//   try {
//     await mongoose.connect(process.env.MONGODB_URI);
//     console.log('Connected to MongoDB');

//     const users = await User.find();
//     for (const user of users) {
//       // Reset stats
//       user.stats = { easySolved: 0, mediumSolved: 0, hardSolved: 0, totalSubmissions: 0, acceptedSubmissions: 0 };
//       user.totalScore = 0;
//       user.solvedProblems = [];

//       const acceptedSubs = await Submission.find({ userId: user._id, status: 'Accepted' });
//       const unique = new Map();
//       for (const sub of acceptedSubs) {
//         if (!unique.has(sub.problemId.toString())) {
//           unique.set(sub.problemId.toString(), sub);
//         }
//       }
//       for (const [probId, sub] of unique) {
//         const prob = await Problem.findById(probId);
//         if (prob) {
//           user.solvedProblems.push({ problemId: probId, solvedAt: sub.submittedAt });
//           user.totalScore += prob.points;
//           if (prob.difficulty === 'Easy') user.stats.easySolved++;
//           else if (prob.difficulty === 'Medium') user.stats.mediumSolved++;
//           else if (prob.difficulty === 'Hard') user.stats.hardSolved++;
//           user.stats.acceptedSubmissions++;
//         }
//       }
//       user.stats.totalSubmissions = await Submission.countDocuments({ userId: user._id });
//       await user.save();
//       console.log(`✅ ${user.username} – score:${user.totalScore}, easy:${user.stats.easySolved}`);
//     }
//     console.log('All stats fixed');
//     process.exit(0);
//   } catch (err) {
//     console.error('Error:', err);
//     process.exit(1);
//   }
// };

// fixStats();