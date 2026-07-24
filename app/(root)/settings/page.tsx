import { redirect, notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { getUserById } from "@/data/user";
import SettingsPageClient from "@/components/settings/SettingsPageClient";

const SettingsPage = async () => {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/auth/login");
  }

  const user = await getUserById(session.user.id);

  if (!user) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto">
      <SettingsPageClient user={user} />
    </div>
  );
};

export default SettingsPage;
