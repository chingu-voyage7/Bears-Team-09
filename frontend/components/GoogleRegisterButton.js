import styled from "styled-components";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { UserContext } from "./UserProvider";
import config from "../config.json";

class GoogleRegisterButton extends Component {
  state = {};

  async componentDidMount() {
    const { GoogleLogin } = await import("react-google-login");
    this.setState({ GoogleLogin });
  }

  onFailure = err => {
    console.error(err.response);
    this.props.onFailure();
  };

  render = () => {
    const { theme, title } = this.props;
    const { GoogleLogin } = this.state;

    if (GoogleLogin)
      return (
        <GoogleLogin
          clientId={config.GOOGLE_CLIENT_ID}
          buttonText="Login"
          onSuccess={this.props.onCompletion}
          onFailure={this.onFailure}
          render={renderProps => (
            <StyledAuthBtn
              onClick={renderProps.onClick}
              onKeyPress={renderProps.onClick}
              theme={theme}
            >
              {title}
            </StyledAuthBtn>
          )}
        />
      );
    return null;
  };
}

GoogleRegisterButton.propTypes = {
  title: PropTypes.string.isRequired,
  onCompletion: PropTypes.func.isRequired,
  onFailure: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired
};

GoogleRegisterButton.contextType = UserContext;

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
