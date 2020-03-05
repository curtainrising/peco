import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const HomePage = (props) => {
  const user = useSelector(state => state.user);
  if(user.authToken){
    return (
      <div>
        <h1>logged in</h1>
      </div>
    )
  } else {
    return (
      <div>
        <h1>logged out</h1>
      </div>
    )
  }
}

export default HomePage
