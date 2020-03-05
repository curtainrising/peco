import React, { useState } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { withRouter } from "react-router-dom";
import styled from 'styled-components';
import Form from '../common/Form';
import { createStudentRequest, updateStudentRequest, deleteStudentRequest } from '../../redux/actionCreators';
import { ID_TYPE } from '../../helpers/constants';
import res from '../../res';

const StudentForm = styled.div`
  widght: 50%;
  float: left;
`;

const StudentDetails = (props) => {
  const school = useSelector(state => state.school, shallowEqual);
  const dispatch = useDispatch();
  const [ studentData, setStudentData ] = useState(school.students[props.match.params.id] || {});
  const handleSave = (changeData, moreData) => {
    console.log('data', changeData);
    if (studentData.schoolId) {
      console.log('update');
      dispatch(updateStudentRequest({studentData, changeData}));
    } else {
      console.log('add');
      dispatch(createStudentRequest(changeData));
    }
  };
  const handleCancle = (data) => {
    console.log('cancle');
    props.history.push('/students');
  };
  const handleDelete = (data) => {
    dispatch(deleteStudentRequest(studentData))
  };

  const getDropdown = (type) => {
    let selected = 0;
    let tempType = type === 'class' ? 'classes' : 'teachers';
    const options = Object.values(school[tempType]).map((item, index) => {
      let value = ''
      if (type === 'teacher') value = item.firstName + ' ' + item.lastName;
      if (type === 'class') value = item.className
      if (studentData[`${type}Id`] === item[`${type}Id`]) selected = index + 1;

      return {key: item[`${type}Id`], value};
    });
    console.log('keys', Object.keys(school[tempType])[selected - 1]);
    return {
      type: 'dropdown',
      variable: `${type}Id`,
      options: options,
      selected: selected,
      value: Object.keys(school[tempType])[selected - 1]
    };
  }

  const inputs = [
    {type: 'input', variable: 'firstName', value: studentData && studentData.firstName || ''},
    {type: 'input', variable: 'lastName', value: studentData && studentData.lastName || ''},
    {type: 'input', variable: 'parentEmail', value: studentData && studentData.parentEmail || ''},
    getDropdown('teacher'),getDropdown('class'),
    {
      type: 'button',
      onClick: handleSave,
      description: res.save
    },
    {
      type: 'button',
      onClick: handleCancle,
      description: res.cancle
    },
    ...(studentData && studentData.studentId? [{
      type: 'button',
      onClick: handleDelete,
      description: res.delete
    }] : []),
  ];
  return (
    <div>
      <Form
        inputs={inputs}
      />
    </div>
  )
}

export default withRouter(StudentDetails);
