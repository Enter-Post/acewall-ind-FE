import ChatWindow from "@/CustomComponent/MessagesCmp.jsx/chat-window";
import ConversationList from "@/CustomComponent/MessagesCmp.jsx/conversation-list";
import { axiosInstance } from "@/lib/AxiosInstance";
import { useEffect } from "react";
import { useState } from "react";
import { Outlet } from "react-router-dom";
// import ConversationList from "./conversation-list"
// import ChatWindow from "./chat-window"

const TeacherMessages = () => {
  const [conversations, setConversation] = useState();
  const [activeConversation, setActiveConversation] = useState();

  useEffect(() => {
    const getConversations = async () => {
      await axiosInstance
        .get("/messeges/users")
        .then((res) => {
          setConversation(res.data.users);
          console.log(res);
        })
        .catch((err) => console.log(err));
    };
    getConversations();
  }, []);

  const handleMessages = async (id) => {
    await axiosInstance
      .get(`/messeges/allmsg/${id}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h1 className="text-xl py-4 mb-8 pl-6 font-semibold bg-acewall-main text-white rounded-lg ">
        Messages
      </h1>
      <div className="grid md:grid-cols-[1fr_1.5fr] border border-gray-200 rounded-lg overflow-hidden max-w-6xl mx-auto my-4 h-[calc(100vh-2rem)]">
        <ConversationList
          activeConversation={activeConversation}
          setActiveConversation={setActiveConversation}
          conversations={conversations}
        />
        <ChatWindow activeConversation={activeConversation} />
      </div>
    </div>
  );
};

export default TeacherMessages;
