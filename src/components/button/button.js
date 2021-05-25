import React from 'react';
import css from './Button.module.css';

const { button } = css;

const Button = (props) => {
  const { setSpliceIndex } = props; // eslint-disable-line react/prop-types

  return <input onClick={setSpliceIndex} className={button} type="button" value="ПОКАЗАТЬ ЕЩЕ 5 БИЛЕТОВ!" />;
};

export default Button;
