import { ForbiddenError } from "../utils/error.js";
import { authorize } from "./authorize.middleware.js";
import Product from "../models/product.model.js";
import Store from "../models/store.model.js";

/**
 * Middleware to check if seller has store access and product ownership
 * - Verifies user is a seller
 * - Checks if seller has a store assigned
 * - For update/delete: verifies product belongs to seller's store
 */
export const checkSellerStoreAccess = async (req, res, next) => {
  try {
    // First check if user is seller using authorize middleware
    const sellerCheck = authorize("seller");
    
    // Wrap authorize in a promise to handle async flow
    await new Promise((resolve, reject) => {
      sellerCheck(req, res, (err) => {
        if (err) return reject(err);
        resolve();
      });
    });

    // Find store by user_id
    const store = await Store.findOne({ user_id: req.user._id });
    
    if (!store) {
      throw new ForbiddenError("Seller must be assigned to a store");
    }

    // Check if store is active
    if (!store.isActive) {
      throw new ForbiddenError("Store is currently inactive");
    }

    const method = req.method.toLowerCase();
    const storeId = store._id.toString();

    // For create: seller can only create products for their own store
    if (method === "post") {
      return next();
    }

    // For update/delete routes, check product ownership
    if ((method === "put" || method === "delete") && req.params.productId) {
      const product = await Product.findById(req.params.productId);

      if (!product) {
        throw new ForbiddenError("Product not found");
      }

      // Only allow if product belongs to seller's store
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

