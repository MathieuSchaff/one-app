"use client";

import { Button } from "./ui/button"
import { signOut } from "next-auth/react";
export const LogoutBtn = () => {
  return (
    <Button onClick={() => signOut({
      redirect: true,
      callbackUrl: `${window.location.origin}/sign-in`
    })} size='lg' variant='destructive'>
      Logout
    </Button >
  )
}

