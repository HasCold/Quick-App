"use client";

import { getSocket } from '@/lib/socket.config'
import React, { useEffect, useMemo } from 'react'
import {v4 as uuidV4} from "uuid"
import { Button } from '../ui/button';

const ChatBase = () => {

    let socket = useMemo(() => {
        const ws = getSocket();
        console.log("get Socket :-", ws)
        return ws.connect();
    }, [])

    useEffect(() => {
        socket.on("connect", () => {
            console.log("Socket Connected :- ", socket.id);
        })

        socket.on("message", (data: any) => {
            console.log("The socket data is", data)
        })

        return () => { // The separate return function is known as the "cleanup function" or "cleanup phase." It is executed when the component unmounts or when the dependencies specified in the dependency array ([] in your case) change. meaning the effect runs only once when the component mounts, and the cleanup function is called when the component unmounts.
            socket.disconnect();
        }
    }, []);

    const handleMessage = () => {
        socket.emit("sent-message", {name: "Hasan", id: uuidV4()})
    }

  return (
    <>
    <div>ChatBase</div>
    <Button onClick={handleMessage}>Sent Message</Button>
    </>
  )
}

export default ChatBase;