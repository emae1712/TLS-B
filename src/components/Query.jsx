import React from 'react';
import Header from './Header';
import '../styles/App.scss';

const Query = () => {
  console.log('Query');
  return (
    <>
      <Header />
      <div className="query__container">
        <h1> Query</h1>
      </div>
    </>
  );
};
export default Query;
