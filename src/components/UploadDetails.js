import React, { Component } from 'react'
import { connect } from 'react-redux';
import styled from 'styled-components';
import List from './List';
import Table from './Table';
import FormInput from './FormInput';

const ClassListOuter = styled.div`
  width: 70%;
  float: right;
  overflow: scroll;
`;

const ClassListHeader = styled.div`
  padding-bottom: 32px
`;
const ButtonRight = styled.button`
  padding-right: 20px;
  float: right;
`
const PullLeft = styled.div`
  float: left;
`
class UploadDetails extends Component{
  nameRef = null;
  constructor(props) {
    super(props);
    const students = this.setupStudentList()
    let fileNameArr = this.props.fileName.split('.');
    fileNameArr.pop();
    this.state = {
      saveable: false,
      students,
      fileName: fileNameArr.join('.')
    }
  }
  setupStudentList = () => {
    const csvList = this.props.fileText.split("\n");
    let titles = {};
    csvList.shift().split(',').map((titleData, index) => {
      titles[titleData.trim()] = index;
    })
    while(!csvList[csvList.length -1 ]) {
      csvList.pop();
    }
    let studentValues = Object.values(this.props.students);
    let studentKeys = Object.keys(this.props.students);
    let teacherValues = Object.values(this.props.teachers);
    let teacherKeys = Object.keys(this.props.teachers);
    let currentTeacherKeys = {};
    let students = csvList.map((studentStr, index) => {
      if (!studentStr) return null;
      let student = studentStr.split(",");
      let teacherEmail = student[titles["Teacher Email"]]
      let studentData = {
        firstName: student[titles["First Name"]],
        lastName: student[titles["Last Name"]],
        parentEmail: student[titles["Parent Email"]],
        teacherEmail
      }
      if (teacherEmail && !currentTeacherKeys[teacherEmail]) {
        let teacher = teacherValues.forEach((teacher, index) => {
          if (teacher.email == teacherEmail) {
              currentTeacherKeys[teacherEmail] = teacherKeys[index];
          }
        });
      }
      if (currentTeacherKeys[teacherEmail]) {
        studentData.teacherId = currentTeacherKeys[teacherEmail];
        studentData.teacherName = this.props.teachers[currentTeacherKeys[teacherEmail]].firstName + this.props.teachers[currentTeacherKeys[teacherEmail]].lastName
      }
      let matchedStudent;
      studentValues.forEach((currentStudent, currentStudentIndex) => {
        if (matchedStudent) return;
        if (currentStudent.firstName.trim() === studentData.firstName.trim() &&
            currentStudent.lastName.trim() === studentData.lastName.trim() &&
            currentStudent.parentEmail.trim() == studentData.parentEmail.trim())
            matchedStudent = studentKeys[currentStudentIndex];
            studentData.chosen = false;
      })
      studentData.key = matchedStudent;
      return studentData;
    })
    console.log('students',students);
    return students;
  }
  componentDidUpdate () {
    this.state.students.find(student => {
      console.log('student', student);
      console.log('chosen', student.chosen);
      return student.chosen === false
    })
    console.log('find', this.state.students.find(student => student.key && student.chosen === false));
    if(!this.state.saveable && !this.state.students.find(student => student.key && student.chosen === false)) {
      this.setState({saveable: true})
    }
  }
  onChooseOld = (studentId, index) => () => {
    let studentData = this.state.students;
    studentData[index].chosen = true;
    studentData[index].key = studentId;
    this.setState({students:studentData})
    console.log('onChooseOld', studentId, index)
  }
  onChooseNew = (index) => () => {
    let studentData = this.state.students;
    studentData[index].chosen = true;
    studentData[index].key = null;
    this.setState({students:studentData})
    console.log('onChoseNew', index)
  }
  onSaveChanges = () => {
    let payload = {
      className: this.state.fileName,
      students: this.state.students
    };
    this.props.handleSave(payload);
  }
  render(){
    const mappedClass = this.state.students.map((student, index) => {
      console.log('student', student);
      return {
        data: [
          student.firstName + ' ' + student.lastName,
          student.teacherName,
        ],
        buttons: [
          !student.chosen && student.key ? {name: 'current', action: this.onChooseOld(student.key, index)} : {},
          !student.chosen && student.key ? {name: 'new', action: this.onChooseNew(index)} : {},
        ],
        key: student.key,
      }
    })
    console.log(mappedClass);
    const columns = [
      'Student Name',
      'Teacher Name',
      'Current Student',
      'New Student'
    ];
    const options = {
      type: 'list-row'
    }
    return (
      <ClassListOuter>
        <ClassListHeader>
          <PullLeft>
            <FormInput
              label={"Class Name"}
              value={this.state.fileName}
              onChanged={() => {}}
              ref={ref => this.nameRef = ref}
            />
          </PullLeft>
          {
            this.state.saveable &&
            <ButtonRight onClick={this.onSaveChanges}>Save</ButtonRight>
          }
        </ClassListHeader>
        {/*<List
          dataList={this.state.students}
          type={"student3"}
          buttonChoice1Text1={"new"}
          buttonChoice1={this.onChooseNew}
          buttonChoice1Text2={"current"}
          buttonChoice2={this.onChooseOld}
        />*/}
        <Table
          columns={columns}
          dataList={mappedClass}
          options={options}
          selected={this.state.classId}
        />
      </ClassListOuter>
    )
  }
}
const mapStateToProps = (state) => {
  return state.school;
};
export default connect(mapStateToProps)(UploadDetails)
