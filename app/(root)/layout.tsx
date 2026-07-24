import React from "react";
import NavBar from "@/components/Nav/NavBar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavBar />
      <div className="pt-16">
        {children}
      </div>
    </>
  );
}
