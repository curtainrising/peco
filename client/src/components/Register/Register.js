import React, { useState } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { registerRequest, updateUiError } from '../../redux/actionCreators'
import Form from '../common/Form';
import res from '../../res';
import { ERRORS } from '../../helpers/constants';

const RegisterPage = (props) => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  if (user.authToken) {
    props.history.push('/');
  }
  const inputs = [
    {type: 'input', variable: 'firstName', value: '', errors: [ERRORS.NO_VALUE.code]},
    {type: 'input', variable: 'lastName', value: '', errors: [ERRORS.NO_VALUE.code]},
    {type: 'input', variable: 'userName', value: '', errors: [ERRORS.USER_EXISTS.code, ERRORS.NO_VALUE.code]},
    {type: 'input', variable: 'password', value: '', errors: [ERRORS.NO_VALUE.code]},
    {type: 'input', variable: 'passwordCheck', value: '', match: {password: ERRORS.PASSWORD_CHECK_NO_MATCH.code}, errors: [ERRORS.PASSWORD_CHECK_NO_MATCH.code, ERRORS.NO_VALUE.code]},
    {type: 'button', onClick: (data) => {
      console.log('data', data);
      let error;
      let values = data.reduce((acc, item) => {
        console.log('item.value', item.value);
        if (!item.type === 'input' && !item.value) error = ERRORS.NO_VALUE.code;
        return {
          ...acc,
          [item.variable]: item.value
        }
      }, {});
      if (error) {
        dispatch(updateUiError(ERRORS.NO_VALUE.code));
        return;
      }
      let matchedValue = data.find(item => item.match && Object.keys(item.match).find(id => {
        error = item.match[id];
        return values[id] !== item.value
      }))
      if (matchedValue && error) {
        dispatch(updateUiError(error));
      } else {
        console.log('here');
        dispatch(registerRequest(data));
      }
    }, description: res.registerButton}
  ];

  return (
    <Form
      inputs={inputs}
    />
  )
}
export default withRouter(RegisterPage);
