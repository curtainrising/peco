import React from 'react';
import { connect } from 'react-redux';
import { NavLink, Link } from "react-router-dom";
import styled from 'styled-components';

const ClassList = (props) => {
  let classes = props.classes;
  let keys = Object.keys(classes);
  let values = Object.values(classes);
  let classList = values.map((data, index) => {
    let teacherName = '';
    if (data.teacher && props.teachers[data.teacher]) {
        let teacher = props.teachers[data.teacher];
        let teacherName = " - " + teacher.firstName + ' ' + teacher.lastName;
    }
    let selected=false;
    if (keys[index] === props.classId) {
      selected = true;
    }
    return (
      <option selected={selected} key={keys[index]} value={keys[index]}>{data.className}{teacherName}</option>
    )
  });
  return (
    <div>
      <label htmlFor="classId">Class</label>
      <select name="classId" onChange={props.onChange}>
        <option value={0}>None</option>
        {classList}
      </select>
    </div>
  )

}

const mapStateToProps = (state) => {
  return state.school
};

export const ClassDropdown = connect(mapStateToProps)(ClassList);



const TeacherList = (props) => {
  let teachers = props.teachers;
  let keys = Object.keys(teachers);
  let values = Object.values(teachers);
  let teacherList = values.map((data, index) => {
    let teacherName = data.firstName + ' ' + data.lastName;
    let selected=false;
    if (keys[index] === props.teacherId) {
      selected = true;
    }
    return (
      <option selected={selected} key={keys[index]} value={keys[index]}>{teacherName}</option>
    )
  });
  return (
    <div>
      <label htmlFor="teacherId">Teacher</label>
      <select name="teacherId" onChange={props.onChange}>
        <option value={0}>None</option>
        {teacherList}
      </select>
    </div>
  )
}


export const TeacherDropdown = connect(mapStateToProps)(TeacherList);
