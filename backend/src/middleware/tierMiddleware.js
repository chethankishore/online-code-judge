// middleware/tierMiddleware.js

/**
 * Tier Access Middleware
 * Controls access to problems
 * based on unlocked difficulty tiers
 */

const checkTierAccess = (
  requiredDifficulty
) => {
  return async (
    req,
    res,
    next
  ) => {
    try {
      // User Authentication Check
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message:
            'Authentication required',
        });
      }

      // Difficulty Validation
      const validDifficulties = [
        'Easy',
        'Medium',
        'Hard',
      ];

      if (
        !validDifficulties.includes(
          requiredDifficulty
        )
      ) {
        return res.status(400).json({
          success: false,
          message:
            'Invalid difficulty tier',
        });
      }

      // Access Check
      const hasAccess =
        req.user.canAccessDifficulty(
          requiredDifficulty
        );

      if (!hasAccess) {
        let unlockMessage =
          'Complete previous tier problems first';

        if (
          requiredDifficulty ===
          'Medium'
        ) {
          unlockMessage =
            'Complete all Easy problems to unlock Medium tier';
        }

        if (
          requiredDifficulty ===
          'Hard'
        ) {
          unlockMessage =
            'Complete all Medium problems to unlock Hard tier';
        }

        return res.status(403).json({
          success: false,

          message: unlockMessage,

          requiredTier:
            requiredDifficulty,

          unlockedTiers:
            req.user.unlockedTiers,

          userProgress: {
            solvedProblems:
              req.user.solvedProblems
                .length,
          },
        });
      }

      next();
    } catch (error) {
      console.error(
        'Tier middleware error:',
        error
      );

      res.status(500).json({
        success: false,
        message:
          'Tier validation failed',
      });
    }
  };
};

module.exports = {
  checkTierAccess,
};