import React from 'react';
import { connect } from 'react-redux';
import { NavLink, Link } from "react-router-dom";
import styled from 'styled-components';
import { ClassDropdown,  TeacherDropdown} from './Dropdowns';

const StudentForm = styled.div`
  widght: 50%;
  float: left;
`;
class AddStudentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.setupStudent();
  }
  setupStudent = () => {
    let student = {};
    if (this.props.studentId) {
      student = this.props.students[this.props.studentId];
    }
    return {
      firstName: student.firstName || '',
      lastName: student.lastName || '',
      parentEmail: student.parentEmail || '',
      teacherId: student.teacherId || '',
      classId: student.classId || '',
      ...(this.props.studentId? {studentId: this.props.studentId} : {})
    };
  }
  componentDidUpdate() {
    console.log('state', this.state.studentId)
    console.log('props',this.props.studentId)
    if (this.state.studentId !== this.props.studentId) {
      this.setState(this.setupStudent())
    }
  }
  handleSaveStudentForm = (e) => {
    let student = {...this.state};
    if (this.props.studentId){
      console.log('save');
    } else {
      console.log('add');
    }
    this.props.handleSaveStudent(student, this.props.studentId);
  }
  handleStudentFormChange = (event) => {
    const { name, value } = event.target;
    const { firstName, lastName, teacherId, classId } = this.state;
    const newState = {};
    for(let key in this.state){
      if(key === name) {
        newState[name] = value;
      } else {
        newState[key] = this.state[key]
      }
    }
    console.log('newState',newState);
    this.setState(() => newState);
  }
  render() {
    const { firstName, lastName, parentEmail, teacherId, classId } = this.state;
    return (
      <StudentForm>
            <div>
                <label htmlFor="firstName">First Name</label>
                <input type="text" className="form-control" name="firstName" value={firstName} onChange={this.handleStudentFormChange} />
            </div>
            <div>
                <label htmlFor="lastName">Last Name</label>
                <input type="text" className="form-control" name="lastName" value={lastName} onChange={this.handleStudentFormChange} />
            </div>
            <div>
                <label htmlFor="parentEmail">Parent Name</label>
                <input type="text" className="form-control" name="parentEmail" value={parentEmail} onChange={this.handleStudentFormChange} />
            </div>
            <div>
              <ClassDropdown classId={classId} onChange={this.handleStudentFormChange}/>
            </div>
            <div>
              <TeacherDropdown teacherId={teacherId} onChange={this.handleStudentFormChange}/>
            </div>
            <div>
              <button onClick={this.handleSaveStudentForm} className="btn btn-primary">{this.props.studentId? "Save": "Add"}</button>
            </div>
      </StudentForm>
    )
  }
}
const mapStateToProps = (state) => {
  return state.school
};

export default connect(mapStateToProps)(AddStudentForm);
