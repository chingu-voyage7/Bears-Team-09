import React, { Component } from 'react';
import styled from 'styled-components';
import Input from './Input';
import AuthButton from './AuthButton';
import LoginButton from './LoginButton';

class FormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: '',
      email: '',
      passwordsDontMatch: false
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
    // Register new user
    e.preventDefault();

    // Perform password validation
    const { password, confirmPassword } = this.state;
    if (password !== confirmPassword) {
      console.log(`passwords do not match`);
      this.setState({ passwordsDontMatch: true });
    } else {
      console.log(`passwords matching`);
      this.setState({ passwordsDontMatch: false });
    }

    // Handle failed register state
    // Handle Success register state -> redirect
  };

  handleInput(e) {
    // Method that syncs current input with state
    const { name, value } = e.target;
    const inputValue = { ...this.state, [name]: value };
    this.setState(inputValue);
  }

  render() {
    const { passwordsDontMatch } = this.state;
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <Input
            id="firstName"
            name="firstName"
            type="text"
            placeholder="First Name"
            handleChange={this.handleInput}
            required
          />
          <Input
            id="lastName"
            name="lastName"
            type="text"
            placeholder="Last Name"
            handleChange={this.handleInput}
            required
          />
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
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            handleChange={this.handleInput}
            required
          />
          <LoginButton title="Register" />
          { passwordsDontMatch && (
            <StyledErrorMsg>Make sure that passwords match!</StyledErrorMsg>
          )}
        </form>
        <AuthButtonWrapper>
          <h4>Or use alternatives:</h4>
          <AuthButton
            theme="#3b5998"
            title="Register using Facebook"
            action={e => this.handleAuth(e, 'fb')}
          />
          <AuthButton
            theme="#ea4335"
            title="Register using Google"
            action={e => this.handleAuth(e, 'gl')}
          />
          <AuthButton
            theme="#1da1f2"
            title="Register using Twitter"
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

const StyledErrorMsg = styled.span`
  margin-left: 10px;
  color: red;
`;
