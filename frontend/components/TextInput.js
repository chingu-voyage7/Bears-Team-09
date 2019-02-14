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
  padding: 5px;
  background-color: #fafafa;
  width: 100%;
  margin-bottom: 5px;
  font-size: 1rem;
  resize: none;
  box-sizing: border-box;
`;

TextInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired
};
