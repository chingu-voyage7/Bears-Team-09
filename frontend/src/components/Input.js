import React from 'react'
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Input = props => {
  const { name, type, handleChange, placeholder, required } = props;
  return (
    <div>
      <Label htmlFor={name}>
        <input
          id={name}
          name={name}
          type={type}
          onChange={handleChange}
          placeholder={placeholder}
          required={required}
        />
      </Label>
    </div>
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  required: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired
};

export default Input;

const Label = styled.label`
  input {
    border: 1px solid rgba(0, 0, 0, 0.12);
    border-radius: 3px;
    padding: 5px;
    backgroundcolor: #fafafa;
    width: 100%;
    margin-bottom: 5px;
    font-size: 1rem;
  }
`;
