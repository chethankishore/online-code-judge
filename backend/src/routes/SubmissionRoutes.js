const express = require('express');
const router = express.Router();
const { runCode, saveSubmission, getSubmissionById } = require('../controllers/submissionController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.post('/run', runCode);
router.post('/', saveSubmission);
router.get('/:id', getSubmissionById);   // NEW

module.exports = router;