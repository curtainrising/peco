import React, { useState } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { registerRequest } from '../../redux/actionCreators'
import Form from '../common/Form';
import res from '../../res';

const RegisterPage = (props) => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  if (user.authToken) {
    props.history.push('/');
  }
  const inputs = [
    {type: 'input', variable: 'firstName', value: ''},
    {type: 'input', variable: 'lastName', value: ''},
    {type: 'input', variable: 'userName', value: ''},
    {type: 'input', variable: 'password', value: ''},
    {type: 'input', variable: 'passwordCheck', value: ''},
    {type: 'button', onClick: (data) => {
      dispatch(registerRequest(data));
    }, description: res.registerButton}
  ];

  return (
    <Form
      inputs={inputs}
    />
  )
}
export default withRouter(RegisterPage);
