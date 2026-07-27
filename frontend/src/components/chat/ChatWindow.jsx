import { useState } from "react";
import {
  Send,
  Bot,
  User,
  Sparkles,
  BarChart3,
  AlertTriangle,
} from "lucide-react";

const initialMessages = [
  {
    id: 1,
    sender: "ai",
    text: "Hello! I'm LayoffRadar AI. I can analyze company financial health, layoff probability, hiring trends, bankruptcy risk and recent market activity. How can I help you today?",
  },
];

const suggestions = [
  "Analyze Microsoft",
  "Layoff risk of Intel",
  "Financial health of Amazon",
  "Hiring trend of Google",
];

const ChatWindow = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now(),
      sender: "user",
      text: input,
    };

    const aiMessage = {
      id: Date.now() + 1,
      sender: "ai",
      text:
        "Based on available financial indicators, recent news, revenue growth and hiring activity, the company currently appears financially stable with a relatively low layoff probability. This is a demo AI response for the frontend.",
    };

    setMessages((prev) => [...prev, userMessage, aiMessage]);
    setInput("");
  };

  return (
    <div className="flex h-screen flex-col bg-slate-950">

      {/* Header */}

      <div className="border-b border-slate-800 bg-slate-900 px-8 py-5">

        <div className="flex items-center justify-between">

          <div>

            <h1 className="text-2xl font-bold text-white">
              AI Corporate Assistant
            </h1>

            <p className="mt-1 text-sm text-slate-400">
              Ask anything about companies, layoffs and financial health.
            </p>

          </div>

          <div className="rounded-lg bg-cyan-600 px-4 py-2 text-sm font-medium">
            AI Online
          </div>

        </div>

      </div>

      {/* Suggestions */}

      <div className="border-b border-slate-800 bg-slate-900 px-8 py-5">

        <div className="flex flex-wrap gap-3">

          {suggestions.map((item) => (
            <button
              key={item}
              onClick={() => setInput(item)}
              className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-300 transition hover:bg-slate-800"
            >
              {item}
            </button>
          ))}

        </div>

      </div>

      {/* Messages */}

      <div className="flex-1 overflow-y-auto px-8 py-6">

        <div className="mx-auto max-w-4xl space-y-6">

          {messages.map((message) => (

            <div
              key={message.id}
              className={`flex ${
                message.sender === "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`flex max-w-3xl gap-3 ${
                  message.sender === "user"
                    ? "flex-row-reverse"
                    : ""
                }`}
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full ${
                    message.sender === "ai"
                      ? "bg-cyan-600"
                      : "bg-slate-700"
                  }`}
                >
                  {message.sender === "ai" ? (
                    <Bot size={20} />
                  ) : (
                    <User size={20} />
                  )}
                </div>

                <div
                  className={`rounded-2xl px-5 py-4 ${
                    message.sender === "ai"
                      ? "bg-slate-900"
                      : "bg-cyan-600"
                  }`}
                >
                  <p className="leading-7 text-slate-100">
                    {message.text}
                  </p>
                </div>

              </div>
            </div>

          ))}

        </div>

      </div>

      {/* AI Features */}

      <div className="border-t border-slate-800 bg-slate-900 px-8 py-4">

        <div className="mb-5 flex flex-wrap gap-4">

          <div className="flex items-center gap-2 rounded-lg bg-slate-800 px-4 py-2">
            <Sparkles
              size={18}
              className="text-cyan-400"
            />
            AI Insights
          </div>

          <div className="flex items-center gap-2 rounded-lg bg-slate-800 px-4 py-2">
            <BarChart3
              size={18}
              className="text-green-400"
            />
            Financial Analysis
          </div>

          <div className="flex items-center gap-2 rounded-lg bg-slate-800 px-4 py-2">
            <AlertTriangle
              size={18}
              className="text-yellow-400"
            />
            Risk Prediction
          </div>

        </div>

        <div className="flex gap-4">

          <input
            type="text"
            placeholder="Ask LayoffRadar AI..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
            className="flex-1 rounded-xl border border-slate-700 bg-slate-800 px-5 py-4 text-white outline-none focus:border-cyan-500"
          />

          <button
            onClick={sendMessage}
            className="rounded-xl bg-cyan-600 px-6 transition hover:bg-cyan-700"
          >
            <Send size={20} />
          </button>

        </div>

      </div>

    </div>
  );
};

export default ChatWindow;
