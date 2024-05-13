import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import Input from './Input';
import Dropdown from './Dropdown';
import styled from 'styled-components';
import res from '../../res';
import { ERRORS } from '../../helpers/constants';
import { removeUiError } from '../../redux/actionCreators'

/*
 * inputs - object {inputName: {value: ''}}
 * buttons - array [{onClick: <func>}]
*/
const Form = ({inputs = [], ...props}) => {
  const { code : errorCode } = useSelector(state => state.ui, shallowEqual);
  const dispatch = useDispatch();
  const [ inputData, setInputData ] = useState(inputs);
  console.log('errorCode', errorCode);
  const onBlur = (variable, index) => (val) => {
    let temp = [...inputData];
    temp[index] = {...temp[index], variable, value: val}
    setInputData(temp)
  }
  const onChange = (event) => {
    if (errorCode && inputs.filter(item => item.errors && item.variable === event.target.id && item.errors.includes(errorCode)).length) {
      dispatch(removeUiError())
    }
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
            <div>
              <Input
                labelText={res[item.variable]}
                currText={item.value}
                onBlur={onBlur(item.variable, index)}
                onChangeAction={onChange}
                type={item.variable}
                key={index}
              />
              {errorCode && errorCode === ERRORS.NO_VALUE.code && !item.value && (
                <span>{ERRORS.NO_VALUE.message}</span>
              )}
              {errorCode && errorCode !== ERRORS.NO_VALUE.code && item.errors && item.errors.includes(errorCode) && (
                <span>{ERRORS[errorCode].message}</span>
              )}
            </div>
          )
        }
        if (item.type === 'dropdown') {
          return (
            <Dropdown
              description={res[item.variable]}
              options={item.options}
              selected={item.selected}
              onSelect={onSelect(index)}
              key={index}
            />
          )
        }
        if (item.type === 'button') {
          return (
            <button 
              key={index}
              onClick={() => item.onClick(inputData, props)}
            >
              {item.description}
            </button>
          )
        }
      })}
      {errorCode && errorCode === ERRORS.UNKOWN_ERROR.code && (
        <span>{ERRORS.UNKOWN_ERROR.message}</span>
      )}
    </div>
  )
}

export default Form;
