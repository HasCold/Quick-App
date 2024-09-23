"use client";

import { getSocket } from '@/lib/socket.config'
import React, { useEffect, useMemo } from 'react'
import {v4 as uuidV4} from "uuid"
import { Button } from '../ui/button';

const ChatBase = () => {

    let socket = useMemo(() => {
        const ws = getSocket();
        return ws.connect();
    }, [])

    useEffect(() => {
        socket.on("connect", () => {
            console.log("Socket Connected :- ", socket.id);
        })

        socket.on("server-msg", (data: any) => {
            console.log("The server socket data is", data)
        })

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