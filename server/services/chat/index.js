import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
// import router from "./routes/auth.route.js";

dotenv.config();

const app = express();
app.use(express.json());
const port = process.env.PORT || 8002;

// app.use("/", router);

app.listen(port, () => {
  console.log(`Auth service running  on port☠️  ${port}`);
  connectDB();
});