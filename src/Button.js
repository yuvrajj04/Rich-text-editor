// Button.js
import React from 'react';
import './Button.css';

const Button = ({ onClick }) => {
  return (
    <div className="button">
      <button onClick={onClick}>Save</button>
    </div>
  );
};

export default Button;
