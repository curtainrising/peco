import React, { useState } from 'react';
import { connect } from 'react-redux';
import { NavLink, Link } from "react-router-dom";
import styled from 'styled-components';


const StudentListInner = styled.div`
  width: 90%;
  outline: 1px solid black;
`;

const ButtonRight = styled.button`
  float: right;
`

class StudentList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { dataList, type } = this.props;
    console.log(type,dataList);
    const mappedData = dataList.map((data, index) => {
      if (type === "student"){
        let classNames = "list-row-selectable"
        if (data.key === this.props.selected) {
          classNames += " selected";
        }
        return (
          <div className={classNames} onClick={() => {this.props.onPressed(data.key)}} key={data.key}>
            <span>name: {data.firstName + ' ' + data.lastName}</span>
          </div>
        )
      } else if (type === "student2"){
        let buttonText = this.props.buttonText || '';
        return (
          <div className="list-row" key={data.key}>
            <span>name: {data.firstName + ' ' + data.lastName}</span>
            <ButtonRight onClick={()=>{this.props.button(index)}}>{buttonText}</ButtonRight>
          </div>
        )
      } else if (type === "student3") {
        let button = data.key;
        let buttonText1 = this.props.buttonChoice1Text1 || '';
        let buttonText2 = this.props.buttonChoice1Text2 || '';
        console.log('data.key',data.key);
        return (
          <div className="list-row" key={data.key || index}>
            <span>name: {data.firstName + ' ' + data.lastName} </span>
            {data.teacherEmail && !data.teacherName && <span>teacher Email: {data.teacherEmail} </span>}
            {data.teacherName && <span>teacher name: {data.teacherName} </span>}
            {!data.choosen && button && <ButtonRight onClick={()=>{this.props.buttonChoice1(index)}}>{buttonText1}</ButtonRight>}
            {!data.choosen && button && <ButtonRight onClick={()=>{this.props.buttonChoice2(data.key, index)}}>{buttonText2}</ButtonRight>}
          </div>
        )
      } else {
        let classNames = "list-row-selectable"
        if (data.key === this.props.selected) {
          classNames += " selected";
        }
        return (
          <div className={classNames} onClick={() => {this.props.onPressed(data.key)}} key={data.key}>
            <span>name: {data.className}</span>
            <span>number: {data.studentNumber}</span>
          </div>
        )
      }
    })
    return (
      <StudentListInner>
        {mappedData}
      </StudentListInner>
    )
  }

}


export default StudentList;
