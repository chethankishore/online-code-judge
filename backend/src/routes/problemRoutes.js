const express = require('express');
const {
  getAllProblems,
  getProblemById,
  createProblem,
} = require('../controllers/problemController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', protect, getAllProblems);
router.get('/:id', protect, getProblemById);
router.post('/', protect, admin, createProblem);

module.exports = router;