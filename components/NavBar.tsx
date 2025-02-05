import React from "react";

import { auth, signIn, signOut } from "@/auth";

const NavBar = async () => {
  const session = await auth();
  
  return (
    <div className="flex justify-between items-center p-4">
      {session && session?.user ? (
        <>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <button type="submit" className="text-6 font-sans">
              {session?.user?.email}
              Logout
            </button>
          </form>
        </>
      ) : (
        <>
          <form
            action={async () => {
              "use server";
              await signIn("github");
            }}
          >
            <button type="submit" className="text-6 font-sans">
              Login
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default NavBar;
