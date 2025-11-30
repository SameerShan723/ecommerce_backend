import jwt from "jsonwebtoken";

// const ACCESS_TOKEN_TTL = process.env.ACCESS_TOKEN_TTL || "30d";

const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not set");
  }
  return secret;
};

export const generateToken = (payload) => {
  try {
    const token = jwt.sign(
      {
        id: payload._id ? payload._id.toString() : payload.id,
        role: payload.role,
      },
      getJwtSecret(),
      {
        expiresIn: "30d",
      }
    );

    return token;
  } catch (error) {
    console.error("❌ Token generation error:", error.message);
    throw new Error(`Token generation failed: ${error.message}`);
  }
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, getJwtSecret());
  } catch (error) {
    console.error("❌ Token verification error:", error.message);
    throw new Error(`Token verification failed: ${error.message}`);
  }
};
