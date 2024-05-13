import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { NavLink, Link } from "react-router-dom";
import styled from 'styled-components';
import Table from '../common/Table';
// import { updateClassRequest, addClassRequest } from '../../redux/actionCreators';
import { setupTeacherPageTable } from '../../helpers/utils';

const Header = styled.strong`
  padding: 20px;
  font-size: 30px;
`;
const TeachersContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;
const TeachersListOuter = styled.div`
  width: 98%;
  height: 88vh;
  overflow: scroll;
`;

const TeacherPage = (props) => {
  const { teachers, students } = useSelector(state => state.school);
  console.log('teachers', teachers);
  const [ state, setState ] = useState(setupTeacherPageTable(teachers, students));
  useEffect(() => {
    setState(setupTeacherPageTable(teachers, students));
  }, [teachers])
  const handleAddClicked = () => {
    props.history.push('/teachers/add');
  }
  const handleRowClicked = (key) => {
    props.history.push(`/teachers/${key}`);
  }
  return (
    <div>
      <div>
        <Header>Teachers</Header>
        <button onClick={handleAddClicked}>add</button>
      </div>
      <TeachersContainer>
        <TeachersListOuter>
          <Table
            columns={state.columns}
            onPressed={handleRowClicked}
            dataList={state.mappedTeachers}
            options={state.options}
          />
        </TeachersListOuter>
      </TeachersContainer>
    </div>
  )

}

export default TeacherPage
