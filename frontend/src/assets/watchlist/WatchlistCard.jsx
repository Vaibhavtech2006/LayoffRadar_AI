const colorClasses = {
  cyan: {
    border: "border-cyan-500/30",
    bg: "bg-cyan-500/10",
    text: "text-cyan-400",
  },
  red: {
    border: "border-red-500/30",
    bg: "bg-red-500/10",
    text: "text-red-400",
  },
  yellow: {
    border: "border-yellow-500/30",
    bg: "bg-yellow-500/10",
    text: "text-yellow-400",
  },
  green: {
    border: "border-green-500/30",
    bg: "bg-green-500/10",
    text: "text-green-400",
  },
};

const WatchlistCard = ({ title, value, color = "cyan" }) => {
  const theme = colorClasses[color];

  return (
    <div
      className={`rounded-xl border ${theme.border} ${theme.bg} p-6`}
    >
      <p className="text-sm text-slate-400">
        {title}
      </p>

      <h2 className={`mt-3 text-4xl font-bold ${theme.text}`}>
        {value}
      </h2>
    </div>
  );
};

export default WatchlistCard;