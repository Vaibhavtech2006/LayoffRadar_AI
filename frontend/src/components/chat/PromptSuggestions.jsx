const prompts = [
  "Analyze Microsoft",
  "Amazon layoff probability",
  "Google hiring trend",
  "Intel financial health",
  "Top companies at layoff risk",
  "Compare Microsoft vs Amazon",
];

const PromptSuggestions = ({ onSelect }) => {
  return (
    <div className="flex flex-wrap gap-3">
      {prompts.map((prompt) => (
        <button
          key={prompt}
          onClick={() => onSelect(prompt)}
          className="rounded-full border border-slate-700 bg-slate-800 px-4 py-2 text-sm text-slate-300 transition hover:bg-slate-700 hover:text-white"
        >
          {prompt}
        </button>
      ))}
    </div>
  );
};

export default PromptSuggestions;