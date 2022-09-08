import React from 'react'
import { gql } from "@apollo/client";
import client from "../../apollo-client";


type HeaderProps = {
  user?: any,
}

export const Header = ({ user }: HeaderProps) => {
  return (
    <div className='w-full h-24 flex justify-start'>
      <img className="ml-8 mt-2" src="unit-logo-small.png" alt="logo"/>
      <h1 className="mt-8 text-4xl font-textFont">Unit</h1>
      <p className="mt-8 text-xl font-textFont justify-self-end">{user?.name}</p>
    </div>
  )
}

