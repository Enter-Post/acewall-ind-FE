import { Plus, Search } from "lucide-react";
import ConversationItem from "./conversation-item";
// import { conversations } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { axiosInstance } from "@/lib/AxiosInstance";

export default function ConversationList({
  activeConversation,
  setActiveConversation,
  conversations,
}) {
  console.log(conversations, "conversations");

  const handleActiveConversation = async (id) => {
    setActiveConversation(id);
  };

  return (
    <div className="border-r border-gray-200 flex flex-col h-full overflow-auto hide-scrollbar">
      <div className="flex justify-between items-center gap-3 p-4 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>

      <div className="overflow-y-auto flex-1">
        {conversations?.map((conversation) => (
          <ConversationItem
            key={conversation._id}
            conversation={conversation}
            isActive={conversation.name === activeConversation}
            onClick={() => handleActiveConversation(conversation._id)}
          />
        ))}
      </div>
    </div>
  );
}
