"use client"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from 'react'

interface BackButtonProps{
    label:string;
    href:string;
}

const BackButton = ({
    href,
    label
}:BackButtonProps) => {
  return (
    <Button
    variant={'link'}
    className="font-normal w-full"
    size='sm'
    asChild
    >
        <Link href={href}>
        {label}
        
        </Link>
    </Button>
  )
}

export default BackButton
