import React from 'react';
import { connect } from 'react-redux';
import { NavLink, Link } from "react-router-dom";
import styled from 'styled-components';

const Dropdown = ({description, selected, options, onSelect}) => {
  return (
    <div>
      <div>{description}</div>
      <select onChange={onSelect}>
        <option value={0}>None</option>
        {options.map((item, index) => (
          <option selected={selected === index + 1} key={item.key} value={item.key}>{item.value}</option>
        ))}
      </select>
    </div>
  )
}

export default Dropdown;
