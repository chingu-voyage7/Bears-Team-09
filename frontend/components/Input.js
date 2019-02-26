import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Input = props => {
  const { name, type = "text", onChange, onClick, placeholder, required } = props;
  return (
    <div>
      <label htmlFor={name}>
        <InputField
          id={name}
          name={name}
          type={type}
          autoComplete={props.autoComplete}
          onChange={onChange}
          onClick={onClick}
          placeholder={placeholder}
          required={required}
        />
      </label>
    </div>
  );
};

Input.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  autoComplete: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  required: PropTypes.bool
};

export default Input;

const InputField = styled.input`
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 3px;
  padding: 10px;
  margin: 7px 0;
  background-color: #fafafa;
  width: 100%;
  margin-bottom: 5px;
  font-size: 1rem;
  box-shadow: inset 0 2px 4px 0 hsla(0, 0%, 0%, 0.08);
`;
