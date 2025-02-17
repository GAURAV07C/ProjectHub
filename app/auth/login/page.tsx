import LoginForm from "@/components/auth/login-form";

// import { redirect } from "next/navigation";

const Page = async () => {
  // const session = await auth();
  // if (session) redirect(`/user/${session.user?.id}`);

  return (
    <div>
      <LoginForm  />
    </div>
    
  );
};

export default Page;
