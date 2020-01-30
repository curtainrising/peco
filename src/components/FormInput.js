import React from 'react';
import { connect } from 'react-redux';
import { NavLink, Link } from "react-router-dom";
import styled from 'styled-components';
import List from './List';

class FormInput extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
      original: this.props.value
    }
  }
  getInputData = () => {
    return this.state.value;
  }
  handleFormChange = (event) => {
    const { name, value } = event.target;
    this.props.onChanged();
    this.setState(() => ({
      value
    }));
  }
  componentDidUpdate(){
    if (this.state.original !== this.props.value) {
      this.setState(() => ({
        value: this.props.value,
        original: this.props.value
      }))
    }
  }
  render() {
    return (
      <div>
        <label htmlFor="className">{this.props.label}</label>
        <input name="className" onChange={this.handleFormChange} value={this.state.value}/>
      </div>
    )
  }
}

export default FormInput
