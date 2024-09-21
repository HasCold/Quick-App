import ChatBase from '@/components/chat/ChatBase'
import React from 'react'

type ChatParamsID = {
    params: {
        id: string
    }
}

const page: React.FC<ChatParamsID> = ({params}) => {

    console.log("The group ID is :-", params.id)

  return (
    <div>
        <ChatBase />
    </div>
  )
}

export default page;