import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import { errorHandler } from "./middlewares/errorHandler.js";
const app = express();
// middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Routes
// app.get("/", (req, res) => {
//   res.json({ message: "API is working!" });
// });
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

app.use(errorHandler);
export default app;
