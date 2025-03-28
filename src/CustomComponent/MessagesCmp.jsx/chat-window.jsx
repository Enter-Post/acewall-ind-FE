import { useState } from "react"
import { MoreHorizontal, Send, Edit } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { getContactByName, messages as initialMessages } from "@/lib/data"
import MessageList from "./messages-list"

export default function ChatWindow({ contactName }) {
  const contact = getContactByName(contactName)
  const [messages, setMessages] = useState(initialMessages)
  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const message = {
      id: `msg-${Date.now()}`,
      sender: "me",
      content: newMessage,
      time: "now",
      isNew: true,
    }

    setMessages([...messages, message])
    setNewMessage("")
  }

  return (
    <div className="flex flex-col h-full overflow-auto hide-scrollbar">
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={contact?.avatar} alt={contactName} />
            <AvatarFallback>
              {contactName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium">{contactName}</h3>
            <p className="text-sm text-green-600">Active Now</p>
          </div>
        </div>
        {/* <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-5 w-5" />
        </Button> */}
      </div>

      <MessageList messages={messages} contactName={contactName} contactAvatar={contact?.avatar} />

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            {/* <Edit className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-600 h-5 w-5" /> */}
            <input
              type="text"
              placeholder="Type your message"
              className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            />
          </div>
          <Button
            className="bg-green-600 hover:bg-green-700 rounded-full h-12 w-12 flex items-center justify-center"
            onClick={handleSendMessage}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}

