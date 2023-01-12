import classes from './Input.module.css';
import React from 'react';
const Input = React.forwardRef((props, ref) => {
  return (
    <div className={`${classes['large-input']} ${props.className}`}>
      <label>{props.label}</label>
      <input
        ref={ref}
        {...props.input}
        onFocus={props.onFocus}
        onChange={props.onChange}
        onBlur={props.onBlur}
        value={props.value}
      />
    </div>
  );
});

export default Input;
