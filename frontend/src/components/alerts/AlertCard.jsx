const styles = {
  cyan: {
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/30",
    text: "text-cyan-400",
  },
  red: {
    bg: "bg-red-500/10",
    border: "border-red-500/30",
    text: "text-red-400",
  },
  yellow: {
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/30",
    text: "text-yellow-400",
  },
  green: {
    bg: "bg-green-500/10",
    border: "border-green-500/30",
    text: "text-green-400",
  },
};

const AlertCard = ({ title, value, color = "cyan" }) => {
  const theme = styles[color];

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

export default AlertCard;