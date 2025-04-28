import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

export default function ConversationItem({ conversation, isActive, onClick }) {
  // const { name, avatar, message, time, unread, online } = conversation

  return (
    <div
      className={cn(
        "flex items-center gap-3 p-4 cursor-pointer hover:bg-gray-50 transition-colors",
        isActive && "bg-green-50",
      )}
      onClick={onClick}
    >
      <div className="relative">
        <Avatar className="h-12 w-12">
          <AvatarImage src={conversation.profileImg} alt={conversation.firstName} />
          <AvatarFallback>
            {conversation.firstName}
          </AvatarFallback>
        </Avatar>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center">
          <h3 className="font-medium text-sm">{conversation.firstName}</h3>
          {/* <span className="text-xs text-gray-500">{time}</span> */}
        </div>
        {/* <p className="text-sm text-gray-500 truncate">{message}</p> */}
      </div>

      {/* {unread && <div className="h-2 w-2 rounded-full bg-orange-500" />} */}
    </div>
  )
}

