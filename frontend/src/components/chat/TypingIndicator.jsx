const TypingIndicator = () => {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-600 text-white">
        AI
      </div>

      <div className="flex items-center gap-2 rounded-2xl bg-slate-900 px-5 py-4">
        <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400"></span>
        <span
          className="h-2 w-2 animate-bounce rounded-full bg-cyan-400"
          style={{ animationDelay: "0.2s" }}
        ></span>
        <span
          className="h-2 w-2 animate-bounce rounded-full bg-cyan-400"
          style={{ animationDelay: "0.4s" }}
        ></span>

        <span className="ml-2 text-sm text-slate-400">
          LayoffRadar AI is thinking...
        </span>
      </div>
    </div>
  );
};

export default TypingIndicator;
