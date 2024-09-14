"use client"

import React, { Dispatch, SetStateAction } from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from "@/components/ui/alert-dialog"
import { signOut } from 'next-auth/react'
  

const LogoutModal = ({
  open, setOpen
}: {
  open: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>  // This type is more commonly used for setting state in React.
}) => {

  const handleLogout = () => {
    signOut({
      callbackUrl: "/",
      redirect: true
    })
  }

  return (
        <AlertDialog open={open} onOpenChange={setOpen}>
  
  <AlertDialogContent className='bg-white'>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your 
        current session from device.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={handleLogout}>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

  )
}

export default LogoutModal;