import React, { useState } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { withRouter } from "react-router-dom";
import styled from 'styled-components';
import Table from '../common/Table';
import Form from '../common/Form';
import { createTeacherRequest, updateTeacherRequest, deleteTeacherRequest } from '../../redux/actionCreators';
import { getStudentList, addStudentToList, removeStudentFromList } from '../../helpers/utils';
import { ID_TYPE } from '../../helpers/constants';
import res from '../../res';
import uid from 'uid';

const TeacherDetailsOuter = styled.div`
  height: 34.5vh;
  overflow: scroll;
`;

const TeacherListOuter = styled.div`
  width: 98%;
`;

const TeacherDetailHeader = styled.div`
  padding-bottom: 32px
`;

const TeacherDetails = (props) => {
  const school = useSelector(state => state.school, shallowEqual);
  const dispatch = useDispatch();

  if (props.match.params.id && !school.teachers[props.match.params.id]) props.history.push('/teachers');

  const [ teacherData, setTeacherData ] = useState(school.teachers[props.match.params.id] || {});
  const [ students, setStudents ] = useState(getStudentList(school.students, props.match.params.id, ID_TYPE.TEACHER_ID));
  console.log('teacherData', teacherData)
  const changeStudents = (index, add) => () =>
    setStudents(add ? addStudentToList(students,index) : removeStudentFromList(students, index))
  const handleSave = (data, moreData) => {
    const tempTeacherData = {
      ...teacherData,
      firstName: data[0].value,
      lastName: data[1].value,
      email: data[2].value,
      schoolId: school.school.schoolId
    };
    if (teacherData.schoolId) {
      console.log('update', tempTeacherData);
      dispatch(updateTeacherRequest({students: moreData.students, teacherData: tempTeacherData}));
    } else {
      console.log('add');
      dispatch(createTeacherRequest({students: moreData.students, teacherData: tempTeacherData}));
    }

  };
  const handleCancle = (data) => {
    console.log('cancle');
    props.history.push('/teachers');
  };
  const handleDelete = (data, moreData) => {
    console.log('moreData', moreData);
    moreData.students.mappedStudentsNotInList = [
      ...moreData.students.mappedStudentsInList,
      ...moreData.students.mappedStudentsNotInList
    ]
    moreData.students.mappedStudentsInList = [];
    dispatch(deleteTeacherRequest({students: moreData.students, teacherData}))
  };


  const mapToTable = (arr, add) => {
    console.log('arr', arr);
    return arr.map((data, index) => ({
      data: [
        {type: 'text', text: data.firstName},
        {type: 'text', text: data.lastName},
        add ?
        {type: 'button', action: changeStudents(index), text: res.remove} :
        {type: 'button', action: changeStudents(index, true), text: res.add}
      ],
      key: data.key
    }))
  };
  const inputs = [
    {type: 'input', variable: 'firstName', value: teacherData && teacherData.firstName || ''},
    {type: 'input', variable: 'lastName', value: teacherData && teacherData.lastName || ''},
    {type: 'input', variable: 'email', value: teacherData && teacherData.email || ''},
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
    ...(teacherData && teacherData.firstName? [{
      type: 'button',
      onClick: handleDelete,
      description: res.delete
    }] : []),
  ];

  const addColumns = [
    res.firstName,
    res.lastName,
    res.add
  ];
  const removeColumns = [
    res.firstName,
    res.lastName,
    res.remove
  ];
  const options = {
    type: 'list-row'
  };
  return (
    <TeacherListOuter>
      <TeacherDetailHeader>
        <Form
          inputs={inputs}
          students={students}
        />
      </TeacherDetailHeader>
      <div>
        <div>
          <span>Has Teacher</span>
          <TeacherDetailsOuter>
            <Table
              columns={removeColumns}
              dataList={mapToTable(students.mappedStudentsInList, true)}
              options={options}
            />
          </TeacherDetailsOuter>
        </div>
        <div>
          <span>Does not have teacher</span>
          <TeacherDetailsOuter>
            <Table
              columns={addColumns}
              dataList={mapToTable(students.mappedStudentsNotInList, false)}
              options={options}
            />
          </TeacherDetailsOuter>
        </div>
      </div>
    </TeacherListOuter>
  )

}

export default withRouter(TeacherDetails)
