import React from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { HeartIcon, MessageCircleIcon, UserPlusIcon } from "lucide-react";
import { Notification } from "@/types";

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "LIKE":
      return <HeartIcon className="size-4 text-red-500" />;
    case "COMMENT":
      return <MessageCircleIcon className="size-4 text-blue-500" />;
    case "FOLLOW":
      return <UserPlusIcon className="size-4 text-green-500" />;
    default:
      return null;
  }
};

interface NotificationItemProps {
  notification: Notification;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notification }) => {
  const typeText =
    notification.type === "FOLLOW"
      ? "started following you"
      : notification.type === "LIKE"
      ? "liked your project"
      : "commented on your project";

  return (
    <div
      className={`flex items-start gap-4 p-4 border-b hover:bg-muted/25 transition-colors ${
        !notification.read ? "bg-muted/50" : ""
      }`}
    >
      <Avatar className="mt-1">
        <AvatarImage
          src={notification.creator.image ?? "/avatar.png"}
        />
      </Avatar>
      <div className="flex-1 space-y-1">
        <div className="flex items-center gap-2">
          {getNotificationIcon(notification.type)}
          <span>
            <span className="font-medium">
              {notification.creator.name ?? notification.creator.userName}
            </span>{" "}
            {typeText}
          </span>
        </div>

        {notification.poroject &&
          (notification.type === "LIKE" || notification.type === "COMMENT") && (
            <div className="pl-6 space-y-2">
              <div className="text-sm text-muted-foreground rounded-md p-2 bg-muted/30 mt-2">
                <p>{notification.poroject.title}</p>
                {notification.poroject.imageUrl && (
                  <Image
                    src={notification.poroject.imageUrl}
                    alt="Post content"
                    className="mt-2 rounded-md w-full max-w-[200px] h-auto object-cover"
                    width={50}
                    height={50}
                  />
                )}
              </div>

              {notification.type === "COMMENT" && notification.comment && (
                <div className="text-sm p-2 bg-accent/50 rounded-md">
                  {notification.comment.content}
                </div>
              )}
            </div>
          )}

        <p className="text-sm text-muted-foreground pl-6">
          {formatDistanceToNow(new Date(notification.createdAt), {
            addSuffix: true,
          })}
        </p>
      </div>
    </div>
  );
};

export { NotificationItem };
