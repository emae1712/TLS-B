import React from 'react';
import { auth } from '../firebase/fb-configuration';
import Query from './Query';
import RegisterTable from './Table';

const Home = () => {
  console.log('home');
  return (
    <div>
      <h1> Home</h1>
      <button type="button" onClick={() => auth.signOut()}>sign out</button>
      <Query />
      <RegisterTable />
    </div>
  );
};
export default Home;
