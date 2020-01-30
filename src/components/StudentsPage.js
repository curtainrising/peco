import React from 'react';
import { connect } from 'react-redux';
import { NavLink, Link } from "react-router-dom";
import styled from 'styled-components';
import StudentDetails from './StudentDetails';
import List from './List';
import Table from './Table';
import { addStudentRequest, updateStudentRequest } from '../redux/actionCreators';


const Header = styled.strong`
  padding: 20px;
  font-size: 30px;
`;
const StudentListOuter = styled.div`
  width: 50%;
  float: left;
`;

class StudentsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addStudent: false,
      studentId: ''
    }
  }
  handleAddStudentPressed = () => {
    this.setState(() => ({
      studentId: '',
      addStudent: true
    }));
  }
  handleStudentPressed = (studentId) => {
    this.setState(() => ({
      studentId,
      addStudent: false
    }))
  }
  handleSaveStudent = (studentData, save) => {
    this.setState(() => ({
      studentId: '',
      addStudent: false
    }))
    if (save) {
      console.log('update')
      this.props.dispatch(updateStudentRequest(studentData))
    } else {
      console.log('add')
      this.props.dispatch(addStudentRequest(studentData))
    }
  }
  render() {
    const { students } = this.props;
    const studentKeys = Object.keys(students);
    const studentValues = Object.values(students);
    const mappedStudents = studentValues.map((student, index) => {
      let className = student.classId && this.props.classes[student.classId].className || '';
      let teacherName = student.teacherId && this.props.teachers[student.teacherId].firstName + this.props.teachers[student.teacherId].lastName || '';
      return {
        data: [
          student.firstName,
          student.lastName,
          className,
          teacherName
        ],
        key: studentKeys[index],
      }
    })
    const columns = [
      'First Name',
      'Last name',
      'Class',
      'Teacher'
    ];
    const options = {
      type: 'list-row-selectable'
    }
    console.log(mappedStudents);
    return (
      <div>
        <div>
          <Header>Students</Header>
          <button onClick={this.handleAddStudentPressed}>add</button>
        </div>
        <StudentListOuter>
          <Table
            columns={columns}
            onPressed={this.handleStudentPressed}
            dataList={mappedStudents}
            options={options}
            selected={this.state.studentId}
          />

        </StudentListOuter>
        {
          this.state.addStudent && <StudentDetails handleSaveStudent={this.handleSaveStudent}/>
        }
        {
          this.state.studentId && <StudentDetails studentId={this.state.studentId} handleSaveStudent={this.handleSaveStudent}/>
        }
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return state.school
};

export default connect(mapStateToProps)(StudentsPage);
