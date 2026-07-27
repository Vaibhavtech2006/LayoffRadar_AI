import {
  Newspaper,
  Calendar,
  ArrowUpRight,
} from "lucide-react";

const news = [
  {
    date: "12 Jun 2025",
    title: "Microsoft expands AI infrastructure globally.",
    type: "Expansion",
  },
  {
    date: "28 May 2025",
    title: "Cloud revenue shows double-digit growth.",
    type: "Financial",
  },
  {
    date: "10 Apr 2025",
    title: "Company announces new hiring initiative.",
    type: "Hiring",
  },
  {
    date: "18 Mar 2025",
    title: "Strong quarterly earnings exceed expectations.",
    type: "Earnings",
  },
];

const NewsTimeline = () => {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
      <div className="mb-6 flex items-center gap-3">
        <Newspaper className="text-cyan-400" size={24} />
        <h2 className="text-xl font-bold">
          Latest Company News
        </h2>
      </div>

      <div className="space-y-4">
        {news.map((item, index) => (
          <div
            key={index}
            className="rounded-lg bg-slate-800 p-4 transition hover:bg-slate-700"
          >
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-cyan-600 px-3 py-1 text-xs">
                {item.type}
              </span>

              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Calendar size={15} />
                {item.date}
              </div>
            </div>

            <p className="mt-4 text-sm leading-6 text-slate-300">
              {item.title}
            </p>

            <button className="mt-4 flex items-center gap-2 text-cyan-400 hover:text-cyan-300">
              Read More
              <ArrowUpRight size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsTimeline;