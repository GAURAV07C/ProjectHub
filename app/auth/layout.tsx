import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen flex items-center justify-center   bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-sky-400 to-blue-400 ">
      {children}
    </div>
  );
};

export default AuthLayout;
