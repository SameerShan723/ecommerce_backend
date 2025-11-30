import { Router } from "express";
import productController from "../controllers/product.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { checkAdminStoreAccess } from "../middlewares/checkAdminOwnership.js";

const router = Router();

// Public route - users can see all products from all stores
router.get("/", productController.getAllProducts);

// Admin route - get only their store's products
router.get(
  "/store-products",
  authenticate,
  checkAdminStoreAccess,
  productController.getStoreProducts
);

// Protected routes - only admins can create/update/delete products for their store
router.post(
  "/create-product",
  authenticate,
  checkAdminStoreAccess,
  productController.createProduct
);
router.put(
  "/update-product/:productId",
  authenticate,
  checkAdminStoreAccess,
  productController.updateProduct
);
router.delete(
  "/delete-product/:productId",
  authenticate,
  checkAdminStoreAccess,
  productController.deleteProduct
);

export default router;
