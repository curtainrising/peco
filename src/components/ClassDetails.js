import React from 'react';
import { connect } from 'react-redux';
import { NavLink, Link } from "react-router-dom";
import styled from 'styled-components';
import List from './List';
import Table from './Table';
import FormInput from './FormInput';
import { updateClassRequest } from '../redux/actionCreators';

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

class ClassDetails extends React.Component {
  inRef = null;
  outRef = null;
  nameRef = null;
  constructor(props) {
    super(props);
    // const {mappedStudentsInClass, mappedStudentsNotInClass} = this.getStudentLists(this.props.classId)
    this.state = {
      edited: false,
      classId: this.props.classId,
      ...this.setupClass()
    }
  }
  setupClass = () => {
    let classObj = {};
    if (this.props.classId) {
      classObj = this.props.classes[this.props.classId]
    }
    return {
      className: classObj.className || '',
      ...this.getStudentLists(this.props.classId)
    };
  }
  getStudentLists = (classId) => {
    const { students, classes, teachers } = this.props;
    const classKeys = Object.keys(classes);
    const classValues = Object.values(classes);
    const studentsKeys = Object.keys(students);
    const studentsValues = Object.values(students);
    const mappedStudentsInClass = []
    studentsValues.map((data, index) => {
      let classData = classes[data.classId];
      if (data.classId === classId && classData && classData.students && classData.students.includes(studentsKeys[index])) {
        mappedStudentsInClass.push({
          firstName: data.firstName,
          lastName: data.lastName,
          key: studentsKeys[index],
        });
      }
    })
    const mappedStudentsNotInClass = [];
    studentsValues.map((data, index) => {
      let classData = classes[data.classId];
      if (!classData || !classData.students || !classData.students.includes(studentsKeys[index])) {
        mappedStudentsNotInClass.push({
          firstName: data.firstName,
          lastName: data.lastName,
          key: studentsKeys[index],
        })
      }
    })
    return {mappedStudentsInClass, mappedStudentsNotInClass}
  }
  componentDidUpdate() {
    if (this.state.classId !== this.props.classId) {
      const {mappedStudentsInClass, mappedStudentsNotInClass} = this.getStudentLists(this.props.classId)
      // console.log('mappedStudentsInClass',mappedStudentsInClass)
      // console.log('mappedStudentsNotInClass',mappedStudentsNotInClass)
      this.setState({
        mappedStudentsInClass,
        mappedStudentsNotInClass,
        classId: this.props.classId,
        edited: false
      })
    }
  }
  addStudentToClass = (studentId) => {
    let { mappedStudentsInClass, mappedStudentsNotInClass } = this.state;
    let student = mappedStudentsNotInClass.splice(studentId,1);
    mappedStudentsInClass.push(student[0]);
    this.setState({
      mappedStudentsInClass,
      mappedStudentsNotInClass,
      classId: this.props.classId,
      edited: true
    })
  }
  removeStudentFromClass = (studentId) => {
    console.log('studentId', studentId);
    let { mappedStudentsInClass, mappedStudentsNotInClass } = this.state;
    let student = mappedStudentsInClass.splice(studentId,1);
    console.log('student', mappedStudentsInClass);
    console.log('mappedStudentsNotInClass before', mappedStudentsNotInClass);
    mappedStudentsNotInClass.push(student[0]);
    console.log('mappedStudentsNotInClass after', mappedStudentsNotInClass);
    this.setState({
      mappedStudentsInClass,
      mappedStudentsNotInClass,
      classId: this.props.classId,
      edited: true
    })
  }
  mapToTable = (arr) => {
    console.log('arr', arr);
    return arr.map((data) => ({
      data: [
        data.firstName,
        data.lastName
      ],
      key: data.key
    }))
  }
  onChanged = () => {
    this.setState({
      edited: true
    })
  }
  onSaveChanges = () => {
    let className = this.nameRef.getInputData();
    let { mappedStudentsInClass, mappedStudentsNotInClass } = this.state;
    let payload = {
      classId: this.state.classId,
      className,
      mappedStudentsInClass,
      mappedStudentsNotInClass
    }
    this.props.dispatch(updateClassRequest(payload))
    this.setState({
      edited: false
    })
  }
  handleSaveClassForm = (e) => {
    let className = this.nameRef.getInputData();
    let { mappedStudentsInClass, mappedStudentsNotInClass } = this.state;
    let payload = {
      classId: this.state.classId,
      className,
      mappedStudentsInClass,
      mappedStudentsNotInClass
    }
    if (this.props.classId){
      console.log('save');
    } else {
      console.log('add');
    }
    this.props.handleSaveClass(payload, this.props.classId);
    this.setState({
      edited: false
    })
  }
  render() {
    console.log('classId',this.props.classId);
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

    return (
      <ClassListOuter>
        <ClassDetailHeader>
          <PullLeft>
            <FormInput
              label={"Class Name"}
              value={this.state.className}
              onChanged={this.onChanged}
              ref={ref => this.nameRef = ref}
            />
          </PullLeft>
          {
            this.state.edited &&
            <ButtonRight onClick={this.handleSaveClassForm}>Save</ButtonRight>
          }
        </ClassDetailHeader>
        <div>
          <div>
            <span>In class</span>
            <ClassDetailsOuter>
              <Table
                columns={removeColumns}
                dataList={this.mapToTable(this.state.mappedStudentsInClass)}
                options={options}
                selected={this.state.classId}
                buttonAction={this.removeStudentFromClass}
                buttonText={"remove"}
              />
            </ClassDetailsOuter>
          </div>
          <div>
            <span>Not in class</span>
            <ClassDetailsOuter>
              <Table
                columns={addColumns}
                dataList={this.mapToTable(this.state.mappedStudentsNotInClass)}
                options={options}
                selected={this.state.classId}
                buttonAction={this.addStudentToClass}
                buttonText={"add"}
              />
            </ClassDetailsOuter>
          </div>
        </div>
      </ClassListOuter>
    )
  }

}

const mapStateToProps = (state) => {
  return state.school
};

export default connect(mapStateToProps)(ClassDetails);
