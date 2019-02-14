import React, { Component } from "react";
import styled from "styled-components";
import Router from "next/router";
import axios from "axios";
import PropTypes from "prop-types";
import Input from "./Input";
import LoginButton from "./LoginButton";
import GoogleRegisterButton from "./GoogleRegisterButton";
import StyledErrorMsg from "../styles/StyledErrorMsg";
import config from "../config.json";

const backendUrl = config.BACKEND_URL;

class RegisterForm extends Component {
  state = {
    firstName: "",
    lastName: "",
    bio: "",
    password: "",
    confirmPassword: "",
    email: "",
    passwordsDontMatch: false,
    registrationFailed: false
  };

  handleSubmit = async e => {
    e.preventDefault();
    // Perform password validation
    const { password, confirmPassword } = this.state;
    if (password !== confirmPassword) {
      this.setState({ passwordsDontMatch: true });
    } else {
      this.setState({ passwordsDontMatch: false });
    }

    // Handle Success register state -> redirect
    axios
      .post(
        `${backendUrl}/auth/register`,
        {
          email: this.state.email,
          password: this.state.password,
          first_name: this.state.firstName,
          last_name: this.state.lastName,
          bio: this.state.bio
        },
        {
          headers: { "Content-Type": "application/json" }
        }
      )
      .then(res => {
        this.props.context.logIn({ data: res.data, method: "password" });
        this.handleAuth(null, "email/password");
      })
      .catch(err => {
        console.error(err.response);
        this.handleFail();
      });
  };

  handleFail = () => this.setState({ registrationFailed: true });

  handleAuth = () => {
    Router.push("/");
  };

  handleInput = e => {
    // Method that syncs current input with state
    const { name, value } = e.target;
    const inputValue = { ...this.state, [name]: value };
    this.setState(inputValue);
  };

  render() {
    const { passwordsDontMatch, registrationFailed } = this.state;
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
          <Input id="lastName" name="lastName" type="text" placeholder="Last Name" handleChange={this.handleInput} />
          <Input id="bio" name="bio" type="text" placeholder="Short Bio" handleChange={this.handleInput} />
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
          {registrationFailed && <StyledErrorMsg>Registration failed!</StyledErrorMsg>}
        </form>
        <AuthButtonWrapper>
          <GoogleRegisterButton
            theme="#ea4335"
            title="Register using Google"
            onCompletion={this.handleAuth}
            onFailure={this.handleFail}
          />
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
  button {
    margin-top: 20px;
  }
`;
