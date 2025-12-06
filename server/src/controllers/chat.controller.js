import Session from "../models/session.model.js";
import { findBestFAQMatch } from "../services/faq.service.js";
import { askLLM } from "../services/llm.service.js";

export const handleUserQuery = async (req, res) => {
  try {
    const { message, sessionId } = req.body;

    if (!message || !sessionId) {
      return res.status(400).json({ error: "Missing parameters" });
    }

    // check if session exists
    let session = await Session.findOne({ sessionId });

    if (!session) {
      session = await Session.create({
        sessionId,
        messages: [],
      });
    }

    // store user message
    session.messages.push({ role: "user", content: message });
    await session.save();

    // STEP 1: Try to answer using FAQ first
    const faq = await findBestFAQMatch(message);

    let botReply;

    if (faq) {
      botReply = faq.answer;
    } else {
      // STEP 2: fallback to LLM
      botReply = await askLLM(message, session.messages);
    }

    // store response
    session.messages.push({ role: "assistant", content: botReply });
    await session.save();

    return res.json({
      success: true,
      reply: botReply,
      session,
    });
  } catch (err) {
    console.error("Chat error:", err);
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};


export const resetSession = async (req, res) => {
  try {
    const { sessionId } = req.body;

    await Session.deleteOne({ sessionId });
    return res.json({ success: true, message: "Session cleared" });

  } catch (err) {
    return res.status(500).json({ success: false, error: "Error clearing session" });
  }
};


export const getSession = async (req, res) => {
  try {
    const session = await Session.findOne({ sessionId: req.params.id });
    return res.json({
      success: true,
      messages: session?.messages || []
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: "Error fetching session" });
  }
};

