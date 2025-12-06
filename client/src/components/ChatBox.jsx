import { useState, useEffect, useRef } from "react";
import { api } from "../utils/api";
import Message from "./Message";

// Icons
import { LuSendHorizontal } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";

const suggestions = [
  "What are your business hours?",
  "How to track my order?",
  "Refund and Return Policy",
  "How to contact support?",
  "Payment methods you accept?",
];

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const sessionId = localStorage.getItem("sessionId") || Date.now().toString();
  const bottomRef = useRef();

  useEffect(() => {
    localStorage.setItem("sessionId", sessionId);
    loadHistory();
  }, []);

  const loadHistory = async () => {
    const res = await api.get(`/session/${sessionId}`);
    setMessages(res.data.messages);
  };

  const scrollBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = async (msg) => {
    const text = msg ?? input;
    if (!text.trim()) return;

    const userMessage = { role: "user", content: text };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    scrollBottom();

    const res = await api.post("/query", { message: text, sessionId });
    const all = res.data.session.messages;
    const botMsg = all[all.length - 1];

    setTimeout(() => {
      setMessages((prev) => [...prev, botMsg]);
      setLoading(false);
      scrollBottom();
    }, 400);
  };

  const clearChat = async () => {
    await api.post("/reset", { sessionId });
    setMessages([]);
  };

  return (
    <div
      className="w-full max-w-md h-[650px] mx-auto flex flex-col rounded-2xl overflow-hidden
      bg-linear-to-br from-[#1c1b29]/70 via-[#201c3a]/70 to-[#0f0e17]/70 
      backdrop-blur-xl shadow-2xl border border-purple-600/40"
    >

      {/* HEADER */}
      <div className="p-4 text-white font-semibold bg-linear-to-r from-purple-600 to-indigo-600 text-center">
        AI Customer Support
      </div>

      {/* Suggestions */}
      {messages.length === 0 && (
        <div className="p-3 flex flex-wrap gap-2 justify-center">
          {suggestions.map((s, i) => (
            <button
              key={i}
              onClick={() => sendMessage(s)}
              className="px-3 py-1 text-xs rounded-full 
                bg-purple-700/40 hover:bg-purple-600/60 text-purple-200 
                border border-purple-400/40 transition"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* CHAT SECTION */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg, i) => (
          <Message key={i} role={msg.role} content={msg.content} />
        ))}

        {loading && <p className="text-purple-300 italic text-sm">typing...</p>}

        <div ref={bottomRef}></div>
      </div>

      {/* INPUT BAR */}
      <div className="p-3 flex items-center gap-2 bg-[#141324] border-t border-purple-500/30">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type your message..."
          className="flex-1 p-2 rounded-xl bg-[#1f1c33] text-white
          border border-purple-500/40 focus:outline-purple-400"
        />

        <button
          onClick={() => sendMessage()}
          className="flex items-center justify-center gap-1 px-4 py-2 text-white rounded-xl 
          bg-linear-to-r from-purple-600 to-indigo-600 hover:opacity-80 transition cursor-pointer"
        >
          <LuSendHorizontal size={20} />
        </button>
      </div>

      {/* CLEAR CHAT BUTTON */}
      <button
        onClick={clearChat}
        className="w-full flex items-center justify-center gap-2 py-3 
        bg-linear-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400
        text-white font-semibold text-sm transition shadow-lg 
        shadow-red-800/40 hover:shadow-red-600/60 border-t border-red-500/40 cursor-pointer"
      >
        <RiDeleteBin6Line size={18} /> Clear Conversation
      </button>
    </div>
  );
};

export default ChatBox;
