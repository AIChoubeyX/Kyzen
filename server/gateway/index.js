import express from "express";
import dotenv from "dotenv";
import proxy from "express-http-proxy";
import cookieParser from "cookie-parser";
import protect from "./middleware/auth.middleware.js";
import { getCurrentUser } from "./controllers/user.controller.js";
dotenv.config();
import cors from "cors";

const app = express();
const port = process.env.PORT || 8000;

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth" , proxy(process.env.AUTH_SERVICE));
app.get("/api/me" , protect, getCurrentUser)
app.listen(port, () => {
  console.log(`Gateway started on port ${port}`);
});