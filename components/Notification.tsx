"use client";

import React, { useEffect, useState } from "react";
import { NotificationsSkeleton } from "./NotificationSkelton";
import { Card, CardContent, CardHeader } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { Notification } from "@/types";

import NotificationHeader from "./parts/NotificationHeader";
import { NotificationItem } from "./parts/NotificationItem";
import { useCachedFetch } from "@/hooks/useCachedFetch";

const NotificationComponent = () => {
  const { data, loading: isLoading } = useCachedFetch<Notification[]>({
    key: "notifications",
    fetchFn: async () => {
      const res = await fetch("/api/notifications");
      const fetchedData = await res.json();
      return fetchedData;
    },
  });

  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    if (data) {
      setNotifications(data);
      const unreadsIds = data.filter((n: Notification) => !n.read).map((n: Notification) => n.id);
      if (unreadsIds.length > 0) {
        fetch("/api/notifications", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ notificationIds: unreadsIds }),
        }).catch(console.error);
      }
    }
  }, [data]);

  if (isLoading && !data)
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
