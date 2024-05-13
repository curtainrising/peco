import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getSchoolsRequest, createSchoolRequest, joinSchoolRequest } from '../../redux/actionCreators'
import Form from '../common/Form';
import res from '../../res';
import { ERRORS } from '../../helpers/constants';

const JoinSchool = (props) => {
  console.log('on render', props);
  useEffect(() => {
    console.log('on mount', props);
    if (!props.schools.length) {
      console.log('get schools request');
      props.dispatch(getSchoolsRequest(props.user));
    }
  }, []);
  const createSchoolInputs = [
    {type: 'input', variable: 'schoolName', value: ''},
    {type: 'input', variable: 'password', value: ''},
    {type: 'button', onClick: (data) => {
      console.log('submit', submit);
    }, description: res.createSchoolButton}
  ];
  const joinSchoolInputs = [
    {
      type: 'dropdown',
      variable: 'schoolName',
      options: props.schools.map(item => ({key: item.schoolName, value: item.schoolName})),
      selected: 0
    },
    {type: 'input', variable: 'password', value: '', errors: [ERRORS.BAD_PASSWORD.code]},
    {type: 'button', onClick: (data) => {
      props.dispatch(joinSchoolRequest({user: props.user, data}));
    }, description: res.joinSchoolButton}
  ]

  return (
    <div>
      <Form
        inputs={joinSchoolInputs}
      />
    </div>
  )
}

export default JoinSchool
