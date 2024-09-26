"use client";

import { getSocket } from '@/lib/socket.config'
import React, { useEffect, useMemo } from 'react'
import {v4 as uuidV4} from "uuid"
import { Button } from '../ui/button';

interface ChatBaseProps {
    groupId: string;
}

const ChatBase: React.FC<ChatBaseProps> = ({groupId}) => {

    let socket = useMemo(() => {
        const ws = getSocket();
        ws.auth = {
            room: groupId
        };
        return ws.connect();
    }, [])

    useEffect(() => {
        socket.on("connect", () => {
            console.log("Socket Connected :- ", socket.id);
        })

        socket.on("message", (data) => {
            console.log("The Room Socket data is", data)
        });

        return () => { // The separate return function is known as the "cleanup function" or "cleanup phase." It is executed when the component unmounts or when the dependencies specified in the dependency array ([] in your case) change. meaning the effect runs only once when the component mounts, and the cleanup function is called when the component unmounts.
            socket.disconnect();
        }
    }, []);

    const handleMessage = () => {
        if(socket){
            socket.emit("sent-message", {name: "Hasan"+Date.now(), id: uuidV4()})
        }else{
            console.error("Socket not connected successfully !")
        }
    }

  return (
    <>
    <div>ChatBase</div>
    <Button onClick={handleMessage}>Sent Message</Button>
    </>
  )
}

export default ChatBase;