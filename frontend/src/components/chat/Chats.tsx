"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getSocket } from "@/lib/socket.config";
import { v4 as uuidv4 } from "uuid";
import { ChatGroupType, ChatGroupUserType, MessageType } from "@/types";
import fetchMessages from "@/hooks/fetchMessages";
import { useParams } from "next/navigation";

export default function Chats({
  group,
  chatUser,
}: {
  group: ChatGroupType;
  chatUser?: ChatGroupUserType;
}) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Array<MessageType>>([]);
  const [lastMessageId, setLastMessageId] = useState(null);
  const [loading, setLoading] = useState<Boolean>(false);
  const [hasMore, setHasMore] = useState<Boolean>(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  let observer = useRef<IntersectionObserver | null>(null);

  const params = useParams();

  const getMessages = async () => {
    if(loading) true;
    setLoading(true)

    const newMessages = await fetchMessages(params.id as string, lastMessageId!);

    if(newMessages.length === 0){
      setHasMore(false);
    }

    setMessages(prevMessage => [...prevMessage, ...newMessages]);

    if(newMessages.length > 0){
      setLastMessageId(newMessages[newMessages.length - 1].id);
    }

    setLoading(false)
  }

  useEffect(() => {

    const options = {
      root: null,
      rootMargin: "70px", // A value of "70px" means the intersection will trigger 70 pixels before the element actually enters the viewport.
      threshold: 0.5, // 0 means it will trigger as soon as any part of the element appears in the viewport (even 1 pixel).
    }

    observer.current = new IntersectionObserver((enteries) => {
      if(loading || !hasMore) return;
      if(enteries[0].isIntersecting){
        getMessages();
      }
    }, options);

    const lastMessage = document.getElementById("last-message");

    if(lastMessage){
      observer.current.observe(lastMessage);
    }

    return () => { // This is the cleanup function in useEffect. It ensures that when the component unmounts or when loading or hasMore changes, the observer stops observing the target element to avoid memory leaks.
      observer.current?.disconnect();
    }

  }, [loading, hasMore]);

  useEffect(() => {
    getMessages();
  }, []);

  const scrollToBottom = () => {
    // useRef hook can directly access the DOM elements
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  let socket = useMemo(() => {
    const ws = getSocket();
    ws.auth = {
      room: group.id,
    };
    return ws.connect();
  }, []);
  
  useEffect(() => {
    socket.on("message", (data: MessageType) => {
      setMessages((prevMessages) => [...prevMessages, data]);
      scrollToBottom();
    });

    return () => {
      setMessages([]);
      socket.disconnect();
    };
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const payload: MessageType = {
      id: uuidv4(),
      message: message,
      name: chatUser?.name ?? "Unknown",
      created_at: new Date().toISOString(),
      group_id: group.id,
    };

    socket.emit("message", payload);
    setMessage("");
    setMessages([...messages, payload]);
  };

  return (
    <div className="flex flex-col h-[94vh]  p-4">
      <div className="flex-1 overflow-y-auto flex flex-col-reverse">
        <div ref={messagesEndRef} />
        <div className="flex flex-col gap-2" >
          {messages?.map((message, index) => (
            <div
              key={index}
              id={index === 0 ? "last-message" : undefined} // Attach observer only to the first (oldest) message
              className={`max-w-sm rounded-lg p-2 break-words overflow-hidden ${
                message.name === chatUser?.name
                  ? "bg-gradient-to-r from-blue-400 to-blue-600  text-white self-end"
                  : "bg-gradient-to-r from-gray-200 to-gray-300 text-black self-start"
              }`}
            >
              {message.message}
            </div>
          ))}
        </div>
      </div>
      <form onSubmit={handleSubmit} className="mt-2 flex items-center">
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          className="flex-1 p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setMessage(e.target.value)}
        />
      </form>
    </div>
  );
}