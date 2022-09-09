import type { NextPage } from 'next';
import { Header } from '../components/header';
import { useMeQuery } from '../generated/graphql';

const Home: NextPage = () => {

  const {data} = useMeQuery();
  const me = data?.me

  return (
    <Header user={me} />
  )
}

export default Home
