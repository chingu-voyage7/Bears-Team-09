import React, { Component } from 'react';
import styled from 'styled-components';
import Input from './Input';
import AuthButton from './AuthButton';
import LoginButton from './LoginButton';

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

  handleAuth = (e, type) => {
    // Method to be used if we implement auth
    // with Google, Twitter, Facebook, etc.
    e.preventDefault();
    console.log(`Auth with ${type}`);
  };

  handleSubmit = e => {
    // Login submission actions would be here
    e.preventDefault();
    console.log('Submitting a form');
    // Handle failed login state
    // Handle Success login state -> redirect
  };

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
          <LoginButton title="Log in" />
        </form>
        <AuthButtonWrapper>
          <h4>Or use alternatives:</h4>
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
        </AuthButtonWrapper>
      </>
    );
  }
}

export default FormContainer;

const AuthButtonWrapper = styled.div`
  display: grid;
  border-top: 1px solid rgba(73, 73, 128, 0.52);
  margin-top: 20px;

  h4 {
    margin-bottom: 5px;
  }
`;