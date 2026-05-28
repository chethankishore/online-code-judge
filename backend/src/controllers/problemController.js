// const Problem = require('../models/Problem');

// /**
//  * @desc    Get all problems
//  * @route   GET /api/problems
//  * @access  Private
//  */
// const getAllProblems = async (req, res) => {
//   try {
//     const {
//       difficulty,
//       search,
//       tag,
//       page = 1,
//       limit = 20,
//     } = req.query;

//     const query = {};

//     // Remove isActive filter - your problems don't have this field
//     // If you want to keep it, ensure all seeded problems have isActive: true
//     // For now, we skip it.

//     // Difficulty Access Control
//     if (difficulty && difficulty !== '') {
//       // Check if user can access this difficulty
//       const unlockedTiers = req.user?.unlockedTiers || ['Easy'];
//       if (!unlockedTiers.includes(difficulty)) {
//         return res.status(403).json({
//           success: false,
//           message: `You need to unlock ${difficulty} problems first`,
//         });
//       }
//       query.difficulty = difficulty;
//     } else {
//       // If no difficulty filter, show problems from user's unlocked tiers
//       const unlockedTiers = req.user?.unlockedTiers || ['Easy'];
//       if (unlockedTiers && unlockedTiers.length > 0) {
//         query.difficulty = { $in: unlockedTiers };
//       }
//       // If unlockedTiers is empty, we show nothing (or you could default to ['Easy'])
//     }

//     // Search Filter
//     if (search && search.trim()) {
//       query.title = {
//         $regex: search.trim(),
//         $options: 'i',
//       };
//     }

//     // Tag Filter
//     if (tag) {
//       query.tags = tag;
//     }

//     console.log('Final query:', JSON.stringify(query, null, 2));

//     // Pagination
//     const skip = (page - 1) * limit;
//     const limitNum = Number(limit);

//     const problems = await Problem.find(query)
//       .select('title difficulty tags points order sampleInput sampleOutput')
//       .sort({ order: 1, createdAt: -1 })
//       .skip(skip)
//       .limit(limitNum);

//     const totalProblems = await Problem.countDocuments(query);

//     // Solved Problems Set (if user has solvedProblems field)
//     const solvedSet = new Set();
//     if (req.user?.solvedProblems) {
//       req.user.solvedProblems.forEach(sp => {
//         solvedSet.add(sp.problemId?.toString());
//       });
//     }

//     const formattedProblems = problems.map(problem => ({
//       ...problem.toObject(),
//       solved: solvedSet.has(problem._id.toString()),
//       acceptanceRate: '0%', // Placeholder if not tracking
//     }));

//     res.status(200).json({
//       success: true,
//       problems: formattedProblems,
//       pagination: {
//         currentPage: Number(page),
//         totalPages: Math.ceil(totalProblems / limitNum),
//         totalProblems,
//         hasMore: page * limitNum < totalProblems,
//       },
//       unlockedTiers: req.user?.unlockedTiers || ['Easy'],
//     });
//   } catch (error) {
//     console.error('Get all problems error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to fetch problems',
//     });
//   }
// };

// /**
//  * @desc    Get single problem
//  * @route   GET /api/problems/:id
//  * @access  Private
//  */
// const getProblemById = async (req, res) => {
//   try {
//     const problem = await Problem.findById(req.params.id);
//     if (!problem) {
//       return res.status(404).json({
//         success: false,
//         message: 'Problem not found',
//       });
//     }

//     // Difficulty Access Control
//     const unlockedTiers = req.user?.unlockedTiers || ['Easy'];
//     if (!unlockedTiers.includes(problem.difficulty)) {
//       return res.status(403).json({
//         success: false,
//         message: `You need to unlock ${problem.difficulty} problems first`,
//       });
//     }

//     // Return all relevant fields (including testCases for submission)
//     const sanitizedProblem = {
//       _id: problem._id,
//       title: problem.title,
//       description: problem.description,
//       difficulty: problem.difficulty,
//       tags: problem.tags,
//       constraints: problem.constraints,
//       sampleInput: problem.sampleInput,
//       sampleOutput: problem.sampleOutput,
//       explanation: problem.explanation,
//       points: problem.points,
//       starterCode: problem.starterCode,
//       testCases: problem.testCases,  // Important for submission
//       order: problem.order,
//       createdAt: problem.createdAt,
//     };

//     res.status(200).json({
//       success: true,
//       problem: sanitizedProblem,
//     });
//   } catch (error) {
//     console.error('Get problem error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to fetch problem',
//     });
//   }
// };

// /**
//  * @desc    Create problem
//  * @route   POST /api/problems
//  * @access  Admin
//  */
// const createProblem = async (req, res) => {
//   try {
//     const problem = await Problem.create(req.body);
//     res.status(201).json({
//       success: true,
//       message: 'Problem created successfully',
//       problem,
//     });
//   } catch (error) {
//     console.error('Create problem error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to create problem',
//     });
//   }
// };

// /**
//  * @desc    Update problem
//  * @route   PUT /api/problems/:id
//  * @access  Admin
//  */
// const updateProblem = async (req, res) => {
//   try {
//     const problem = await Problem.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true, runValidators: true }
//     );
//     if (!problem) {
//       return res.status(404).json({
//         success: false,
//         message: 'Problem not found',
//       });
//     }
//     res.status(200).json({
//       success: true,
//       message: 'Problem updated successfully',
//       problem,
//     });
//   } catch (error) {
//     console.error('Update problem error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to update problem',
//     });
//   }
// };

