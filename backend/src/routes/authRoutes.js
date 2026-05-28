const express = require('express');
const passport = require('passport');
const { registerUser, loginUser,logoutUser, getUserProfile, oauthSuccess, oauthFailure, completeProfile,getSolvedProblems } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Email & Password
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile);
router.get('/solved', protect, getSolvedProblems);
router.post('/complete-profile', protect, completeProfile);
router.post('/logout', logoutUser);

// Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/api/auth/failure' }),
  oauthSuccess
);

// GitHub OAuth
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));
router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/api/auth/failure' }),
  oauthSuccess
);

router.get('/failure', oauthFailure);

module.exports = router;