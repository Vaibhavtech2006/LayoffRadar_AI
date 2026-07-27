import { Bot, User } from "lucide-react";

const MessageBubble = ({ sender, text }) => {
  const isAI = sender === "ai";

  return (
    <div
      className={`flex ${
        isAI ? "justify-start" : "justify-end"
      }`}
    >
      <div
        className={`flex max-w-3xl gap-3 ${
          isAI ? "" : "flex-row-reverse"
        }`}
      >
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-full ${
            isAI
              ? "bg-cyan-600"
              : "bg-slate-700"
          }`}
        >
          {isAI ? (
            <Bot size={20} />
          ) : (
            <User size={20} />
          )}
        </div>

        <div
          className={`rounded-2xl px-5 py-4 ${
            isAI
              ? "bg-slate-900"
              : "bg-cyan-600"
          }`}
        >
          <p className="leading-7 text-slate-100">
            {text}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;