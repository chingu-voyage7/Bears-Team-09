import React, { Component } from "react";
import styled from "styled-components";
import Router from "next/router";
import axios from "axios";
import PropTypes from "prop-types";
import Input from "./Input";
import AuthButton from "./AuthButton";
import LoginButton from "./LoginButton";
import GoogleRegisterButton from "./GoogleRegisterButton";
import { UserConsumer } from "./UserProvider";

class RegisterForm extends Component {
  state = {
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    email: "",
    passwordsDontMatch: false
  };

  handleAuth = (_, type) => {
    console.log(`Register with ${type}`);
    Router.push("/");
  };

  handleSubmit = async e => {
    // Register new user
    e.preventDefault();

    // Perform password validation
    const { password, confirmPassword } = this.state;
    if (password !== confirmPassword) {
      this.setState({ passwordsDontMatch: true });
    } else {
      this.setState({ passwordsDontMatch: false });
    }

    // Handle Success register state -> redirect
    const res = await axios.post("http://localhost:8000/auth/register", {
      email: this.state.email,
      password: this.state.password,
      first_name: this.state.firstName,
      last_name: this.state.lastName
    });
    console.log(res);
    this.props.context.logIn({ data: res.data, method: "password" });
    // Handle failed register state
  };

  handleInput = e => {
    // Method that syncs current input with state
    const { name, value } = e.target;
    const inputValue = { ...this.state, [name]: value };
    this.setState(inputValue);
  };

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
          <GoogleRegisterButton
            theme="#ea4335"
            title="Register using Google"
            onCompletion={e => this.handleAuth(e, "gl")}
          />
          <AuthButton theme="#3b5998" title="Register using Facebook" onCompletion={e => this.handleAuth(e, "fb")} />
          <AuthButton theme="#1da1f2" title="Register using Twitter" onCompletion={e => this.handleAuth(e, "tw")} />
        </AuthButtonWrapper>
      </>
    );
  }
}

export default RegisterForm;

RegisterForm.propTypes = {
  context: PropTypes.object
};

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
