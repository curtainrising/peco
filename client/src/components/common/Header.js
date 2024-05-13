import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Link, withRouter} from "react-router-dom";
import styled from 'styled-components';
import { logout } from '../../redux/actionCreators';
import res from '../../res';

const Header = (props) => {
  const state = useSelector(state => state);
  console.log('state', state);
  console.log('url', process.env)
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    props.history.push('/');
  }
  const schoolText = state.school.school.schoolId ? res.mySchool : res.joinSchool;
  if(state.user.authToken){
    return (
      <div className="topnav">
        <NavLink to="/" activeClassName="is-active" exact={true}>Dashboard</NavLink>
        <NavLink to="/school" activeClassName="is-active">{schoolText}</NavLink>
        {state.school.school.schoolId && <NavLink to="/classes" activeClassName="is-active">Classes</NavLink>}
        {state.school.school.schoolId && <NavLink to="/teachers" activeClassName="is-active">Teachers</NavLink>}
        {state.school.school.schoolId && <NavLink to="/students" activeClassName="is-active">Students</NavLink>}
        {state.school.school.schoolId && <NavLink to="/upload" activeClassName="is-active">Upload</NavLink>}
        <a className="pull-right" onClick={handleLogout}>Log Out</a>
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

export default withRouter(Header);
