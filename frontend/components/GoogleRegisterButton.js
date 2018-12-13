import styled from "styled-components";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { UserConsumer } from "./UserProvider";
import config from "../config.json";

class GoogleRegisterButton extends Component {
  state = {};

  async componentDidMount() {
    const { GoogleLogin } = await import("react-google-login");
    this.setState({ GoogleLogin });
  }

  render = () => {
    const { theme, title, onCompletion } = this.props;
    const { GoogleLogin } = this.state;

    if (GoogleLogin)
      return (
        <UserConsumer>
          {context => (
            <GoogleLogin
              clientId={config.GOOGLE_CLIENT_ID}
              buttonText="Login"
              onSuccess={args => {
                context.logIn({data:args, method: "oauth"});
                onCompletion();
              }}
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
    return null;
  };
}

GoogleRegisterButton.propTypes = {
  title: PropTypes.string.isRequired,
  onCompletion: PropTypes.func.isRequired,
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
