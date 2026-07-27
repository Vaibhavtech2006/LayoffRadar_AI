import Sidebar from "../../components/dashboard/Sidebar";

import ChatSidebar from "../../components/chat/ChatSidebar";
import ChatWindow from "../../components/chat/ChatWindow";
import PromptSuggestions from "../../components/chat/PromptSuggestions";

const Chat = () => {
  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      <Sidebar />

      <main className="flex flex-1 overflow-hidden">

        <ChatSidebar />

        <div className="flex flex-1 flex-col">

          <div className="border-b border-slate-800 p-6">
            <h1 className="text-3xl font-bold">
              AI Assistant
            </h1>

            <p className="mt-2 text-slate-400">
              Ask anything about companies, layoffs, financial health and AI
              predictions.
            </p>
          </div>

          <div className="p-6">
            <PromptSuggestions />
          </div>

          <div className="flex-1 overflow-y-auto px-6 pb-6">
            <ChatWindow />
          </div>

        </div>

      </main>
    </div>
  );
};

export default Chat;