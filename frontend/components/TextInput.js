import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

function TextInput(props) {
  const { placeholder, handleChange } = props;
  return (
    <label htmlFor="bio">
      <Text name="bio" id="bio" rows="2" placeholder={placeholder} onChange={handleChange} />
    </label>
  );
}
export default TextInput;
const Text = styled.textarea`
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 3px;
  padding: 10px;
  background-color: #fafafa;
  width: 100%;
  height: 7rem;
  min-height: 3rem;
  margin: 7px 0;
  font-size: 1rem;
  resize: vertical;
  box-sizing: border-box;
  box-shadow: inset 0 2px 4px 0 hsla(0, 0%, 0%, 0.08);
`;

TextInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired
};
