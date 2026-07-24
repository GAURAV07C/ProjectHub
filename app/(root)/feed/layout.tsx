import Sidebar from "@/components/Feed/Sidebar";
import React from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="py-6 px-4 sm:px-6 lg:px-8 max-w-[1600px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="hidden lg:block lg:col-span-3 sticky top-[72px] self-start">
          <Sidebar /> 
        </div>
        <div className="lg:col-span-9">{children}</div>
      </div>
    </main>
  );
}
