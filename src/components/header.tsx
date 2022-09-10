import React from 'react'
import { useLogoutMutation, User, MeDocument } from '../generated/graphql';
import NextLink from "next/link";


type HeaderProps = {
  
}

export const Header = ({ user }: any) => {

  let body = null;
  const [logout] = useLogoutMutation({ refetchQueries: [{query: MeDocument}] }); 

  if(!user){
    body= (
      <div className='w-full h-24 flex justify-between'>
        <div className='flex'>
        <img className="ml-8 mt-2" src="unit-logo-small.png" alt="logo"/>
        <h1 className="mt-8 text-4xl font-textFont">Unit</h1>
        </div>
        <div className='flex mr-8'>
        <NextLink href="/register">
          <p className="mt-10 mr-4 text-xl font-textFont underline cursor-pointer"> Register</p>
        </NextLink>
        <NextLink href="/login">
          <p className="mt-10 text-xl font-textFont underline cursor-pointer"> Login</p>
        </NextLink>
        </div>
      </div>
    )
  } else {
    body = (
      <div className='w-full h-24 flex justify-between'>
        <div className='flex'>
        <img className="ml-8 mt-2" src="unit-logo-small.png" alt="logo"/>
        <h1 className="mt-8 text-4xl font-textFont">Unit</h1>
        </div>
        <div className='flex mr-8 justify-center items-center'>
        <NextLink href="/register">
          <p className="mt-1 border-2 rounded-md border-slate-800 py-1 px-4 mr-3 text-xl font-textFont cursor-pointer hover:bg-slate-400"> {user.name} </p>
        </NextLink>
        <NextLink href="/">
          <p onClick={() => {logout();}} className="text-xl font-textFont underline cursor-pointer"> Logout</p>
        </NextLink>
        </div>
      </div>
    ) 
  }
  
  return body;
}

