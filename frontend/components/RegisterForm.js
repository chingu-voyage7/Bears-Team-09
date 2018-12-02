import React, { Component } from "react";
import styled from "styled-components";
import NoSSR from "react-no-ssr";
import Input from "./Input";
import AuthButton from "./AuthButton";
import GoogleRegisterButton from "./GoogleRegisterButton";
import LoginButton from "./LoginButton";

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
      email: "",
      passwordsDontMatch: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleAuth = this.handleAuth.bind(this);
  }

  handleAuth = e => {
    // Method to be used if we implement auth
    // with Google, Twitter, Facebook, etc.
    e.preventDefault();
  };

  handleSubmit = e => {
    // Register new user
    e.preventDefault();

    // Perform password validation
    const { password, confirmPassword } = this.state;
    if (password !== confirmPassword) {
      this.setState({ passwordsDontMatch: true });
    } else {
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
      <NoSSR>
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
          <Input id="email" name="email" type="email" placeholder="Email" handleChange={this.handleInput} required />
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
          {passwordsDontMatch && <StyledErrorMsg>Make sure that passwords match!</StyledErrorMsg>}
        </form>
        <AuthButtonWrapper>
          <h4>Or use alternatives:</h4>
          <AuthButton theme="#3b5998" title="Register using Facebook" onClick={e => this.handleAuth(e, "fb")} />
          <AuthButton theme="#ea4335" title="Register using Google" onClick={e => this.handleAuth(e, "gl")} />
          <AuthButton theme="#1da1f2" title="Register using Twitter" onClick={e => this.handleAuth(e, "tw")} />
        </AuthButtonWrapper>
      </NoSSR>
    );
  }
}

export default RegisterForm;

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
