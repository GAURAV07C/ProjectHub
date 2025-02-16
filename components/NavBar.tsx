import React from "react";
import { auth, signOut } from "@/lib/auth";
import Link from "next/link";

const NavBar = async () => {
  const session = await auth(); // Get session info

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-100 shadow-md">
      <h1 className="text-xl font-semibold">My App</h1>

      {session && session.user ? (
        <div>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <button
              type="submit"
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Logout
            </button>
          </form>
          {session.user?.name}
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <Link
            href="/auth/login"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Sign In
          </Link>
          <Link
            href="/auth/signup"
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Sign Up
          </Link>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
