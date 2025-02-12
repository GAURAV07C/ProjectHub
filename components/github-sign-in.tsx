import { signIn } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { IoLogoGithub } from "react-icons/io";
// import { Github } from "@/components/ui/github";

const GithubSignIn = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("github");
      }}
    >
      <Button className="w-full" variant="outline">
        <IoLogoGithub />
        Continue with GitHub
      </Button>
    </form>
  );
};

export { GithubSignIn };