// /**
//  * @desc    Delete problem
//  * @route   DELETE /api/problems/:id
//  * @access  Admin
//  */
// const deleteProblem = async (req, res) => {
//   try {
//     const problem = await Problem.findByIdAndDelete(req.params.id);
//     if (!problem) {
//       return res.status(404).json({
//         success: false,
//         message: 'Problem not found',
//       });
//     }
//     res.status(200).json({
//       success: true,
//       message: 'Problem deleted successfully',
//     });
//   } catch (error) {
//     console.error('Delete problem error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to delete problem',
//     });
//   }
// };

// module.exports = {
//   getAllProblems,
//   getProblemById,
//   createProblem,
//   updateProblem,
//   deleteProblem,
// };

const Problem = require('../models/Problem');

/**
 * @desc    Get all problems
 * @route   GET /api/problems
 * @access  Private
 */
const getAllProblems = async (req, res) => {
  try {
    const {
      difficulty,
      search,
      tag,
      category,        // ← ADDED category filter
      page = 1,
      limit = 20,
    } = req.query;

    const query = {};

    // Difficulty Access Control
    if (difficulty && difficulty !== '') {
      const unlockedTiers = req.user?.unlockedTiers || ['Easy'];
      if (!unlockedTiers.includes(difficulty)) {
        return res.status(403).json({
          success: false,
          message: `You need to unlock ${difficulty} problems first`,
        });
      }
      query.difficulty = difficulty;
    } else {
      const unlockedTiers = req.user?.unlockedTiers || ['Easy'];
      if (unlockedTiers && unlockedTiers.length > 0) {
        query.difficulty = { $in: unlockedTiers };
      }
    }

    // Search Filter
    if (search && search.trim()) {
      query.title = { $regex: search.trim(), $options: 'i' };
    }

    // Tag Filter
    if (tag) {
      query.tags = tag;
    }

    // Category Filter (NEW)
    if (category && category !== '') {
      query.category = category;
    }

    console.log('Final query:', JSON.stringify(query, null, 2));

    // Pagination
    const skip = (page - 1) * limit;
    const limitNum = Number(limit);

    const problems = await Problem.find(query)
      .select('title difficulty tags points order sampleInput sampleOutput category') // include category field
      .sort({ order: 1, createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    const totalProblems = await Problem.countDocuments(query);

    // Solved Problems Set (if user has solvedProblems field)
    const solvedSet = new Set();
    if (req.user?.solvedProblems) {
      req.user.solvedProblems.forEach(sp => {
        solvedSet.add(sp.problemId?.toString());
      });
    }

    const formattedProblems = problems.map(problem => ({
      ...problem.toObject(),
      solved: solvedSet.has(problem._id.toString()),
      acceptanceRate: '0%', // Placeholder
    }));

    res.status(200).json({
      success: true,
      problems: formattedProblems,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(totalProblems / limitNum),
        totalProblems,
        hasMore: page * limitNum < totalProblems,
      },
      unlockedTiers: req.user?.unlockedTiers || ['Easy'],
    });
  } catch (error) {
    console.error('Get all problems error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch problems',
    });
  }
};

/**
 * @desc    Get single problem
 * @route   GET /api/problems/:id
 * @access  Private
 */
const getProblemById = async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);
    if (!problem) {
      return res.status(404).json({
        success: false,
        message: 'Problem not found',
      });
    }

    // Difficulty Access Control
    const unlockedTiers = req.user?.unlockedTiers || ['Easy'];
    if (!unlockedTiers.includes(problem.difficulty)) {
      return res.status(403).json({
        success: false,
        message: `You need to unlock ${problem.difficulty} problems first`,
      });
    }

    // Return all relevant fields (including testCases for submission)
    const sanitizedProblem = {
      _id: problem._id,
      title: problem.title,
      description: problem.description,
      difficulty: problem.difficulty,
      tags: problem.tags,
      constraints: problem.constraints,
      sampleInput: problem.sampleInput,
      sampleOutput: problem.sampleOutput,
      explanation: problem.explanation,
      points: problem.points,
      starterCode: problem.starterCode,
      testCases: problem.testCases,
      order: problem.order,
      createdAt: problem.createdAt,
      category: problem.category,   // include category in single problem response
    };

    res.status(200).json({
      success: true,
      problem: sanitizedProblem,
    });
  } catch (error) {
    console.error('Get problem error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch problem',
    });
  }
};

/**
 * @desc    Create problem
 * @route   POST /api/problems
 * @access  Admin
 */
const createProblem = async (req, res) => {
  try {
    const problem = await Problem.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Problem created successfully',
      problem,
    });
  } catch (error) {
    console.error('Create problem error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create problem',
    });
  }
};

/**
 * @desc    Update problem
 * @route   PUT /api/problems/:id
 * @access  Admin
 */
const updateProblem = async (req, res) => {
  try {
    const problem = await Problem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!problem) {
      return res.status(404).json({
        success: false,
        message: 'Problem not found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Problem updated successfully',
      problem,
    });
  } catch (error) {
    console.error('Update problem error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update problem',
    });
  }
};

/**
 * @desc    Delete problem
 * @route   DELETE /api/problems/:id
 * @access  Admin
 */
const deleteProblem = async (req, res) => {
  try {
    const problem = await Problem.findByIdAndDelete(req.params.id);
    if (!problem) {
      return res.status(404).json({
        success: false,
        message: 'Problem not found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Problem deleted successfully',
    });
  } catch (error) {
    console.error('Delete problem error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete problem',
    });
  }
};

module.exports = {
  getAllProblems,
  getProblemById,
  createProblem,
  updateProblem,
  deleteProblem,
};