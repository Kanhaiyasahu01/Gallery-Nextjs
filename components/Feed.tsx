import React from 'react'
import PostInput from './PostInput'
import Posts from './Posts'

const Feed = ({ user }: { user: any }) => {
    const userData = JSON.parse(JSON.stringify(user)); // we can not send object from server component to client component that why we have to convert it into JSON

  return (
    <div className='flex-1 '>
        <PostInput user = {userData}/>
        <Posts />

    </div>
  )
}

export default Feed