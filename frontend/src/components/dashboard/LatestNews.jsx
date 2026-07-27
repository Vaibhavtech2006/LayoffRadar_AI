import { Newspaper, ArrowUpRight } from "lucide-react";

const news = [
  {
    title: "Microsoft expands AI hiring across global offices",
    company: "Microsoft",
    time: "2 hours ago",
  },
  {
    title: "Amazon announces restructuring in cloud division",
    company: "Amazon",
    time: "5 hours ago",
  },
  {
    title: "Google reports strong quarterly revenue growth",
    company: "Google",
    time: "Today",
  },
  {
    title: "Meta increases investment in AI infrastructure",
    company: "Meta",
    time: "Yesterday",
  },
];

const LatestNews = () => {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900 p-6 shadow-lg">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">
          Latest Market News
        </h2>

        <Newspaper className="text-cyan-400" size={22} />
      </div>

      <div className="space-y-4">
        {news.map((item, index) => (
          <div
            key={index}
            className="rounded-lg border border-slate-700 bg-slate-800 p-4 transition hover:border-cyan-500 hover:bg-slate-700"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-white">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm text-slate-400">
                  {item.company}
                </p>
              </div>

              <ArrowUpRight
                size={18}
                className="text-cyan-400"
              />
            </div>

            <p className="mt-3 text-xs text-slate-500">
              {item.time}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestNews;