import express from "express";
import { handleUserQuery, resetSession, getSession } from "../controllers/chat.controller.js";

const router = express.Router();

router.post("/query", handleUserQuery);
router.post("/reset", resetSession);
router.get("/session/:id", getSession);

export default router;
