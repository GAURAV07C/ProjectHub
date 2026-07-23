import React from "react";
import { CardTitle } from "../ui/card";
import { Notification } from "@/types";

interface NotificationHeaderProps {
  notifications: Notification[];
}

const NotificationHeader: React.FC<NotificationHeaderProps> = ({ notifications }) => {
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="flex items-center justify-between">
      <CardTitle>Notifications</CardTitle>
      {unreadCount > 0 && (
        <span className="text-sm text-muted-foreground">
          {unreadCount} unread
        </span>
      )}
    </div>
  );
};

export default NotificationHeader;
