import FAQ from "../models/faq.model.js";
import { generateEmbedding } from "./embedding.service.js";

export const findBestFAQMatch = async (query) => {
  const faqs = await FAQ.find();
  if (!faqs.length) return null;

  const queryEmbedding = await generateEmbedding(query);

  let bestMatch = null;
  let bestScore = -1;

  for (let faq of faqs) {
    const similarity = cosineSimilarity(queryEmbedding, faq.embedding);

    if (similarity > bestScore) {
      bestScore = similarity;
      bestMatch = faq;
    }
  }

  return bestScore > 0.80 ? bestMatch : null;
};

const cosineSimilarity = (vecA, vecB) => {
  const dot = vecA.reduce((acc, cur, i) => acc + cur * vecB[i], 0);
  const magA = Math.sqrt(vecA.reduce((acc, cur) => acc + cur * cur, 0));
  const magB = Math.sqrt(vecB.reduce((acc, cur) => acc + cur * cur, 0));
  return dot / (magA * magB);
};
