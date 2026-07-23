import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface AuthButtonsProps {
  isLoggedIn: boolean;
}

const AuthButtons: React.FC<AuthButtonsProps> = ({ isLoggedIn }) => {
  if (isLoggedIn) return null;

  return (
    <div className="flex space-x-4">
      <Link href="/auth/login">
        <Button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold shadow-md">
          Sign In
        </Button>
      </Link>
      <Link href="/auth/signup">
        <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold shadow-md">
          Sign Up
        </Button>
      </Link>
    </div>
  );
};

export default AuthButtons;
