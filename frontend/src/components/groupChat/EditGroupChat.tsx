"use client";

import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";

import { CustomerUser } from "@/app/api/auth/[...nextauth]/options";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { clearCache } from "@/actions/common";
import { ChatGroupType } from "@/types";
import { createChatSchemaType, createChatValidation } from "@/validations/groupChat.Validation";
import { EDIT_CHAT_GROUP_URL } from "@/lib/apiEndPoints";

const EditGroupChat = ({
    user,
    group,
    open,
    setOpen,
}: {
    user: CustomerUser,
    group: ChatGroupType,
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>
}) => {

    const [loading, setLoading] = useState(false);

    const {
      register,
      handleSubmit,
      setValue,
      formState: { errors },
    } = useForm<createChatSchemaType>({
      resolver: zodResolver(createChatValidation),
    });
  
    useEffect(() => {
      setValue("title", group.title);
      setValue("passcode", group.passcode);
    }, [group]);
  
    const onSubmit = async (payload: createChatSchemaType) => {
      // console.log("The payload is", payload);
      try {
        setLoading(true);
        const { data } = await axios.put(`${EDIT_CHAT_GROUP_URL}/${group.id}`, payload, {
          headers: {
            Authorization: user.token,
          },
        });
  
        if (data?.responseObj?.success) {
          setOpen(false);
          toast.success(data?.responseObj?.message);
          clearCache("dashboard");
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        if (error instanceof AxiosError) {
          toast.error(error.message);
        } else {
          toast.error("Something went wrong.please try again!");
        }
      }
    };  

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Update group chat</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-4">
            <Input placeholder="Enter chat title" {...register("title")} />
            <span className="text-red-400">{errors.title?.message}</span>
          </div>
          <div className="mt-4">
            <Input placeholder="Enter passcode" {...register("passcode")} />
            <span className="text-red-400">{errors.passcode?.message}</span>
          </div>
          <div className="mt-4">
            <Button className="w-full" disabled={loading}>
              {loading ? "Processing..." : "Submit"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default EditGroupChat;