"use client";

import React, { useEffect, useState } from 'react'
import ChatSidebar from './ChatSidebar';
import { ChatGroupType, ChatGroupUserType, MessageType } from '@/types';
import ChatNav from './ChatNav';
import ChatUserDialog from './ChatUserDialog';
import Chats from './Chats';

interface ChatBaseProps {
    group: ChatGroupType;
    users: Array<ChatGroupUserType> | []; 
}

const ChatBase: React.FC<ChatBaseProps> = ({group, users}) => {

    const [open, setOpen] = useState(true);
    const [chatUser, setChatUser] = useState<ChatGroupUserType>()

  useEffect(() => {
    const data = window.localStorage.getItem(group.id);
    if(data){
      const pData = JSON.parse(data);
      setChatUser(pData);
    }

  }, [group.id])

  return (
    <div className='flex'>
        <ChatSidebar users={users} />
        <div className='w-full md:w-4/5 bg-gradient-to-b from-gray-50 to-white'>
            {open ? <ChatUserDialog open={open} setOpen={setOpen} group={group} /> : <ChatNav chatGroup={group} users={users}  /> }
        
            <Chats group={group} chatUser={chatUser} />
        </div>
    </div>
  )
}

export default ChatBase;