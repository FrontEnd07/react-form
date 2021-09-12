import React from 'react';
import style from './Button.module.scss';

export const Button = ({ children, appClassName, ...props }) => (
  <button className={`${style.button} ${appClassName}`} {...props}>
    {props.disabled ? <img src={loader} alt="" /> : children}
  </button>
);
