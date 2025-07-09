import { useContext, useEffect, useState } from "react";
import { MoreHorizontal, Send, Edit } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { axiosInstance } from "@/lib/AxiosInstance";
import { useParams } from "react-router-dom";
import { GlobalContext } from "@/Context/GlobalProvider";
import MessageList from "./messages-list";
import avatar from "../../assets/avatar.png";

export default function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const { user, socket, currentConversation } = useContext(GlobalContext);
  const activeConversation = useParams().id;

  // Real-time message subscription
  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axiosInstance.get(`/messeges/get/${activeConversation}`);
        setMessages(res.data.messages);
      } catch (err) {
        console.log(err);
      }
    };

    const handleNewMessage = (message) => {
      setMessages((prev) => [...prev, message]);
    };

    getMessages();
    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [activeConversation, socket]);

  // Handle message sending
  const handleSendMessage = async () => {
    if (!newMessage.trim() || isSending) return;

    setIsSending(true);
    try {
      const res = await axiosInstance.post(`/messeges/create/${activeConversation}`, {
        text: newMessage,
      });

      setMessages((prev) => [...prev, res.data.newMessage]);
      setNewMessage("");

      socket.emit("sendMessage", {
        senderId: user._id,
        receiverId: activeConversation,
        text: newMessage,
      });
    } catch (err) {
      console.log(err);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="flex flex-col h-full overflow-auto hide-scrollbar">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={currentConversation?.otherMember?.profileImg?.url || avatar} />
            <AvatarFallback>{currentConversation?.otherMember?.name}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium">{currentConversation?.otherMember?.name}</h3>
          </div>
        </div>
      </div>

      {/* Messages */}
      <MessageList
        messages={messages}
        contactName={"contactName"}
        contactAvatar={"contact?.avatar"}
      />

      {/* Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Type your message"
              className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              disabled={isSending}
            />
          </div>

          {/* Send Button */}
          <Button
            disabled={isSending}
            className={`bg-green-600 hover:bg-green-700 rounded-full h-12 w-12 flex items-center justify-center ${
              isSending ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleSendMessage}
          >
            {isSending ? (
              <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Send className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
