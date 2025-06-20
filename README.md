# 🤖 DSA Instructor Chatbot

A conversational chatbot designed to help students understand and solve problems related to Data Structures and Algorithms (DSA). Built with React, TypeScript, and Tailwind CSS, and powered by a language model via Gemini API.

🚀 **[Live Demo](https://dsa-instructor-chatbot-ccjg-abhi17bgps-projects.vercel.app)**

---

## 🚀 Features

- 📘 Explain DSA topics interactively (e.g., sorting, trees, graphs)
- 💡 Provides hints, code snippets, and step-by-step explanations
- ⚡ Fast development with Vite
- 🌈 Styled using Tailwind CSS
- 🔁 Live chat interface with typing/loading states

---

## 🛠️ Tech Stack

| Tech             | Description                        |
|------------------|------------------------------------|
| React + Vite     | Frontend library + build tool      |
| TypeScript       | Type-safe development              |
| Tailwind CSS     | Utility-first CSS framework        |
| Zustand          | Lightweight state management       |
| Gemini API       | AI-powered backend for responses   |

---

## 📁 Project Structure

```bash
project/
├── index.html                 # App HTML shell
├── package.json              # Dependencies and scripts
├── vite.config.ts           # Vite config
├── tsconfig*.json           # TypeScript configs
├── tailwind.config.js       # Tailwind setup
├── postcss.config.js        # PostCSS setup
└── src/
    ├── main.tsx              # App entry
    ├── components/           # Reusable UI components
    ├── services/             # API and helper functions
    ├── hooks/                # Custom React hooks
    ├── types/                # TypeScript types/interfaces
    └── data/                 # Static prompt data
```
---
# ⚙️ Setup Instructions
## 1. Clone the repositor
```
git clone https://github.com/abhi17bgp/dsa-instructor-chatbot.git

cd  dsa-instructor-chatbot/project
```
## 2. Install dependencies
```
npm install
```
## 3. Create .env file                  
On Windows (Command Prompt):
```
echo "GEMINI_API_KEY=your_api_key_here" > .env
```
## 4. Run the app
```
npm run dev
```

## 🙋‍♂️ Author

**Abhishek Anand**  
3rd Year CSE @ SLIET  
🔗 [LinkedIn](https://www.linkedin.com/in/abhishek-anand-626a13288/)
