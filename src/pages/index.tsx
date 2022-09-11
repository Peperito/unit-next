import type { NextPage } from 'next';
import { Feed } from '../components/feed';
import { Header } from '../components/header';
import { useMeQuery } from '../generated/graphql';

const Home: NextPage = () => {

  const {data} = useMeQuery();
  const me = data?.me

  return (
    <>
    <Header user={me} />
    <Feed user= {me} />
    </>
  )
}

export default Home
