import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Message({ role, content }) {
  const isUser = role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`
        max-w-[80%] p-3 text-sm rounded-xl whitespace-pre-wrap wrap-break-words
        ${isUser 
          ? "bg-linear-to-r from-purple-700 to-indigo-700 text-white rounded-br-none"
          : "bg-[#1d1930] text-purple-200 border border-purple-500/30 rounded-bl-none"
        }
      `}
      >
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </div>
    </div>
  );
}
