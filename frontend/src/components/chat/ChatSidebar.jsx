import { MessageSquare, Plus, Search } from "lucide-react";

const conversations = [
  {
    id: 1,
    title: "Microsoft Analysis",
    time: "Today",
    active: true,
  },
  {
    id: 2,
    title: "Amazon Layoff Risk",
    time: "Yesterday",
    active: false,
  },
  {
    id: 3,
    title: "Google Financial Health",
    time: "2 Days Ago",
    active: false,
  },
  {
    id: 4,
    title: "Intel Revenue Forecast",
    time: "Last Week",
    active: false,
  },
];

const ChatSidebar = () => {
  return (
    <aside className="flex h-screen w-80 flex-col border-r border-slate-800 bg-slate-900">

      <div className="border-b border-slate-800 p-5">

        <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-cyan-600 px-4 py-3 font-medium transition hover:bg-cyan-700">
          <Plus size={18} />
          New Chat
        </button>

        <div className="relative mt-4">

          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search chats..."
            className="w-full rounded-lg border border-slate-700 bg-slate-800 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-cyan-500"
          />

        </div>

      </div>

      <div className="flex-1 overflow-y-auto p-4">

        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-400">
          Recent Conversations
        </h2>

        <div className="space-y-3">

          {conversations.map((chat) => (
            <button
              key={chat.id}
              className={`w-full rounded-xl border p-4 text-left transition ${
                chat.active
                  ? "border-cyan-500 bg-cyan-500/10"
                  : "border-slate-800 bg-slate-800 hover:border-slate-700 hover:bg-slate-700"
              }`}
            >
              <div className="flex items-start gap-3">

                <div className="rounded-lg bg-slate-700 p-2">
                  <MessageSquare
                    size={18}
                    className="text-cyan-400"
                  />
                </div>

                <div className="flex-1">

                  <h3 className="font-medium">
                    {chat.title}
                  </h3>

                  <p className="mt-1 text-xs text-slate-400">
                    {chat.time}
                  </p>

                </div>

              </div>
            </button>
          ))}

        </div>

      </div>

      <div className="border-t border-slate-800 p-4">

        <div className="rounded-lg bg-slate-800 p-4">

          <h3 className="font-semibold text-cyan-400">
            AI Assistant
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-300">
            Ask questions about layoffs, company financial health,
            hiring trends, bankruptcy prediction and market risk.
          </p>

        </div>

      </div>

    </aside>
  );
};

export default ChatSidebar;