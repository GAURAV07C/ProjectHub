/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useState } from "react";
import { NotificationsSkeleton } from "./NotificationSkelton";
import {
  getNotification,
  markedNoitificationAsRead,
} from "@/actions/notification";
import toast from "react-hot-toast";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { Avatar, AvatarImage } from "./ui/avatar";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { HeartIcon, MessageCircleIcon, UserPlusIcon } from "lucide-react";

type Notifications = Awaited<ReturnType<typeof getNotification>>;

type Notification = Notifications[number];


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



const NotificationComponent = ({ userId }: { userId: string }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchNotification = async () => {
      setIsLoading(true);

      try {
        const data = await getNotification(userId);
        setNotifications(data);

        const unreadsIds = data.filter((n) => !n.read).map((n) => n.id);

        if (unreadsIds.length > 0)
          await markedNoitificationAsRead(userId, unreadsIds);
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
        {" "}
        <NotificationsSkeleton />{" "}
      </div>
    );

  return (
    <div>
    
      <div className="space-y-4">
        <Card>
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <CardTitle>Notifications</CardTitle>
              <span className="text-sm text-muted-foreground">
                {notifications.filter((n) => !n.read).length} unread
              </span>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[calc(100vh-12rem)]">
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-muted-foreground">
                  No notifications yet
                </div>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
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
                            {notification.creator.name ??
                              notification.creator.userName}
                          </span>{" "}
                          {notification.type === "FOLLOW"
                            ? "started following you"
                            : notification.type === "LIKE"
                            ? "liked your.poroject"
                            : "commented on your.poroject"}
                        </span>
                      </div>

                      {notification.poroject &&
                        (notification.type === "LIKE" ||
                          notification.type === "COMMENT") && (
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

                            {notification.type === "COMMENT" &&
                              notification.comment && (
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
