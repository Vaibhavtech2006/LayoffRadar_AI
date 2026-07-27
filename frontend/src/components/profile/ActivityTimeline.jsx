import { Clock } from "lucide-react";

const activities = [
  {
    title: "Added Microsoft to Watchlist",
    time: "Today • 09:30 AM",
  },
  {
    title: "AI analyzed Amazon",
    time: "Yesterday • 02:15 PM",
  },
  {
    title: "Viewed Intel Financial Report",
    time: "2 Days Ago",
  },
  {
    title: "Updated Profile Settings",
    time: "3 Days Ago",
  },
];

const ActivityTimeline = () => {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">

      <h2 className="mb-6 text-xl font-semibold">
        Recent Activity
      </h2>

      <div className="space-y-5">

        {activities.map((activity, index) => (
          <div
            key={index}
            className="flex items-start gap-4"
          >
            <Clock
              className="mt-1 text-cyan-400"
              size={18}
            />

            <div>
              <p>{activity.title}</p>

              <p className="text-sm text-slate-400">
                {activity.time}
              </p>
            </div>
          </div>
        ))}

      </div>

    </div>
  );
};

export default ActivityTimeline;