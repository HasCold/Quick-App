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
    if(newMessages.length < 10){
      setHasMore(false);
    }

    setMessages(prevMessage => [...prevMessage, ...newMessages]);
    console.log("Messages :- ",messages);

    if(newMessages.length > 0){
      setLastMessageId(newMessages[newMessages.length - 1].id);
    }

    setLoading(false)
  }

  useEffect(() => {
    getMessages();
  }, []);

  // useRef hook can directly access the DOM elements
  let lastMessageRef = useCallback((node: HTMLDivElement) => {
      if(loading) return; 
      if(observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        
        if(entries[0].isIntersecting && hasMore){
          console.log("Entries", entries[0]);
            getMessages()
        }
      }, {
        rootMargin: "100px",  // Trigger 100px before the top of the viewport
        threshold: 0          // Trigger as soon as the first message is in view
      });

      if(node) observer.current.observe(node);

      // Observer Logic: By including loading and hasMore in the dependency array, you ensure that the lastMessageRef function is re-created whenever these values change. This way, the logic inside the useCallback (such as if (loading) return;) always works with the current state of the variables.
  }, [loading, hasMore]);

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
    console.log(payload);
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
              ref={index === messages.length - 1 ? lastMessageRef : null} // Attach observer to the last message
              className={`max-w-sm rounded-lg p-2 ${
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