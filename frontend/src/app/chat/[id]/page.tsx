"use client";

import ChatBase from '@/components/chat/ChatBase'
import fetchChatGroup from '@/hooks/chatGroup'
import fetchUsers from '@/hooks/fetchUsers'
import { ChatGroupType, ChatGroupUserType } from '@/types'
import { notFound, useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

type ChatParamsID = {
    params: {
        id: string
    }
}

const page: React.FC<ChatParamsID> = async ({params}) => {

  if(params.id.length !== 36) return notFound();
  
  const group: ChatGroupType | null = await fetchChatGroup(params.id); 
  if (group === null) return notFound();
  
  const users: Array<ChatGroupUserType> | [] = await fetchUsers(params.id);

  return (
    <div>
      <ChatBase group={group} users={users} />
    </div>
  )
}

export default page;