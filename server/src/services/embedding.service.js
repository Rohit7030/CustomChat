import { openai } from "../utils/llm.js";

export const generateEmbedding = async (text) => {
  const embedding = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: text,
  });

  return embedding.data[0].embedding;
};
