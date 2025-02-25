"use server";
import { prisma } from "@/lib/prisma";
export async function getNotification (userId : string) {

    if(!userId) return [];

    try {
        
        const notifications  = await prisma.notification.findMany({
            where: {
                userId: userId
            },
            include:{
                creator:{
                    select:{
                        id: true,
                        name: true,
                        userName: true,
                        image: true
                    }
                },
                poroject:{
                    select:{
                        title: true,
                        id: true,
                        imageUrl: true,
                        Link: true,
                        description: true,

                    }
                },
                comment:{
                    select:{
                        id:true,
                        content: true,
                        createdAt: true,

                    }
                },

            },

            orderBy: {
                createdAt: 'desc'
            },
            
        })

        return notifications;
 
        

    } catch (error) {
        console.log(error);
        return [];
    }



}

export async function markedNoitificationAsRead (userId : string , notificationIds : string[]) {

    try{
        await prisma.notification.updateMany({
            where: {
                id: {
                    in: notificationIds
                }
            },
            data: {
                read: true
            }
        })

        return { success: true      } ;
    } catch (error) {
        console.log(error);
        return { success: false      } ;
    }
}