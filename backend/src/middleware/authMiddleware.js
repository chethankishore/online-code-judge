const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Protect Routes Middleware
 * Uses HttpOnly Cookie Authentication
 */

const protect = async (
  req,
  res,
  next
) => {
  try {
    // Get token from cookies
    const token =
      req.cookies.token;

    if (!token) {
      return res
        .status(401)
        .json({
          success: false,
          message:
            'Not authorized, no token',
        });
    }

    // Verify token
    const decoded =
      jwt.verify(
        token,
        process.env.JWT_SECRET
      );

    // Find user
    const user =
      await User.findById(
        decoded.id
      ).select('-password');

    if (!user) {
      return res
        .status(401)
        .json({
          success: false,
          message:
            'User not found',
        });
    }

    // Attach user
    req.user = user;

    next();
  } catch (error) {
    console.error(
      'Auth middleware error:',
      error
    );

    return res
      .status(401)
      .json({
        success: false,
        message:
          'Not authorized, token failed',
      });
  }
};

/**
 * Admin Middleware
 */

const admin = (
  req,
  res,
  next
) => {
  if (
    req.user &&
    req.user.role ===
      'admin'
  ) {
    next();
  } else {
    res.status(403).json({
      success: false,
      message:
        'Not authorized as admin',
    });
  }
};

module.exports = {
  protect,
  admin,
};