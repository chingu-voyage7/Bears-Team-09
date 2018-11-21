import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Input = props => {
  const {
    name,
    type,
    value,
    handleChange,
    placeholder,
    required,
    title
  } = props;
  return (
    <div>
      <label htmlFor={name}>{title}</label>
      <StyledInput
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  required: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired
};

export default Input;

const StyledInput = styled.input`
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 3px;
  padding: 5px;
  backgroundcolor: #fafafa;
  width: 100%;
  margin-bottom: 5px;
  font-size: 1rem;
`;
