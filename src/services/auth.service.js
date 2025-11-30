import User from "../models/user.model.js";
import Store from "../models/store.model.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt.js";
import { ValidationError } from "../utils/error.js";

class AuthService {
  async signup({ email, password, role, name, addresses, phone, store }) {
    if (!email || !password || !name) {
      throw new ValidationError("Email, password, and name are required");
    }

    // Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ValidationError("User already exists");
    }

    // Validate: Admin users must have a store assigned
    const userRole = role || "user";
    if (userRole === "admin" && !store) {
      throw new ValidationError("Admin users must be assigned to a store");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({
      email,
      name,
      role: userRole,
      password: hashedPassword,
      addresses: addresses || [],
      phone: phone || "",
    });

    // If admin, assign them to the store
    if (userRole === "admin" && store) {
      await Store.findByIdAndUpdate(store, { admin: newUser._id });
    }

    return newUser;
  }

  async login({ email, password }) {
    if (!email || !password) {
      throw new ValidationError("Email and password are required");
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw new ValidationError("Invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new ValidationError("Invalid credentials");
    }

    const token = generateToken(user);

    return {
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        phone: user.phone,
        addresses: user.addresses,
      },
      token,
    };
  }
}

export default new AuthService();
