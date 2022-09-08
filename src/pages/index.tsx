import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { gql } from "@apollo/client";
import client from "../../apollo-client";
import {Header} from "../components/header"

export async function getStaticProps() {
    
    const { data } = await client.query({
      query: gql`
      query{
        me{
          name,
          age
        }
      }
    `
    })

    return {
      props: {
        user: data.me,
      }
    }
}

const Home: NextPage = ({user}: any) => {
  return (
    <div>
      <Header user={user}/>
    </div>
  )
}

export default Home
