import { BrainCircuit, CheckCircle2 } from "lucide-react";

const recommendations = [
  "Monitor quarterly financial reports regularly.",
  "Track company hiring and layoff announcements.",
  "Follow market sentiment related to your industry.",
  "Upskill in AI and cloud technologies to improve job security.",
  "Enable risk alerts for real-time notifications.",
];

const AIRecommendation = () => {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900 p-6 shadow-lg">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">
          AI Recommendation
        </h2>

        <BrainCircuit size={24} className="text-cyan-400" />
      </div>

      <div className="mb-5 rounded-lg border border-cyan-500/30 bg-cyan-500/10 p-4">
        <p className="text-sm text-slate-300">
          Based on the available financial indicators, hiring trends and
          market sentiment, your current employment outlook appears
          <span className="font-semibold text-yellow-400">
            {" "}Moderately Stable
          </span>
          . Continue monitoring company updates and strengthen your technical
          skills to stay prepared.
        </p>
      </div>

      <div className="space-y-3">
        {recommendations.map((item, index) => (
          <div
            key={index}
            className="flex items-start gap-3 rounded-lg bg-slate-800 p-3"
          >
            <CheckCircle2
              size={18}
              className="mt-0.5 text-green-400"
            />

            <p className="text-sm text-slate-300">
              {item}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIRecommendation;