import React from 'react';
import { connect } from 'react-redux';
import { NavLink, Link, withRouter} from "react-router-dom";
import styled from 'styled-components';
import { logout } from '../redux/actionCreators';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit() {
    console.log('logout');
    localStorage.removeItem('user');
    this.props.dispatch(logout());
  }
  render() {
    console.log('location',this.props.location);
    if(this.props.user.isAtuhenticated){
      return (
        <div className="topnav">
          <NavLink to="/" activeClassName="is-active" exact={true}>Dashboard</NavLink>
          <NavLink to="/classes" activeClassName="is-active">Classes</NavLink>
          <NavLink to="/teachers" activeClassName="is-active">Teachers</NavLink>
          <NavLink to="/students" activeClassName="is-active">Students</NavLink>
          <NavLink to="/upload" activeClassName="is-active">Upload</NavLink>
          <a className="pull-right" onClick={this.handleSubmit}>Log Out</a>
        </div>
      )
    } else {
      return (
        <div className="topnav">
            <NavLink className="pull-right" to="/login" activeClassName="is-active" exact={true}>Login</NavLink>
            <NavLink className="pull-right" to="/signup" activeClassName="is-active">Sign Up</NavLink>
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

export default withRouter(connect(mapStateToProps)(Header));
