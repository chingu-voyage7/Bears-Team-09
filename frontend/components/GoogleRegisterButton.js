import styled from 'styled-components';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { UserConsumer, UserContext } from './UserProvider';
import config from '../config.json';

class GoogleRegisterButton extends Component {
  state = {};

  async componentDidMount() {
    const { GoogleLogin } = await import('react-google-login');
    this.setState({ GoogleLogin });
  }

  onSuccess = data => {
    // this.context.logIn({ data: data.profileObj, method: 'oauth' });
    this.props.onCompletion(data);
  };

  onFailure = err => {
    console.error(err);
    this.props.onFailure();
  };

  render = () => {
    const { theme, title, onCompletion, onFailure } = this.props;
    const { GoogleLogin } = this.state;

    if (GoogleLogin)
      return (
        <GoogleLogin
          clientId={config.GOOGLE_CLIENT_ID}
          buttonText="Login"
          onSuccess={this.onSuccess}
          onFailure={this.onFailure}
          render={renderProps => (
            <StyledAuthBtn onClick={renderProps.onClick} onKeyPress={renderProps.onClick} theme={theme}>
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
