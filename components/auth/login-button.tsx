'use client'

import React from 'react'

interface LoginButtonProps {
    children: React.ReactNode;
    mode?: "modal"| "redirect",
    asChild?: boolean
}

const LoginButton = ({
    children,
    mode='redirect',
    asChild
}:LoginButtonProps) => {
    const onClick = () => {
        console.log("Login button ")
    }


    if(mode === 'modal'){
        return (
            <span>
                modal
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
