import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Input from './Input';

class FormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleAuth = this.handleAuth.bind(this);
  }

  handleAuth(e, type) {
    // Method to be used if we implement auth
    // with Google, Twitter, Facebook, etc.
    e.preventDefault(this);
    console.log(`Auth with ${type}`);
  }

  handleSubmit(e) {
    // Login submission actions would be here
    e.preventDefault(this);
    console.log('Submitting a form');
    // Handle failed login state

    // Handle Success login state -> redirect
  }

  handleInput(e) {
    // Method that syncs current input with state
    const { name, value } = e.target;
    const inputValue = { ...this.state, [name]: value };
    this.setState(inputValue);
  }

  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            handleChange={this.handleInput}
            required
          />
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            handleChange={this.handleInput}
            required
          />
          <Button title="Log in" />
        </form>
        <div
          style={{
            display: 'grid',
            borderTop: '1px solid rgba(73, 73, 128, 0.52)',
            marginTop: 20
          }}
        >
          <h4 style={{ marginBottom: 5 }}>Or use alternatives:</h4>
          <AuthButton
            theme="#3b5998"
            title="Log in using Facebook"
            action={e => this.handleAuth(e, 'fb')}
          />
          <AuthButton
            theme="#ea4335"
            title="Log in using Google"
            action={e => this.handleAuth(e, 'gl')}
          />
          <AuthButton
            theme="#1da1f2"
            title="Log in using Twitter"
            action={e => this.handleAuth(e, 'tw')}
          />
        </div>
      </>
    );
  }
}

export default FormContainer;

export const Button = props => {
  const { title } = props;
  return <StyledButton type="submit">{title}</StyledButton>;
};

Button.propTypes = {
  title: PropTypes.string.isRequired
};

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

export const AuthButton = props => {
  const { theme, action, title } = props;
  return (
    <StyledAuthBtn theme={theme} onClick={action}>
      {title}
    </StyledAuthBtn>
  );
};

AuthButton.propTypes = {
  title: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired
};

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
