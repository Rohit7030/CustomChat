import { openai } from "../utils/llm.js";

export const askLLM = async (message, history) => {

  // Convert old "bot" -> "assistant" for safety
  const formattedHistory = history.map(m => ({
    role: m.role === "bot" ? "assistant" : m.role,
    content: m.content
  }));

  // push current user query to history
  formattedHistory.push({ role: "user", content: message });

  const response = await openai.chat.completions.create({
    model: "openai/gpt-oss-20b:free",
    messages: [
      {
        role: "system",
        content: `
You are a professional Customer Support AI for our company.

🟢 Your Behavior Rules:
- Answer only from company FAQs & known policies.
- Keep tone friendly, supportive, conversational.
- Format responses using **markdown**, bullet-points, headings.
- If user asks unrelated topics → respond:
  "I can assist only with customer support queries."
- If answer is unsure → ask for more details politely.

📝 Always respond clean and well structured.
        `
      },
      ...formattedHistory
    ],
    max_tokens: 800,
    temperature: 0.4 // less hallucination
  });

  return response.choices[0].message.content;
};
