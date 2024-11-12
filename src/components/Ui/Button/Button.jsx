import React from 'react';
import classes from './Button.module.scss';
const Button = ({children, ...props}) => {
  return (
    <button className={classes._btn}   {...props}>{children}</button>
  );
};
export default Button;
  