import { useEffect, useRef } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

export default function MessageList({ messages, contactName, contactAvatar }) {
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Group messages by date
  const groupedMessages = {}
  messages.forEach((message) => {
    if (!groupedMessages[message.date || "Today"]) {
      groupedMessages[message.date || "Today"] = []
    }
    groupedMessages[message.date || "Today"].push(message)
  })

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-6">
      {Object.entries(groupedMessages).map(([date, dateMessages]) => (
        <div key={date} className="space-y-4">
          <div className="flex justify-center">
            <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">{date}</span>
          </div>

          {dateMessages.map((message) => (
            <div key={message.id} className={cn("flex gap-3", message.sender === "me" && "justify-end")}>
              {message.sender !== "me" && (
                <div className="flex-shrink-0 mt-1">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={contactAvatar} alt={contactName} />
                    <AvatarFallback>
                      {contactName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </div>
              )}

              <div
                className={cn(
                  "max-w-[70%] rounded-2xl px-4 py-2 text-sm",
                  message.sender === "me" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-800",
                )}
              >
                {message.content}
                <div className={cn("text-xs mt-1", message.sender === "me" ? "text-green-200" : "text-gray-500")}>
                  {message.time}
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  )
}

