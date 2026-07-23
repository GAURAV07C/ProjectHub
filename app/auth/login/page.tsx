import LoginForm from "@/components/auth/login-form";
import { Suspense } from "react";

const Page = async () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
};

export default Page;
