import { ForbiddenError } from "../utils/error.js";

/**
 * Unified authorization middleware
 * @param {...string} roles - Allowed roles (admin, seller, buyer)
 * @returns Middleware function
 */

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new ForbiddenError("Authentication required"));
    }

    if (!roles.includes(req.user.role)) {
      const roleNames = roles.join(" or ");
      return next(new ForbiddenError(`Access forbidden`));
    }

    next();
  };
};
