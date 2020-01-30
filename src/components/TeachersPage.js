import React from 'react';
import { connect } from 'react-redux';
import { NavLink, Link } from "react-router-dom";
import styled from 'styled-components';
import TeacherDetails from './TeacherDetails';
import List from './List';
import Table from './Table';
import { updateTeacherRequest, addTeacherRequest } from '../redux/actionCreators';

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

class TeachersPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addTeacher: false,
      teacherId: ''
    }
  }
  handleAddTeacherPressed = () => {
    this.setState(() => ({
      teacherId: '',
      addTeacher: true
    }));
  }
  handleTeacherPressed = (teacherId) => {
    this.setState(() => ({
      teacherId,
      addTeacher: false
    }))
  }
  handleAddTeacher = (TeacherData, save) => {
    this.setState(() => ({
      teacherId: '',
      addTeacher: false
    }))
    if (save) {
      console.log('update')
      this.props.dispatch(updateTeacherRequest(TeacherData))
    } else {
      console.log('add')
      this.props.dispatch(addTeacherRequest(TeacherData))
    }
  }
  handleSaveTeacher = (teacherData, save) => {
    this.setState(() => ({
      teacherId: '',
      addTeacher: false
    }))
    if (save) {
      console.log('update')
      this.props.dispatch(updateTeacherRequest(teacherData))
    } else {
      console.log('add')
      this.props.dispatch(addTeacherRequest(teacherData))
    }
  }
  render() {
    const { teachers, students } = this.props;
    const teacherKeys = Object.keys(teachers);
    const teacherValues = Object.values(teachers);
    const mappedTeachers = teacherValues.map((teacher, index) => {
      return {
        data: [
          teacher.firstName,
          teacher.lastName,
          Object.values(students).filter((student) => student.teacherId === teacherKeys[index]).length,
        ],
        key: teacherKeys[index],
      }
    })
    const columns = [
      'First Name',
      'Last name',
      'Student Count',
    ];
    const options = {
      type: 'list-row-selectable'
    }
    console.log(mappedTeachers);
    return (
      <div>
        <div>
          <Header>Teachers</Header>
          <button onClick={this.handleAddTeacherPressed}>add</button>
        </div>
        <TeachersContainer>
          <TeachersListOuter>
            <Table
              columns={columns}
              onPressed={this.handleTeacherPressed}
              dataList={mappedTeachers}
              options={options}
              selected={this.state.teacherId}
            />

          </TeachersListOuter>
          {
            this.state.addTeacher && <TeacherDetails handleSaveTeacher={this.handleSaveTeacher}/>
          }
          {
            this.state.teacherId && <TeacherDetails teacherId={this.state.teacherId} handleSaveTeacher={this.handleSaveTeacher} />
          }
        </TeachersContainer>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return state.school
};

export default connect(mapStateToProps)(TeachersPage);
