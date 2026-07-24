import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import NotificationComponent from "@/components/Notification";

export const dynamic = "force-dynamic";

const page = async () => {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/auth/login");
  }

  return (
    <div>
      <NotificationComponent />
    </div>
  );
};

export default page;
