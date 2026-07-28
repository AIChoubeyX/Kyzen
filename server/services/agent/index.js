import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import router from "./routes/agent.route.js";


dotenv.config();

const app = express();
app.use(express.json());
const port = process.env.PORT || 8003;



app.use("/", router);

app.listen(port, () => {
  console.log(`Agent service running  on port☠️  ${port}`);
  connectDB();
});