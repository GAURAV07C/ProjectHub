import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import SettingsPageClient from "@/components/settings/SettingsPageClient";

const SettingsPage = async () => {
  const session = await auth();
  if (!session?.user?.id) {
    notFound();
  }

  const headersList = await headers();
  const host = headersList.get("host") || "localhost:3000";
  const protocol = headersList.get("x-forwarded-proto") || "http";
  const baseUrl = `${protocol}://${host}`;

  const settingsRes = await fetch(`${baseUrl}/api/settings`, {
    cache: "no-store",
  });

  if (!settingsRes.ok) {
    notFound();
  }

  const user = await settingsRes.json();

  return (
    <div className="max-w-4xl mx-auto">
      <SettingsPageClient user={user} />
    </div>
  );
};

export default SettingsPage;
