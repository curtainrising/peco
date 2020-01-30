import React from 'react';
import { connect } from 'react-redux';
import { NavLink, Link } from "react-router-dom";
import styled from 'styled-components';
import { ClassDropdown,  TeacherDropdown} from './Dropdowns';

const TeacherForm = styled.div`
  widght: 50%;
  float: left;
`;
class AddTeacherForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      teacherEmail: ''
    }
  }
  handleAddTeacherForm = (e) => {
    let teacher = {...this.state};
    this.props.handleAddTeacher(teacher);
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
  render() {
    const { firstName, lastName, teacherEmail } = this.state;
    return (
      <TeacherForm>
            <div>
                <label htmlFor="firstName">First Name</label>
                <input type="text" className="form-control" name="firstName" value={firstName} onChange={this.handleTeacherFormChange} />
            </div>
            <div>
                <label htmlFor="lastName">Last Name</label>
                <input type="text" className="form-control" name="lastName" value={lastName} onChange={this.handleTeacherFormChange} />
            </div>
            <div>
                <label htmlFor="teacherEmail">Email</label>
                <input type="text" className="form-control" name="teacherEmail" value={teacherEmail} onChange={this.handleTeacherFormChange} />
            </div>
            <div>
              <button onClick={this.handleAddTeacherForm} className="btn btn-primary">Add</button>
            </div>
      </TeacherForm>
    )
  }
}
const mapStateToProps = (state) => {
  return state.school
};

export default connect(mapStateToProps)(AddTeacherForm);
