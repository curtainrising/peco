import React, { useState } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { withRouter } from "react-router-dom";
import styled from 'styled-components';
import Table from '../common/Table';
import Form from '../common/Form';
import { createClassRequest, updateClassRequest, deleteClassRequest } from '../../redux/actionCreators';
import { getStudentList, addStudentToList, removeStudentFromList } from '../../helpers/utils';
import { ID_TYPE } from '../../helpers/constants';
import res from '../../res';

const ClassListOuter = styled.div`
  width: 98%;
`;

const ClassDetailsOuter = styled.div`
  height: 38vh;
  overflow: scroll;
`;

const ClassDetailHeader = styled.div`
  padding-bottom: 32px
`;

const ButtonRight = styled.button`
  padding-right: 20px;
  float: right;
`
const PullLeft = styled.div`
  float: left;
`

const ClassDetails = (props) => {
  const school = useSelector(state => state.school, shallowEqual);
  const dispatch = useDispatch();

  if (props.match.params.id && !school.classes[props.match.params.id]) props.history.push('/classes');
  const [ classData, setClassData ] = useState(school.classes[props.match.params.id] || {});
  const [ students, setStudents ] = useState(getStudentList(school.students, props.match.params.id, ID_TYPE.CLASS_ID));

  const changeStudents = (index, add) => () =>
    setStudents(add ? addStudentToList(students,index) : removeStudentFromList(students, index))
  const handleSave = (data, moreData) => {
    const tempClassData = {
      ...classData,
      className: data[0].value,
      schoolId: school.school.schoolId
    };
    if (classData.schoolId) {
      console.log('update');
      dispatch(updateClassRequest({students: moreData.students, classData: tempClassData}));
    } else {
      console.log('add');
      dispatch(createClassRequest({students: moreData.students, classData: tempClassData}));
    }

  };
  const handleCancle = (data) => {
    console.log('cancle');
    props.history.push('/classes');
  };
  const handleDelete = (data, moreData) => {
    console.log('moreData', moreData);
    moreData.students.mappedStudentsNotInList = [
      ...moreData.students.mappedStudentsInList,
      ...moreData.students.mappedStudentsNotInList
    ]
    moreData.students.mappedStudentsInList = [];
    dispatch(deleteClassRequest({students: moreData.students, classData}))
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
    {type: 'input', variable: 'className', value: classData && classData.className || ''},
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
    ...(classData && classData.className? [{
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
    <ClassListOuter>
      <ClassDetailHeader>
        <Form
          inputs={inputs}
          students={students}
        />
      </ClassDetailHeader>
      <div>
        <div>
          <span>In class</span>
          <ClassDetailsOuter>
            <Table
              columns={removeColumns}
              dataList={mapToTable(students.mappedStudentsInList, true)}
              options={options}
            />
          </ClassDetailsOuter>
        </div>
        <div>
          <span>Not in class</span>
          <ClassDetailsOuter>
            <Table
              columns={addColumns}
              dataList={mapToTable(students.mappedStudentsNotInList, false)}
              options={options}
            />
          </ClassDetailsOuter>
        </div>
      </div>
    </ClassListOuter>
  )

}

export default withRouter(ClassDetails)
