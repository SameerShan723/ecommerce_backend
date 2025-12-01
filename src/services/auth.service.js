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

    // Validate role
    const userRole = role || "buyer";
    const validRoles = ["admin", "seller", "buyer"];
    if (!validRoles.includes(userRole)) {
      throw new ValidationError(
        `Invalid role. Must be one of: ${validRoles.join(", ")}`
      );
    }

    // Validate: Seller users must have a store assigned
    // if (userRole === "seller" && !store) {
    //   throw new ValidationError("Seller users must be assigned to a store");
    // }

    // Validate: Admin users cannot be assigned to a store (they manage stores)
    if (userRole === "admin" && store) {
      throw new ValidationError("Admin users cannot be assigned to a store");
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
