import React from 'react';
import classes from './Input.module.scss';
const Input = React.forwardRef((props,ref)=> {
  return (
    <div className={classes._input}>
      <input ref={ref} type="text"   {...props}    placeholder='post title'/>
      {props.label && <label htmlFor={props.id}>{props.label}</label>}
    </div>
  );
});
export default Input;
  