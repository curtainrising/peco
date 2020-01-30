import React from 'react';
import { connect } from 'react-redux';
import { NavLink, Link } from "react-router-dom";
import styled from 'styled-components';
import { ClassDropdown,  TeacherDropdown} from './Dropdowns';
import Table from './Table';
import FormInput from './FormInput';
import { updateTeacherRequest } from '../redux/actionCreators';

const ClassDetailsOuter = styled.div`
  height: 34.5vh;
  overflow: scroll;
`;

const TeacherForm = styled.div`
  width: 98%;
`;

const Form = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const ButtonRight = styled.button`
  justify-self: end;
`;

class TeacherDetails extends React.Component {
  inRef = null;
  outRef = null;
  firstNameRef = null;
  lastNameRef = null;
  emailRef = null;
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      ...this.setupTeacher(),
      ...this.getStudentLists(this.props.teacherId),
      edited: false
    };
  }
  setupTeacher = () => {
    let teacher = {};
    if (this.props.teacherId) {
      teacher = this.props.teachers[this.props.teacherId];
    }
    console.log('teacher',teacher);
    let data = {
      firstName: teacher.firstName || '',
      lastName: teacher.lastName || '',
      email: teacher.email || '',
      ...(this.props.teacherId? {teacherId: this.props.teacherId} : {})
    };
    console.log('data',data);
    return data;
  }
  getStudentLists = (teacherId) => {
    const { students, classes, teachers } = this.props;
    const teacherKeys = Object.keys(teachers);
    const teacherValues = Object.values(teachers);
    const studentsKeys = Object.keys(students);
    const studentsValues = Object.values(students);
    const mappedStudentsWithTeacher = Object.entries(students).filter((student) => student[1].teacherId === teacherId);
    const mappedStudentsWithoutTeacher = Object.entries(students).filter((student) => !student[1].teacherId);
    return {mappedStudentsWithTeacher, mappedStudentsWithoutTeacher}
  }
  componentDidUpdate() {
    console.log('state', this.state.teacherId)
    console.log('props',this.props.teacherId)
    if (this.state.teacherId !== this.props.teacherId) {
      this.setState(this.setupTeacher())
    }
  }
  handleAddTeacherForm = (e) => {
    let teacher = {...this.state};
    this.props.handleAddTeacher(teacher, this.props.teacherId);
  }
  handleTeacherFormChange = (event) => {
    const { name, value } = event.target;
    const { firstName, lastName, teacherEmail } = this.state;
    const newState = {};
    for(let key in this.state){
      if(key === name) {
        newState[name] = value;
      } else {
        newState[key] = this.state[key]
      }
    }
    this.setState(() => newState);
  }
  mapToTable = (arr) => {
    console.log('arr',arr);
    return arr.map((data) => ({
      data: [
        data[1].firstName,
        data[1].lastName
      ],
      key: data[0]
    }))
  }
  removeTeacher = (studentInd) => {
    let { mappedStudentsWithTeacher, mappedStudentsWithoutTeacher } = this.state;
    let student = mappedStudentsWithTeacher.splice(studentInd,1);
    mappedStudentsWithoutTeacher.push(student[0]);
    this.setState({
      ...this.state,
      mappedStudentsWithTeacher,
      mappedStudentsWithoutTeacher,
      edited: true
    })
  }
  addTeacher = (studentInd) => {
    let { mappedStudentsWithTeacher, mappedStudentsWithoutTeacher } = this.state;
    let student = mappedStudentsWithoutTeacher.splice(studentInd,1);
    mappedStudentsWithTeacher.push(student[0]);
    this.setState({
      ...this.state,
      mappedStudentsWithTeacher,
      mappedStudentsWithoutTeacher,
      edited: true
    })
  }
  onChanged = () => {
    this.setState({
      edited: true
    })
  }
  onSaveChanges = () => {
    let firstName = this.firstNameRef.getInputData();
    let lastName = this.lastNameRef.getInputData();
    let email = this.emailRef.getInputData();
    let { mappedStudentsWithTeacher, mappedStudentsWithoutTeacher } = this.state;
    let payload = {
      teacherId: this.state.teacherId,
      firstName,
      lastName,
      email,
      mappedStudentsWithTeacher,
      mappedStudentsWithoutTeacher
    }
    this.props.handleSaveTeacher(payload, this.props.teacherId);
    this.setState({
      edited: false
    })
  }
  render() {
    console.log('this.state',this.state);
    const addColumns = [
      'First Name',
      'Last Name',
      'Add'
    ];
    const removeColumns = [
      'First Name',
      'Last Name',
      'Remove'
    ];
    const options = {
      type: 'list-row'
    }
    const { firstName, lastName, email } = this.state;
    return (
      <TeacherForm>
        <Form>
          <div>
            <div>
              <FormInput
                label={"First Name"}
                value={this.state.firstName}
                onChanged={this.onChanged}
                ref={ref => this.firstNameRef = ref}
              />
            </div>
            <div>
              <FormInput
                label={"Last Name"}
                value={this.state.lastName}
                onChanged={this.onChanged}
                ref={ref => this.lastNameRef = ref}
              />
            </div>
            <div>
              <FormInput
                label={"Email"}
                value={this.state.email}
                onChanged={this.onChanged}
                ref={ref => this.emailRef = ref}
              />
            </div>
          </div>
          {
            this.state.edited &&
            <ButtonRight onClick={this.onSaveChanges} className="btn btn-primary">{this.props.teacherId? "Save": "Add"}</ButtonRight>
          }
        </Form>
        <div>
          <div>
            <span>With Teacher</span>
            <ClassDetailsOuter>
              <Table
                columns={removeColumns}
                dataList={this.mapToTable(this.state.mappedStudentsWithTeacher)}
                options={options}
                selected={this.state.classId}
                buttonAction={this.removeTeacher}
                buttonText={"remove"}
              />
            </ClassDetailsOuter>
          </div>
          <div>
            <span>Without Teacher</span>
            <ClassDetailsOuter>
              <Table
                columns={addColumns}
                dataList={this.mapToTable(this.state.mappedStudentsWithoutTeacher)}
                options={options}
                selected={this.state.classId}
                buttonAction={this.addTeacher}
                buttonText={"add"}
              />
            </ClassDetailsOuter>
          </div>
        </div>
      </TeacherForm>
    )
  }
}
const mapStateToProps = (state) => {
  return state.school
};

export default connect(mapStateToProps)(TeacherDetails);
