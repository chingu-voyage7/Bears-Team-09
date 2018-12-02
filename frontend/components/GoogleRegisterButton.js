import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { GoogleLogin } from "react-google-login";
import NoSSR from "react-no-ssr";
import { UserConsumer } from "./UserProvider";
import config from "../config.json";

const GoogleRegisterButton = props => {
  const { theme, onClick, title } = props;
  return (
    <NoSSR>
      <UserConsumer>
        {context => (
          <GoogleLogin
            clientId={config.GOOGLE_CLIENT_ID}
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
    </NoSSR>
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
