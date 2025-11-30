import { catchAsync } from "../middlewares/errorHandler.js";
import productService from "../services/product.service.js";
import {
  createdResponse,
  successResponse,
  paginatedResponse,
} from "../utils/response.js";
import { ValidationError } from "../utils/error.js";

class productController {
  createProduct = catchAsync(async (req, res) => {
    // Check if admin has a store assigned
    if (!req.user.store) {
      throw new ValidationError(
        "Admin must be assigned to a store to create products"
      );
    }

    const {
      name,
      description,
      price,
      images,
      category,
      brand,
      stock,
      rating,
      reviews,
    } = req.body;

    // Get store ID
    const storeId = req.user.store._id;

    const newProduct = await productService.createProduct({
      name,
      description,
      price,
      images,
      category,
      brand,
      createdBy: req.user._id, // Use authenticated admin user's ID
      store: storeId, // Automatically assign admin's store
      stock,
      rating,
      reviews,
    });
    createdResponse(res, newProduct, "Product created successfully");
  });

  getAllProducts = catchAsync(async (req, res) => {
    const query = req.query;
    const { results, page, limit, total } = await productService.getAllProducts(
      query,
      req
    );
    paginatedResponse(
      res,
      results,
      { page, limit, total },
      "Products retrieved successfully"
    );
  });

  getStoreProducts = catchAsync(async (req, res) => {
    // Check if admin has a store assigned
    if (!req.user.store) {
      throw new ValidationError(
        "Curret User has no store assigned"
      );
    }

    const query = req.query;
    const storeId = req.user.store._id;
    const { results, page, limit, total } =
      await productService.getStoreProducts(query, storeId);
    paginatedResponse(
      res,
      results,
      { page, limit, total },
      "Store products retrieved successfully"
    );
  });

  updateProduct = catchAsync(async (req, res) => {
    const { productId } = req.params;
    const updateData = req.body;

    const updatedProduct = await productService.updateProduct(
      productId,
      updateData
    );
    successResponse(res, updatedProduct, "Product updated successfully");
  });
  deleteProduct = catchAsync(async (req, res) => {
    const { productId } = req.params;

    await productService.deleteProduct(productId);
    successResponse(res, null, "Product deleted successfully");
  });
}

export default new productController();
