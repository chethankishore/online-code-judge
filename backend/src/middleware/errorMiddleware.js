// errorMiddleware.js placeholder// middleware/errorMiddleware.js

/**
 * Global Error Handler Middleware
 */

const errorMiddleware = (
  err,
  req,
  res,
  next
) => {
  console.error('❌ Error:', err);

  // Mongoose Bad ObjectId
  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      message: 'Invalid resource ID',
    });
  }

  // Duplicate Key Error
  if (err.code === 11000) {
    const field = Object.keys(
      err.keyValue
    )[0];

    return res.status(400).json({
      success: false,
      message: `${field} already exists`,
    });
  }

  // Validation Error
  if (err.name === 'ValidationError') {
    const messages = Object.values(
      err.errors
    ).map((val) => val.message);

    return res.status(400).json({
      success: false,
      message: messages.join(', '),
    });
  }

  // JWT Error
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      message: 'Invalid token',
    });
  }

  // JWT Expired
  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      success: false,
      message: 'Token expired',
    });
  }

  // Multer File Upload Error
  if (err.name === 'MulterError') {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  // Axios / External API Error
  if (err.response) {
    return res.status(
      err.response.status || 500
    ).json({
      success: false,
      message:
        err.response.data?.message ||
        'External API error',
    });
  }

  // Default Error
  res.status(
    err.statusCode || 500
  ).json({
    success: false,
    message:
      err.message ||
      'Internal Server Error',

    ...(process.env.NODE_ENV ===
      'development' && {
      stack: err.stack,
    }),
  });
};

/**
 * Handle Unknown Routes
 */

const notFound = (
  req,
  res,
  next
) => {
  const error = new Error(
    `Route Not Found - ${req.originalUrl}`
  );

  res.status(404);

  next(error);
};

module.exports = {
  errorMiddleware,
  notFound,
};