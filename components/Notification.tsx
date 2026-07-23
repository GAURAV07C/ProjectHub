"use client";

import React, { useEffect, useState } from "react";
import { NotificationsSkeleton } from "./NotificationSkelton";
import toast from "react-hot-toast";
import { Card, CardContent, CardHeader } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { Notification } from "@/types";

import NotificationHeader from "./parts/NotificationHeader";
import { NotificationItem } from "./parts/NotificationItem";

const NotificationComponent = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchNotification = async () => {
      setIsLoading(true);

      try {
        const res = await fetch("/api/notifications");
        const data = await res.json();
        setNotifications(data);

        const unreadsIds = data.filter((n: Notification) => !n.read).map((n: Notification) => n.id);

        if (unreadsIds.length > 0) {
          await fetch("/api/notifications", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ notificationIds: unreadsIds }),
          });
        }
      } catch (error) {
        toast.error("Failed to fetch notification ");
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotification();
  }, []);

  if (isLoading)
    return (
      <div>
        <NotificationsSkeleton />
      </div>
    );

  return (
    <div>
      <div className="space-y-4">
        <Card>
          <CardHeader className="border-b">
            <NotificationHeader notifications={notifications} />
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[calc(100vh-12rem)]">
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-muted-foreground">
                  No notifications yet
                </div>
              ) : (
                notifications.map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                  />
                ))
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NotificationComponent;
