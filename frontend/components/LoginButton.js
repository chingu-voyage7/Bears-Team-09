import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const LoginButton = props => {
  const { title } = props;
  return <StyledButton type="submit">{title}</StyledButton>;
};

LoginButton.propTypes = {
  title: PropTypes.string.isRequired
};

export default LoginButton;

const StyledButton = styled.button`
  color: white;
  font-size: 1rem;
  background: #3d0e98;
  border: 0px;
  border-radius: 5px;
  padding: 5px;
  padding-left: 7px;
  padding-right: 7px;
  cursor: pointer;
  font-weight: 600;
`;
