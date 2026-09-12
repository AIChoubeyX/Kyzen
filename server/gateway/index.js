import "dotenv/config";
import express from "express";
import proxy from "express-http-proxy";
import cookieParser from "cookie-parser";
import protect from "./middleware/auth.middleware.js";
import { getCurrentUser } from "./controllers/user.controller.js";
import { proxyWithHeader } from "./utils/proxyWithHeader.js";
import morgan from "morgan";
import cors from "cors";

const app = express();
const port = process.env.PORT || 8000;

app.use((req, res, next) => {
  console.log('INCOMING REQUEST:', req.method, req.originalUrl);
  next();
});

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

app.use("/api/auth" , proxy(process.env.AUTH_SERVICE));
app.use("/api/chat", protect , proxyWithHeader(process.env.CHAT_SERVICE));
app.use("/api/agent", protect, proxyWithHeader(process.env.AGENT_SERVICE, { parseReqBody: false }));
app.use("/api/billing", protect, proxyWithHeader(process.env.BILLING_SERVICE));
app.get("/api/me" , protect, getCurrentUser)
app.listen(port, () => {
  console.log(`Gateway started on port ${port}`);
});