import ChatBase from '@/components/chat/ChatBase'
import React from 'react'

type ChatParamsID = {
    params: {
        id: string
    }
}

const page: React.FC<ChatParamsID> = ({params}) => {

  return (
    <div>
      <p>Hello This is message</p>
        <ChatBase groupId={params.id} />
    </div>
  )
}

export default page;