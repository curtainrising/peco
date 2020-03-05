import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { NavLink, Link } from "react-router-dom";
import styled from 'styled-components';
import Table from '../common/Table';
import { setupClassPageTable } from '../../helpers/utils';

const Header = styled.strong`
  padding: 20px;
  font-size: 30px;
`;

const ClassContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const ClassListOuter = styled.div`
  width: 98%;
`;


const ClassesPage = (props) => {
  console.log('props', props);
  const { classes, students } = useSelector(state => state.school);
  const [ state, setState ] = useState(setupClassPageTable(classes, students));
  useEffect(() => {
    setState(setupClassPageTable(classes, students));
  }, [classes])
  const handleAddClicked = () => {
    props.history.push('/classes/add');
  }
  const handleRowClicked = (key) => {
    props.history.push(`/classes/${key}`);
  }
  return (
    <div>
      <div>
        <Header>Classes</Header>
        <button onClick={handleAddClicked}>add</button>
      </div>
      <ClassContainer>
        <ClassListOuter>
          <Table
            columns={state.columns}
            onPressed={handleRowClicked}
            dataList={state.mappedClasses}
            options={state.options}
          />
        </ClassListOuter>
      </ClassContainer>
    </div>
  )

}

export default ClassesPage;
