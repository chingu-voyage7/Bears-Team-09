import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { GoogleLogin } from "react-google-login";
import { UserConsumer } from "./UserProvider";

const GoogleRegisterButton = props => {
  const { theme, onClick, title } = props;
  return (
    <UserConsumer>
      {context => (
        <GoogleLogin
          clientId="21137127004-b47734i7g9hptsga32ai7o9ktedtv0m1.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={context.logIn}
          onFailure={console.error}
          render={renderProps => (
            <StyledAuthBtn onClick={renderProps.onClick} onKeyPress={renderProps.onClick} theme={theme}>
              {title}
            </StyledAuthBtn>
          )}
        />
      )}
    </UserConsumer>
  );
};

GoogleRegisterButton.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired
};

export default GoogleRegisterButton;

const StyledAuthBtn = styled.button`
  border: 0;
  padding: 10px;
  margin-top: 5px;
  cursor: pointer;
  border-radius: 2px;
  color: white;
  background: ${props => props.theme};
  font-size: 1rem;
`;
