import { ForbiddenError } from "../utils/error.js";

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new ForbiddenError("Authentication required"));
    }

    if (!roles.includes(req.user.role)) {
      return next(
        new ForbiddenError("Access forbidden. Admin role required")
      );
    }

    next();
  };
};

