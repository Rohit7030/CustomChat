import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./utils/db.js";
import chatRoutes from "./routes/chat.routes.js";



dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

connectDB();
app.get("/", (req, res) => {
  res.send("AI Support Bot Backend Running");
});
app.use("/api", chatRoutes);

export default app;
