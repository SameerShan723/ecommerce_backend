import { catchAsync } from "../middlewares/errorHandler.js";
import storeService from "../services/store.service.js";
import { createdResponse, successResponse } from "../utils/response.js";

class storeController {
  createStore = catchAsync(async (req, res) => {
    const body = req.body;
    const { name, description, logo, address, contact } = body;
    if (!name) {
      return ValidationError("Store name is required");
    }
    if (!description) {
      return ValidationError("Store description is required");
    }
    if (!logo) {
      return ValidationError("Store logo is required");
    }
    if (!address) {
      return ValidationError("Store address is required");
    }
    if (!contact) {
      return ValidationError("Store contact is required");
    }
    const storeData = await storeService.createStore(body);
    createdResponse(res, storeData, "Store created successfully");
  });

  getAllStores = catchAsync(async (req, res) => {
    const stores = await storeService.getAllStores();
    successResponse(res, stores, "Stores retrieved successfully");
  });

  getStoreById = catchAsync(async (req, res) => {
    const { id } = req.params;
    const store = await storeService.getStoreById(id);
    successResponse(res, store, "Store retrieved successfully");
  });

  updateStore = catchAsync(async (req, res) => {
    const { id } = req.params;
    const body = req.body;
    const store = await storeService.updateStore(id, body);
    successResponse(res, store, "Store updated successfully");
  });

  deleteStore = catchAsync(async (req, res) => {
    const { id } = req.params;
    await storeService.deleteStore(id);
    successResponse(res, null, "Store deleted successfully");
  });

  assignSeller = catchAsync(async (req, res) => {
    const data = await storeService.assignSeller(req.body);
    successResponse(res, data, "Seller assigned to store successfully");
  });
}

export default new storeController();
