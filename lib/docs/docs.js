export const docs = {
  introduction: {
    title: "Introduction",

    description:
      "Learn what DocFlow AI is and why it exists.",

    content: [
      {
        type: "paragraph",
        value:
          "DocFlow AI is a modern documentation platform built with Next.js, Redis, Docker, and AI-powered search.",
      },

      {
        type: "heading",
        value: "Why DocFlow AI?",
      },

      {
        type: "paragraph",
        value:
          "The goal is to learn production-grade frontend architecture while building an AI-first documentation platform.",
      },
    ],
  },

  installation: {
    title: "Installation",

    description:
      "Install and run DocFlow AI locally.",

    content: [
      {
        type: "paragraph",
        value:
          "Clone the repository and install dependencies.",
      },

      {
        type: "code",
        language: "bash",
        value: `git clone https://github.com/your-name/docflow-ai

cd docflow-ai

npm install

npm run dev`,
      },
    ],
  },
};