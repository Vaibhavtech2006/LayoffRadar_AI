const StatsCard = ({ title, value, color }) => {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900 p-6 shadow-lg">
      <h3 className="text-sm text-slate-400">
        {title}
      </h3>

      <h2 className={`mt-3 text-3xl font-bold ${color}`}>
        {value}
      </h2>
    </div>
  );
};

export default StatsCard;
