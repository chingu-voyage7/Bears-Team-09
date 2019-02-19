import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const LoginButton = props => {
  const { title } = props;
  return <StyledButton type="submit">{title}</StyledButton>;
};

LoginButton.propTypes = {
  title: PropTypes.string.isRequired
};

export default LoginButton;

const StyledButton = styled.button`
  border: 0;
  padding: 10px;
  margin-top: 5px;
  cursor: pointer;
  border-radius: 2px;
  color: white;
  font-size: 1rem;
  background: #3d0e98;
  width: 100%;
`;
