import { getServerSession } from 'next-auth';
import React from 'react'
import { authOptions, CustomSession } from '../api/auth/[...nextauth]/options';
import DashNav from '@/components/DashNav';
import CreateChat from '@/components/groupChat/CreateChat';
import fetchChatGroups from '@/hooks/groupFetch';
import { ChatGroupType } from '@/types';
import GroupChatCard from '@/components/groupChat/GroupChatCard';

const page = async () => {
  
  const session: CustomSession | null = await getServerSession(authOptions)

  const groups: Array<ChatGroupType> | [] = await fetchChatGroups(session?.user?.token!)

  return (
    <div>
      <DashNav name={session?.user?.name!} image={session?.user?.image ?? undefined} />
      
      <div className='container'>
      <div className='flex justify-end'>
        <CreateChat user={session?.user!} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {groups.length > 0 &&
            groups.map((item, index) => (
              <GroupChatCard group={item} key={index} user={session?.user!} />
            ))}
        </div>
      </div>

    </div>
  )
}

export default page;