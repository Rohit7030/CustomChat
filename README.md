# 🤖 AI Customer Support Chatbot

A full-stack AI powered support chat system that handles FAQs, customer queries, and interacts like ChatGPT.  
Built using **React + Node.js + MongoDB + OpenAI LLM** with dark UI and smooth chat experience.

---

## 🚀 Features

| Feature | Status |
|---|---|
| AI Chat Response using OpenAI LLM | ✔ |
| FAQ Suggestions on UI | ✔ |
| Fully Dark & Glassmorphic UI | ✔ |
| Markdown Rendering (Headings, Lists, Code) | ✔ |
| Typing Animation (ChatGPT-like) | ✔ |
| Conversation stored in MongoDB | ✔ |
| Clear Chat Button | ✔ |
| Custom UI Theme (Purple Neon) | ✔ |


## 🏗 Tech Stack

**Frontend**
- React.js
- TailwindCSS
- React Markdown + GFM
- Icons: react-icons

**Backend**
- Node.js + Express.js
- MongoDB + Mongoose
- OpenAI API
- Vector Embeddings (FAQ Search)

---

## 📥 Installation & Run Locally

### 1️⃣ Clone repo

```bash
git clone https://github.com/Rohit7030/CustomChat.git
cd CustomChat
```

### 2️⃣ Install backend

```bash
cd server
npm install
```

### Create .env inside /server:

```bash
OPENAI_API_KEY=your-key
MONGO_URI=your-mongodb-uri
PORT=5000
```

### Start backend

```bash
node server.js
```

### 3️⃣ Install frontend

```bash
cd ../client
npm install
npm run dev
```

### 🧪 Seed FAQs into DB (Run once)

```bash
node server/src/scripts/seedFaq.js
```

