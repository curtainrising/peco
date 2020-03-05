import React, { useState } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { loginRequest } from '../../redux/actionCreators'
import Form from '../common/Form';
import res from '../../res';

const LoginPage = (props) => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const inputs = [
    {type: 'input', variable: 'userName', value: ''},
    {type: 'input', variable: 'password', value: ''},
    {type: 'button', onClick: (data) => {
      dispatch(loginRequest(data));
    }, description: res.loginButton}
  ];

  return (
    <Form
      inputs={inputs}
    />
  )
}

export default withRouter(LoginPage);
