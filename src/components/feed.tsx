import React from 'react'
import { useGetPostsQuery, User, MeDocument } from '../generated/graphql';
import NextLink from "next/link";


type FeedProps = {
  
}

export const Feed = ({ user }: any) => {

  let body = null;
  const posts = useGetPostsQuery(); 

  if(!user){
    body= (
      <div className='w-1/2 text-center p-4 border-2 border-black m-auto mt-12'>
            Register or login to access your feed
      </div>
    )
  } else {
    body = (
      <div className='w-1/2 text-center p-4 border-2 border-black m-auto mt-12'>
        <p className='m-4'> Feed for {user.name} </p>
        {posts.data?.posts.map(element => (
        <div>
            <p>{element.title}</p>
            <p>{element.author.name}</p>
        </div>))}
      </div>
    ) 
  }
  
  return body;
}
