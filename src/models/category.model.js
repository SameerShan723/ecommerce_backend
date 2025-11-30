import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
  category_name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
});

const Category = mongoose.model("Category", categorySchema);

export default Category;
