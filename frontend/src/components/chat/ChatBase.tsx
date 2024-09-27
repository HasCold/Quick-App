"use client";

import { getSocket } from '@/lib/socket.config'
import React, { useEffect, useMemo, useState } from 'react'
import {v4 as uuidV4} from "uuid"
import { Button } from '../ui/button';
import ChatSidebar from './ChatSidebar';
import { ChatGroupType, ChatGroupUserType } from '@/types';
import ChatNav from './ChatNav';
import ChatUserDialog from './ChatUserDialog';

interface ChatBaseProps {
    group: ChatGroupType;
    users: Array<ChatGroupUserType> | [];
}

const ChatBase: React.FC<ChatBaseProps> = ({group, users}) => {

    // let socket = useMemo(() => {
    //     const ws = getSocket();
    //     ws.auth = {
    //         room: groupId
    //     };
    //     return ws.connect();
    // }, [])

    // useEffect(() => {
    //     socket.on("connect", () => {
    //         console.log("Socket Connected :- ", socket.id);
    //     })

    //     socket.on("message", (data) => {
    //         console.log("The Room Socket data is", data)
    //     });

    //     return () => { // The separate return function is known as the "cleanup function" or "cleanup phase." It is executed when the component unmounts or when the dependencies specified in the dependency array ([] in your case) change. meaning the effect runs only once when the component mounts, and the cleanup function is called when the component unmounts.
    //         socket.disconnect();
    //     }
    // }, []);

    // const handleMessage = () => {
    //     if(socket){
    //         socket.emit("message", {name: "Hasan"+Date.now(), id: uuidV4()})
    //     }else{
    //         console.error("Socket not connected successfully !")
    //     }
    // }

    const [open, setOpen] = useState(true);

  return (
    <div className='flex'>
        <ChatSidebar users={users} />
        <div className='w-full md:w-4/5 bg-gradient-to-b from-gray-50 to-white'>
            {open ? <ChatUserDialog open={open} setOpen={setOpen} group={group} /> : <ChatNav chatGroup={group} users={users}  /> }
        </div>
    </div>
  )
}

export default ChatBase;