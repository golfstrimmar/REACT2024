import classes from "./Modal.module.scss";
import React from 'react';

const Modal = ({children,visible,setVisible}) => {
  const rootClasses = [classes.modal]
  if (visible) {rootClasses.push(classes._isActive)}
  return (
    <div className={rootClasses.join(' ')} onClick={()=>setVisible(false)}>
        <div className={classes.modalContent} onClick={(e)=>e.stopPropagation()}>
          {children}
        </div>
    </div>
  );
};

export default Modal;
  