import dotenv from "dotenv";
import app from "./src/app.js";
import connectDb from "./src/config/db.js";

// env config
dotenv.config();

const port = process.env.PORT;

// db connection func
connectDb();
app.listen(port, () => {
  console.log("server is running on port", port);
});
