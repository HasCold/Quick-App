"use client";

import React, { Suspense, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import dynamic from "next/dynamic";
import EditGroupChat from "./EditGroupChat";
import { toast } from "sonner";
import Env from "@/lib/env";
import { ChatGroupType } from "@/types";
import { CustomerUser } from "@/app/api/auth/[...nextauth]/options";
const DeleteChatGroup = dynamic(() => import("./DeleteChatGroup"), {ssr: false});

const GroupChatCardMenu = ({
  group,
  user,
}: {
  group: ChatGroupType;
  user: CustomerUser;
}) => {
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [editDialoag, setEditDialog] = useState(false);

  const handleCopy = () => {
    navigator.clipboard?.writeText(`${Env.APP_URL}/chat/${group.id}`);
    toast.success("Link copied successfully!");
  };

  return (
    <>
      {deleteDialog && (
        <Suspense fallback={<p>Loading...</p>}>
          <DeleteChatGroup
            open={deleteDialog}
            setOpen={setDeleteDialog}
            groupId={group.id}
            token={user.token!}
          />
        </Suspense>
      )}
      {editDialoag && (
        <Suspense fallback={<p>Loading...</p>}>
          <EditGroupChat
            open={editDialoag}
            setOpen={setEditDialog}
            user={user}
            group={group}
          />
        </Suspense>
      )}

      <DropdownMenu>
        <DropdownMenuTrigger>
          <DotsVerticalIcon className="h-5 w-5" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={handleCopy}>Copy</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setEditDialog(true)}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setDeleteDialog(true)}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export default GroupChatCardMenu;