import NotificationComponent from "@/components/Notification";

import { auth } from "@/lib/auth"


const page = async () => {
  const session = await auth();
  const Id = session?.user?.id || "" ;
  return (
    <div>
      <NotificationComponent userId={Id} />
    </div>
  );
}

export default page
