import ChatWindow from "@/CustomComponent/MessagesCmp.jsx/chat-window";
import ConversationList from "@/CustomComponent/MessagesCmp.jsx/conversation-list";
import { useState } from "react"
// import ConversationList from "./conversation-list"
// import ChatWindow from "./chat-window"

const TeacherMessages = () => {
  const [activeConversation, setActiveConversation] = useState("Jane Cooper");

  return (
    <div>
        <h1 className="text-xl py-4 mb-8 pl-6 font-semibold bg-acewall-main text-white rounded-lg ">Messages</h1>
      <div className="grid md:grid-cols-[1fr_1.5fr] border border-gray-200 rounded-lg overflow-hidden max-w-6xl mx-auto my-4 h-[calc(100vh-2rem)]">
        
        <ConversationList
          activeConversation={activeConversation}
          onSelectConversation={setActiveConversation}
        />
        <ChatWindow contactName={activeConversation} />
      </div>
    </div>
  );
};

export default TeacherMessages;
