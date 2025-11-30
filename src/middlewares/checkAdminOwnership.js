import { ForbiddenError, UnauthorizedError } from "../utils/error.js";
import Product from "../models/product.model.js";

export const checkAdminStoreAccess = async (req, res, next) => {
  try {
    // Make sure user exists
    if (!req.user) {
      throw new ForbiddenError("Authentication required");
    }

    // Check if user is admin
    if (req.user.role !== "admin") {
      throw new UnauthorizedError("unauthorized access");
    }

    // Check if admin has a store assigned
    if (!req.user.store) {
      throw new ForbiddenError(
        "Current User has no store assigned"
      );
    }

    const method = req.method.toLowerCase();
    const storeId = req.user.store._id.toString();

    // For create: admin can only create products for their own store
    if (method === "post") {
      // Store will be automatically assigned from req.user.store in controller
      // No additional check needed here
      return next();
    }

    // For update/delete routes, check product ownership
    if ((method === "put" || method === "delete") && req.params.productId) {
      const product = await Product.findById(req.params.productId);

      if (!product) {
        throw new ForbiddenError("Product not found");
      }

      // Only allow if product belongs to admin's store
      if (product.store.toString() !== storeId) {
        throw new ForbiddenError(
          "You can only modify products from your store"
        );
      }
    }

    next();
  } catch (error) {
    next(error);
  }
};
