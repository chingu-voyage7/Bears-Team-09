import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

function TextArea(props) {
  const { placeholder, onChange } = props;
  return (
    <label htmlFor="bio">
      <Text rows="2" placeholder={placeholder} onChange={onChange} />
    </label>
  );
}
export default TextArea;
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

TextArea.propTypes = {
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired
};
