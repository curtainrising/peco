import React, { useState } from 'react';
import Input from './Input';
import Dropdown from './Dropdown';
import styled from 'styled-components';
import res from '../../res';

/*
 * inputs - object {inputName: {value: ''}}
 * buttons - array [{onClick: <func>}]
*/
const Form = ({inputs = [], ...props}) => {
  const [ inputData, setInputData ] = useState(inputs);
  const onBlur = (variable, index) => (val) => {
    let temp = [...inputData];
    temp[index] = {...temp[index], variable, value: val}
    setInputData(temp)
  }
  const onSelect = (index) => (val) => {
    let temp = [...inputData];
    temp[index].value = val.target.value;
    setInputData(temp);
  }
  return (
    <div>
      {inputData.map((item, index) => {
        if (item.type === 'input') {
          return (
            <Input
              labelText={res[item.variable]}
              currText={item.value}
              onBlur={onBlur(item.variable, index)}
              type={item.variable}
            />
          )
        }
        if (item.type === 'dropdown') {
          return (
            <Dropdown
              description={res[item.variable]}
              options={item.options}
              selected={item.selected}
              onSelect={onSelect(index)}
            />
          )
        }
        if (item.type === 'button') {
          return (
            <button onClick={() => item.onClick(inputData, props)}>{item.description}</button>
          )
        }
      })}
    </div>
  )
}

export default Form;
