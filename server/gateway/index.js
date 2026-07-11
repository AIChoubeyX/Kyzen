import express from "express";
import dotenv from "dotenv";
import proxy from "express-http-proxy";
import cookieParser from "cookie-parser";
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

app.use("/auth" , proxy(process.env.AUTH_SERVICE));

app.listen(port, () => {
  console.log(`Gateway started on port ${port}`);
});