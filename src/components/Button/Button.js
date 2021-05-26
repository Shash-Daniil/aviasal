import React from 'react';
import PropTypes from 'prop-types';
import css from './Button.module.css';

const { button } = css;

const Button = (props) => {
  const handler = props.handler ? props.handler : null; // eslint-disable-line react/destructuring-assignment
  const { text } = props;

  return <input onClick={handler} className={button} type="button" value={text} />;
};

Button.propTypes = {
  handler: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

export default Button;
