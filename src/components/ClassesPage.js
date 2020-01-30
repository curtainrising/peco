import React from 'react';
import { connect } from 'react-redux';
import { NavLink, Link } from "react-router-dom";
import styled from 'styled-components';
import List from './List';
import Table from './Table';
import ClassDetails from './ClassDetails';
import { updateClassRequest, addClassRequest } from '../redux/actionCreators';

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

class ClassesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addClass: false,
      classId: ''
    }
  }
  handleClassPressed = (classId) => {
    this.setState(() => ({
      addClass: false,
      classId
    }))
  }
  handleAddClassPressed = () => {
    this.setState(() => ({
      classId: '',
      addClass: true
    }));
  }
  handleSaveClass = (classData, save) => {
    this.setState(() => ({
      classId: '',
      addClass: false
    }))
    if (save) {
      console.log('update')
      this.props.dispatch(updateClassRequest(classData))
    } else {
      console.log('add')
      this.props.dispatch(addClassRequest(classData))
    }
  }
  render() {
    const { classes, teachers } = this.props;
    const classKeys = Object.keys(classes);
    const classValues = Object.values(classes);
    const columns = [
      'Name',
      'Count'
    ];
    const mappedClasses = classValues.map((data, index) => {
      return {
        data: [
          data.className,
          data.students.length
        ],
        key: classKeys[index]
      }
    })
    const options = {
      type: 'list-row-selectable'
    }
    return (
      <div>
        <div>
          <Header>Classes</Header>
          <button onClick={this.handleAddClassPressed}>add</button>
        </div>
        <ClassContainer>
          <ClassListOuter>
            <Table
              columns={columns}
              onPressed={this.handleClassPressed}
              dataList={mappedClasses}
              options={options}
              selected={this.state.classId}
            />
          </ClassListOuter>
          {
            this.state.addClass && <ClassDetails handleSaveClass={this.handleSaveClass} />
          }
          {
            this.state.classId && <ClassDetails classId={this.state.classId} handleSaveClass={this.handleSaveClass}/>
          }
        </ClassContainer>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return state.school
};

export default connect(mapStateToProps)(ClassesPage);
