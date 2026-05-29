const User = require('../models/User');
const generateToken = require('../utils/generateToken');

const FRONTEND_URL = process.env.FRONTEND_URL || 
  (process.env.NODE_ENV === 'production' 
    ? 'https://online-code-judge-pi.vercel.app' 
    : 'http://localhost:5173');

/**
 * Helper Function
 */

const sendTokenResponse = (
  user,
  statusCode,
  res
) => {
  const token = generateToken(user._id);

  res.cookie('token', token, {
    httpOnly: true,
    secure:
      process.env.NODE_ENV ===
      'production',
    sameSite: 'lax',
    maxAge:
      7 * 24 * 60 * 60 * 1000,
  });

  res.status(statusCode).json({
    success: true,

    user: {
      _id: user._id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      unlockedTiers:
        user.unlockedTiers,
      stats: user.stats,
      isProfileComplete:
        user.isProfileComplete,
    },
  });
};

/**
 * Register User
 */

const registerUser = async (
  req,
  res
) => {
  try {
    const {
      username,
      email,
      password,
      firstName,
      lastName,
    } = req.body;

    if (
      !username ||
      !email ||
      !password
    ) {
      return res
        .status(400)
        .json({
          message:
            'Please provide all required fields',
        });
    }

    const userExists =
      await User.findOne({
        $or: [
          { email },
          { username },
        ],
      });

    if (userExists) {
      return res
        .status(400)
        .json({
          message:
            'User already exists',
        });
    }

    const user =
      await User.create({
        username,
        email,
        password,
        firstName,
        lastName,
        isVerified: true,
        unlockedTiers: ['Easy'],
      });

    sendTokenResponse(
      user,
      201,
      res
    );
  } catch (error) {
    console.error(
      'Registration error:',
      error
    );

    res.status(500).json({
      message: error.message,
    });
  }
};

/**
 * Complete Profile
 */

const completeProfile =
  async (req, res) => {
    try {
      const {
        username,
        password,
        confirmPassword,
        firstName,
        lastName,
      } = req.body;

      if (
        !username ||
        !password ||
        !confirmPassword
      ) {
        return res
          .status(400)
          .json({
            message:
              'All fields are required',
          });
      }

      if (
        password !==
        confirmPassword
      ) {
        return res
          .status(400)
          .json({
            message:
              'Passwords do not match',
          });
      }

      if (
        password.length < 6
      ) {
        return res
          .status(400)
          .json({
            message:
              'Password must be at least 6 characters',
          });
      }

      const usernameExists =
        await User.findOne({
          username,
        });

      if (
        usernameExists &&
        usernameExists._id.toString() !==
          req.user._id.toString()
      ) {
        return res
          .status(400)
          .json({
            message:
              'Username already taken',
          });
      }

      const user =
        await User.findById(
          req.user._id
        );

      user.username = username;
      user.password = password;
      user.firstName =
        firstName || '';
      user.lastName =
        lastName || '';
      user.isProfileComplete =
        true;

      await user.save();

      sendTokenResponse(
        user,
        200,
        res
      );
    } catch (error) {
      console.error(
        'Complete profile error:',
        error
      );

      res.status(500).json({
        message: error.message,
      });
    }
  };

/**
 * Login User
 */

const loginUser = async (
  req,
  res
) => {
  try {
    const { email, password } =
      req.body;

    if (
      !email ||
      !password
    ) {
      return res
        .status(400)
        .json({
          message:
            'Please provide email and password',
        });
    }

    const user =
      await User.findOne({
        email,
      });

    if (
      user &&
      (await user.comparePassword(
        password
      ))
    ) {
      sendTokenResponse(
        user,
        200,
        res
      );
    } else {
      res.status(401).json({
        message:
          'Invalid email or password',
      });
    }
  } catch (error) {
    console.error(
      'Login error:',
      error
    );

    res.status(500).json({
      message: error.message,
    });
  }
};

/**
 * Logout User
 */

const logoutUser = (
  req,
  res
) => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(0),
  });

  res.json({
    success: true,
    message:
      'Logged out successfully',
  });
};

/**
 * Get Profile
 */

const getUserProfile =
  async (req, res) => {
    try {
      const user =
        await User.findById(
          req.user._id
        ).populate(
          'solvedProblems.problemId',
          'title difficulty points'
        );

      res.json({
        success: true,

        user: {
          _id: user._id,
          username:
            user.username,
          firstName:
            user.firstName,
          lastName:
            user.lastName,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
          unlockedTiers:
            user.unlockedTiers,
          stats: user.stats,
          solvedProblems:
            user.solvedProblems,
        },
      });
    } catch (error) {
      console.error(
        'Profile error:',
        error
      );

      res.status(500).json({
        message: error.message,
      });
    }
  };

/**
 * OAuth Success
 */

const oauthSuccess = (
  req,
  res
) => {
  try {
    const token =
      generateToken(
        req.user._id
      );

    res.cookie('token', token, {
      httpOnly: true,
      secure:
        process.env.NODE_ENV ===
        'production',
      sameSite: 'lax',
      maxAge:
        7 *
        24 *
        60 *
        60 *
        1000,
    });

    if (
      !req.user
        .isProfileComplete
    ) {
      res.redirect(
        `${FRONTEND_URL}/complete-profile`
      );
    } else {
      res.redirect(
        `${FRONTEND_URL}/dashboard`
      );
    }
  } catch (error) {
    res.redirect(
      `${FRONTEND_URL}/login?error=oauth_failed`
    );
  }
};

/**
 * OAuth Failure
 */

const oauthFailure = (
  req,
  res
) => {
  res.redirect(
    `${FRONTEND_URL}/login?error=oauth_failed`
  );
};

// Add to authController.js
const getSolvedProblems = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate({
      path: 'solvedProblems.problemId',
      select: 'title difficulty points category',
    });
    const solved = user.solvedProblems.map(sp => ({
      _id: sp.problemId._id,
      title: sp.problemId.title,
      difficulty: sp.problemId.difficulty,
      points: sp.problemId.points,
      category: sp.problemId.category,
      solvedAt: sp.solvedAt,
    }));
    res.json({ success: true, solved });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getSolvedProblems,
  getUserProfile,
  oauthSuccess,
  oauthFailure,
  completeProfile,
};