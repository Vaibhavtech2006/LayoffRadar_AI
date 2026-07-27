import { AlertTriangle } from "lucide-react";

const RiskGauge = () => {
  const riskScore = 72;

  let status = "Low";
  let color = "text-green-400";
  let bgColor = "stroke-green-500";

  if (riskScore >= 40 && riskScore < 70) {
    status = "Moderate";
    color = "text-yellow-400";
    bgColor = "stroke-yellow-500";
  }

  if (riskScore >= 70) {
    status = "High";
    color = "text-red-400";
    bgColor = "stroke-red-500";
  }

  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const progress = circumference - (riskScore / 100) * circumference;

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900 p-6 shadow-lg">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">
          AI Risk Score
        </h2>

        <AlertTriangle className={color} size={22} />
      </div>

      <div className="mt-8 flex justify-center">
        <div className="relative">

          <svg
            width="160"
            height="160"
            className="-rotate-90"
          >
            <circle
              cx="80"
              cy="80"
              r={radius}
              stroke="#334155"
              strokeWidth="12"
              fill="none"
            />

            <circle
              cx="80"
              cy="80"
              r={radius}
              strokeWidth="12"
              fill="none"
              strokeLinecap="round"
              className={bgColor}
              strokeDasharray={circumference}
              strokeDashoffset={progress}
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h2 className="text-3xl font-bold text-white">
              {riskScore}%
            </h2>

            <p className={`font-medium ${color}`}>
              {status}
            </p>
          </div>

        </div>
      </div>

      <div className="mt-6 rounded-lg bg-slate-800 p-4">
        <p className="text-sm text-slate-300">
          AI analysis indicates the current employee risk level is
          <span className={`ml-1 font-semibold ${color}`}>
            {status}
          </span>
          . This score is calculated using company financial indicators,
          layoffs trend, hiring activity and market sentiment.
        </p>
      </div>
    </div>
  );
};

export default RiskGauge;