import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const ClearButton = props => (
  <StyledButton onClick={props.handleClearButton} type="submit">
    Clear
  </StyledButton>
);

ClearButton.propTypes = {
  handleClearButton: PropTypes.func.isRequired
};

export default ClearButton;

const StyledButton = styled.button`
  color: white;
  font-size: 1rem;
  background: #c20d0d;
  border: 0px;
  border-radius: 5px;
  padding: 5px;
  padding-left: 7px;
  padding-right: 7px;
  cursor: pointer;
  font-weight: 600;
  float: right;
`;
