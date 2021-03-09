import React from 'react';
import { auth } from '../firebase/fb-configuration';

const Home = () => {
  console.log('home');
  return (
    <div>
      <h1> Home</h1>
      <button type="button" onClick={() => auth.signOut()}>sign out</button>

    </div>
  );
};
export default Home;
