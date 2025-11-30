import { verifyToken } from "../utils/jwt.js";
import { UnauthorizedError } from "../utils/error.js";
import User from "../models/user.model.js";
import Store from "../models/store.model.js";
export const authenticate = async (req, res, next) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new UnauthorizedError("No token provided");
    }

    const token = authHeader.substring(7); // Remove "Bearer " prefix

    // Verify token
    const decoded = verifyToken(token);

    // Get user from database
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      throw new UnauthorizedError("User not found");
    }

    // If user is admin, find their store
    if (user.role === "admin") {
      const store = await Store.findOne({ admin: user._id }).select("name logo");
      if (store) {
        user.store = store; // Attach store to user object for backward compatibility
      }
    }

    // Attach user to request
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
