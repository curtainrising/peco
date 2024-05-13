import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { NavLink, Link } from "react-router-dom";
import styled from 'styled-components';
import Table from '../common/Table';
import { setupStudentPageTable } from '../../helpers/utils';


const Header = styled.strong`
  padding: 20px;
  font-size: 30px;
`;
const StudentContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const StudentListOuter = styled.div`
  width: 98%;
`;

const StudentsPage = (props) => {
  console.log('props', props);
  const { classes, students, teachers } = useSelector(state => state.school);
  const [ state, setState ] = useState(setupStudentPageTable(students, teachers, classes));
  useEffect(() => {
    setState(setupStudentPageTable(students, teachers, classes));
  }, [classes])
  const handleAddClicked = () => {
    props.history.push('/students/add');
  }
  const handleRowClicked = (key) => {
    props.history.push(`/students/${key}`);
  }
  return (
    <div>
      <div>
        <Header>Students</Header>
        <button onClick={handleAddClicked}>add</button>
      </div>
      <StudentContainer>
        <StudentListOuter>
          <Table
            columns={state.columns}
            onPressed={handleRowClicked}
            dataList={state.mappedStudents}
            options={state.options}
          />
        </StudentListOuter>
      </StudentContainer>
    </div>
  )

}

export default StudentsPage;
