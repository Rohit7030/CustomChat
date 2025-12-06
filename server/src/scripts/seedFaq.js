import mongoose from "mongoose";
import dotenv from "dotenv";
import FAQ from "../models/faq.model.js";
import { generateEmbedding } from "../services/embedding.service.js";


dotenv.config();

// 20 Sample Company FAQs (Modify to your company later)
const faqs = [
  { question: "What are your business hours?", answer: "We are open from 9 AM to 6 PM, Monday through Saturday." },
  { question: "How can I contact customer support?", answer: "You can email us at support@yourcompany.com or call +1 555 333 888." },
  { question: "Where is your company located?", answer: "Our head office is located in Mumbai, India." },
  { question: "Do you offer refunds?", answer: "Yes, refunds are processed within 5-7 working days after approval." },
  { question: "How to track my order?", answer: "Go to My Orders → Select Order → Track Shipment." },
  { question: "What payment methods do you accept?", answer: "We accept UPI, Netbanking, Credit/Debit Cards and Wallets." },
  { question: "How long does delivery take?", answer: "Delivery usually takes 3–7 business days depending on location." },
  { question: "Can I change my delivery address after ordering?", answer: "Yes, address can be changed before dispatch only." },
  { question: "Do you offer international shipping?", answer: "Currently we deliver only within India." },
  { question: "My product arrived damaged, what to do?", answer: "Raise a complaint within 48 hours with product photos." },
  { question: "Can I cancel my order?", answer: "Orders can be cancelled before they are shipped." },
  { question: "Do you provide warranty on products?", answer: "Most products come with a 6 or 12 month warranty." },
  { question: "How can I reset my account password?", answer: "Click 'Forgot Password' on login screen to reset." },
  { question: "Is cash on delivery available?", answer: "Yes, COD is available for select pincodes." },
  { question: "How do I apply a discount coupon?", answer: "Enter coupon code on checkout page before payment." },
  { question: "Do you have a mobile app?", answer: "Yes, available on Play Store and App Store." },
  { question: "Can I return a product without original packaging?", answer: "Original box is required for return approval." },
  { question: "Do you offer bulk corporate orders?", answer: "Yes, mail us at corporate@yourcompany.com for quotes." },
  { question: "Why is my order delayed?", answer: "Shipment delays can occur due to logistics or weather. Please allow 1-3 extra days." },
  { question: "How do I update profile details?", answer: "Go to Profile → Edit Details → Save changes." }
];

async function seedFAQ() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB Connected ✔");

    for (let faq of faqs) {
      console.log("Generating embedding for:", faq.question);
      const embedding = await generateEmbedding(faq.question);

      await FAQ.create({
        question: faq.question,
        answer: faq.answer,
        embedding,
      });
    }

    console.log("\n✨ 20 FAQs inserted successfully!");
    process.exit();
  } catch (error) {
    console.error("Error inserting FAQs:", error);
    process.exit(1);
  }
}

seedFAQ();
