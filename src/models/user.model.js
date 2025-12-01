import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "seller", "buyer"],
      default: "buyer",
    },
    addresses: [
      {
        street: { type: String },
        city: { type: String },
        country: { type: String },
      },
    ],
    phone: { type: Number },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
