const WatchlistCard = () => {
  return (
    <div className="bg-slate-900 rounded-xl p-6 shadow-lg">
      <h3 className="text-xl font-semibold text-white">Microsoft</h3>

      <p className="text-slate-400 mt-2">
        Technology • Low Layoff Risk
      </p>

      <div className="mt-4">
        <span className="px-3 py-1 bg-green-600 rounded-full text-white text-sm">
          Stable
        </span>
      </div>
    </div>
  );
};

export default WatchlistCard;