'use client'

import { useRouter } from 'next/navigation';
import React from 'react'

interface LoginButtonProps {
    children: React.ReactNode;
    mode?: "modal"| "redirect",
    asChild?: boolean
}


const LoginButton = ({
    children,
    mode='redirect',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    asChild
}:LoginButtonProps) => {
   
    const router = useRouter();
    const onClick = () => {
      router.push("auth/login");
      console.log("Login button ");
    };


    if(mode === 'modal'){
        return (
            <span>
                {children}
            </span>
        )
    }

  return (
    <span className="cursor-pointer" onClick={onClick}>
      {children}
    </span>
  );

}

export default LoginButton
