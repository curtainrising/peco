import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class HomePage extends React.Component {
  render() {
    if(this.props.user.isAtuhenticated){
      return (
        <div>
          <h1>Home</h1>
        </div>
      )
    } else {
      return (
        <div>
          <h1>Cool</h1>
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(HomePage);
