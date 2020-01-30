import React from 'react';
import { connect } from 'react-redux';

const Profile = (props) => (
  <div>
    <h1>Profile Page</h1>
  </div>
);

const mapStateToProps = (state) => {
  return {

  };
};

export default connect(mapStateToProps)(Profile);
