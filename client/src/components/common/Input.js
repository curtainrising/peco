import React, { useState } from 'react';

export default ({labelText, defaultText, currText = '', type, onBlur, onChangeAction}) => {
  const [ text, setText ] = useState(currText);

  const onChange = (event) => {
    setText(event.target.value);
    if (onChangeAction) {
      onChangeAction(event);
    }
  }
  return (
    <div>
      {labelText && <div>{labelText}</div>}
      <input id={type} onChange={onChange} onBlur={() => onBlur(text)} value={text}/>
    </div>
  )
}
