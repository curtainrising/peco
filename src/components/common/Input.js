import React, { useState } from 'react';

export default ({labelText, defaultText, currText = '', type, onBlur}) => {
  const [ text, setText ] = useState(currText);

  const onChange = (event) => {
    setText(event.target.value);
  }
  return (
    <div>
      {labelText && <div>{labelText}</div>}
      <input onChange={onChange} onBlur={() => onBlur(text)} value={text}/>
    </div>
  )
}
