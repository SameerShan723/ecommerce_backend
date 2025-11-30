import Product from "../models/product.model.js";
import Store from "../models/store.model.js"; // Import to register the model
import Category from "../models/category.model.js"; // Import to register the model
import User from "../models/user.model.js"; // Import to register the model

class productServices {
  async createProduct({
    name,
    description,
    price,
    images,
    category,
    brand,
    stock,
    rating,
    reviews,
    createdBy,
    store,
  }) {
    const product = new Product({
      name,
      description,
      price,
      images,
      category,
      brand,
      stock,
      rating,
      reviews,
      createdBy,
      store,
    });
    await product.save();
    return product;
  }

  async getAllProducts(query, req) {
    let filter = {};

    if (query.search) {
      filter.name = { $regex: query.search, $options: "i" };
    }
    if (query.category) {
      const categoryDoc = await Category.findOne({
        category_name: { $regex: query.category, $options: "i" },
      });
      if (categoryDoc) {
        filter.category = categoryDoc._id;
      }
    }

    // Regular users see all products from all stores (no store filter)

    if (query.minPrice && query.maxPrice) {
      filter.price = { $gte: query.minPrice, $lte: query.maxPrice };
    } else if (query.minPrice) {
      filter.price = { $gte: query.minPrice };
    } else if (query.maxPrice) {
      filter.price = { $lte: query.maxPrice };
    }

    if (query.brand) {
      filter.brand = { $regex: query.brand, $options: "i" };
    }
    let sort = {};

    if (query.sortBy) {
      sort[query.sortBy] = query.order === "desc" ? -1 : 1;
    }

    // pagination
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 15;
    const skip = (page - 1) * limit;
    const total = await Product.countDocuments(filter);
    console.log("total count of product", total);
    const results = await Product.find(filter)
      .populate("store", "name logo")
      .populate("category", "category_name")
      .populate("createdBy", "name email")
      .sort(sort)
      .skip(skip)
      .limit(limit);
    // const products = await Product.find()
    //   .populate("store", "name logo")
    //   .populate("category", "category_name")
    //   .populate("createdBy", "name email")
    //   .sort({ createdAt: -1 });

    console.log("results", results);
    return { results, total, limit, page };
  }

  async getProductById(productId) {
    const product = await Product.findById(productId);
    return product;
  }

  async updateProduct(productId, updateData) {
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updateData,
      { new: true }
    );
    return updatedProduct;
  }
  async deleteProduct(productId) {
    await Product.findByIdAndDelete(productId);
    return;
  }

  async getStoreProducts(query, storeId) {
    let filter = {
      store: storeId, // Only products from admin's store
    };

    if (query.search) {
      filter.name = { $regex: query.search, $options: "i" };
    }
    if (query.category) {
      const categoryDoc = await Category.findOne({
        category_name: { $regex: query.category, $options: "i" },
      });
      if (categoryDoc) {
        filter.category = categoryDoc._id;
      }
    }

    if (query.minPrice && query.maxPrice) {
      filter.price = { $gte: query.minPrice, $lte: query.maxPrice };
    } else if (query.minPrice) {
      filter.price = { $gte: query.minPrice };
    } else if (query.maxPrice) {
      filter.price = { $lte: query.maxPrice };
    }

    if (query.brand) {
      filter.brand = { $regex: query.brand, $options: "i" };
    }

    let sort = {};
    if (query.sortBy) {
      sort[query.sortBy] = query.order === "desc" ? -1 : 1;
    }

    // pagination
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 15;
    const skip = (page - 1) * limit;
    const total = await Product.countDocuments(filter);

    const results = await Product.find(filter)
      .populate("store", "name logo")
      .populate("category", "category_name")
      .populate("createdBy", "name email")
      .sort(sort)
      .skip(skip)
      .limit(limit);

    return { results, total, limit, page };
  }
}

export default new productServices();
